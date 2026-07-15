import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import PublicSectorClient from '@/features/industries/ui/PublicSectorClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for the Public Sector | Hesse Region',
      description:
        'Digitalization for the public sector in Hesse. We develop accessible, secure, and performant websites for authorities and municipalities.',
      path: '/en/branchen/public-sector',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für den Öffentlichen Sektor | Hessen',
    description:
      'Digitalisierung im öffentlichen Sektor in Hessen. Wir entwickeln barrierefreie, sichere und performante Webseiten für Behörden und Kommunen.',
    path: '/de/branchen/public-sector',
    type: 'money',
  });
}

export default async function PublicSectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for the Public Sector | Hesse Region | Coday'
      : 'Webdesign für den Öffentlichen Sektor | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.'
      : 'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.';
  return (
    <>
      <script
        id="schema-branchen-public-sector"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/public-sector`,
              }),
            ],
          }),
        }}
      />
      <PublicSectorClient />
    </>
  );
}
