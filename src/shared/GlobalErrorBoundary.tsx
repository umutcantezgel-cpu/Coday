"use client";

import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  readonly props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    console.error('🔥 GLOBAL APP CRASH:', error); // Added debug log
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Simple static translations to avoid dependencies during crashes
      const isDe = typeof navigator !== 'undefined' && navigator.language.startsWith('de');
      const texts = {
        title: isDe ? 'Etwas ist schiefgelaufen' : 'Something went wrong',
        desc: isDe
          ? 'Wir wurden benachrichtigt und arbeiten an einer Lösung.'
          : 'We have been notified and are working on a fix.',
        reload: isDe ? 'Seite neu laden' : 'Reload page',
      };

      return (
        <div className="flex items-center justify-center min-h-dvh bg-gray-50 text-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{texts.title}</h1>
            <p className="text-gray-600 mb-6">{texts.desc}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {texts.reload}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
