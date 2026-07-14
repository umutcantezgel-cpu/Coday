import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.codayweb.de';

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
async function fetchSanity<T>(query: string): Promise<T> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return [] as T;
    }
    const data = await res.json();
    return data.result as T;
  } catch (error) {
    console.error('Sanity fetch error in sitemap:', error);
    return [] as T;
  }
}

/**
 * Static build timestamp — set once at build time.
 * Google uses lastModified to schedule re-crawls; using new Date() on every
 * request misleads Googlebot into thinking every page changed every second.
 */
const BUILD_DATE = new Date('2026-07-07T00:00:00Z');

/**
 * Helper to create a sitemap entry with Next.js 15 language alternates.
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

  const localPathsRegex = /^\/(landingpages|webdesign-agentur-wetzlar|angebot-handwerker)(\/.*)?$/;
  const isLocalPath = localPathsRegex.test(cleanPath);

  const languages: Record<string, string> = {
    de: `${BASE_URL}/de${cleanPath}`,
  };

  // Temporarily disable English pages from sitemap because they are set to noindex
  // until they are fully translated.
  if (!isLocalPath) {
    languages.en = `${BASE_URL}/en${cleanPath}`;
  }

  // We use the default locale /de as the main URL, but provide explicit alternates
  return {
    url: `${BASE_URL}/de${cleanPath}`,
    lastModified: opts.lastModified || BUILD_DATE,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes mapping
  const staticRoutes: MetadataRoute.Sitemap = [
    // === Core Pages (highest priority) ===
    sitemapEntry('/', { changeFrequency: 'monthly', priority: 1.0 }),
    sitemapEntry('/about', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/booking', { changeFrequency: 'monthly', priority: 0.9 }),
    sitemapEntry('/contact', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/pricing', { changeFrequency: 'monthly', priority: 0.9 }),
    sitemapEntry('/process', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/work', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/webdesign-agentur-wetzlar', { changeFrequency: 'monthly', priority: 0.9 }),
    sitemapEntry('/angebot-handwerker', { changeFrequency: 'monthly', priority: 0.8 }),

    // === Services ===
    sitemapEntry('/services', { changeFrequency: 'monthly', priority: 0.8 }),

    // Web Development Sub-Services
    sitemapEntry('/services/web-development', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/web-development/react-nextjs-agentur', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/services/web-development/e-commerce-shops', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    sitemapEntry('/services/web-development/full-stack-entwicklung', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    sitemapEntry('/services/web-development/cloud-infrastructure', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),

    // Web Design Sub-Services
    sitemapEntry('/services/web-design', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/web-design/website-relaunch', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),

    // Growth / Marketing Sub-Services
    sitemapEntry('/services/growth/seo-optimization', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/services/growth/performance-optimization', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    sitemapEntry('/services/growth/digital-consulting', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),

    // Legacy Services
    sitemapEntry('/services/seo', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/services/performance', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/consulting', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/ecommerce-development', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/enterprise-web', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/generative-engine-optimization', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    sitemapEntry('/services/design/ui-ux', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/design/brand-identity', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/services/design/ux-audit', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/services/design/design-systems', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/services/development/api-integration', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    sitemapEntry('/services/development/headless-cms', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    sitemapEntry('/services/development/migration', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/services/development/web-apps', { changeFrequency: 'monthly', priority: 0.6 }),

    // === Standorte (Local SEO) ===
    sitemapEntry('/webdesign-agentur-wetzlar', { changeFrequency: 'monthly', priority: 0.9 }),
    sitemapEntry('/standorte/giessen', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/standorte/hessen', { changeFrequency: 'monthly', priority: 0.8 }),

    // === Branchen (Industry pages) ===
    sitemapEntry('/branchen', { changeFrequency: 'monthly', priority: 0.7 }),

    // New Industry Slugs
    sitemapEntry('/branchen/handwerk-bau', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/immobilien-makler', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/unternehmensberatung', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/aerzte-gesundheit', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/anwaelte-kanzleien', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/gastronomie-hotellerie', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/startups-tech', { changeFrequency: 'monthly', priority: 0.8 }),

    // Legacy / Generic Industry Slugs
    sitemapEntry('/branchen/handwerker', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/handwerker/wetzlar', { changeFrequency: 'monthly', priority: 0.9 }),
    sitemapEntry('/branchen/gesundheitswesen', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/branchen/gesundheitswesen/arzt-wetzlar', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/branchen/gesundheitswesen/arzt-giessen', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/branchen/automobil', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/branchen/automobil/kfz-werkstatt', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/branchen/automobil/kfz-mechatroniker', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    sitemapEntry('/branchen/automobil/autohaendler', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/branchen/gastronomie', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/branchen/dienstleistung', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/branchen/immobilien', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/branchen/public-sector', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/branchen/retail', { changeFrequency: 'monthly', priority: 0.6 }),

    // === Landingpages (City-specific) ===
    sitemapEntry('/landingpages/wetzlar', { changeFrequency: 'monthly', priority: 0.8 }),
    sitemapEntry('/landingpages/giessen', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/landingpages/marburg', { changeFrequency: 'monthly', priority: 0.7 }),
    sitemapEntry('/landingpages/dillenburg', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/landingpages/herborn', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/landingpages/weilburg', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/landingpages/localwetzlar', { changeFrequency: 'monthly', priority: 0.7 }),

    // === Knowledge ===
    sitemapEntry('/knowledge/blog', { changeFrequency: 'weekly', priority: 0.7 }),
    sitemapEntry('/knowledge/faq', { changeFrequency: 'monthly', priority: 0.6 }),

    // === Legal ===
    sitemapEntry('/legal/impressum', { changeFrequency: 'monthly', priority: 0.3 }),
    sitemapEntry('/legal/datenschutz', { changeFrequency: 'monthly', priority: 0.3 }),
    sitemapEntry('/legal/agb', { changeFrequency: 'monthly', priority: 0.3 }),

    // === Other ===
    sitemapEntry('/garantie', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/partnerschaft', { changeFrequency: 'monthly', priority: 0.5 }),
    sitemapEntry('/presse', { changeFrequency: 'monthly', priority: 0.5 }),
    sitemapEntry('/analyzer', { changeFrequency: 'monthly', priority: 0.6 }),
    sitemapEntry('/calculator', { changeFrequency: 'monthly', priority: 0.6 }),
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

  const dynamicDocs = await fetchSanity<SanityDoc[]>(query);

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
      lastModified: doc._updatedAt ? new Date(doc._updatedAt) : undefined,
    });
  });

  const allRoutes = [...staticRoutes, ...dynamicRoutes];
  const expandedRoutes: MetadataRoute.Sitemap = [];

  for (const route of allRoutes) {
    // Add the primary DE route
    expandedRoutes.push(route);

    // If an EN alternate exists, add it as a standalone route as well
    if (route.alternates?.languages?.en) {
      expandedRoutes.push({
        ...route,
        url: route.alternates.languages.en,
      });
    }
  }

  return expandedRoutes;
}
