import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Schema.org JSON-LD structured data for Coday.
 * Renders Organization, WebSite (with SearchAction), and optional LocalBusiness + BreadcrumbList.
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  /** Current page URL (full, with lang prefix) */
  pageUrl?: string;
  /** Optional breadcrumb trail */
  breadcrumbs?: BreadcrumbItem[];
  /** Page type — used to select which schemas to include */
  pageType?: 'home' | 'service' | 'contact' | 'article' | 'job' | 'faq' | 'about' | 'default';
  /** Data for specific schemas */
  data?: SchemaData;
}

export interface VideoSchema {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601, e.g. 'PT10M30S'
  contentUrl?: string;
  embedUrl: string;
}

export interface DefinedTermSchema {
  name: string;
  description: string;
  termCode?: string;
  inDefinedTermSet?: string;
}

export interface SchemaData {
  article?: ArticleSchema;
  claimReviews?: ClaimReviewSchema[];
  jobs?: JobSchema[];
  service?: ServiceSchema;
  faq?: FAQSchema;
  softwareApp?: SoftwareAppSchema;
  video?: VideoSchema;
  definedTerm?: DefinedTermSchema;
  howTo?: HowToSchema;
  dataset?: DatasetSchema;
  aggregateRating?: AggregateRatingSchema;
}

export interface AggregateRatingSchema {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface DatasetSchema {
  name: string;
  description: string;
  url: string;
  license: string;
  dateModified?: string;
  distribution?: {
    encodingFormat: string;
    contentUrl: string;
  }[];
}

export interface HowToSchema {
  name: string;
  description: string;
  totalTime?: string;
  tool?: string[];
  step: {
    name: string;
    text: string;
    url?: string;
    image?: string;
  }[];
}

export interface FAQSchema {
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface ClaimReviewSchema {
  claimReviewed: string;
  reviewRating: {
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    alternateName: string; // e.g., "Mythos", "Teilweise Wahr", "Realität"
  };
}

export interface ArticleSchema {
  type?: 'BlogPosting' | 'Article' | 'OpinionNewsArticle';
  headline: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  description: string;
  wordCount?: number;
  articleSection?: string;
  keywords?: string[];
}

export interface JobSchema {
  title: string;
  description: string;
  location: string;
  type: string;
  datePosted?: string;
}

export interface ServiceSchema {
  name: string;
  description: string;
  serviceType: string;
  audience?: {
    '@type': 'Audience';
    audienceType: string;
  };
  offers?: {
    '@type': 'Offer';
    price?: number;
    priceCurrency?: string;
    availability?: string;
    eligibleRegion?: {
      '@type': 'Country' | 'City' | 'State';
      name: string;
    };
    priceSpecification?: {
      '@type': 'PriceSpecification';
      minPrice: number;
      maxPrice: number;
      priceCurrency: string;
    };
  };
  areaServed?: {
    '@type': 'Country' | 'City' | 'State';
    name: string;
    containedInPlace?: {
      '@type': 'State' | 'Country';
      name: string;
    };
  };
}

export interface SoftwareAppSchema {
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

const BASE_URL = 'https://www.codayweb.de';

const ORGANIZATION_SCHEMA = {
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  '@id': `${BASE_URL}/#organization`,
  name: 'Coday',
  alternateName: ['Coday UG', 'Coday Webentwicklung', 'Coday Web Agency'],
  url: BASE_URL,
  description:
    'Premium Webdesign & Performance-Marketing für moderne Unternehmen. Die Anti-Agentur aus Wetzlar.',
  email: 'kontakt@codayweb.de',
  telephone: '+49-176-41195301',
  foundingDate: '2024',
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Bank Transfer, Invoice',
  slogan: 'Die Anti-Agentur aus Wetzlar',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 3,
  },
  knowsAbout: [
    'Web Development',
    'React',
    'React Router v7',
    'TypeScript',
    'Search Engine Optimization',
    'Core Web Vitals',
    'Headless CMS',
    'E-Commerce',
    'UI/UX Design',
    'Performance Optimization',
    'Generative Engine Optimization',
  ],
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE_URL}/#logo`,
    url: `${BASE_URL}/images/coday-logo.png`,
    contentUrl: `${BASE_URL}/images/coday-logo.png`,
    width: 512,
    height: 512,
    caption: 'Coday Logo',
  },
  image: `${BASE_URL}/images/og-image.jpg`,
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#founder`,
    name: 'Umutcan Tezgel',
    jobTitle: 'Founder & Lead Developer',
    url: `${BASE_URL}/de/ueber-uns`,
    sameAs: ['https://www.linkedin.com/in/umutcantezgel', 'https://github.com/umutcantezgel'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lessingstraße 4',
    addressLocality: 'Wetzlar',
    postalCode: '35578',
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
  sameAs: [
    'https://www.linkedin.com/company/coday',
    'https://www.linkedin.com/in/umutcantezgel',
    'https://twitter.com/coday',
    'https://www.instagram.com/codayweb',
    'https://github.com/coday',
    'https://www.youtube.com/@coday',
    'https://www.xing.com/pages/coday',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-176-41195301',
    contactType: 'customer service',
    availableLanguage: ['German', 'English'],
    areaServed: 'DE',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Wetzlar',
      '@id': 'https://www.wikidata.org/wiki/Q3852',
    },
    {
      '@type': 'City',
      name: 'Gießen',
      '@id': 'https://www.wikidata.org/wiki/Q3869',
    },
    {
      '@type': 'City',
      name: 'Marburg',
      '@id': 'https://www.wikidata.org/wiki/Q3866',
    },
    {
      '@type': 'City',
      name: 'Frankfurt am Main',
      '@id': 'https://www.wikidata.org/wiki/Q1794',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Lahn-Dill-Kreis',
    },
    {
      '@type': 'Country',
      name: 'Germany',
    },
  ],
  knowsLanguage: ['de', 'en'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webdesign' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webentwicklung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO-Optimierung' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'React & Next.js Entwicklung' },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Headless CMS' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance-Optimierung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WordPress-Migration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO-Optimization' } },
    ],
  },
};

