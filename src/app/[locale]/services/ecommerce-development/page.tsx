import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EcommerceDevelopmentClient } from '@/features/services/ui/EcommerceDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'E-Commerce Shop Development | Wetzlar & Hesse',
      description:
        'Professional e-commerce and online shop development by Coday in Wetzlar. High performance and conversion rates for your business in Hesse. Get in touch.',
      path: '/en/services/ecommerce-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Onlineshop erstellen lassen | Wetzlar & Hessen',
    description:
      'Professionelle E-Commerce und Onlineshop Entwicklung von Coday in Wetzlar. Hohe Performance und Konversionsraten für Ihr Geschäft in Hessen. Anfragen.',
    path: '/de/services/ecommerce-development',
    type: 'money',
  });
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'E-Commerce Shop Development | Wetzlar & Hesse | Coday'
      : 'Onlineshop erstellen lassen | Wetzlar & Hessen | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <script
        id="schema-ecommerce"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Onlineshop erstellen lassen | Wetzlar & Hessen',
                description:
                  'Professionelle E-Commerce und Onlineshop Entwicklung von Coday in Wetzlar. Hohe Performance und Konversionsraten für Ihr Geschäft in Hessen. Anfragen.',
                url: `${BASE_URL}/de/services/ecommerce-development`,
              }),
            ],
          }),
        }}
      />
      <EcommerceDevelopmentClient />
    </>
  );
}
