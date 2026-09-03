import { serviceNodeForPath } from '@/features/services/model/serviceTree';
import { PACKAGE_LIST, type Locale as PackageLocale } from '@/shared/data/packages';
import { academyData } from '@/shared/data/academy';
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from '@/shared/data/reviews';

export const BASE_URL = 'https://www.codayweb.de';
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#founder`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const LOCAL_BUSINESS_ID = `${BASE_URL}/#local-business`;
export const PROFESSIONAL_SERVICE_ID = `${BASE_URL}/#professional-service`;

/**
 * The top of the place chain. Site-global rather than page-anchored, because
 * #organization names it as an areaServed and #organization ships on every page —
 * a fragment id on the origin only resolves inside the document that defines it.
 * The root layout is therefore where it belongs.
 */
export const PLACE_DE_ID = `${BASE_URL}/#place-deutschland`;

export function getCountryNode() {
  return {
    '@type': 'Country',
    '@id': PLACE_DE_ID,
    name: 'Deutschland',
    alternateName: 'Germany',
    sameAs: 'https://www.wikidata.org/wiki/Q183',
  };
}

export function getReviewsSchema(locale: string = 'de') {
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS_SUMMARY.ratingValue.toString(),
      reviewCount: REVIEWS_SUMMARY.reviewCount.toString(),
      bestRating: REVIEWS_SUMMARY.bestRating.toString(),
      worstRating: REVIEWS_SUMMARY.worstRating.toString(),
    },
    review: GOOGLE_REVIEWS.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
        bestRating: '5',
        worstRating: '1',
      },
      author: {
        '@type': 'Person',
        name: review.authorName,
      },
      datePublished: review.datePublished,
      reviewBody: locale === 'en' ? review.quote.en : review.quote.de,
    })),
  };
}

