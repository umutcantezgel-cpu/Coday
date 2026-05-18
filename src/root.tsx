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
import styles from '@/index.css?url';
import React from 'react';
import { SkipLink } from '@/shared/ui/SkipLink';
import { DelayedRender } from '@/shared/ui/DelayedRender';
// Defer GoogleAnalytics to avoid blocking initial render
const GoogleAnalytics = React.lazy(() =>
  import('@/shared/lib/analytics/GoogleAnalytics').then((m) => ({ default: m.GoogleAnalytics }))
);
const PostHogAnalytics = React.lazy(() =>
  import('@/shared/lib/analytics/PostHogAnalytics').then((m) => ({ default: m.PostHogAnalytics }))
);
const ClarityAnalytics = React.lazy(() =>
  import('@/shared/lib/analytics/ClarityAnalytics').then((m) => ({ default: m.ClarityAnalytics }))
);
const MetaPixel = React.lazy(() =>
  import('@/shared/lib/analytics/MetaPixel').then((m) => ({ default: m.MetaPixel }))
);
const LinkedInInsight = React.lazy(() =>
  import('@/shared/lib/analytics/LinkedInInsight').then((m) => ({ default: m.LinkedInInsight }))
);
// Lazy load non-critical widgets
const CookieConsentBanner = React.lazy(() => import('@/widgets/cookie/CookieConsentBanner'));
const CustomCursor = React.lazy(() =>
  import('@/shared/ui/CustomCursor').then((m) => ({ default: m.CustomCursor }))
);
const GrowthBookProvider = React.lazy(() =>
  import('@/shared/lib/experimentation/GrowthBookProvider').then((m) => ({
    default: m.GrowthBookProvider,
  }))
);

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
        'Webentwicklung, Webdesign, Agentur, High-End, Performance, SEO, React, React Router, Coday',
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Coday' },
    { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'de_DE' },
  ];
};
// Static import — avoid dynamic import() overhead on every SSR request
import { createI18n } from '@/i18n.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const lng = url.pathname.startsWith('/en') ? 'en' : 'de';
  const i18n = await createI18n(lng);

  // Determine needed namespaces based on URL to avoid sending the entire 170KB dictionary
  const path = url.pathname;
  const neededNs = new Set(['common']);

  if (path === '/' || path === '/de' || path === '/en' || path === '') {
    ['home', 'services', 'process', 'work', 'industries', 'form'].forEach((n) => neededNs.add(n));
  }

  if (path.match(/\/(services|beratung|web-|angebot-wetzlar|next-js-migration)/)) {
    neededNs.add('services');
    neededNs.add('knowledge');
    neededNs.add('form');
    neededNs.add('faq');
  }
  if (path.match(/\/(beratung|consulting)/)) neededNs.add('consulting');
  if (path.match(/\/(work|cases)/)) {
    neededNs.add('work');
    neededNs.add('form');
  }
  if (
    path.match(
      /\/(industries|handwerk|immobilien|gastronomie|gesundheit|dienstleistung|e-commerce|oeffentliche-auftraege)/
    )
  ) {
    neededNs.add('industries');
    neededNs.add('form');
    if (path.includes('oeffentliche')) neededNs.add('public-sector');
  }
  if (path.match(/\/(tools|ai|analyzer|website-audit)/)) {
    neededNs.add('tools');
    neededNs.add('analyzer');
    neededNs.add('form');
  }
  if (path.match(/\/(legal|impressum|datenschutz|agb|barrierefreiheit)/)) neededNs.add('legal');
  if (path.match(/\/(pricing|preise|pakete|packages)/)) {
    neededNs.add('pricing');
    neededNs.add('form');
  }
  if (path.match(/\/(career|jobs|culture)/)) {
    neededNs.add('careers');
    neededNs.add('form');
  }
  if (path.includes('/contact')) {
    neededNs.add('contact');
    neededNs.add('form');
  }
  if (path.includes('/dashboard')) neededNs.add('dashboard');
  if (path.match(/\/(calculator|rechner)/)) neededNs.add('calculator');
  if (path.match(/\/(booking|angebot)/)) {
    neededNs.add('booking');
    neededNs.add('form');
  }
  if (path.match(/\/(knowledge|academy|faq|newsletter|whitepaper|blog)/)) {
    neededNs.add('knowledge');
    if (path.includes('faq')) neededNs.add('faq');
    if (path.includes('blog')) neededNs.add('blog');
  }
  if (path.match(/\/(process|prozess)/)) neededNs.add('process');

  const filteredResources: Record<string, unknown> = {};
  for (const ns of neededNs) {
    if (i18n.services.resourceStore.data[lng] && i18n.services.resourceStore.data[lng][ns]) {
      filteredResources[ns] = i18n.services.resourceStore.data[lng][ns];
    }
  }

  return {
    lng,
    url: request.url,
    resources: {
      [lng]: filteredResources,
    },
  };
}

import { useTranslation } from 'react-i18next';

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const lang = data?.lng || 'de';

  // Hydrate i18n resources on client-side navigation
  React.useEffect(() => {
    if (data?.lng && data?.resources) {
      const resources = data.resources[data.lng];
      if (resources) {
        Object.keys(resources).forEach((ns) => {
          if (!i18n.hasResourceBundle(data.lng, ns)) {
            i18n.addResourceBundle(data.lng, ns, resources[ns], true, true);
          }
        });
      }
      if (i18n.language !== data.lng) {
        i18n.changeLanguage(data.lng);
      }
    }
  }, [data, i18n]);

  // Hreflang managed by SeoHead component per-page for maximum flexibility

  return (
    <html lang={lang} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Canonical + Hreflang managed by SeoHead component (avoids duplicate link tags) */}

        {/* Resource Hints — DNS prefetch + preconnect for critical origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Font Preloading — critical for LCP optimization */}
        <link
          rel="preload"
          href="/fonts/inter-variable-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/outfit-variable-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
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
          body{margin:0;background:var(--color-bg-primary);color:var(--color-text-primary);font-family:'Inter','Inter Fallback',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          .bg-background-light{background:var(--gradient-subtle)}
          section{position:relative;overflow:hidden}
          .max-w-7xl{max-width:80rem;margin-left:auto;margin-right:auto}
          .text-center{text-align:center}
          .font-display{font-family:'Outfit','Outfit Fallback',sans-serif}
          .font-black{font-weight:900}
          .uppercase{text-transform:uppercase}
          .text-5xl{font-size:3rem;line-height:1}
          .leading-none{line-height:1}
          .tracking-tight{letter-spacing:-0.025em}
          .text-secondary{color:var(--color-text-secondary)}
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

        {/* Global Styles - Standard blocking load to prevent CLS */}
        <link rel="stylesheet" href={styles} />

        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#5227FF" />
      </head>
      <body>
        <SkipLink />
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.initialI18nStore = ${JSON.stringify(data?.resources || {})};`,
          }}
        />
        {/* Organization JSON-LD is rendered by JsonLd component (via SeoHead) on every page */}
        <DelayedRender>
          <React.Suspense fallback={null}>
            <GoogleAnalytics />
            <PostHogAnalytics />
            <ClarityAnalytics />
            <MetaPixel />
            <LinkedInInsight />
            <CustomCursor />
          </React.Suspense>
        </DelayedRender>
        <React.Suspense fallback={null}>
          <CookieConsentBanner />
        </React.Suspense>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <React.Suspense fallback={<Outlet />}>
      <GrowthBookProvider>
        <Outlet />
      </GrowthBookProvider>
    </React.Suspense>
  );
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
    <main role="main" className="pt-16 p-4 container mx-auto">
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
