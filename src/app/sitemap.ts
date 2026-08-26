import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/features/blog/model/data';

const BASE_URL = 'https://www.codayweb.de';

/**
 * Type for Sanity documents used in the sitemap.
 */
type SanityDoc = {
  _id: string;
  _updatedAt: string;
  slug: { current: string };
  _type: 'caseStudy' | 'service' | 'location';
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
 * Static build timestamp — evaluated once at build time.
 */
const BUILD_DATE = new Date();

/**
 * List of routes that are strictly German only
 * (e.g. legal pages without EN translation)
 */
const DE_ONLY_ROUTES = [
  '/legal/agb',
  '/legal/datenschutz',
  '/legal/impressum',
  '/presse',
  '/garantie',
  '/partnerschaft',
];

/**
 * Helper to create sitemap entries for a route in both DE and EN with Next.js 15 language alternates.
 */
function sitemapEntries(
  path: string,
  opts: {
    changeFrequency: 'daily' | 'weekly' | 'monthly';
    priority: number;
    lastModified?: Date;
  }
): MetadataRoute.Sitemap {
  const cleanPath = path.replace(/^\/(en|de)/, '').replace(/\/$/, '') || '';
  const isDeOnlyRoute = DE_ONLY_ROUTES.includes(cleanPath);

  const languages: Record<string, string> = {
    de: `${BASE_URL}/de${cleanPath}`,
    ...(!isDeOnlyRoute ? { en: `${BASE_URL}/en${cleanPath}` } : {}),
    'x-default': `${BASE_URL}/de${cleanPath}`,
  };

  const deEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/de${cleanPath}`,
    lastModified: opts.lastModified || BUILD_DATE,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages,
    },
  };

  if (isDeOnlyRoute) {
    return [deEntry];
  }

  const enEntry: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/en${cleanPath}`,
    lastModified: opts.lastModified || BUILD_DATE,
    changeFrequency: opts.changeFrequency,
    priority: Math.max(0.4, Number((opts.priority * 0.95).toFixed(2))),
    alternates: {
      languages,
    },
  };

  return [deEntry, enEntry];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawStaticRoutes = [
    // === Core Pages ===
    ...sitemapEntries('/', { changeFrequency: 'monthly', priority: 1.0 }),
    ...sitemapEntries('/about', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/booking', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/contact', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/pricing', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/process', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/work', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/angebot-handwerker', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/landingpages/nextjsmigration', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),

    // === Services ===
    ...sitemapEntries('/services', { changeFrequency: 'monthly', priority: 0.8 }),

    // Web Development
    ...sitemapEntries('/services/web-development', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/services/web-development/react-nextjs-agentur', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/services/web-development/e-commerce-shops', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/web-development/full-stack-entwicklung', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/web-development/cloud-infrastructure', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),

    // Web Design
    ...sitemapEntries('/services/web-design', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/services/web-design/website-relaunch', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),

    // Growth & Marketing
    ...sitemapEntries('/services/growth/seo-optimization', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/services/growth/performance-optimization', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/growth/digital-consulting', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),

    // Specialized Services
    ...sitemapEntries('/services/seo', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/services/performance', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/services/consulting', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/services/ecommerce-development', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/enterprise-web', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/services/generative-engine-optimization', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/design/ui-ux', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/services/design/brand-identity', {
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
    ...sitemapEntries('/services/design/ux-audit', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/services/design/design-systems', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    ...sitemapEntries('/services/development/api-integration', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    ...sitemapEntries('/services/development/headless-cms', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    ...sitemapEntries('/services/development/migration', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
    ...sitemapEntries('/services/development/web-apps', {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),

    // === Standorte & Regionen (Local SEO Money-Pages) ===
    ...sitemapEntries('/webdesign-agentur-wetzlar', { changeFrequency: 'monthly', priority: 0.95 }),
    ...sitemapEntries('/webdesign-giessen', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-marburg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-herborn', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-limburg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-weilburg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-loehnberg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-dillenburg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-friedberg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-frankfurt', { changeFrequency: 'monthly', priority: 0.95 }),
    ...sitemapEntries('/webdesign-wiesbaden', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-darmstadt', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-kassel', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-offenbach', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-hanau', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-fulda', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-bad-homburg', { changeFrequency: 'monthly', priority: 0.9 }),
    ...sitemapEntries('/webdesign-oberursel', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-bad-vilbel', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-hofheim', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-ruesselsheim', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-bensheim', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-rodgau', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/webdesign-dietzenbach', { changeFrequency: 'monthly', priority: 0.85 }),

    // 13 Landkreis-Hubs
    ...sitemapEntries('/regionen/landkreis-lahn-dill', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/landkreis-giessen', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/wetteraukreis', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/regionen/main-taunus-kreis', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/hochtaunuskreis', { changeFrequency: 'monthly', priority: 0.85 }),
    ...sitemapEntries('/regionen/landkreis-limburg-weilburg', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/landkreis-marburg-biedenkopf', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/kreis-offenbach', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/main-kinzig-kreis', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/rheingau-taunus-kreis', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/landkreis-darmstadt-dieburg', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/landkreis-kassel', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/regionen/landkreis-fulda', {
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
    ...sitemapEntries('/standorte/hessen', { changeFrequency: 'monthly', priority: 0.85 }),

    // === Branchen (Industry pages) ===
    ...sitemapEntries('/branchen', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/branchen/handwerk-bau', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/branchen/unternehmensberatung', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/aerzte-gesundheit', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/branchen/anwaelte-kanzleien', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/gastronomie-hotellerie', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/startups-tech', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/branchen/automobil', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/branchen/automobil/kfz-werkstatt', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/automobil/kfz-mechatroniker', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/automobil/autohaendler', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/gesundheitswesen/arzt-wetzlar', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/gesundheitswesen/arzt-giessen', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/handwerker/wetzlar', {
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
    ...sitemapEntries('/branchen/gastronomie', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/branchen/dienstleistung', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/branchen/immobilien', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/branchen/public-sector', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/branchen/retail', { changeFrequency: 'monthly', priority: 0.6 }),

    // === Knowledge ===
    ...sitemapEntries('/knowledge/academy', { changeFrequency: 'weekly', priority: 0.85 }),
    ...sitemapEntries('/knowledge/blog', { changeFrequency: 'weekly', priority: 0.7 }),
    ...sitemapEntries('/knowledge/wiki', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/knowledge/whitepapers', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/knowledge/newsletter', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/knowledge/faq', { changeFrequency: 'monthly', priority: 0.6 }),

    // === Career ===
    ...sitemapEntries('/career', { changeFrequency: 'monthly', priority: 0.7 }),
    ...sitemapEntries('/career/culture', { changeFrequency: 'monthly', priority: 0.8 }),
    ...sitemapEntries('/career/benefits', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/career/jobs', { changeFrequency: 'monthly', priority: 0.7 }),

    // === Tools & Other ===
    ...sitemapEntries('/garantie', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/partnerschaft', { changeFrequency: 'monthly', priority: 0.5 }),
    ...sitemapEntries('/presse', { changeFrequency: 'monthly', priority: 0.5 }),
    ...sitemapEntries('/analyzer', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/calculator', { changeFrequency: 'monthly', priority: 0.6 }),
    ...sitemapEntries('/uebersicht', { changeFrequency: 'monthly', priority: 0.4 }),
  ];

  // Dynamic content from Sanity
  const query = `
    *[_type in ["caseStudy", "service", "location"] && !(_id in path("drafts.**"))] | order(_updatedAt desc) {
      _id,
      _type,
      _updatedAt,
      slug
    }
  `;

  const dynamicDocs = await fetchSanity<SanityDoc[]>(query);

  const dynamicRoutes: MetadataRoute.Sitemap = [];
  dynamicDocs.forEach((doc) => {
    let routePrefix = '';
    let changeFrequency: 'weekly' | 'monthly' = 'monthly';
    let priority = 0.5;

    switch (doc._type) {
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
    if (slug) {
      const path = `${routePrefix}/${slug}`;
      dynamicRoutes.push(
        ...sitemapEntries(path, {
          changeFrequency,
          priority,
          lastModified: doc._updatedAt ? new Date(doc._updatedAt) : undefined,
        })
      );
    }
  });

  const localPostsDe = getBlogPosts('de');
  const localBlogRoutesDe: MetadataRoute.Sitemap = localPostsDe.map((post) => ({
    url: `${BASE_URL}/de/knowledge/blog/${post.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: {
        de: `${BASE_URL}/de/knowledge/blog/${post.slug}`,
        'x-default': `${BASE_URL}/de/knowledge/blog/${post.slug}`,
      },
    },
  }));

  const localPostsEn = getBlogPosts('en');
  const localBlogRoutesEn: MetadataRoute.Sitemap = localPostsEn.map((post) => ({
    url: `${BASE_URL}/en/knowledge/blog/${post.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: 'weekly',
    priority: 0.7,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/knowledge/blog/${post.slug}`,
      },
    },
  }));

  const allRoutes = [
    ...rawStaticRoutes,
    ...dynamicRoutes,
    ...localBlogRoutesDe,
    ...localBlogRoutesEn,
  ];

  return allRoutes;
}
