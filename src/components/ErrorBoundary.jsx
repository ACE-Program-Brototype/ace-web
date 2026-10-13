import { Component } from 'react';
import { logger } from '../utils/logger';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('React ErrorBoundary captured an error', error, {
      componentStack: errorInfo?.componentStack,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6 py-12">
          <div className="max-w-lg w-full border border-outline-variant/40 bg-surface-container/60 backdrop-blur-md p-8 md:p-10 shadow-2xl">
            <div className="w-12 h-1 bg-primary mb-6" />
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-amber-500 text-3xl">warning</span>
              <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant">Application Error</span>
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold mb-3">
              Something went wrong
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
              An unexpected client error occurred. Diagnostic details have been automatically dispatched to Vercel logs for our engineering team.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={this.handleReload}
                className="px-6 py-3 bg-primary text-on-primary font-body-md text-sm uppercase tracking-wider font-semibold hover:bg-primary-dark transition-colors duration-200"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="px-6 py-3 border border-outline-variant text-on-surface hover:border-primary hover:text-primary font-body-md text-sm uppercase tracking-wider transition-colors duration-200"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-4 py-3 text-on-surface-variant hover:text-on-surface font-body-md text-sm transition-colors duration-200"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