export function getMainProductOfferSchema(locale: string = 'de') {
  const isEn = locale === 'en';
  return {
    '@type': 'Product',
    '@id': `${BASE_URL}/#webdesign-package`,
    name: isEn
      ? 'Coday Web Design & Web Development Wetzlar'
      : 'Coday Webdesign & Webentwicklung Wetzlar',
    description: isEn
      ? 'High-Performance & High-Conversion Websites for businesses and crafts in Wetzlar, Giessen and Hesse. 100/100 PageSpeed, modern Next.js architecture and personal support.'
      : 'High-Performance & High-Conversion Websites für Unternehmen und Handwerk in Wetzlar, Gießen und Hessen. 100/100 PageSpeed, modernste Next.js Architektur und persönliche Betreuung.',
    image: `${BASE_URL}/images/og-image.jpg`,
    brand: {
      '@id': ORG_ID,
    },
    offers: {
      '@type': 'Offer',
      price: '2000',
      priceCurrency: 'EUR',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/${locale}`,
      seller: {
        '@id': ORG_ID,
      },
    },
    ...getReviewsSchema(locale),
  };
}

export function getOrganizationSchema(locale: string = 'de') {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ORG_ID,
    // NO aggregateRating/review here: Google ignores self-serving stars on
    // Organization/LocalBusiness, and the org node appears on every page
    // (layout + many page graphs) — spreading reviews here caused the GSC
    // "multiple aggregated ratings" error. Reviews live on Product /
    // WebApplication nodes only, at most one per page.
    name: 'Coday',
    legalName: 'Umutcan Emre Tezgel',
    alternateName: [
      'Coday Web',
      'Webdesign Coday',
      'Webdesign Agentur Wetzlar',
      'Webentwicklung Wetzlar',
      'Coday Webagentur',
    ],
    url: BASE_URL,
    image: `${BASE_URL}/images/og-image.jpg`,
    description:
      locale === 'en'
        ? 'Coday is your premier Web Design Agency in Wetzlar. We build high-performance & high-conversion websites, custom web development, and 100/100 PageSpeed SEO for businesses, medical practices, and trades across Wetzlar, Giessen, Hesse, and Germany.'
        : 'Coday ist Ihre führende Webdesign Agentur in Wetzlar. Wir entwickeln High-Performance & High-Conversion Websites, maßgeschneiderte Webentwicklung und 100/100 PageSpeed SEO für Unternehmen, Handwerker und Praxen in Wetzlar, Gießen, Hessen und ganz Deutschland.',
    slogan:
      locale === 'en'
        ? 'High-Performance & High-Conversion Websites from Wetzlar.'
        : 'High-Performance & High-Conversion Websites aus Wetzlar.',
    email: 'umut@codayweb.de',
    telephone: '+49-176-41195301',
    vatID: 'DE459754827',
    taxID: '039 874 00784',
    foundingDate: '2026',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Bank Transfer, Invoice',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 1,
    },
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: `${BASE_URL}/images/coday-logo.png`,
      contentUrl: `${BASE_URL}/images/coday-logo.png`,
      width: 512,
      height: 512,
      caption: 'Coday: Webdesign & Webentwicklung Wetzlar Logo',
    },
    // The single definition of #founder. /about used to re-declare this Person
    // inline with a different jobTitle and its own knowsAbout list, so two
    // contradictory versions of one @id shipped in the same document. The richer
    // values from that copy are merged here rather than dropped.
    founder: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Umutcan Emre Tezgel',
      givenName: 'Umutcan Emre',
      familyName: 'Tezgel',
      jobTitle: 'Inhaber, Lead Architect & Fullstack Engineer',
      url: `${BASE_URL}/${locale}/about`,
      worksFor: { '@id': ORG_ID },
      knowsAbout: [
        'Next.js 15',
        'React 19',
        'TypeScript',
        'Tailwind CSS 4',
        'Headless CMS Architecture',
        'Core Web Vitals & Web Performance',
        'Technical SEO & GEO',
      ],
      sameAs: [
        'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
        'https://github.com/umurey',
        'https://www.openpr.de/news/coday',
        'https://www.provenexpert.com/de-de/coday-webagentur/',
      ],
    },
    knowsAbout: [
      'Webdesign',
      'Webentwicklung',
      'High-Conversion Webseiten',
      'Neukundengewinnung über Webseiten',
      'Suchmaschinenoptimierung (SEO)',
      'Lokale SEO (Local SEO)',
      'Google PageSpeed 100/100',
      'Ladezeitoptimierung & Core Web Vitals',
      'Domain-Rating & Backlink-Aufbau',
      'Webseiten für Handwerker & KMU',
      'Next.js Webentwicklung',
      'Responsive Design',
      'UI/UX Design',
    ],
    knowsLanguage: ['de', 'en'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      postalCode: '35578',
      addressLocality: 'Wetzlar',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.564,
      longitude: 8.502,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    // One convention for places, not two. These used to put the Wikidata URI in
    // @id while the location pyramid gave the same four cities their own @id with
    // Wikidata in sameAs — so Wetzlar existed twice in the graph under different
    // identifiers. The organisation now points at the pyramid's own nodes, which
    // carry the Wikidata link themselves.
    areaServed: [
      { '@id': `${BASE_URL}/${locale}/webdesign-agentur-wetzlar#city` },
      { '@id': `${BASE_URL}/${locale}/webdesign-giessen#city` },
      { '@id': `${BASE_URL}/${locale}/webdesign-marburg#city` },
      { '@id': `${BASE_URL}/${locale}/webdesign-frankfurt#city` },
      { '@id': `${BASE_URL}/${locale}/regionen/landkreis-lahn-dill#region` },
      { '@id': `${BASE_URL}/${locale}/standorte/hessen#state-hub` },
      { '@id': PLACE_DE_ID },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+49-176-41195301',
        contactType: 'customer service',
        areaServed: ['DE', 'AT', 'CH'],
        availableLanguage: ['German', 'English'],
      },
    ],
    hasMap: 'https://www.google.com/maps?cid=8570940562624494590',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://www.google.com/maps?cid=8570940562624494590',
      'https://www.linkedin.com/company/coday',
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
      'https://github.com/coday',
      'https://www.instagram.com/codayweb',
      'https://www.youtube.com/@coday',
      'https://x.com/codayweb',
      'https://www.facebook.com/people/Coday/61588758264018/',
    ],
    // The eight offers used to be anonymous Service nodes naming strings that
    // matched no page — "Local SEO" had no URL behind it at all. They now point
    // at the real service pages, so the catalogue is a set of edges into the
    // graph rather than a list of words.
    hasOfferCatalog: {
      '@id': `${BASE_URL}/${locale}/services#catalog`,
    },
  };
}

