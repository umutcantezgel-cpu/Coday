import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ImmobilienClient from '@/features/industries/ui/ImmobilienClient';
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
      title: 'Web Design for Real Estate Agents | Wetzlar Hesse',
      description:
        'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.',
      path: '/en/branchen/immobilien',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Immobilienmakler | Wetzlar Hessen',
    description:
      'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.',
    path: '/de/branchen/immobilien',
    type: 'money',
  });
}

export default async function ImmobilienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script
        id="schema-branchen-immobilien"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Immobilienmakler',
                description:
                  'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.',
                url: `${BASE_URL}/de/branchen/immobilien`,
              }),
            ],
          }),
        }}
      />
      <ImmobilienClient />
    </>
  );
}
