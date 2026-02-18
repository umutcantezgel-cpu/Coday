import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';
import '@fontsource-variable/inter';
import '@fontsource-variable/outfit';
import './index.css';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SkipLink } from './shared/ui/SkipLink';
import { GoogleAnalytics } from './shared/lib/analytics/GoogleAnalytics';
// Lazy load non-critical widgets
const CookieConsentBanner = React.lazy(() => import('./widgets/cookie/CookieConsentBanner'));

// import { createI18n } from './i18n.server'; // Moved to dynamic import in loader

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const lang = data?.lng || 'de';
  const title = 'Coday | Der Agentur-Killer';
  const description =
    'Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen.';

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content:
        'Webentwicklung, Webdesign, Agentur, High-End, Performance, SEO, React, Next.js, Coday',
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Coday' },
    { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'de_DE' },
  ];
};

// ... logic to be added
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // Simple detection: check start of path
  const lng = url.pathname.startsWith('/en') ? 'en' : 'de';

  const { createI18n } = await import('./i18n.server');
  const i18n = await createI18n(lng);

  return {
    lng,
    url: request.url,
    resources: {
      [lng]: i18n.services.resourceStore.data[lng],
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const lang = data?.lng || 'de';
  const currentUrl = data?.url ? new URL(data.url) : null;
  const path = currentUrl ? currentUrl.pathname : '';

  // Basic Hreflang Logic (Assumes symmetric paths for now)
  // TODO: improved mapping for blog posts with different slugs if needed
  const getPathForLang = (l: string) => {
    if (!path) return '';
    const segments = path.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'de') {
      segments[0] = l;
    } else {
      segments.unshift(l);
    }
    return '/' + segments.join('/');
  };

  const domain = 'https://www.codayweb.de'; // Replace with env var if possible

  return (
    <html lang={lang} dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* SEO Tags */}
        <link rel="canonical" href={`${domain}${path}`} />
        <link rel="alternate" hrefLang="de" href={`${domain}${getPathForLang('de')}`} />
        <link rel="alternate" hrefLang="en" href={`${domain}${getPathForLang('en')}`} />
        <link rel="alternate" hrefLang="x-default" href={`${domain}${getPathForLang('de')}`} />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.sentry.io blob:;
            connect-src 'self' https://*.supabase.co https://*.sentry.io https://*.googleapis.com https://*.google-analytics.com https://*.googletagmanager.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://assets.vercel.com blob:;
            font-src 'self' data:;
            worker-src 'self' blob:;
            frame-src 'self' https://*.google.com;
          "
        />
        <Meta />
        <Links />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Organization JSON-LD (SSR) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Coday',
              url: 'https://www.codayweb.de',
              logo: 'https://www.codayweb.de/images/coday-logo.png',
              sameAs: [
                'https://www.linkedin.com/company/coday',
                'https://twitter.com/coday',
                'https://www.instagram.com/coday',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+49-123-456789',
                contactType: 'customer service',
                areaServed: 'DE',
                availableLanguage: ['German', 'English'],
              },
            }),
          }}
        />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialI18nStore = ${JSON.stringify(data?.resources || {})};`,
          }}
        />
        <GoogleAnalytics />
        <React.Suspense fallback={null}>
          <CookieConsentBanner />
        </React.Suspense>
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
