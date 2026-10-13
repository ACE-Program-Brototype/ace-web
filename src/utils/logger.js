/**
 * Centralized logging utility for ACE Web.
 * Transmits errors and diagnostic events to Vercel Runtime Logs via the /api/log serverless endpoint.
 */

const RECENT_LOGS_TTL_MS = 3000;
const recentLogs = new Map();

/**
 * Checks if a log entry was dispatched recently to prevent flood / render loop spam.
 */
function isDuplicateLog(key) {
  const now = Date.now();
  const lastTime = recentLogs.get(key);
  if (lastTime && now - lastTime < RECENT_LOGS_TTL_MS) {
    return true;
  }
  recentLogs.set(key, now);

  // Clean old entries if the map gets too big
  if (recentLogs.size > 100) {
    for (const [k, time] of recentLogs.entries()) {
      if (now - time > RECENT_LOGS_TTL_MS) {
        recentLogs.delete(k);
      }
    }
  }
  return false;
}

/**
 * Normalizes error objects into serializable JSON.
 */
function serializeError(err) {
  if (!err) return null;
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause ? serializeError(err.cause) : undefined,
    };
  }
  if (typeof err === 'object') {
    try {
      return JSON.parse(JSON.stringify(err));
    } catch {
      return String(err);
    }
  }
  return String(err);
}

/**
 * Sends a structured log entry to the Vercel serverless function (/api/log).
 */
async function sendToVercel(payload) {
  try {
    if (typeof window === 'undefined') return;

    // Local dev: avoid spamming or crashing if offline
    const response = await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    if (!response.ok) {
      // In local dev, /api/log might not exist if not running via Vercel CLI, silently fail
      return;
    }
  } catch {
    // Non-blocking: fail gracefully so logger never interrupts client UI
  }
}

export const logger = {
  /**
   * Log an error to both console and Vercel Runtime Logs.
   */
  error(message, error = null, context = {}) {
    const errorObj = serializeError(error);
    const reason = error
      ? (error instanceof Error ? error.message : (typeof error === 'object' ? (error.message || JSON.stringify(error)) : String(error)))
      : (context?.reason || null);
    const stack = error instanceof Error ? error.stack : (new Error().stack);
    const dedupKey = `error:${message}:${errorObj?.message || ''}`;

    // Always log to local browser console with prominent reason
    console.error(`[ACE] ${message}${reason ? ` | Reason: ${reason}` : ''}`, error || '', context || '');

    if (isDuplicateLog(dedupKey)) {
      return;
    }

    const payload = {
      level: 'error',
      message: String(message),
      reason,
      error: errorObj,
      stack,
      context,
      url: typeof window !== 'undefined' ? window.location.href : null,
      timestamp: new Date().toISOString(),
    };

    sendToVercel(payload);
  },

  /**
   * Log a warning to console and Vercel Runtime Logs.
   */
  warn(message, context = {}) {
    console.warn(`[ACE] ${message}`, context || '');

    const dedupKey = `warn:${message}`;
    if (isDuplicateLog(dedupKey)) return;

    const payload = {
      level: 'warn',
      message: String(message),
      context,
      url: typeof window !== 'undefined' ? window.location.href : null,
      timestamp: new Date().toISOString(),
    };

    sendToVercel(payload);
  },

  /**
   * Log info / milestones to console and Vercel Runtime Logs.
   */
  info(message, context = {}) {
    console.info(`[ACE] ${message}`, context || '');

    const payload = {
      level: 'info',
      message: String(message),
      context,
      url: typeof window !== 'undefined' ? window.location.href : null,
      timestamp: new Date().toISOString(),
    };

    sendToVercel(payload);
  },
};

/**
 * Initializes listeners for uncaught exceptions and unhandled promise rejections.
 */
export function initGlobalErrorLogging() {
  if (typeof window === 'undefined') return;

  // Catch uncaught exceptions
  window.addEventListener('error', (event) => {
    // Filter out common browser-specific non-fatal noise
    if (event.message && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return;
    }

    logger.error(
      event.message || 'Uncaught window error',
      event.error || {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      },
      {
        type: 'uncaught_window_error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    );
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const isError = reason instanceof Error;

    logger.error(
      isError ? reason.message : 'Unhandled Promise Rejection',
      isError ? reason : { reason: String(reason) },
      {
        type: 'unhandled_promise_rejection',
      }
    );
  });
}
