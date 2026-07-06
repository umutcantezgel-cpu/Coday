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
    // optimizeCss: true, // Disabled to prevent FCP/hydration delay
    optimizePackageImports: [
      '@phosphor-icons/react',
      '@phosphor-icons/react/dist/ssr',
      'motion',
      'motion/react',
    ],
  },
  async redirects() {
    return [
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
        source: '/services/web-development/:slug+',
        destination: '/services/development/:slug+',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/services/web-development/:slug+',
        destination: '/:locale/services/development/:slug+',
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
        source: '/packages',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/:locale(de|en)/packages',
        destination: '/:locale/pricing',
        permanent: true,
      },
      // /industries/ → /branchen/ redirects
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
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
