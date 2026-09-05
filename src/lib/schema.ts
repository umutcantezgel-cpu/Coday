import { serviceNodeForPath } from '@/features/services/model/serviceTree';
import { PACKAGE_LIST, type Locale as PackageLocale } from '@/shared/data/packages';
import { academyData } from '@/shared/data/academy';
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from '@/shared/data/reviews';

export const BASE_URL = 'https://www.codayweb.de';
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#founder`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

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
      '@type': 'Brand',
      name: 'Coday',
    },
    // The 5-star aggregateRating and customer reviews live here on Product.
    // Under Google guidelines, Product is eligible for rich review star snippets in SERP,
    // while Organization/LocalBusiness reviews are filtered as self-serving.
    // No `offers` is emitted: quotes are individual, which satisfies Google without requiring a price.
    ...getReviewsSchema(locale),
  };
}

export function getOrganizationSchema(locale: string = 'de') {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ORG_ID,
    // NO aggregateRating/review here: Google ignores self-serving stars on
    // Organization/LocalBusiness, and #organization appears on every page in layout.tsx.
    // Emitting reviews here caused duplicate AggregateRating collisions.
    // Reviews live on Product nodes (#webdesign-package) where Google renders rich star snippets in SERP.
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
    // Points at the post's WebPage node rather than the bare document URL. There
    // was no node with that bare @id, so this edge resolved to nothing on every
    // single blog post; the WebPage node that fixes it did not exist until the
    // page-ownership slice created one.
    mainEntityOfPage: { '@id': `${post.url}#webpage` },
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

/* ═══ PAGE-SPECIFIC SCHEMAS ═══ */

export function getPricingSchema(locale: string = 'de') {
  const lang: PackageLocale = locale === 'en' ? 'en' : 'de';
  const pricingUrl = `${BASE_URL}/${locale}/pricing`;
  return {
    '@type': 'Service',
    '@id': `${pricingUrl}#pricing-service`,
    name: lang === 'en' ? 'Coday Website Packages' : 'Coday Website-Pakete',
    description:
      lang === 'en'
        ? 'Four website packages for businesses, from a compact business card site to an enterprise platform. Binding fixed-price quote after a free consultation.'
        : 'Vier Website-Pakete für Unternehmen, von der kompakten Visitenkarte bis zur Großplattform. Verbindliches Festpreis-Angebot nach kostenlosem Gespräch.',
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

/**
 * `pageUrl` gives the node an @id so a WebPage can name it as its mainEntity —
 * which is what /knowledge/faq needs, since the question set is the entity that
 * page exists for. Optional because most FAQ blocks sit under a page that owns
 * something else, and an id on those buys nothing.
 *
 * Note on duplicates: `RelevantFAQs` can also emit an FAQPage, and two in one
 * document is a rich-result validity risk. Verified across the build that no
 * page currently has two — and qa:graph now fails the build if one ever does,
 * which is stronger than the comment that used to guard this.
 */
export function getFaqSchema(faqs: { question: string; answer: string }[], pageUrl?: string) {
  return {
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq` } : {}),
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
    // References, not copies. The academy page also spreads the same
    // VideoObjects into its @graph at top level, so embedding them here put
    // every one of the eight @ids into the document twice.
    mainEntity: {
      '@type': 'ItemList',
      '@id': `${BASE_URL}/${locale}/knowledge/academy#itemlist`,
      numberOfItems: videoSchemas.length,
      itemListElement: videoSchemas.map((video, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: { '@id': video['@id'] },
      })),
    },
  };
}
