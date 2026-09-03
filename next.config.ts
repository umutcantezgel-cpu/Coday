import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.provenexpert.com',
      },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    reactCompiler: true,
    // NOTE: optimizeCss was removed here — it is inert on the App Router. Next
    // only reaches critters from server/post-process.js, which the Pages Router
    // renderer calls; the served head had zero inlined <style> tags.
    // The segment explorer pulls next/dist/compiled/next-devtools (820 kB) into
    // rootMainFiles, i.e. into the <head> of every production route.
    devtoolSegmentExplorer: false,
    optimizePackageImports: [
      '@phosphor-icons/react',
      '@phosphor-icons/react/dist/ssr',
      'motion',
      'motion/react',
      'motion-dom',
    ],
  },
  async redirects() {
    return [
      // Specific City & Location Redirects
      {
        source: '/webagentur-wetzlar',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webagentur-wetzlar',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/webagentur-braunfels',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webagentur-braunfels',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/webdesign-braunfels',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webdesign-braunfels',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/webagentur-solms',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webagentur-solms',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/webdesign-solms',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webdesign-solms',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      // `memo-baut` was the in-development record for the client that launched
      // as memobaut.de. It duplicated the finished `memobaut` case study and
      // pointed at a Vercel preview deployment, so it goes to the real one.
      {
        source: '/work/memo-baut',
        destination: '/work/memobaut',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/memo-baut',
        destination: '/:locale/work/memobaut',
        permanent: true,
      },
      // Archived / Legacy Case Studies -> /work
      {
        source: '/work/red-chillies',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/red-chillies',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/akan-dienstleistungen',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/akan-dienstleistungen',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/prestige-estates',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/prestige-estates',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/red-flames',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/red-flames',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/fitflow',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/fitflow',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/hotel-zur-post',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/hotel-zur-post',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/roof-template-:id(\\d+)',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/roof-template-:id(\\d+)',
        destination: '/:locale/work',
        permanent: true,
      },
      {
        source: '/work/roof-template-3',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/work/roof-template-3',
        destination: '/:locale/work',
        permanent: true,
      },
      // Blog Article Slug Localizations / 404 Prevention
      {
        source: '/en/knowledge/blog/email-marketing-automation',
        destination: '/en/knowledge/blog',
        permanent: true,
      },
      {
        source: '/en/knowledge/blog/warum-wordpress-tot-ist',
        destination: '/en/knowledge/blog/why-wordpress-is-dying',
        permanent: true,
      },
      // Generic Webagentur -> Webdesign Landing Pages
      {
        source: '/webagentur-:city',
        destination: '/webdesign-:city',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/webagentur-:city',
        destination: '/:locale/webdesign-:city',
        permanent: true,
      },
      // Career & Karriere redirects
      {
        source: '/careers/:path*',
        destination: '/career/:path*',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/careers/:path*',
        destination: '/:locale/career/:path*',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/careers',
        destination: '/:locale/career',
        permanent: true,
      },
      {
        source: '/karriere/:path*',
        destination: '/career/:path*',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/karriere/:path*',
        destination: '/:locale/career/:path*',
        permanent: true,
      },
      {
        source: '/karriere',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/karriere',
        destination: '/:locale/career',
        permanent: true,
      },
      {
        source: '/standorte/wetzlar',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/standorte/wetzlar',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/standorte/giessen',
        destination: '/webdesign-giessen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/standorte/giessen',
        destination: '/:locale/webdesign-giessen',
        permanent: true,
      },
      {
        source: '/landingpages/wetzlar',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/landingpages/wetzlar',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/landingpages/localwetzlar',
        destination: '/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/landingpages/localwetzlar',
        destination: '/:locale/webdesign-agentur-wetzlar',
        permanent: true,
      },
      {
        source: '/portfolio/:slug*',
        destination: '/work/:slug*',
        permanent: true,
      },
      {
        source: '/cases/:slug*',
        destination: '/work/:slug*',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/cases',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/kontakt',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/kontakt',
        destination: '/:locale/contact',
        permanent: true,
      },
      {
        source: '/beratung',
        destination: '/booking',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/beratung',
        destination: '/:locale/booking',
        permanent: true,
      },
      {
        source: '/oeffentliche-auftraege',
        destination: '/branchen/public-sector',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/oeffentliche-auftraege',
        destination: '/:locale/branchen/public-sector',
        permanent: true,
      },
      {
        source: '/services/marketing',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/marketing',
        destination: '/:locale/services/seo',
        permanent: true,
      },
      {
        source: '/services/web-development/api-integration',
        destination: '/services/development/api-integration',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/api-integration',
        destination: '/:locale/services/development/api-integration',
        permanent: true,
      },
      {
        source: '/services/web-development/api-integrations',
        destination: '/services/development/api-integration',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/api-integrations',
        destination: '/:locale/services/development/api-integration',
        permanent: true,
      },
      {
        source: '/services/web-development/e-commerce',
        destination: '/services/ecommerce-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/e-commerce',
        destination: '/:locale/services/ecommerce-development',
        permanent: true,
      },
      {
        source: '/services/web-development/headless-cms',
        destination: '/services/development/headless-cms',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/headless-cms',
        destination: '/:locale/services/development/headless-cms',
        permanent: true,
      },
      {
        source: '/services/web-development/migration',
        destination: '/services/development/migration',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/migration',
        destination: '/:locale/services/development/migration',
        permanent: true,
      },
      {
        source: '/services/web-development/web-apps',
        destination: '/services/development/web-apps',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/web-apps',
        destination: '/:locale/services/development/web-apps',
        permanent: true,
      },
      {
        source: '/services/web-design/audit',
        destination: '/services/design/ux-audit',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/audit',
        destination: '/:locale/services/design/ux-audit',
        permanent: true,
      },
      {
        source: '/services/web-design/ui-ux',
        destination: '/services/design/ui-ux',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/ui-ux',
        destination: '/:locale/services/design/ui-ux',
        permanent: true,
      },
      {
        source: '/services/web-design/design-systems',
        destination: '/services/design/design-systems',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/design-systems',
        destination: '/:locale/services/design/design-systems',
        permanent: true,
      },
      {
        source: '/services/web-design/brand-identity',
        destination: '/services/design/brand-identity',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/brand-identity',
        destination: '/:locale/services/design/brand-identity',
        permanent: true,
      },
      {
        source: '/packages',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/packages',
        destination: '/:locale/pricing',
        permanent: true,
      },
      // Legacy specific industries redirects
      {
        source: '/services/industries/ecommerce-retail',
        destination: '/branchen/retail',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/industries/ecommerce-retail',
        destination: '/:locale/branchen/retail',
        permanent: true,
      },
      {
        source: '/services/industries/handwerk-bau',
        destination: '/branchen/handwerker',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/industries/handwerk-bau',
        destination: '/:locale/branchen/handwerker',
        permanent: true,
      },
      {
        source: '/services/industries/gesundheit',
        destination: '/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/industries/gesundheit',
        destination: '/:locale/branchen/gesundheitswesen',
        permanent: true,
      },
      // /industries/ → /branchen/ generic redirects
      {
        source: '/services/industries/:path*',
        destination: '/branchen/:path*',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/industries/:path*',
        destination: '/:locale/branchen/:path*',
        permanent: true,
      },
      {
        source: '/industries/dienstleistung',
        destination: '/branchen/dienstleistung',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/dienstleistung',
        destination: '/:locale/branchen/dienstleistung',
        permanent: true,
      },
      {
        source: '/industries/gastronomie',
        destination: '/branchen/gastronomie',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/gastronomie',
        destination: '/:locale/branchen/gastronomie',
        permanent: true,
      },
      {
        source: '/industries/gesundheit',
        destination: '/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/gesundheit',
        destination: '/:locale/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/industries/handwerk',
        destination: '/branchen/handwerker',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/handwerk',
        destination: '/:locale/branchen/handwerker',
        permanent: true,
      },
      {
        source: '/industries/immobilien',
        destination: '/branchen/immobilien',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/immobilien',
        destination: '/:locale/branchen/immobilien',
        permanent: true,
      },
      {
        source: '/industries/publicsector',
        destination: '/branchen/public-sector',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/publicsector',
        destination: '/:locale/branchen/public-sector',
        permanent: true,
      },
      {
        source: '/industries/retail',
        destination: '/branchen/retail',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/retail',
        destination: '/:locale/branchen/retail',
        permanent: true,
      },
      {
        source: '/branchen/ecommerce-retail',
        destination: '/branchen/retail',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/ecommerce-retail',
        destination: '/:locale/branchen/retail',
        permanent: true,
      },
      // --- Double-locale prefix fix (crawlers may have cached /de/de or /en/en) ---
      {
        source: '/de/de/:path*',
        destination: '/de/:path*',
        permanent: true,
      },
      {
        source: '/en/en/:path*',
        destination: '/en/:path*',
        permanent: true,
      },
      {
        source: '/de/de',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/en/en',
        destination: '/en',
        permanent: true,
      },
      // --- Service category index redirects (no index page exists) ---
      {
        source: '/services/design',
        destination: '/services/web-design',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/design',
        destination: '/:locale/services/web-design',
        permanent: true,
      },
      {
        source: '/services/development',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/development',
        destination: '/:locale/services/web-development',
        permanent: true,
      },
      {
        source: '/services/webdesign',
        destination: '/services/web-design',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/webdesign',
        destination: '/:locale/services/web-design',
        permanent: true,
      },
      // --- Cannibalisation: thin duplicates fold into the page that owns the topic ---
      // Mirrors CANONICAL_HREF in src/shared/data/canonicalLinks.ts. Every internal
      // link was repointed first, so none of these sources is linked from the site.
      {
        source: '/services/growth/seo-optimization',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/growth/seo-optimization',
        destination: '/:locale/services/seo',
        permanent: true,
      },
      {
        source: '/services/growth/performance-optimization',
        destination: '/services/performance',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/growth/performance-optimization',
        destination: '/:locale/services/performance',
        permanent: true,
      },
      {
        source: '/services/growth/digital-consulting',
        destination: '/services/consulting',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/growth/digital-consulting',
        destination: '/:locale/services/consulting',
        permanent: true,
      },
      {
        source: '/services/web-design/ux-ui-design',
        destination: '/services/design/ui-ux',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/ux-ui-design',
        destination: '/:locale/services/design/ui-ux',
        permanent: true,
      },
      {
        source: '/services/web-design/website-relaunch',
        destination: '/services/development/migration',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-design/website-relaunch',
        destination: '/:locale/services/development/migration',
        permanent: true,
      },
      {
        source: '/services/web-development/react-nextjs-agentur',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/react-nextjs-agentur',
        destination: '/:locale/services/web-development',
        permanent: true,
      },
      {
        source: '/services/web-development/full-stack-entwicklung',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/full-stack-entwicklung',
        destination: '/:locale/services/web-development',
        permanent: true,
      },
      {
        source: '/services/web-development/cloud-infrastructure',
        destination: '/services/web-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/cloud-infrastructure',
        destination: '/:locale/services/web-development',
        permanent: true,
      },
      {
        source: '/services/web-development/e-commerce-shops',
        destination: '/services/ecommerce-development',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/e-commerce-shops',
        destination: '/:locale/services/ecommerce-development',
        permanent: true,
      },
      {
        source: '/branchen/gastronomie-hotellerie',
        destination: '/branchen/gastronomie',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/gastronomie-hotellerie',
        destination: '/:locale/branchen/gastronomie',
        permanent: true,
      },
      {
        source: '/branchen/handwerker/wetzlar',
        destination: '/branchen/handwerk-bau/wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/handwerker/wetzlar',
        destination: '/:locale/branchen/handwerk-bau/wetzlar',
        permanent: true,
      },
      {
        source: '/branchen/gesundheitswesen/arzt-wetzlar',
        destination: '/branchen/aerzte-gesundheit/wetzlar',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/gesundheitswesen/arzt-wetzlar',
        destination: '/:locale/branchen/aerzte-gesundheit/wetzlar',
        permanent: true,
      },
      {
        source: '/branchen/gesundheitswesen/arzt-giessen',
        destination: '/branchen/aerzte-gesundheit/giessen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/gesundheitswesen/arzt-giessen',
        destination: '/:locale/branchen/aerzte-gesundheit/giessen',
        permanent: true,
      },
      // --- Legacy blog post redirects (point old slugs at the live articles) ---
      {
        source: '/knowledge/blog/omni-channel-mix',
        destination: '/de/knowledge/blog/der-perfekte-omni-channel-mix',
        permanent: true,
      },
      {
        source: '/de/knowledge/blog/omni-channel-mix',
        destination: '/de/knowledge/blog/der-perfekte-omni-channel-mix',
        permanent: true,
      },
      {
        source: '/en/knowledge/blog/omni-channel-mix',
        destination: '/en/knowledge/blog/the-perfect-omni-channel-mix',
        permanent: true,
      },
      {
        source: '/blog/omni-channel-mix',
        destination: '/de/knowledge/blog/der-perfekte-omni-channel-mix',
        permanent: true,
      },
      {
        source: '/de/blog/omni-channel-mix',
        destination: '/de/knowledge/blog/der-perfekte-omni-channel-mix',
        permanent: true,
      },
      {
        source: '/en/blog/omni-channel-mix',
        destination: '/en/knowledge/blog/the-perfect-omni-channel-mix',
        permanent: true,
      },
      // email-marketing-automation is a live DE-only article — only the EN URL
      // (no translation exists) redirects to the blog index.
      {
        source: '/blog/email-marketing-automation',
        destination: '/de/knowledge/blog/email-marketing-automation',
        permanent: true,
      },
      {
        source: '/de/blog/email-marketing-automation',
        destination: '/de/knowledge/blog/email-marketing-automation',
        permanent: true,
      },
      {
        source: '/en/blog/email-marketing-automation',
        destination: '/en/knowledge/blog',
        permanent: true,
      },
      // --- Legacy /ai/ sitemaps ---
      // NOTE: No redirects for /ai/ page paths here. Removed programmatic /ai/ landing
      // pages must answer 410 Gone (handled in src/middleware.ts). Redirects defined in
      // next.config run BEFORE middleware, so any /ai/ redirect here would make the 410
      // unreachable and Google would treat the mass-redirects as soft 404s.
      {
        source: '/sitemap-ai-triples.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/sitemap_index.xml',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // --- Legal & Service Aliases ---
      {
        source: '/legal/imprint',
        destination: '/legal/impressum',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/legal/imprint',
        destination: '/:locale/legal/impressum',
        permanent: true,
      },
      {
        source: '/legal/privacy',
        destination: '/legal/datenschutz',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/legal/privacy',
        destination: '/:locale/legal/datenschutz',
        permanent: true,
      },
      {
        source: '/legal/terms',
        destination: '/legal/agb',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/legal/terms',
        destination: '/:locale/legal/agb',
        permanent: true,
      },
      {
        source: '/services/social',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/social',
        destination: '/:locale/services/seo',
        permanent: true,
      },
      // --- Industry & Category Catch-Alls ---
      {
        source: '/branchen/gesundheit',
        destination: '/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/gesundheit',
        destination: '/:locale/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/branchen/automobil/:slug',
        destination: '/branchen/automobil',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/branchen/automobil/:slug',
        destination: '/:locale/branchen/automobil',
        permanent: true,
      },
      {
        source: '/industries/:path*',
        destination: '/branchen/:path*',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/industries/:path*',
        destination: '/:locale/branchen/:path*',
        permanent: true,
      },
      // --- Standalone Non-Locale Cleanups & Typos ---
      {
        source: '/Monat',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/Monat',
        destination: '/:locale/pricing',
        permanent: true,
      },
      {
        source: '/standorte/hessen',
        destination: '/de/standorte/hessen',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/de/calculator',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/de/pricing',
        permanent: true,
      },
      {
        source: '/analyzer',
        destination: '/de/calculator',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/analyzer',
        destination: '/:locale/calculator',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/de/contact',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests; require-trusted-types-for 'script';",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    // Next requires the dev overlay from client modules that are all guarded by
    // `process.env.NODE_ENV !== 'production'`, but webpack still bundles the
    // 820 kB payload into rootMainFiles — the <head> of every production route.
    // Alias it to a stub for the production client build only.
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/dist/compiled/next-devtools': path.resolve(
          process.cwd(),
          'src/shims/next-devtools-noop.js'
        ),
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