export function getProfessionalServiceSchema(locale: string = 'de') {
  return {
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#professional-service`,
    provider: {
      '@id': ORG_ID,
    },
    name: 'Coday Web Agency',
    legalName: 'Umutcan Emre Tezgel',
    description:
      locale === 'en'
        ? 'High-End Web Development & Generative Engine Optimization'
        : 'High-End Webentwicklung & Generative Engine Optimization',
    image: `${BASE_URL}/images/og-image.jpg`,
    url: BASE_URL,
    telephone: '+49-176-41195301',
    vatID: 'DE459754827',
    taxID: '039 874 00784',
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      postalCode: '35578',
      addressLocality: 'Wetzlar',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.5558,
      longitude: 8.504,
    },
    hasMap: 'https://www.google.com/maps?cid=8570940562624494590',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://www.google.com/maps?cid=8570940562624494590',
      'https://www.linkedin.com/company/coday',
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
      'https://www.instagram.com/codayweb',
    ],
    founder: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Umutcan Emre Tezgel',
      sameAs: [
        'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
        'https://www.openpr.de/news/coday',
      ],
    },
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Marburg' },
      { '@type': 'City', name: 'Herborn' },
      { '@type': 'City', name: 'Dillenburg' },
      { '@type': 'City', name: 'Limburg' },
      { '@type': 'City', name: 'Weilburg' },
      { '@type': 'City', name: 'Haiger' },
      { '@type': 'City', name: 'Ehringshausen' },
      { '@type': 'City', name: 'Sinn' },
      { '@type': 'City', name: 'Aßlar' },
      { '@type': 'City', name: 'Solms' },
      { '@type': 'City', name: 'Lahnau' },
      { '@type': 'City', name: 'Braunfels' },
      { '@type': 'City', name: 'Leun' },
      { '@type': 'City', name: 'Hüttenberg' },
      { '@type': 'City', name: 'Schöffengrund' },
      { '@type': 'City', name: 'Waldsolms' },
      { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
      { '@type': 'AdministrativeArea', name: 'Landkreis Gießen' },
      { '@type': 'AdministrativeArea', name: 'Marburg-Biedenkopf' },
      { '@type': 'AdministrativeArea', name: 'Limburg-Weilburg' },
      { '@type': 'AdministrativeArea', name: 'Hessen' },
    ],
    priceRange: '€€€',
    openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
    serviceType: [
      'Web Development',
      'Headless CMS Integration',
      'Search Engine Optimization',
      'Generative Engine Optimization',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Services & Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Next.js 15 Web Development' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Generative Engine Optimization (GEO)' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Sanity Headless CMS Setup' },
        },
      ],
    },
  };
}

export function getLocalBusinessSchema(locale: string = 'de') {
  return {
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#local-business`,
    parentOrganization: {
      '@id': ORG_ID,
    },
    ...getReviewsSchema(locale),
    name: locale === 'en' ? 'Coday - Web Design Wetzlar' : 'Coday - Webdesign Wetzlar',
    description:
      locale === 'en'
        ? 'High-End Web Development & Generative Engine Optimization'
        : 'High-End Webentwicklung & Generative Engine Optimization',
    url: BASE_URL,
    telephone: '+49-176-41195301',
    image: `${BASE_URL}/logo.png`,
    hasMap: 'https://www.google.com/maps?cid=8570940562624494590',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://www.google.com/maps?cid=8570940562624494590',
      'https://www.linkedin.com/company/coday',
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      postalCode: '35578',
      addressLocality: 'Wetzlar',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.564,
      longitude: 8.502,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: 'Bank Transfer, Invoice, SEPA',
    currenciesAccepted: 'EUR',
    priceRange: '€€€',
  };
}

