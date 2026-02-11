import { HydratedRouter } from 'react-router/dom';
import './i18n';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

// Lazy-init Sentry after hydration to reduce main-thread blocking
const initSentry = () => {
  if (!import.meta.env.VITE_SENTRY_DSN) return;

  import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 1.0,
    });
  });
};

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
    {
      onRecoverableError: () => {
        // Silently recover from hydration mismatches
      },
    }
  );
});

// Initialize Sentry after hydration is complete
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initSentry);
  } else {
    setTimeout(initSentry, 2000);
  }
}
