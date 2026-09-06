import * as Sentry from '@sentry/nextjs';

// Node.js runtime (Server Actions, Route Handlers). Loaded from src/instrumentation.ts.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: Boolean(process.env.SENTRY_DSN),
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});
