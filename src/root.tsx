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

        {/* Critical above-fold CSS — enables hero paint before full 215KB stylesheet loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          *,::after,::before{box-sizing:border-box;border:0 solid}
          body{margin:0;background:#fff;color:#2d3748;font-family:'Inter','Inter Fallback',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          .bg-background-light{background:linear-gradient(135deg,#f7fafc 0%,#edf2f7 100%)}
          section{position:relative;overflow:hidden}
          .max-w-7xl{max-width:80rem;margin-left:auto;margin-right:auto}
          .text-center{text-align:center}
          .font-display{font-family:'Outfit','Outfit Fallback',sans-serif}
          .font-black{font-weight:900}
          .uppercase{text-transform:uppercase}
          .text-5xl{font-size:3rem;line-height:1}
          .leading-none{line-height:1}
          .tracking-tight{letter-spacing:-0.025em}
          .text-secondary{color:#2d3748}
          .mb-8{margin-bottom:2rem}
          .mb-6{margin-bottom:1.5rem}
          .inline-block{display:inline-block}
          .px-4{padding-left:1rem;padding-right:1rem}
          .pt-20{padding-top:5rem}
          .pb-20{padding-bottom:5rem}
          .z-10{z-index:10}
          .relative{position:relative}
          .flex{display:flex}
          .items-center{align-items:center}
          .justify-center{justify-content:center}
          .gap-2{gap:0.5rem}
          .text-sm{font-size:0.875rem;line-height:1.25rem}
          .font-bold{font-weight:700}
          .rounded-full{border-radius:9999px}
          @media(min-width:640px){h1.font-display{font-size:4.5rem}}
          @media(min-width:1024px){h1.font-display{font-size:6rem}}
          @media(min-width:768px){section>.max-w-7xl{padding-top:8rem;padding-bottom:10rem}}
        `,
          }}
        />

        {/* CSP set via vercel.json HTTP headers (more secure, smaller HTML) */}
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
        {/* JSON-LD in body — does not need to be in <head>, saves parsing time */}
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
