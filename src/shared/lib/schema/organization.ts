import { Organization, Person } from 'schema-dts';

export const ORGANIZATION_ID = 'https://www.codayweb.de/#organization';
export const FOUNDER_ID = 'https://www.codayweb.de/#founder';
export const UMUT_ID = FOUNDER_ID;

export function getOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Coday',
    alternateName: [
      'Coday Web',
      'Webdesign Coday',
      'Webdesign Agentur Wetzlar',
      'Webentwicklung Wetzlar',
      'Coday Webagentur',
    ],
    url: 'https://www.codayweb.de',
    logo: 'https://www.codayweb.de/images/brand/coday-logo-footer.png',
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://www.google.com/maps?cid=8570940562624494590',
      'https://www.linkedin.com/company/coday',
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
      'https://github.com/coday',
      'https://www.instagram.com/codayweb',
      'https://www.youtube.com/@coday',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-176-41195301',
      contactType: 'customer service',
      email: 'umut@codayweb.de',
      areaServed: 'DE',
      availableLanguage: ['German', 'English'],
    },
    vatID: 'DE459754827',
    taxID: '039 874 00784',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lessingstraße 4',
      addressLocality: 'Wetzlar',
      postalCode: '35578',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
  };
}

export function getUmutSchema(): Person {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Umutcan Emre Tezgel',
    url: 'https://www.codayweb.de/de/about',
    jobTitle: 'Founder & Web Developer',
    sameAs: [
      'https://www.linkedin.com/in/umutcan-emre-tezgel-156382218/',
      'https://github.com/umurey',
      'https://www.openpr.de/news/coday',
    ],
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
  };
}
