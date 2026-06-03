import type { MetadataRoute } from 'next';

const BASE_URL = 'https://codayweb.de';
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

/**
 * Pagination for large sitemaps (>50,000 URLs).
 */
export async function generateSitemaps() {
  const query = `count(*[_type in ["post", "caseStudy", "service", "location"] && !(_id in path("drafts.**"))])`;
  const count = await fetchSanity<number>(query, true);

  const staticCount = 10; // Approximate number of static routes
  const totalUrls = count + staticCount;
  const sitemapsCount = Math.ceil(totalUrls / SITEMAP_LIMIT);

  return Array.from({ length: Math.max(1, sitemapsCount) }, (_, id) => ({ id }));
}

/**
 * Generate sitemap entries for a specific sitemap ID.
 */
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const isFirstSitemap = id === 0;

  // Static routes (only in the first sitemap)
  const staticRoutes: MetadataRoute.Sitemap = isFirstSitemap
    ? [
        // Homepage — highest priority
        sitemapEntry('/', { changeFrequency: 'weekly', priority: 1.0 }),
        // Money pages
        sitemapEntry('/about', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/services', { changeFrequency: 'monthly', priority: 0.9 }),
        sitemapEntry('/work', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/process', { changeFrequency: 'monthly', priority: 0.7 }),
        sitemapEntry('/pricing', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/contact', { changeFrequency: 'monthly', priority: 0.7 }),
        
        // Knowledge & Community
        sitemapEntry('/knowledge/blog', { changeFrequency: 'weekly', priority: 0.7 }),
        sitemapEntry('/knowledge/academy', { changeFrequency: 'monthly', priority: 0.6 }),
        sitemapEntry('/knowledge/faq', { changeFrequency: 'monthly', priority: 0.6 }),
        sitemapEntry('/community/events', { changeFrequency: 'monthly', priority: 0.6 }),
        
        // Corporate
        sitemapEntry('/career', { changeFrequency: 'monthly', priority: 0.7 }),
        sitemapEntry('/presse', { changeFrequency: 'monthly', priority: 0.6 }),
        sitemapEntry('/partnerschaft', { changeFrequency: 'monthly', priority: 0.6 }),
        
        // Tools
        sitemapEntry('/analyzer', { changeFrequency: 'weekly', priority: 0.8 }),
        sitemapEntry('/calculator', { changeFrequency: 'monthly', priority: 0.7 }),

        // Local SEO & Branches (High Priority for Wetzlar Dominance)
        sitemapEntry('/standorte/wetzlar', { changeFrequency: 'monthly', priority: 0.9 }),
        sitemapEntry('/standorte/hessen', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/standorte/giessen', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/handwerk', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/gastronomie', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/gesundheit', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/dienstleistung', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/immobilien', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/publicsector', { changeFrequency: 'monthly', priority: 0.8 }),
        sitemapEntry('/branchen/retail', { changeFrequency: 'monthly', priority: 0.8 }),
      ]
    : [];

  // Dynamic content from Sanity (without drafts)
  const staticCount = isFirstSitemap ? staticRoutes.length : 0;
  const start = id * SITEMAP_LIMIT - (id > 0 ? staticRoutes.length : 0);
  const end = start + SITEMAP_LIMIT - staticCount;

  const query = `
    *[_type in ["post", "caseStudy", "service", "location"] && !(_id in path("drafts.**"))] | order(_updatedAt desc) [${start}...${end}] {
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
