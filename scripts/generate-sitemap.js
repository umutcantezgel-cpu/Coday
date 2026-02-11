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

function generateHreflangLinks(route) {
  const urlPath = route === '/' ? '' : route;
  return locales
    .map(
      (lang) =>
        `      <xhtml:link rel="alternate" hreflang="${lang}" href="${HOSTNAME}/${lang}${urlPath}" />`
    )
    .concat(
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${HOSTNAME}/de${urlPath}" />`
    )
    .join('\n');
}

function generateSitemap() {
  const urlEntries = routes.flatMap((route) =>
    locales.map((lang) => {
      const urlPath = route === '/' ? '' : route;
      const loc = `${HOSTNAME}/${lang}${urlPath}`;
      const isHome = route === '/';
      const priority = isHome ? '1.0' : '0.8';

      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${generateHreflangLinks(route)}
  </url>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`;

  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }

  const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`✅ Sitemap generated at ${sitemapPath} (${routes.length * locales.length} URLs with hreflang)`);
}

generateSitemap();

