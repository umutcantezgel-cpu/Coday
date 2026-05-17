import React from 'react';
import { CityData } from '@/features/local-seo/model/cities';

export const LocalSchemaBuilder: React.FC<{ city: CityData }> = ({ city }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebDesignCompany',
    name: `Coday - Webagentur für ${city.displayName}`,
    url: `https://coday.de/webagentur-${city.slug}`,
    logo: 'https://coday.de/logo.png',
    image: 'https://coday.de/og-image.jpg',
    description: `Premium Webdesign, B2B-Plattformen und lokale SEO-Dominanz für Handwerk und Industrie in ${city.displayName} und Umgebung.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wetzlar',
      addressRegion: 'Hessen',
      postalCode: '35578',
      streetAddress: 'Charlotte-Bamberg-Straße 2',
    },
    areaServed: {
      '@type': 'City',
      name: city.displayName,
      containedInPlace: {
        '@type': 'State',
        name: city.stateName,
      },
    },
    provider: {
      '@type': 'Organization',
      name: 'Coday',
      url: 'https://coday.de',
    },
    priceRange: '$$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
