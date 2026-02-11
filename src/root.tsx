import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import './index.css';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SkipLink } from './shared/ui/SkipLink';
import { GoogleAnalytics } from './shared/lib/analytics/GoogleAnalytics';
import { CookieConsentBanner } from './widgets/cookie/CookieConsentBanner';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // Simple detection: check start of path
  const lng = url.pathname.startsWith('/en') ? 'en' : 'de';
  return { lng };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const lang = data?.lng || 'de';

  return (
    <html lang={lang} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          http-equiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.sentry.io blob:;
            connect-src 'self' https://*.supabase.co https://*.sentry.io https://o4510841678200832.ingest.de.sentry.io https://*.googleapis.com https://*.google-analytics.com https://*.googletagmanager.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://assets.vercel.com blob:;
            font-src 'self' data: https://fonts.gstatic.com;
            worker-src 'self' blob:;
            frame-src 'self' https://*.google.com;
          "
        />
        <Meta />
        <Links />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google Fonts — preloaded for non-blocking fetch */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics />
      </head>
      <body>
        <SkipLink />
        <HelmetProvider>
          <MotionConfig reducedMotion="user">
            <LazyMotion features={domAnimation}>
              <div id="main-content">{children}</div>
            </LazyMotion>
          </MotionConfig>
        </HelmetProvider>
        <ScrollRestoration />
        <Scripts />
        <CookieConsentBanner />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
