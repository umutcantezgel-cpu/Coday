import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from '@/shared/data/reviews';

export const BASE_URL = 'https://www.codayweb.de';
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#founder`;

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

export function getOrganizationSchema(locale: string = 'de') {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ORG_ID,
    ...getReviewsSchema(locale),
    name: 'Coday',
    legalName: 'Umutcan Emre Tezgel',
    alternateName: ['Coday Webentwicklung', 'Coday Web Agency'],
    url: BASE_URL,
    image: `${BASE_URL}/images/og-image.jpg`,
    description:
      locale === 'en'
        ? 'Premium Web Design, high-conversion websites, and 100/100 PageSpeed SEO for businesses, craftsmen, and SMEs to acquire new customers and maximize digital presence in Wetzlar, Giessen, Hesse, and nationwide.'
        : 'Premium Webdesign, verkaufsstarke Websites und 100/100 PageSpeed SEO für Unternehmen, Handwerker und den Mittelstand zur Neukundengewinnung und maximalen Webpräsenz in Wetzlar, Gießen, Hessen und deutschlandweit.',
    slogan:
      locale === 'en'
        ? 'High-conversion websites and maximum digital attention.'
        : 'Verkaufsstarke Webseiten für maximale Kunden-Aufmerksamkeit.',
    email: 'kontakt@codayweb.de',
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
      caption: 'Coday – Webdesign & Webentwicklung Wetzlar Logo',
    },
    founder: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Umutcan Emre Tezgel',
      givenName: 'Umutcan Emre',
      familyName: 'Tezgel',
      jobTitle: 'Gründer & Web-Entwickler',
      worksFor: { '@id': ORG_ID },
      sameAs: [
        'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
        'https://github.com/umurey',
        'https://www.openpr.de/news/coday',
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
    areaServed: [
      { '@type': 'City', name: 'Wetzlar', '@id': 'https://www.wikidata.org/wiki/Q3852' },
      { '@type': 'City', name: 'Gießen', '@id': 'https://www.wikidata.org/wiki/Q3869' },
      { '@type': 'City', name: 'Marburg', '@id': 'https://www.wikidata.org/wiki/Q3866' },
      { '@type': 'City', name: 'Frankfurt am Main', '@id': 'https://www.wikidata.org/wiki/Q1794' },
      { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
      { '@type': 'AdministrativeArea', name: 'Hessen' },
      { '@type': 'Country', name: 'Germany' },
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
    hasMap: 'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
      'https://www.linkedin.com/company/coday',
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
      'https://github.com/coday',
      'https://www.instagram.com/codayweb',
      'https://www.youtube.com/@coday',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Services & Packages',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webdesign' } },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Next.js 15 Web Development' },
        },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO-Optimierung' } },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Generative Engine Optimization (GEO)' },
        },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Headless CMS (Sanity)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance-Optimierung' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce' } },
      ],
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
    ...getReviewsSchema(locale),
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
    hasMap: 'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
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
    hasMap: 'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl ? [post.imageUrl] : [`${BASE_URL}/images/og-image.jpg`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.authorName || 'Umutcan Emre Tezgel',
      url: BASE_URL,
    },
    publisher: {
      '@id': ORG_ID,
    },
  };
}

export function getServiceSchema(service: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': service.url,
    name: service.name,
    description: service.description,
    provider: {
      '@id': ORG_ID,
    },
    areaServed: [
      { '@type': 'Country', name: 'Germany' },
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
  return {
    '@type': 'Product',
    '@id': `${BASE_URL}/${locale}/pricing#product`,
    name: locale === 'en' ? 'Coday Web Design Packages' : 'Coday Webdesign Pakete',
    description:
      locale === 'en'
        ? 'Transparent fixed-price packages for professional web design. From one-pagers starting at €499 to enterprise solutions.'
        : 'Transparente Festpreis-Pakete für professionelles Webdesign. Vom Onepager ab 499 € bis zur Enterprise-Lösung.',
    brand: { '@id': ORG_ID },
    offers: [
      {
        '@type': 'Offer',
        name: 'Onepager',
        description: 'Perfekt als digitale Visitenkarte — 1 Seite, responsive, SEO-Basis',
        priceCurrency: 'EUR',
        price: '499',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/de/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Starter',
        description: 'Professionelle Website mit 3–5 Seiten, Basis-SEO, 30 Tage Support',
        priceCurrency: 'EUR',
        price: '1490',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/de/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Professional',
        description: 'Bestseller: 7–10 Seiten, CMS, erweitertes SEO, Blog, 5 Änderungsrunden',
        priceCurrency: 'EUR',
        price: '2990',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/de/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Enterprise',
        description: 'Bis zu 30 Seiten, Custom Development, Online-Shop optional, Premium SEO',
        priceCurrency: 'EUR',
        price: '5990',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/de/pricing`,
      },
      {
        '@type': 'Offer',
        name: 'Ultimate Domination',
        description:
          'Agentur-Partner-Paket: Unbegrenzte Seiten, Custom Logic, Lifetime Priority Support',
        priceCurrency: 'EUR',
        price: '12999',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/de/pricing`,
      },
    ],
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

export function getProcessSchema(locale: string = 'de') {
  return {
    '@type': 'HowTo',
    '@id': `${BASE_URL}/${locale}/process#howto`,
    name:
      locale === 'en'
        ? 'How your website is created at Coday'
        : 'So entsteht Ihre Website bei Coday',
    description:
      locale === 'en'
        ? 'From the initial consultation to launch — the structured web design process by Coday in 5 steps.'
        : 'Vom Erstgespräch bis zum Launch — der strukturierte Webdesign-Prozess von Coday in 5 Schritten.',
    totalTime: 'P21D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '2000',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Kostenloses Erstgespräch',
        text: 'Wir lernen Ihr Unternehmen, Ihre Ziele und Ihre Zielgruppe kennen. 30 Minuten, unverbindlich.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Strategie & Konzept',
        text: 'Basierend auf dem Erstgespräch erstelle ich ein maßgeschneidertes Konzept mit Seitenstruktur, Design-Richtung und technischer Architektur.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Design & Entwicklung',
        text: 'Ich entwickle Ihre Website mit Next.js, optimiert auf Performance, SEO und Nutzererlebnis. Sie sehen regelmäßig den Fortschritt.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Review & Feinschliff',
        text: 'Sie testen die Website, geben Feedback. Ich optimiere bis zur Perfektion — alles im Festpreis enthalten.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Launch & Übergabe',
        text: 'Ihre Website geht live. Sie erhalten 100% Code-Eigentum, Dokumentation und optionalen Support.',
      },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
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
    '@context': 'https://schema.org',
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

export function getWebApplicationSchema(app: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': app.url,
    name: app.name,
    description: app.description,
    url: app.url,
    applicationCategory: app.applicationCategory || 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: { '@id': ORG_ID },
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
