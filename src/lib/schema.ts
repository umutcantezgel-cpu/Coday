export const BASE_URL = 'https://www.codayweb.de';
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#founder`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: 'Coday',
    legalName: 'Coday UG (haftungsbeschränkt)',
    alternateName: ['Coday Webentwicklung', 'Coday Web Agency'],
    url: BASE_URL,
    image: `${BASE_URL}/images/og-image.jpg`,
    description:
      'High-End Next.js Webentwicklung & Generative Engine Optimization (GEO) für B2B-Unternehmen in Wetzlar, Gießen und Hessen.',
    slogan: 'Digitales Handwerk statt Template-Massenware.',
    taxID: '039 874 00784',
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: `${BASE_URL}/images/coday-logo.png`,
      contentUrl: `${BASE_URL}/images/coday-logo.png`,
      width: 512,
      height: 512,
      caption: 'Coday Logo',
    },
    founder: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Umutcan Emre Tezgel',
      givenName: 'Umutcan Emre',
      familyName: 'Tezgel',
      jobTitle: 'Gründer & Full-Stack Developer',
      worksFor: { '@id': ORG_ID },
      sameAs: [
        'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
        'https://github.com/umurey',
        'https://www.openpr.de/news/coday',
      ],
    },
    foundingDate: '2024',
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Headless CMS',
      'Sanity',
      'Supabase',
      'Enterprise Webentwicklung',
      'Search Engine Optimization',
      'Core Web Vitals',
      'Generative Engine Optimization',
      'E-Commerce',
      'Performance Optimization',
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
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'City', name: 'Gießen' },
      { '@type': 'City', name: 'Marburg' },
      { '@type': 'City', name: 'Frankfurt am Main' },
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
    sameAs: [
      'https://www.linkedin.com/company/coday',
      'https://github.com/coday',
      'https://www.instagram.com/codayweb',
    ],
  };
}

export function getProfessionalServiceSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#professional-service`,
    provider: {
      '@id': ORG_ID,
    },
    name: 'Coday Web Agency',
    legalName: 'Coday UG (haftungsbeschränkt)',
    description: 'High-End Webentwicklung & Generative Engine Optimization',
    url: BASE_URL,
    telephone: '+49-176-41195301',
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

export function getLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#local-business`,
    parentOrganization: {
      '@id': ORG_ID,
    },
    name: 'Coday - Webdesign Wetzlar',
    description: 'High-End Webentwicklung & Generative Engine Optimization',
    url: BASE_URL,
    telephone: '+49-176-41195301',
    image: `${BASE_URL}/logo.png`,
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
