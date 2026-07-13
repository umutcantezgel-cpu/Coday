import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GastronomieClient from '@/features/industries/ui/GastronomieClient';
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
      title: 'Web Design for Restaurants & Gastronomy | Hesse',
      description:
        'Appetizing websites for restaurants and gastronomy in Wetzlar and Hesse. More guests through professional web design and strong local visibility.',
      path: '/en/branchen/gastronomie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Restaurants & Gastronomie | Hessen',
    description:
      'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.',
    path: '/de/branchen/gastronomie',
    type: 'money',
  });
}

export default async function GastronomiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
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
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Gastronomie',
                description:
                  'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.',
                url: `${BASE_URL}/de/branchen/gastronomie`,
              }),
            ],
          }),
        }}
      />
      <GastronomieClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
