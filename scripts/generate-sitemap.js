
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '../build/client');
const HOSTNAME = 'https://coday.de';

const routes = [
    '/',
    '/services',
    '/services/industries',
    '/services/web-development',
    '/services/web-design',
    '/services/seo',
    '/services/performance',
    '/services/consulting',
    '/services/enterprise-web',
    '/work',
    '/process',
    '/contact',
    '/legal/impressum',
    '/legal/datenschutz',
    '/legal/agb',
    '/dashboard',
    '/booking',
    '/packages',
    '/knowledge/academy',
    '/knowledge/blog',
    '/knowledge/newsletter',
    '/knowledge/whitepapers',
    '/career',
    '/career/jobs',
    '/career/culture',
    '/career/benefits',
    '/analyzer',
];

const locales = ['de', 'en'];

function generateSitemap() {
    const urls = routes.flatMap(route =>
        locales.map(lang => {
            const langPrefix = `/${lang}`;
            const urlPath = route === '/' ? '' : route;
            return `${HOSTNAME}${langPrefix}${urlPath}`;
        })
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://coday.de/de' || url === 'https://coday.de/en' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
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
