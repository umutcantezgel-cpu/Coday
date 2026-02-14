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

// --- Helper to extract blog posts with IDs (more complex regex to pair id and slug) ---
function extractBlogPosts(filePath, lang) {
  try {
    const content = fs.readFileSync(path.resolve(ROOT_DIR, filePath), 'utf-8');

    // Improved regex approach: matching the object structure more loosely
    // We look for "id: ..." and "slug: ..." within the file, assuming they appear in blocks
    // Since the file is structured as a large array of objects, valid matches should be paired.

    const postMatches = [];
    // Regex that looks for id and slug in close proximity (generic object property matching)
    // Matches: id: 1, ... slug: "some-slug"
    // We use a global regex that captures both.
    // Note: This assumes 'id' comes before 'slug' or 'slug' before 'id' in a consistent way isn't guaranteed,
    // so we iterate over the file content to find object blocks.

    // Simply splitting by "id:" is a reasonable heuristic for this specific data structure
    const rawBlocks = content.split(/id:\s*/).slice(1); // skip first empty split

    rawBlocks.forEach((block) => {
      // We have the content starting after "id:". The first characters should be the ID.
      // ID can be a number or string
      const idMatch = block.match(/^(\d+|['"][^'"]+['"])/);
      if (!idMatch) return;

      const id = idMatch[1].replace(/['"]/g, '');

      // precise slug definition
      const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);

      if (slugMatch) {
        postMatches.push({ id, slug: slugMatch[1], lang });
      }
    });

    return postMatches;
  } catch (error) {
    console.warn(`⚠️ Could not read or parse ${filePath}:`, error.message);
    return [];
  }
}

// Data Sources
const blogPostsDe = extractBlogPosts('src/features/blog/model/data.de.ts', 'de');
const blogPostsEn = extractBlogPosts('src/features/blog/model/data.en.ts', 'en');

// Map by ID
const blogMap = {};
[...blogPostsDe, ...blogPostsEn].forEach((post) => {
  if (!blogMap[post.id]) blogMap[post.id] = {};
  blogMap[post.id][post.lang] = post.slug;
});

const workSlugs = extractSlugs('src/shared/data/work.ts', /slug:\s*["']([^"']+)["']/g);
const industrySlugs = extractSlugs('src/shared/data/industries.ts', /slug:\s*["']([^"']+)["']/g);

// Static Routes (synced with routes.ts)
const staticRoutes = [
  '/',
  '/services',
  '/services/industries',
  // Industry Domination Routes
  '/services/industries/handwerk',
  '/services/industries/immobilien',
  '/services/industries/gastronomie',
  '/services/industries/gesundheit',
  '/services/industries/dienstleistung',
  '/services/industries/e-commerce',
  '/oeffentliche-auftraege',
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

const locales = ['de', 'en'];

function generateHreflangLinks(route, blogAltLinks = null) {
  let links = [];

  if (blogAltLinks) {
    // Special handling for blog posts with different slugs
    locales.forEach((lang) => {
      const path = blogAltLinks[lang];
      if (path) {
        links.push(
          `      <xhtml:link rel="alternate" hreflang="${lang}" href="${HOSTNAME}/${lang}${path}" />`
        );
      }
    });
    // X-default points to DE usually
    if (blogAltLinks['de']) {
      links.push(
        `      <xhtml:link rel="alternate" hreflang="x-default" href="${HOSTNAME}/de${blogAltLinks['de']}" />`
      );
    }
  } else {
    // Standard handling for routes with same slugs/paths
    const urlPath = route === '/' ? '' : route;
    links = locales.map(
      (lang) =>
        `      <xhtml:link rel="alternate" hreflang="${lang}" href="${HOSTNAME}/${lang}${urlPath}" />`
    );
    links.push(
      `      <xhtml:link rel="alternate" hreflang="x-default" href="${HOSTNAME}/de${urlPath}" />`
    );
  }

  return links.join('\n');
}

function generateSitemap() {
  const urlEntries = [];

  // 1. Static Routes
  staticRoutes.forEach((route) => {
    locales.forEach((lang) => {
      const urlPath = route === '/' ? '' : route;
      const loc = `${HOSTNAME}/${lang}${urlPath}`;
      const isHome = route === '/';
      const priority = isHome ? '1.0' : '0.8';

      urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
${generateHreflangLinks(route)}
  </url>`);
    });
  });

  // 2. Dynamic Routes: Work & Industries (Shared Slugs)
  const sharedDynamicRoutes = [
    ...workSlugs.map((slug) => `/work/${slug}`),
    ...industrySlugs.map((slug) => `/services/industries/${slug}`),
  ];

  sharedDynamicRoutes.forEach((route) => {
    locales.forEach((lang) => {
      const loc = `${HOSTNAME}/${lang}${route}`;
      urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${generateHreflangLinks(route)}
  </url>`);
    });
  });

  // 3. Dynamic Routes: Blog Posts (Localized Slugs)
  Object.values(blogMap).forEach((postMap) => {
    // Post map is { de: 'slug-de', en: 'slug-en' }
    locales.forEach((lang) => {
      const slug = postMap[lang];
      if (!slug) return; // Skip if translation missing

      const route = `/knowledge/blog/${slug}`;
      const loc = `${HOSTNAME}/${lang}${route}`;

      // Prepare alt links mapping: { de: '/knowledge/blog/slug-de', en: '/knowledge/blog/slug-en' }
      const altLinks = {};
      if (postMap.de) altLinks.de = `/knowledge/blog/${postMap.de}`;
      if (postMap.en) altLinks.en = `/knowledge/blog/${postMap.en}`;

      urlEntries.push(`  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
${generateHreflangLinks(null, altLinks)}
  </url>`);
    });
  });

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
  console.log(`✅ Sitemap generated at ${sitemapPath}`);

  // Also write to public dir for local dev verification
  const publicPath = path.resolve(ROOT_DIR, 'public/sitemap.xml');
  fs.writeFileSync(publicPath, xml);
  console.log(`✅ Copy written to ${publicPath}`);
}

generateSitemap();
