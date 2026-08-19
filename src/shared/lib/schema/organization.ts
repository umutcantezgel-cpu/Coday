import { Organization, Person } from 'schema-dts';
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from '@/shared/data/reviews';

export const ORGANIZATION_ID = 'https://www.codayweb.de/#organization';
export const UMUT_ID = 'https://www.codayweb.de/#umut';

export function getOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Coday',
    url: 'https://www.codayweb.de',
    logo: 'https://www.codayweb.de/images/brand/coday-logo-footer.webp',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS_SUMMARY.ratingValue,
      reviewCount: REVIEWS_SUMMARY.reviewCount,
      bestRating: REVIEWS_SUMMARY.bestRating,
      worstRating: REVIEWS_SUMMARY.worstRating,
    },
    review: GOOGLE_REVIEWS.map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: review.authorName,
      },
      datePublished: review.datePublished,
      reviewBody: review.quote.de,
    })),
    sameAs: [
      'https://www.provenexpert.com/de-de/coday-webagentur/',
      'https://maps.app.goo.gl/9SagecgXw7Vf5csH7',
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
    jobTitle: 'Founder & Web Developer',
    sameAs: [
      'https://www.linkedin.com/in/umutcan-tezgel',
      'https://www.facebook.com/profile.php?id=61588758264018',
    ],
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
  };
}
