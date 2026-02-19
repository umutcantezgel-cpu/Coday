import { HydratedRouter } from 'react-router/dom';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

// Defer Sentry — load AFTER hydration to keep entry.client lean
function initSentry() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    import('@sentry/react').then((Sentry) => {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [Sentry.browserTracingIntegration()],
        tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
      });
    });
  }
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <HydratedRouter />
      </I18nextProvider>
    </StrictMode>
  );
});

// Initialize Sentry after hydration, during idle time
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(initSentry);
} else {
  setTimeout(initSentry, 3000);
}
