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
import styles from './index.css?inline';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SkipLink } from './shared/ui/SkipLink';
import { GoogleAnalytics } from './shared/lib/analytics/GoogleAnalytics';

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
        <style
          dangerouslySetInnerHTML={{
            __html: `
          ${styles}
          /* Reset & Shell */
          body { background-color: #f8fafc; color: #0f172a; font-family: 'Inter', sans-serif; }
          #main-content { min-height: 100vh; display: flex; flex-direction: column; }
          .nav-shell { height: 80px; width: 100%; position: fixed; top: 0; z-index: 50; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html { -webkit-text-size-adjust: 100%; tab-size: 4; font-family: 'Inter', sans-serif; line-height: 1.5; }
        `,
          }}
        />
        <Meta />
        {/* Links moved to body to prevent render blocking */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Preload Critical Fonts (Inter Latin + Outfit Latin) to prevent FOIT/layout shifts */}
        <link
          rel="preload"
          href="/assets/inter-latin-wght-normal-Dx4kXJAl.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/outfit-latin-wght-normal-Bc-8i84L.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics />
      </head>
      <body>
        <SkipLink />
        <HelmetProvider>
          <MotionConfig reducedMotion="user">
            <LazyMotion features={domAnimation} strict>
              <div id="main-content">{children}</div>
            </LazyMotion>
          </MotionConfig>
        </HelmetProvider>
        <ScrollRestoration />
        <Links />
        <Scripts />
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
