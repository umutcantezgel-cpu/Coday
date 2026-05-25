"use client";

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const BASE_URL = 'https://www.codayweb.de';

/**
 * Human-readable labels for known route segments.
 * Falls back to title-casing the slug.
 */
const SEGMENT_LABELS: Record<string, Record<string, string>> = {
  de: {
    services: 'Leistungen',
    'web-development': 'Webentwicklung',
    development: 'Entwicklung',
    'web-design': 'Webdesign',
    design: 'Design',
    seo: 'SEO',
    performance: 'Performance',
    'enterprise-web': 'Enterprise Web',
    'e-commerce': 'E-Commerce',
    'ecommerce-development': 'E-Commerce',
    'web-apps': 'Web Apps',
    'headless-cms': 'Headless CMS',
    'api-integrations': 'API-Integrationen',
    'api-integration': 'API-Integrationen',
    migration: 'Migration',
    'ui-ux': 'UI/UX Design',
    'brand-identity': 'Brand Identity',
    'design-systems': 'Design Systems',
    audit: 'UX Audit',
    industries: 'Branchen',
    handwerk: 'Handwerk',
    immobilien: 'Immobilien',
    gastronomie: 'Gastronomie',
    gesundheit: 'Gesundheit',
    dienstleistung: 'Dienstleistung',
    'e-commerce-industry': 'E-Commerce',
    knowledge: 'Wissen',
    blog: 'Blog',
    academy: 'Academy',
    newsletter: 'Newsletter',
    whitepapers: 'Whitepapers',
    faq: 'FAQ',
    work: 'Projekte',
    about: 'Über uns',
    'ueber-uns': 'Über uns',
    contact: 'Kontakt',
    process: 'Prozess',
    career: 'Karriere',
    careers: 'Karriere',
    jobs: 'Stellenangebote',
    culture: 'Kultur',
    benefits: 'Benefits',
    legal: 'Rechtliches',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    agb: 'AGB',
    packages: 'Pakete',
    pakete: 'Pakete',
    booking: 'Buchung',
    beratung: 'Beratung',
    calculator: 'Rechner',
    preise: 'Preise',
    analyzer: 'Website Analyzer',
    'website-audit': 'Website Audit',
    'oeffentliche-auftraege': 'Öffentliche Aufträge',
  },
  en: {
    services: 'Services',
    'web-development': 'Web Development',
    development: 'Development',
    'web-design': 'Web Design',
    design: 'Design',
    seo: 'SEO',
    performance: 'Performance',
    'enterprise-web': 'Enterprise Web',
    'e-commerce': 'E-Commerce',
    'ecommerce-development': 'E-Commerce',
    'web-apps': 'Web Apps',
    'headless-cms': 'Headless CMS',
    'api-integrations': 'API Integrations',
    'api-integration': 'API Integrations',
    migration: 'Migration',
    'ui-ux': 'UI/UX Design',
    'brand-identity': 'Brand Identity',
    'design-systems': 'Design Systems',
    audit: 'UX Audit',
    industries: 'Industries',
    handwerk: 'Trades & Crafts',
    immobilien: 'Real Estate',
    gastronomie: 'Gastronomy',
    gesundheit: 'Healthcare',
    dienstleistung: 'Services',
    'e-commerce-industry': 'E-Commerce',
    knowledge: 'Knowledge',
    blog: 'Blog',
    academy: 'Academy',
    newsletter: 'Newsletter',
    whitepapers: 'Whitepapers',
    faq: 'FAQ',
    work: 'Work',
    about: 'About',
    'ueber-uns': 'About',
    contact: 'Contact',
    process: 'Process',
    career: 'Career',
    careers: 'Careers',
    jobs: 'Jobs',
    culture: 'Culture',
    benefits: 'Benefits',
    legal: 'Legal',
    impressum: 'Imprint',
    datenschutz: 'Privacy',
    agb: 'Terms',
    packages: 'Packages',
    pakete: 'Packages',
    booking: 'Booking',
    beratung: 'Consulting',
    calculator: 'Calculator',
    preise: 'Pricing',
    analyzer: 'Website Analyzer',
    'website-audit': 'Website Audit',
    'oeffentliche-auftraege': 'Public Sector',
  },
};

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates a breadcrumb trail from the current route.
 * Automatically strips the language prefix and resolves labels.
 */
export function useBreadcrumbs(overrideLabel?: string): BreadcrumbItem[] {
  const pathname = usePathname() || '';
  const lang = useLocale().startsWith('en') ? 'en' : 'de';
  const labels = SEGMENT_LABELS[lang] || SEGMENT_LABELS.de;

  const segments = pathname.split('/').filter(Boolean);

  // Remove language prefix
  const langPrefix = segments[0];
  const pathSegments = langPrefix === 'de' || langPrefix === 'en' ? segments.slice(1) : segments;
  const activeLang = langPrefix === 'de' || langPrefix === 'en' ? langPrefix : lang;

  const crumbs: BreadcrumbItem[] = [{ name: 'Home', url: `${BASE_URL}/${activeLang}` }];

  let currentPath = `/${activeLang}`;

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    const label = isLast && overrideLabel ? overrideLabel : labels![segment] || titleCase(segment);
    crumbs.push({ name: label, url: `${BASE_URL}${currentPath}` });
  });

  return crumbs;
}
