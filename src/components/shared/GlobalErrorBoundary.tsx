import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
                        <span className="text-4xl mb-4 block">😔</span>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Da ist etwas schiefgelaufen</h1>
                        <p className="text-gray-600 mb-6">
                            Wir haben leider einen Fehler festgestellt. Bitte versuchen Sie es erneut.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-lg hover:shadow-teal-500/30 w-full"
                        >
                            Seite neu laden
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 text-left bg-red-50 p-4 rounded-lg overflow-auto max-h-40 border border-red-100">
                                <p className="text-xs font-mono text-red-600 whitespace-pre-wrap">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        const { children } = this.props as Props;
        return children;
    }
}
