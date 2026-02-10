import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '../build/client');
const HOSTNAME = process.env.VITE_SITE_URL || 'https://www.codayweb.de';

const routes = [
  '/',
  '/services',
  '/services/industries',
  // Pillars
  '/services/web-development',
  '/services/web-design',
  '/services/seo',
  '/services/performance',
  '/services/consulting',
  '/services/enterprise-web',
  // Web Development Sub-Services
  '/services/web-development/e-commerce',
  '/services/web-development/web-apps',
  '/services/web-development/headless-cms',
  '/services/web-development/api-integrations',
  '/services/web-development/migration',
  // Web Design Sub-Services
  '/services/web-design/ui-ux',
  '/services/web-design/brand-identity',
  '/services/web-design/design-systems',
  '/services/web-design/audit',
  // Industries
  '/services/industries/handwerk',
  '/services/industries/immobilien',
  '/services/industries/gastronomie',
  '/services/industries/gesundheit',
  '/services/industries/dienstleistung',
  '/services/industries/e-commerce',
  // Core
  '/work',
  '/process',
  '/contact',
  '/calculator',
  '/booking',
  '/packages',
  '/analyzer',
  // Knowledge
  '/knowledge/academy',
  '/knowledge/blog',
  '/knowledge/newsletter',
  '/knowledge/whitepapers',
  // Career
  '/career',
  '/career/jobs',
  '/career/culture',
  '/career/benefits',
  // Legal
  '/legal/impressum',
  '/legal/datenschutz',
  '/legal/agb',
  '/dashboard',
];

const locales = ['de', 'en'];

function generateSitemap() {
  const urls = routes.flatMap((route) =>
    locales.map((lang) => {
      const langPrefix = `/${lang}`;
      const urlPath = route === '/' ? '' : route;
      return `${HOSTNAME}${langPrefix}${urlPath}`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith('/de') || url.endsWith('/en') ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found: ${BUILD_DIR}`);
    // Create it if missing (e.g. testing script)
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }

  const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`✅ Sitemap generated at ${sitemapPath}`);
}

generateSitemap();
