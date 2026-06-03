const fs = require('fs');

const staticPaths = [
  '/',
  '/about',
  '/analyzer',
  '/angebot-handwerker',
  '/booking',
  '/calculator',
  '/career',
  '/career/benefits',
  '/career/culture',
  '/career/jobs',
  '/contact',
  '/garantie',
  '/partnerschaft',
  '/presse',
  '/pricing',
  '/privacy',
  '/process',
  '/services',
  '/services/consulting',
  '/services/design/brand-identity',
  '/services/design/design-systems',
  '/services/design/ui-ux',
  '/services/design/ux-audit',
  '/services/development/api-integration',
  '/services/development/headless-cms',
  '/services/development/migration',
  '/services/development/web-apps',
  '/services/ecommerce-development',
  '/services/enterprise-web',
  '/services/generative-engine-optimization',
  '/services/performance',
  '/services/seo',
  '/services/web-design',
  '/standorte/giessen',
  '/standorte/hessen',
  '/standorte/wetzlar',
  '/branchen/dienstleistung',
  '/branchen/gastronomie',
  '/branchen/gesundheit',
  '/branchen/handwerk',
  '/branchen/immobilien',
  '/branchen/public-sector',
  '/branchen/retail',
  '/webdesign-agentur-wetzlar',
  '/work',
  '/knowledge/academy',
  '/knowledge/blog',
  '/knowledge/faq',
  '/knowledge/newsletter',
  '/knowledge/whitepapers',
  '/knowledge/wikihub',
  '/community/events',
  '/landingpages/localwetzlar',
  '/landingpages/nextjsmigration',
  '/legal/agb',
  '/legal/datenschutz',
  '/legal/impressum'
];

let content = fs.readFileSync('src/app/sitemap.ts', 'utf8');

// We replace the staticRoutes array in sitemap.ts
const replacementString = 'const staticRoutes: MetadataRoute.Sitemap = [\n    ' + 
  staticPaths.map(p => `sitemapEntry('${p}', { changeFrequency: 'monthly', priority: ${p === '/' ? '1.0' : '0.8'} }),`).join('\n    ') + 
  '\n  ];';

content = content.replace(/const staticRoutes: MetadataRoute\.Sitemap = \[[\s\S]*?\];/, replacementString);

fs.writeFileSync('src/app/sitemap.ts', content);
console.log('Successfully updated sitemap.ts with ' + staticPaths.length + ' static routes.');
