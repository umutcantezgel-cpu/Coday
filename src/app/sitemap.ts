import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.codayweb.de';
const SITEMAP_LIMIT = 50000;

/**
 * Type for Sanity documents used in the sitemap.
 */
type SanityDoc = {
  _id: string;
  _updatedAt: string;
  slug: { current: string };
  _type: 'post' | 'caseStudy' | 'service' | 'location';
};

/**
 * Fetch data from Sanity via REST API.
 */
async function fetchSanity<T>(query: string, isCount = false): Promise<T> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return (isCount ? 0 : []) as T;
    }
    const data = await res.json();
    return data.result as T;
  } catch (error) {
    console.error('Sanity fetch error in sitemap:', error);
    return (isCount ? 0 : []) as T;
  }
}

/**
 * Helper to create a sitemap entry with both locale alternates.
 */
function sitemapEntry(
  path: string,
  opts: {
    changeFrequency: 'daily' | 'weekly' | 'monthly';
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap[number] {
  const cleanPath = path.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '';
  return {
    url: `${BASE_URL}/de${cleanPath}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: {
        de: `${BASE_URL}/de${cleanPath}`,
        en: `${BASE_URL}/en${cleanPath}`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    sitemapEntry('/', { changeFrequency: 'monthly', priority: 1.0 }),
    sitemapEntry('/about', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/analyzer', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/angebot-handwerker', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/booking', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/calculator', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/career', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/career/benefits', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/career/culture', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/career/jobs', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/contact', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/garantie', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/partnerschaft', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/presse', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/pricing', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/privacy', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/process', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/consulting', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/design/brand-identity', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/design/design-systems', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/design/ui-ux', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/design/ux-audit', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/development/api-integration', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/development/headless-cms', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/development/migration', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/development/web-apps', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/ecommerce-development', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/enterprise-web', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/generative-engine-optimization', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/performance', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/seo', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/web-design', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/standorte/giessen', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/standorte/hessen', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/standorte/wetzlar', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/dienstleistung', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/gastronomie', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/gesundheit', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/handwerk', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/immobilien', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/public-sector', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/retail', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/webdesign-agentur-wetzlar', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/work', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/academy', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/blog', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/faq', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/newsletter', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/whitepapers', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/knowledge/wikihub', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/community/events', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/landingpages/localwetzlar', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/landingpages/nextjsmigration', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/legal/agb', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/legal/datenschutz', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/legal/impressum', { changeFrequency: 'monthly', priority: 0.8 }),
  ];

  // Dynamic content from Sanity (without drafts)
  const query = `
    *[_type in ["post", "caseStudy", "service", "location"] && !(_id in path("drafts.**"))] | order(_updatedAt desc) {
      _id,
      _type,
      _updatedAt,
      slug
    }
  `;

  const dynamicDocs = await fetchSanity<SanityDoc[]>(query, false);

  const dynamicRoutes: MetadataRoute.Sitemap = dynamicDocs.map((doc) => {
    let routePrefix = '';
    let changeFrequency: 'weekly' | 'monthly' = 'monthly';
    let priority = 0.5;

    switch (doc._type) {
      case 'post':
        routePrefix = '/knowledge/blog';
        changeFrequency = 'weekly';
        priority = 0.7;
        break;
      case 'caseStudy':
        routePrefix = '/work';
        changeFrequency = 'monthly';
        priority = 0.8;
        break;
      case 'service':
        routePrefix = '/services';
        changeFrequency = 'monthly';
        priority = 0.9;
        break;
      case 'location':
        routePrefix = '/standorte';
        changeFrequency = 'monthly';
        priority = 0.6;
        break;
    }

    const slug = doc.slug?.current || '';
    const path = `${routePrefix}/${slug}`;

    return sitemapEntry(path, {
      changeFrequency,
      priority,
      lastModified: new Date(doc._updatedAt),
    });
  });

  return [...staticRoutes, ...dynamicRoutes];
}
