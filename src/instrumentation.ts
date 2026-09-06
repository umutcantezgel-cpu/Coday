import * as Sentry from '@sentry/nextjs';

/**
 * Server-side error monitoring only.
 *
 * There is deliberately no `instrumentation-client.ts`: the browser bundle
 * stays Sentry-free so the PageSpeed budget is untouched. Server Actions,
 * Route Handlers and the middleware report through this hook.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