export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
  authorName?: string;
}) {
  // Pseudonymous author names must not be attached to the founder's @id;
  // the founder node itself is defined once inside the Organization schema.
  const isFounderAuthor = !post.authorName || post.authorName === 'Lead Architect';

  return {
    '@type': 'TechArticle',
    '@id': `${post.url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    isPartOf: { '@id': WEBSITE_ID },
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? [post.imageUrl] : [`${BASE_URL}/images/og-image.jpg`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: isFounderAuthor
      ? { '@id': FOUNDER_ID }
      : { '@type': 'Person', name: post.authorName, worksFor: { '@id': ORG_ID } },
    publisher: {
      '@id': ORG_ID,
    },
  };
}

/** The @id of a service page's own Service node. */
export function serviceId(path: string, locale: string) {
  return `${BASE_URL}/${locale}${path}#service`;
}

/**
 * An OfferCatalog whose offers reference real Service nodes by @id instead of
 * re-declaring anonymous copies. Feeds `/services#catalog`, each parent
 * service's catalogue of its sub-services, and #organization.
 */
export function getOfferCatalog(opts: {
  id: string;
  name: string;
  paths: string[];
  locale: string;
}) {
  return {
    '@type': 'OfferCatalog',
    '@id': opts.id,
    name: opts.name,
    itemListElement: opts.paths.map((path) => ({
      '@type': 'Offer',
      itemOffered: { '@id': serviceId(path, opts.locale) },
    })),
  };
}

/**
 * The trade an industry page speaks to, as an entity rather than an adjective.
 *
 * Anchored to the industry page rather than site-global, so a page one level
 * down (/branchen/handwerk-bau/wetzlar) can reference it across documents the
 * way it already references a city. That is what lets the industry+location page
 * name two parents — an audience and a place — without competing with either:
 * it is the only page in the graph that claims both.
 */
export function getAudienceSchema(opts: { url: string; audienceType: string; name?: string }) {
  return {
    '@type': 'Audience',
    '@id': `${opts.url}#audience`,
    audienceType: opts.audienceType,
    ...(opts.name ? { name: opts.name } : {}),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  /** @id of the Audience this service speaks to — industry pages. */
  audienceId?: string;
  /**
   * Replaces the national reach with specific places. Used by the
   * industry+location pages, which are the most specific nodes in the graph and
   * should say so rather than claiming three countries.
   */
  areaServedIds?: string[];
}) {
  const locale = service.url.includes('/en/') ? 'en' : 'de';
  const path = service.url.replace(BASE_URL, '').replace(/^\/(de|en)/, '');
  const node = serviceNodeForPath(path);
  const children = node?.children;

  return {
    '@type': 'Service',
    '@id': `${service.url}#service`,
    name: service.name,
    description: service.description,
    // Resolved from the service tree rather than added at 23 call sites. Every
    // Service node on this site shipped without a serviceType until now.
    ...(node ? { serviceType: node.serviceType } : {}),
    provider: {
      '@id': ORG_ID,
    },
    // The four sub-services of a parent are named through an OfferCatalog, which
    // is how Schema.org models service composition. Before this, nothing
    // connected /services/design/ui-ux to /services/web-design.
    ...(children && children.length
      ? {
          hasOfferCatalog: getOfferCatalog({
            id: `${service.url}#catalog`,
            name: service.name,
            paths: children,
            locale,
          }),
        }
      : {}),
    ...(service.audienceId ? { audience: { '@id': service.audienceId } } : {}),
    // Germany converges on the pyramid's own node; Austria and Switzerland stay
    // anonymous because no node describes them and inventing one would be a
    // claim to a presence that does not exist. The reach itself is unchanged —
    // narrowing a service like Enterprise Web to Mittelhessen would be wrong.
    areaServed: service.areaServedIds
      ? service.areaServedIds.map((id) => ({ '@id': id }))
      : [
          { '@id': PLACE_DE_ID },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
  };
}

export function getDynamicLocationSchema(location: {
  city: string;
  description: string;
  url: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': location.url,
    parentOrganization: {
      '@id': ORG_ID,
    },
    name: `Coday Webdesign ${location.city}`,
    description: location.description,
    url: location.url,
    telephone: '+49-176-41195301',
    image: `${BASE_URL}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    ...(location.latitude && location.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: location.latitude,
            longitude: location.longitude,
          },
        }
      : {}),
  };
}

/* ═══ PAGE-SPECIFIC SCHEMAS ═══ */

export function getPricingSchema(locale: string = 'de') {
  const lang: PackageLocale = locale === 'en' ? 'en' : 'de';
  const pricingUrl = `${BASE_URL}/${locale}/pricing`;
  return {
    '@type': ['Service', 'Product'],
    '@id': `${pricingUrl}#pricing-product`,
    name: lang === 'en' ? 'Coday Website Packages' : 'Coday Website-Pakete',
    description:
      lang === 'en'
        ? 'Four website packages for businesses, from a compact business card site to an enterprise platform. Binding fixed-price quote after a free consultation.'
        : 'Vier Website-Pakete für Unternehmen, von der kompakten Visitenkarte bis zur Großplattform. Verbindliches Festpreis-Angebot nach kostenlosem Gespräch.',
    brand: { '@id': ORG_ID },
    provider: { '@id': ORG_ID },
    image: `${BASE_URL}/images/og-image.jpg`,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Hessen',
    },
    // No price values on purpose: quotes are individual ("Auf Anfrage").
    offers: {
      '@type': 'OfferCatalog',
      '@id': `${pricingUrl}#offer-catalog`,
      name: lang === 'en' ? 'Coday website packages' : 'Coday Website-Pakete',
      itemListElement: PACKAGE_LIST.map((pkg) => ({
        '@type': 'Offer',
        '@id': `${pricingUrl}#offer-${pkg.id}`,
        name: pkg.name[lang],
        availability: 'https://schema.org/InStock',
        url: `${pricingUrl}#packages-selection`,
        itemOffered: {
          '@type': 'Service',
          '@id': `${pricingUrl}#service-${pkg.id}`,
          name: pkg.name[lang],
          provider: { '@id': ORG_ID },
        },
      })),
    },
    ...getReviewsSchema(locale),
  };
}

export function getPortfolioSchema(
  projects: { name: string; url: string; description: string }[],
  locale: string = 'de'
) {
  return {
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/${locale}/work#portfolio`,
    name: locale === 'en' ? 'Coday Portfolio & References' : 'Coday Portfolio & Referenzen',
    description:
      locale === 'en'
        ? 'Real client projects by Coday in Wetzlar. Case studies with measurable results.'
        : 'Echte Kundenprojekte von Coday in Wetzlar. Case Studies mit messbaren Ergebnissen.',
    url: `${BASE_URL}/${locale}/work`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          url: p.url,
          description: p.description,
          creator: { '@id': ORG_ID },
        },
      })),
    },
  };
}

