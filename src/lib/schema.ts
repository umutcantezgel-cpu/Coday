export const BASE_URL = 'https://www.codayweb.de';
export const ORG_ID = `${BASE_URL}/#organization`;
export const FOUNDER_ID = `${BASE_URL}/#founder`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Coday',
    alternateName: ['Web Fabrik Agentur', 'Coday Webentwicklung'],
    url: BASE_URL,
    image: `${BASE_URL}/logo.png`,
    description: 'High-End Webentwicklung & Generative Engine Optimization',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 600,
      height: 60,
    },
    founder: {
      '@type': 'Person',
      '@id': FOUNDER_ID,
      name: 'Umutcan Emre Tezgel',
      jobTitle: 'Founder & Lead Engineer',
      sameAs: [
        'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
        'https://github.com/umurey',
      ],
    },
    foundingDate: '2026-01-20',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      postalCode: '35578',
      addressLocality: 'Wetzlar',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
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
    ],
  };
}

export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#professional-service`,
    provider: {
      '@id': ORG_ID,
    },
    name: 'Coday Web Services',
    description: 'High-End Webentwicklung & Generative Engine Optimization',
    areaServed: [
      { '@type': 'City', name: 'Wetzlar' },
      { '@type': 'AdministrativeArea', name: 'Lahn-Dill-Kreis' },
      { '@type': 'AdministrativeArea', name: 'Hessen' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Austria' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    priceRange: '€€€',
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
    '@context': 'https://schema.org',
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
