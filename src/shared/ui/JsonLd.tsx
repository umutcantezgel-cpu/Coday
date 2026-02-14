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
  pageType?: 'home' | 'service' | 'contact' | 'article' | 'job' | 'faq' | 'default';
  /** Data for specific schemas */
  data?: SchemaData;
}

export interface SchemaData {
  article?: ArticleSchema;
  jobs?: JobSchema[];
  service?: ServiceSchema;
  faq?: FAQSchema;
}

export interface FAQSchema {
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface ArticleSchema {
  headline: string;
  image: string;
  datePublished: string;
  author: string;
  description: string;
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
}

const BASE_URL = 'https://www.codayweb.de';

const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Coday',
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/favicon.svg`,
  },
  sameAs: ['https://www.linkedin.com/company/coday'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['de', 'en'],
  },
};

const WEBSITE_SCHEMA = {
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Coday',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['de-DE', 'en-US'],
};

const LOCAL_BUSINESS_SCHEMA = {
  '@type': 'ProfessionalService',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'Coday',
  url: BASE_URL,
  image: `${BASE_URL}/favicon.svg`,
  priceRange: '€€',
  areaServed: {
    '@type': 'Country',
    name: 'Germany',
  },
  serviceType: ['Web Development', 'Web Design', 'SEO', 'Digital Marketing', 'Branding'],
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
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
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
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: data.name,
    description: data.description,
    provider: { '@id': `${BASE_URL}/#organization` },
    serviceType: data.serviceType,
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
  };
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

export const JsonLd: React.FC<JsonLdProps> = ({
  breadcrumbs,
  pageType = 'default',
  data,
  pageUrl = BASE_URL,
}) => {
  const graph: Record<string, unknown>[] = [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA];

  if (pageType === 'home' || pageType === 'contact') {
    graph.push(LOCAL_BUSINESS_SCHEMA);
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbSchema(breadcrumbs));
  }

  if (pageType === 'article' && data?.article) {
    const article = buildArticleSchema(data.article, pageUrl);
    if (article) graph.push(article);
  }

  if (pageType === 'job' && data?.jobs) {
    data.jobs.forEach((job) => graph.push(buildJobSchema(job)));
  }

  if (pageType === 'service' && data?.service) {
    const service = buildServiceSchema(data.service, pageUrl);
    if (service) graph.push(service);
  }

  if (pageType === 'faq' && data?.faq) {
    const faq = buildFAQSchema(data.faq);
    if (faq) graph.push(faq);
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