const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Coday',
  alternateName: 'Coday Webentwicklung',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['de-DE', 'en-US'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/en/knowledge/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildArticleSchema(data: ArticleSchema, url: string) {
  if (!data) return null;
  const schema: Record<string, unknown> = {
    '@type': data.type || 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: data.headline,
    description: data.description,
    image: data.image.startsWith('http') ? data.image : `${BASE_URL}${data.image}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author,
      url: `${BASE_URL}/about`,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
  };
  if (data.wordCount) schema.wordCount = data.wordCount;
  if (data.articleSection) schema.articleSection = data.articleSection;
  if (data.keywords && data.keywords.length > 0) schema.keywords = data.keywords.join(', ');
  return schema;
}

function buildClaimReviewSchema(data: ClaimReviewSchema, url: string) {
  return {
    '@type': 'ClaimReview',
    url: url,
    claimReviewed: data.claimReviewed,
    itemReviewed: {
      '@type': 'Claim',
      author: {
        '@type': 'Organization',
        name: 'Branchenstandard / Mythen',
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.reviewRating.ratingValue,
      bestRating: data.reviewRating.bestRating,
      worstRating: data.reviewRating.worstRating,
      alternateName: data.reviewRating.alternateName,
    },
    author: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
  };
}

function buildJobSchema(job: JobSchema) {
  return {
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted || new Date().toISOString().split('T')[0], // Fallback to today if missing
    validThrough: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split('T')[0],
    employmentType: job.type === 'Vollzeit' ? 'FULL_TIME' : 'PART_TIME', // Simple mapping
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Coday',
      sameAs: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'DE',
      },
    },
  };
}

function buildServiceSchema(data: ServiceSchema, url: string) {
  if (!data) return null;
  const schema: Record<string, unknown> = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: data.name,
    description: data.description,
    provider: { '@id': `${BASE_URL}/#organization` },
    serviceType: data.serviceType,
    areaServed: data.areaServed || {
      '@type': 'Country',
      name: 'Germany',
    },
  };

  if (data.offers) {
    schema.offers = data.offers;
  }

  if (data.audience) {
    schema.audience = data.audience;
  }

  return schema;
}

function buildFAQSchema(data: FAQSchema) {
  if (!data) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

function buildSoftwareAppSchema(data: SoftwareAppSchema) {
  if (!data) return null;
  return {
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory || 'BusinessApplication',
    operatingSystem: data.operatingSystem || 'Web',
    offers: data.offers
      ? {
          '@type': 'Offer',
          price: data.offers.price,
          priceCurrency: data.offers.priceCurrency,
        }
      : undefined,
    provider: { '@id': `${BASE_URL}/#organization` },
  };
}

function buildVideoSchema(data: VideoSchema) {
  if (!data) return null;
  return {
    '@type': 'VideoObject',
    name: data.name,
    description: data.description,
    thumbnailUrl: data.thumbnailUrl,
    uploadDate: data.uploadDate,
    duration: data.duration,
    contentUrl: data.contentUrl,
    embedUrl: data.embedUrl,
    publisher: { '@id': `${BASE_URL}/#organization` },
  };
}

function buildAboutPageSchema(url: string) {
  return {
    '@type': 'AboutPage',
    '@id': `${url}#webpage`,
    url: url,
    name: 'Über Uns | Coday',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
    mentions: [
      {
        '@type': 'Thing',
        name: 'Webentwicklung',
        sameAs: 'https://de.wikipedia.org/wiki/Webentwicklung',
      },
      {
        '@type': 'Thing',
        name: 'Suchmaschinenoptimierung',
        sameAs: 'https://de.wikipedia.org/wiki/Suchmaschinenoptimierung',
      },
      {
        '@type': 'Thing',
        name: 'React',
        sameAs: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
      },
      {
        '@type': 'Thing',
        name: 'React Router',
        sameAs: 'https://en.wikipedia.org/wiki/React_Router',
      },
      { '@type': 'Thing', name: 'Next.js', sameAs: 'https://en.wikipedia.org/wiki/Next.js' },
    ],
  };
}

function buildContactPageSchema(url: string) {
  return {
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    url: url,
    name: 'Kontakt | Coday',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
  };
}

function buildWebPageSchema(url: string, name?: string) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url: url,
    name: name || 'Coday',
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#organization` },
  };
}

