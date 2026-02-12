import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build/client');
const HOSTNAME = process.env.VITE_SITE_URL || 'https://www.codayweb.de';

// --- Helper to extract slugs from TS files (simple regex parsing) ---
function extractSlugs(filePath, pattern) {
  try {
    const content = fs.readFileSync(path.resolve(ROOT_DIR, filePath), 'utf-8');
    const matches = [...content.matchAll(pattern)];
    return matches.map((m) => m[1]);
  } catch (error) {
    console.warn(`⚠️ Could not read or parse ${filePath}:`, error.message);
    return [];
  }
}

// Data Sources
const blogSlugs = extractSlugs('src/features/blog/model/data.de.ts', /slug:\s*["']([^"']+)["']/g);
const workSlugs = extractSlugs('src/data/work.ts', /slug:\s*["']([^"']+)["']/g);
const industrySlugs = extractSlugs('src/data/industries.ts', /slug:\s*["']([^"']+)["']/g);

console.log(
  `Found ${blogSlugs.length} blog posts, ${workSlugs.length} case studies, ${industrySlugs.length} industries.`
);

// Static Routes (synced with routes.ts)
const staticRoutes = [
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
  // Industries (Overview + Static if any, though most are dynamic now)
  // ... specific industry routes from routes.ts are handled via dynamic slugs if they match data
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
  // Misc
  '/preview/icons',
];

// Generate Dynamic Routes
const dynamicRoutes = [
  ...blogSlugs.map((slug) => `/knowledge/blog/${slug}`),
  ...workSlugs.map((slug) => `/work/${slug}`),
  ...industrySlugs.map((slug) => `/services/industries/${slug}`),
];

const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])];

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
  const urlEntries = allRoutes.flatMap((route) =>
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
  console.log(
    `✅ Sitemap generated at ${sitemapPath} (${allRoutes.length} distinct routes, ${allRoutes.length * locales.length} URLs with hreflang)`
  );

  // Also write to public dir for local dev verification
  const publicPath = path.resolve(ROOT_DIR, 'public/sitemap.xml');
  fs.writeFileSync(publicPath, xml);
  console.log(`✅ Copy written to ${publicPath}`);
}

generateSitemap();
