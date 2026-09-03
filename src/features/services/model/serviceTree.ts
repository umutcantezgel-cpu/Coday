/**
 * The service hierarchy, as a graph rather than as sixteen unrelated pages.
 *
 * Every service page emitted a `Service` node whose only edge was `provider`
 * pointing at #organization. No service node was ever referenced by a second
 * node, so nothing said that `/services/design/ui-ux` is part of what
 * `/services/web-design` offers — the relationship existed in the navigation
 * and nowhere a machine could read it.
 *
 * Schema.org models service composition through OfferCatalog, not through
 * isPartOf: a parent service `hasOfferCatalog` an OfferCatalog whose offers name
 * the child services. That is the shape this file feeds.
 *
 * The eight top-level entries are also what `/services#catalog` lists and what
 * #organization points at, so the same tree drives all three.
 */
export interface ServiceNode {
  /** Route path without the locale prefix. */
  path: string;
  de: string;
  en: string;
  /** Schema.org `serviceType` — absent from every Service node until now. */
  serviceType: string;
  children?: string[];
}

export const SERVICE_TREE: ServiceNode[] = [
  {
    path: '/services/web-design',
    de: 'Webdesign & UI/UX',
    en: 'Web Design & UI/UX',
    serviceType: 'Web Design',
    children: [
      '/services/design/ui-ux',
      '/services/design/brand-identity',
      '/services/design/design-systems',
      '/services/design/ux-audit',
    ],
  },
  {
    path: '/services/web-development',
    de: 'Next.js Webentwicklung',
    en: 'Next.js Web Development',
    serviceType: 'Web Development',
    children: [
      '/services/development/web-apps',
      '/services/development/headless-cms',
      '/services/development/api-integration',
      '/services/development/migration',
    ],
  },
  {
    path: '/services/seo',
    de: 'Lokale & technische SEO',
    en: 'Local & Technical SEO',
    serviceType: 'Search Engine Optimization',
  },
  {
    path: '/services/generative-engine-optimization',
    de: 'Generative Engine Optimization',
    en: 'Generative Engine Optimization',
    serviceType: 'Generative Engine Optimization',
  },
  {
    path: '/services/performance',
    de: 'PageSpeed & Core Web Vitals',
    en: 'PageSpeed & Core Web Vitals',
    serviceType: 'Web Performance Optimization',
  },
  {
    path: '/services/ecommerce-development',
    de: 'E-Commerce & Onlineshops',
    en: 'E-Commerce & Online Shops',
    serviceType: 'E-Commerce Development',
  },
  {
    path: '/services/enterprise-web',
    de: 'Enterprise-Weblösungen',
    en: 'Enterprise Web Solutions',
    serviceType: 'Enterprise Web Development',
  },
  {
    path: '/services/consulting',
    de: 'Digitalberatung',
    en: 'Digital Consulting',
    serviceType: 'IT Consulting',
  },
];

/** The four design and four development sub-services, keyed by path. */
export const SUB_SERVICES: ServiceNode[] = [
  {
    path: '/services/design/ui-ux',
    de: 'UI/UX Design',
    en: 'UI/UX Design',
    serviceType: 'User Interface Design',
  },
  {
    path: '/services/design/brand-identity',
    de: 'Markenidentität',
    en: 'Brand Identity',
    serviceType: 'Brand Design',
  },
  {
    path: '/services/design/design-systems',
    de: 'Design-Systeme',
    en: 'Design Systems',
    serviceType: 'Design Systems',
  },
  {
    path: '/services/design/ux-audit',
    de: 'UX-Audit',
    en: 'UX Audit',
    serviceType: 'UX Audit',
  },
  {
    path: '/services/development/web-apps',
    de: 'Individuelle Web-Apps',
    en: 'Custom Web Apps',
    serviceType: 'Web Application Development',
  },
  {
    path: '/services/development/headless-cms',
    de: 'Headless CMS',
    en: 'Headless CMS',
    serviceType: 'Headless CMS Integration',
  },
  {
    path: '/services/development/api-integration',
    de: 'API-Integration',
    en: 'API Integration',
    serviceType: 'API Integration',
  },
  {
    path: '/services/development/migration',
    de: 'Migration & Relaunch',
    en: 'Migration & Relaunch',
    serviceType: 'Website Migration',
  },
];

export const ALL_SERVICES = [...SERVICE_TREE, ...SUB_SERVICES];

/**
 * Looks a service up by a route path with the locale prefix already removed.
 *
 * This file deliberately imports nothing: the URL helpers that need BASE_URL
 * live in @/lib/schema, which imports this data. Putting them here instead would
 * make the two modules import each other.
 */
export function serviceNodeForPath(path: string): ServiceNode | undefined {
  return ALL_SERVICES.find((s) => s.path === path.replace(/\/$/, ''));
}
