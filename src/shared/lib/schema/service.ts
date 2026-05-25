import { OfferCatalog, Service } from 'schema-dts';
import { ORGANIZATION_ID } from './organization';

export interface ServiceInput {
  name: string;
  description: string;
  url: string;
  category?: string;
  packages?: Array<{
    name: string;
    description: string;
    price?: number;
    currency?: string;
  }>;
}

export function generateServiceSchema(data: ServiceInput): Service {
  const schema: Service = {
    '@type': 'Service',
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      '@id': ORGANIZATION_ID,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'B2B',
    },
  };

  if (data.category) {
    schema.serviceType = data.category;
  }

  if (data.packages && data.packages.length > 0) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${data.name} Packages`,
      itemListElement: data.packages.map((pkg) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          description: pkg.description,
        },
        ...(pkg.price && pkg.currency
          ? {
              price: pkg.price,
              priceCurrency: pkg.currency,
            }
          : {}),
      })),
    } as OfferCatalog;
  }

  return schema;
}
