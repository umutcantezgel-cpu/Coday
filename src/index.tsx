import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GlobalErrorBoundary } from './shared/GlobalErrorBoundary';
import './index.css';
import './i18n'; // Initialize i18n

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <GlobalErrorBoundary>
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <App />
        </Suspense>
      </GlobalErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);