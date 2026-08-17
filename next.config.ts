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
    optimizeCss: true,
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
        source: '/services/industries/gesundheit',
        destination: '/branchen/gesundheitswesen',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/industries/gesundheit',
        destination: '/:locale/branchen/gesundheitswesen',
        permanent: true,
      },
      // /industries/ → /branchen/ redirects
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
};

export default withNextIntl(nextConfig);