function buildDefinedTermSchema(data: DefinedTermSchema, url: string) {
  if (!data) return null;
  return {
    '@type': 'DefinedTerm',
    '@id': `${url}#definedTerm`,
    name: data.name,
    description: data.description,
    termCode: data.termCode,
    inDefinedTermSet: data.inDefinedTermSet || `${BASE_URL}/knowledge`,
    url: url,
  };
}

function buildHowToSchema(data: HowToSchema, url: string) {
  if (!data) return null;
  return {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: data.name,
    description: data.description,
    ...(data.totalTime && { totalTime: data.totalTime }),
    ...(data.tool && { tool: data.tool.map((t) => ({ '@type': 'HowToTool', name: t })) }),
    step: data.step.map((s) => ({
      '@type': 'HowToStep',
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
      ...(s.image && { image: s.image }),
    })),
  };
}

function buildDatasetSchema(data: DatasetSchema, url: string) {
  if (!data) return null;
  return {
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name: data.name,
    description: data.description,
    url: data.url,
    license: data.license,
    ...(data.dateModified && { dateModified: data.dateModified }),
    creator: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
    },
    ...(data.distribution && {
      distribution: data.distribution.map((d) => ({
        '@type': 'DataDownload',
        encodingFormat: d.encodingFormat,
        contentUrl: d.contentUrl,
      })),
    }),
  };
}

export const JsonLd: React.FC<JsonLdProps> = ({
  breadcrumbs,
  pageType = 'default',
  data,
  pageUrl = BASE_URL,
}) => {
  const orgSchema: Record<string, unknown> = { ...ORGANIZATION_SCHEMA };
  if (data?.aggregateRating) {
    orgSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: data.aggregateRating.ratingValue.toString(),
      reviewCount: data.aggregateRating.reviewCount.toString(),
      ...(data.aggregateRating.bestRating && {
        bestRating: data.aggregateRating.bestRating.toString(),
      }),
      ...(data.aggregateRating.worstRating && {
        worstRating: data.aggregateRating.worstRating.toString(),
      }),
    };
  }

  const graph: Record<string, unknown>[] = [orgSchema, WEBSITE_SCHEMA];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbSchema(breadcrumbs));
  }

  if (pageType === 'article' && data?.article) {
    const article = buildArticleSchema(data.article, pageUrl);
    if (article) graph.push(article);
  }

  if (data?.claimReviews) {
    data.claimReviews.forEach((cr) => {
      graph.push(buildClaimReviewSchema(cr, pageUrl));
    });
  }

  if (pageType === 'job' && data?.jobs) {
    data.jobs.forEach((job) => graph.push(buildJobSchema(job)));
  }

  if (pageType === 'service' && data?.service) {
    const service = buildServiceSchema(data.service, pageUrl);
    if (service) graph.push(service);
  }

  // FAQ schema can appear on any page type (service pages, blog posts, etc.)
  if (data?.faq) {
    const faq = buildFAQSchema(data.faq);
    if (faq) graph.push(faq);
  }

  if (data?.softwareApp) {
    const app = buildSoftwareAppSchema(data.softwareApp);
    if (app) graph.push(app);
  }

  if (data?.video) {
    const video = buildVideoSchema(data.video);
    if (video) graph.push(video);
  }

  if (data?.definedTerm) {
    const definedTerm = buildDefinedTermSchema(data.definedTerm, pageUrl);
    if (definedTerm) graph.push(definedTerm);
  }

  if (data?.howTo) {
    const howTo = buildHowToSchema(data.howTo, pageUrl);
    if (howTo) graph.push(howTo);
  }

  if (pageType === 'about') {
    graph.push(buildAboutPageSchema(pageUrl));
  }

  if (pageType === 'contact') {
    graph.push(buildContactPageSchema(pageUrl));
  }

  if (pageType === 'default' || pageType === 'home') {
    graph.push(buildWebPageSchema(pageUrl));
  }

  if (data?.dataset) {
    const dataset = buildDatasetSchema(data.dataset, pageUrl);
    if (dataset) graph.push(dataset);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
