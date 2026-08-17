import { Organization, Person } from 'schema-dts';

export const ORGANIZATION_ID = 'https://www.codayweb.de/#organization';
export const UMUT_ID = 'https://www.codayweb.de/#umut';

export function getOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Coday',
    url: 'https://www.codayweb.de',
    logo: 'https://www.codayweb.de/images/brand/coday-logo-footer.webp',
    sameAs: [
      'https://www.linkedin.com/in/umutcan-tezgel',
      'https://twitter.com/codayweb',
      'https://www.instagram.com/codayweb/',
      'https://www.facebook.com/profile.php?id=61588758264018',
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
      addressLocality: 'Wetzlar',
      addressCountry: 'DE',
    },
  };
}

export function getUmutSchema(): Person {
  return {
    '@type': 'Person',
    '@id': UMUT_ID,
    name: 'Umutcan Tezgel',
    url: 'https://www.codayweb.de/de/about',
    jobTitle: 'Founder & Full-Stack Developer',
    sameAs: [
      'https://www.linkedin.com/in/umutcan-tezgel',
      'https://www.facebook.com/profile.php?id=61588758264018',
    ],
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
  };
}
