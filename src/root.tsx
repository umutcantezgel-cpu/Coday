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
// Fonts loaded via <link rel="preload"> in <head> + public/fonts/fonts.css
// Removed synchronous @fontsource-variable imports (render-blocking)
import './index.css';
import React from 'react';
import { SkipLink } from './shared/ui/SkipLink';
// Defer GoogleAnalytics to avoid blocking initial render
const GoogleAnalytics = React.lazy(() =>
  import('./shared/lib/analytics/GoogleAnalytics').then((m) => ({ default: m.GoogleAnalytics }))
);
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

// Static import — avoid dynamic import() overhead on every SSR request
import { createI18n } from './i18n.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const lng = url.pathname.startsWith('/en') ? 'en' : 'de';
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

        {/* Font Preloading — non-render-blocking */}
        <link
          rel="preload"
          href="/fonts/inter-variable-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/outfit-variable-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Inlined @font-face — eliminates render-blocking fonts.css round-trip */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:100 900;src:url('/fonts/inter-variable-latin-ext.woff2') format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
          @font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:100 900;src:url('/fonts/inter-variable-latin.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
          @font-face{font-family:'Outfit';font-style:normal;font-display:swap;font-weight:100 900;src:url('/fonts/outfit-variable-latin-ext.woff2') format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
          @font-face{font-family:'Outfit';font-style:normal;font-display:swap;font-weight:100 900;src:url('/fonts/outfit-variable-latin.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
          @font-face{font-family:'Inter Fallback';src:local('Arial');ascent-override:90%;descent-override:22%;line-gap-override:0%;size-adjust:107%}
          @font-face{font-family:'Outfit Fallback';src:local('Arial');ascent-override:100%;descent-override:22%;line-gap-override:0%;size-adjust:100%}
        `,
          }}
        />

        {/* Defer analytics preconnect — not critical */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

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
        <div id="main-content">{children}</div>
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialI18nStore = ${JSON.stringify(data?.resources || {})};`,
          }}
        />
        <React.Suspense fallback={null}>
          <GoogleAnalytics />
        </React.Suspense>
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
