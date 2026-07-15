import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ImmobilienClient from '@/features/industries/ui/ImmobilienClient';
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
      title: 'Web Design for Real Estate Agents | Wetzlar Hesse',
      description:
        'Web development for real estate agents in Wetzlar and Hesse. Impress clients with excellent property listings and targeted online lead generation.',
      path: '/en/branchen/immobilien',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Immobilienmakler | Wetzlar Hessen',
    description:
      'Webentwicklung für Immobilienmakler in Wetzlar und ganz Hessen. Überzeugen Sie mit exzellenten Exposés und zielgerichteter Lead-Generierung online.',
    path: '/de/branchen/immobilien',
    type: 'money',
  });
}

export default async function ImmobilienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Real Estate Agents | Wetzlar Hesse | Coday'
      : 'Webdesign für Immobilienmakler | Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.'
      : 'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-branchen-immobilien"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/immobilien`,
              }),
            ],
          }),
        }}
      />
      <ImmobilienClient />
    </>
  );
}
