import { HydratedRouter } from 'react-router/dom';
import './i18n';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Tracing — low rate in production to avoid performance overhead
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
    // Session Replay
    replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.05,
    replaysOnErrorSampleRate: 1.0,
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
