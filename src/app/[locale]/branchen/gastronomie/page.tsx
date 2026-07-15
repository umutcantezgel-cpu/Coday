import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GastronomieClient from '@/features/industries/ui/GastronomieClient';
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
      title: 'Web Design for Restaurants & Gastronomy | Hesse',
      description:
        'Digital solutions for restaurants, cafes, and gastronomy in Hesse. Attract new guests with modern web design and improved online presence.',
      path: '/en/branchen/gastronomie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Restaurants & Gastronomie | Hessen',
    description:
      'Digitale Lösungen für Restaurants, Cafés und die Gastronomie in Hessen. Gewinnen Sie neue Gäste mit modernem Webdesign und besserer Online-Präsenz.',
    path: '/de/branchen/gastronomie',
    type: 'money',
  });
}

export default async function GastronomiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Restaurants & Gastronomy | Hesse | Coday'
      : 'Webdesign für Restaurants & Gastronomie | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Appetizing websites for restaurants and gastronomy in Wetzlar and Hesse. More guests through professional web design and strong local visibility.'
      : 'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.';
  return (
    <>
      <script
        id="schema-branchen-gastronomie"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/gastronomie`,
              }),
            ],
          }),
        }}
      />
      <GastronomieClient />
    </>
  );
}