export function getWebSiteSchema(locale: string = 'de') {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Coday',
    alternateName: locale === 'en' ? 'Coday Web Design Wetzlar' : 'Coday Webdesign Wetzlar',
    description:
      locale === 'en'
        ? 'Web design agency in Wetzlar. Professional websites and website relaunches for companies in Central Hesse.'
        : 'Webdesign Agentur in Wetzlar. Professionelle Websites und Website Relaunch für Unternehmen in Mittelhessen.',
    publisher: {
      '@id': ORG_ID,
    },
    inLanguage: ['de-DE', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/de/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * HowTo for /process.
 *
 * The names and texts below mirror the four phases `ProcessClient` actually
 * renders, one for one. It previously described five differently-named steps
 * ("Kostenloses Erstgespräch", "Strategie & Konzept" …) that appear nowhere on
 * the page — structured data contradicting the content it annotates, which is
 * worse than having none.
 */
export function getProcessSchema(locale: string = 'de') {
  const isEn = locale === 'en';

  const steps = isEn
    ? [
        {
          name: 'Deep Audit & Strategy Workshop',
          text: 'Target audience analysis, competitor benchmarking and information architecture: Core Web Vitals audit, conversion roadmapping and a semantic topic-cluster plan.',
        },
        {
          name: 'High-End UI/UX Prototyping',
          text: 'A custom Figma design system with zero templates and full design sign-off before a line of code: interactive desktop and mobile prototype, typography tokens, conversion-optimised component hierarchy.',
        },
        {
          name: 'Next.js Enterprise Engineering',
          text: 'Hand-written TypeScript on Next.js 15 server components with Sanity headless CMS integration, built for sub-0.3s load times.',
        },
        {
          name: 'Launch, QA Gates & Growth Silo',
          text: 'Zero-downtime DNS cutover, Google Search Console indexing and continuous monitoring with conversion tracking in place.',
        },
      ]
    : [
        {
          name: 'Deep Audit & Strategie-Workshop',
          text: 'Fundierte Analyse Ihrer Wettbewerber und Zielgruppen, Definition von Sitemap und Conversion-Pfaden: Lighthouse- und Core-Web-Vitals-Audit, Conversion-Architektur, Keyword- und Topic-Cluster-Planung.',
        },
        {
          name: 'High-End UI/UX Prototyping',
          text: 'Individuelle Design-Konzepte in Figma mit 100 % Freigabe vor Entwicklungsstart: interaktiver Desktop- und Mobile-Prototyp, eigenes Design-System mit Typografie-Tokens, conversion-optimierte Komponenten.',
        },
        {
          name: 'Next.js Enterprise Engineering',
          text: 'Handgeschriebener TypeScript-Code mit Next.js 15 Server Components und Sanity-CMS-Integration, ausgelegt auf Ladezeiten unter 0,3 Sekunden.',
        },
        {
          name: 'Launch, QA Gates & Wachstums-Silo',
          text: 'Zero-Downtime-Migration, Indexierung über die Google Search Console und nachhaltiges Conversion-Tracking mit laufendem Monitoring.',
        },
      ];

  return {
    '@type': 'HowTo',
    '@id': `${BASE_URL}/${locale}/process#howto`,
    name: isEn ? 'How your website is created at Coday' : 'So entsteht Ihre Website bei Coday',
    description: isEn
      ? 'From the strategy workshop to launch — the structured web design process by Coday in four phases over roughly 24 days.'
      : 'Vom Strategie-Workshop bis zum Launch — der strukturierte Webdesign-Prozess von Coday in vier Phasen über rund 24 Tage.',
    // The page states days 1–24 across the four phases.
    totalTime: 'P24D',
    provider: { '@id': ORG_ID },
    // No per-step `url`: the page renders no anchor ids, so any fragment here
    // would point at nothing.
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * The node every page needs and none had: a WebPage that names the one entity
 * the page is answerable for.
 *
 * Without it nothing on this site can say "this URL owns this topic". All 24
 * city pages describe `Webdesign <Stadt>` and Google had only the prose to tell
 * them apart. `mainEntity` is that declaration, and the rule it enables — no two
 * pages may claim the same @id — is what stops them competing with each other.
 *
 * `breadcrumb` finally joins the click path to the entity graph. BreadcrumbList
 * carried no @id anywhere in the repo, so nothing could point at one.
 */
export function getWebPageSchema(opts: {
  url: string;
  name: string;
  description: string;
  locale: string;
  type?: 'WebPage' | 'CollectionPage' | 'ItemPage' | 'AboutPage' | 'ContactPage' | 'FAQPage';
  /** The @id of the single entity this page is responsible for. */
  mainEntityId?: string;
  /**
   * The @id of what the page is *about* without owning it — usually ORG_ID on
   * pages that describe the company from an angle (careers, guarantee, booking).
   * Distinct from mainEntityId, which is an ownership claim only one page may make.
   */
  aboutId?: string;
  primaryImage?: string;
  /** False only where the page emits no BreadcrumbList — the home page. */
  hasBreadcrumb?: boolean;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale === 'en' ? 'en-US' : 'de-DE',
    isPartOf: { '@id': WEBSITE_ID },
    ...(opts.hasBreadcrumb === false ? {} : { breadcrumb: { '@id': `${opts.url}#breadcrumb` } }),
    ...(opts.mainEntityId ? { mainEntity: { '@id': opts.mainEntityId } } : {}),
    ...(opts.aboutId ? { about: { '@id': opts.aboutId } } : {}),
    ...(opts.primaryImage
      ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.primaryImage } }
      : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

/**
 * `pageUrl` gives the list an @id so the page's WebPage node can reference it.
 * `item` stays a URL string rather than an {'@id'} reference: that is the form
 * Google documents and validates for breadcrumbs.
 *
 * No '@context' here — all 102 call sites push the result into a parent @graph
 * that already carries one.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[], pageUrl?: string) {
  return {
    ...(pageUrl ? { '@id': `${pageUrl}#breadcrumb` } : {}),
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `${BASE_URL}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getAboutSchema(locale: string = 'de') {
  return {
    '@type': 'AboutPage',
    '@id': `${BASE_URL}/${locale}/about#webpage`,
    url: `${BASE_URL}/${locale}/about`,
    name:
      locale === 'en'
        ? 'About Coday – Solo Web Agency Wetzlar'
        : 'Über Coday – Solo Webagentur Wetzlar',
    description:
      locale === 'en'
        ? 'Learn about Umutcan Emre Tezgel and the philosophy behind Coday Web: High-conversion websites, 100/100 PageSpeed, and direct developer communication.'
        : 'Erfahren Sie mehr über Umutcan Emre Tezgel und die Philosophie von Coday Web: Verkaufsstarke Webseiten, 100/100 PageSpeed und direkte Betreuung ohne Zwischenhändler.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': FOUNDER_ID },
  };
}

export function getContactSchema(locale: string = 'de') {
  return {
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/${locale}/contact#webpage`,
    url: `${BASE_URL}/${locale}/contact`,
    name: locale === 'en' ? 'Contact Coday Web Agency' : 'Kontakt zu Coday Webagentur Wetzlar',
    description:
      locale === 'en'
        ? 'Contact Coday Web for custom web design, SEO, and web development in Wetzlar and Central Hesse. Free initial consultation.'
        : 'Nehmen Sie Kontakt zu Coday Web auf für maßgeschneidertes Webdesign, SEO und Webentwicklung in Wetzlar und Mittelhessen. Kostenloses Erstgespräch.',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': `${BASE_URL}/#local-business` },
  };
}

export function getWebApplicationSchema(
  app: {
    name: string;
    description: string;
    url: string;
    applicationCategory?: string;
  },
  locale: string = 'de'
) {
  return {
    '@type': 'WebApplication',
    // Fragment, not the bare page URL: an @id equal to the document URI collides
    // with the page entity. Every other node in this file uses a fragment.
    '@id': `${app.url}#webapp`,
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory || 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: { '@id': ORG_ID },
    ...getReviewsSchema(locale),
  };
}

export function getCaseStudySchema(project: {
  title: string;
  client: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': project.url,
    headline: project.title,
    name: project.title,
    description: project.description,
    url: project.url,
    image: project.image ? [project.image] : [`${BASE_URL}/images/og-image.jpg`],
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    datePublished: project.datePublished || '2026-01-01',
    about: {
      '@type': 'Organization',
      name: project.client,
    },
  };
}

export function getIndustrySchema(industry: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': industry.url,
    name: `Webdesign für ${industry.name} – Coday Web`,
    description: industry.description,
    url: industry.url,
    serviceType: `Webdesign & Webentwicklung für ${industry.name}`,
    category: industry.category,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Marburg' },
      { '@type': 'AdministrativeArea', name: 'Mittelhessen' },
      { '@type': 'AdministrativeArea', name: 'Hessen' },
    ],
  };
}

export function getAcademyVideoSchemas(locale: string = 'de') {
  const lang = locale === 'en' ? 'en' : 'de';
  return academyData.map((course) => ({
    '@type': 'VideoObject',
    '@id': `${BASE_URL}/${locale}/knowledge/academy#${course.slug}`,
    name: course.content[lang].title,
    description: course.content[lang].description,
    thumbnailUrl: [`${BASE_URL}${course.image}`],
    uploadDate: course.uploadDate,
    duration: course.isoDuration,
    contentUrl: `${BASE_URL}${course.videoSrc}`,
    embedUrl: `${BASE_URL}/${locale}/knowledge/academy?video=${course.slug}`,
    inLanguage: locale,
    isFamilyFriendly: true,
    keywords: course.tags.join(', '),
    publisher: {
      '@id': ORG_ID,
    },
    // The canonical founder node, not a second id-less Person for the same human.
    author: { '@id': FOUNDER_ID },
    locationCreated: {
      '@type': 'Place',
      name: 'Wetzlar, Hessen, Deutschland',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wetzlar',
        addressRegion: 'Hessen',
        postalCode: '35578',
        addressCountry: 'DE',
      },
    },
  }));
}

export function getAcademyCollectionSchema(locale: string = 'de') {
  const isEn = locale === 'en';
  const videoSchemas = getAcademyVideoSchemas(locale);

  return {
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/${locale}/knowledge/academy#collection`,
    name: isEn
      ? 'Coday Web Design Academy & Video Masterclasses'
      : 'Coday Webdesign Academy & Video-Masterclasses Wetzlar',
    url: `${BASE_URL}/${locale}/knowledge/academy`,
    description: isEn
      ? 'Comprehensive video masterclasses and tutorials on web design, local SEO, conversion rate optimization, and modern Next.js development for businesses in Central Hesse.'
      : 'Umfassende Video-Masterclasses und Tutorials zu Webdesign, lokaler SEO, Conversion-Optimierung und modernster Next.js Entwicklung für Unternehmen in Wetzlar und Mittelhessen.',
    inLanguage: locale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': ORG_ID },
    ...getReviewsSchema(locale),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: videoSchemas.length,
      itemListElement: videoSchemas.map((video, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: video,
      })),
    },
  };
}
