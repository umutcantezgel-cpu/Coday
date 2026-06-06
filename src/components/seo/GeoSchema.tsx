type SchemaType = 'Organization' | 'Article' | 'FAQPage';

interface GeoSchemaProps {
  type: SchemaType;
  data: Partial<{
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    updatedAt: string;
    faqs: { question: string; answer: string }[];
    [key: string]: unknown;
  }>;
}

export function GeoSchema({ type, data }: GeoSchemaProps) {
  const getOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Coday',
      url: 'https://www.codayweb.de',
      logo: 'https://www.codayweb.de/pwa-512.png',
      description: 'Agentur für moderne Webentwicklung und Generative Engine Optimization (GEO).',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wetzlar',
        addressRegion: 'Hessen',
        addressCountry: 'DE',
      },
      sameAs: [
        // Verknüpfung mit Entitäten für LLMs extrem wichtig!
        'https://www.linkedin.com/company/coday',
        // 'https://twitter.com/codayweb'
      ],
      ...data,
    };
  };

  const getArticleSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image,
      datePublished: data.publishedAt,
      dateModified: data.updatedAt || data.publishedAt,
      author: {
        '@type': 'Organization',
        name: 'Coday',
        url: 'https://www.codayweb.de',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Coday',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.codayweb.de/pwa-512.png',
        },
      },
    };
  };

  const getFAQSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity:
        data.faqs?.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })) || [],
    };
  };

  const getSchemaData = () => {
    switch (type) {
      case 'Organization':
        return getOrganizationSchema();
      case 'Article':
        return getArticleSchema();
      case 'FAQPage':
        return getFAQSchema();
      default:
        return null;
    }
  };

  const schemaData = getSchemaData();

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
