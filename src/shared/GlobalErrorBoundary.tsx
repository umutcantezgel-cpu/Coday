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
        hasError: false
    };

    readonly props: Props;

    constructor(props: Props) {
        super(props);
        this.props = props;
    }


    public static getDerivedStateFromError(error: Error): State {
        console.error("🔥 GLOBAL APP CRASH:", error); // Added debug log
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
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Etwas ist schiefgelaufen</h1>
                        <p className="text-gray-600 mb-6">Wir wurden benachrichtigt und arbeiten an einer Lösung.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            Seite neu laden
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
