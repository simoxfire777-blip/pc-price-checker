import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg text-text px-4 py-10">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-surface2 p-8 shadow-2xl shadow-black/20">
            <h1 className="text-3xl font-semibold text-white">Something went wrong</h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              We encountered a problem while processing your request. Please refresh the page and try again.
            </p>
            <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
              <p className="font-semibold">Error details</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-red-100">{this.state.error?.message}</pre>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
