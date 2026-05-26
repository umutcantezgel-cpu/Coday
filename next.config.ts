import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./public/locales/**/*'],
      '/**/*': ['./public/locales/**/*'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  reactStrictMode: true,
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
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*).(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=31536000, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
