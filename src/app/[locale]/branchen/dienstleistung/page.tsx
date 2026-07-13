import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import DienstleistungClient from '@/features/industries/ui/DienstleistungClient';
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
      title: 'Web Design for Service Providers | Wetzlar Hesse',
      description:
        'Professional websites for service providers in Wetzlar and Hesse. Tax advisors, brokers and consultants win more clients online. Get started today.',
      path: '/en/branchen/dienstleistung',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Dienstleister | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.',
    path: '/de/branchen/dienstleistung',
    type: 'money',
  });
}

export default async function DienstleistungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Service Providers | Wetzlar Hesse | Coday'
      : 'Webdesign für Dienstleister | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for service providers in Wetzlar and Hesse. Tax advisors, brokers and consultants win more clients online. Get started today.'
      : 'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.';
  return (
    <>
      <script
        id="schema-branchen-dienstleistung"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Dienstleister',
                description:
                  'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.',
                url: `${BASE_URL}/de/branchen/dienstleistung`,
              }),
            ],
          }),
        }}
      />
      <DienstleistungClient />
    </>
  );
}
