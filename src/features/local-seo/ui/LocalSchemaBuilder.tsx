import React from 'react';
import { CityData } from '@/features/local-seo/model/cities';
import { getDynamicLocationSchema } from '@/lib/schema';

export const LocalSchemaBuilder: React.FC<{ city: CityData }> = ({ city }) => {
  const schema = getDynamicLocationSchema({
    city: city.displayName,
    description: `Premium Webdesign, B2B-Plattformen und lokale SEO-Dominanz für Handwerk und Industrie in ${city.displayName} und Umgebung.`,
    url: `https://www.codayweb.de/de/standorte/${city.slug}`,
  });

  // Optional: We could merge areaServed into the dynamic schema here,
  // but it's already a LocalBusiness which is fine.

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
