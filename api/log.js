export default function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'active', message: 'Vercel logger endpoint is operational' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch {
        payload = { message: payload };
      }
    }

    const {
      level = 'error',
      message = 'Unspecified error',
      error = null,
      stack = null,
      context = null,
      url = null,
      timestamp = new Date().toISOString(),
    } = payload || {};

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown IP';
    const referer = req.headers['referer'] || req.headers['referrer'] || 'Direct';
    const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';

    const reason = error
      ? (typeof error === 'object' ? (error.message || JSON.stringify(error)) : String(error))
      : (payload?.reason || null);

    const logEntry = {
      level,
      message,
      reason,
      error,
      stack,
      context,
      url: url || referer,
      timestamp,
      client: {
        ip,
        referer,
        userAgent,
      },
    };

    // Output to console for Vercel Runtime Logs ingestion
    const logPrefix = `[CLIENT_${level.toUpperCase()}]`;
    const logHeader = reason
      ? `${logPrefix} ${message} | Reason: ${reason}`
      : `${logPrefix} ${message}`;

    if (level === 'warn') {
      console.warn(logHeader, JSON.stringify(logEntry, null, 2));
    } else if (level === 'info') {
      console.info(logHeader, JSON.stringify(logEntry, null, 2));
    } else {
      console.error(logHeader, JSON.stringify(logEntry, null, 2));
    }

    return res.status(200).json({ success: true, timestamp, reason });
  } catch (err) {
    console.error('[API_LOGGER_INTERNAL_ERROR]', err);
    return res.status(500).json({ error: 'Failed to record log' });
  }
}
