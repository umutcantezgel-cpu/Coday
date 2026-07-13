import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/GastronomieClient';

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
      path: '/en/industries/gastronomie',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Gastronomie & Restaurants | Hessen',
    description:
      'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.',
    path: '/de/industries/gastronomie',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Restaurants & Gastronomy | Hesse | Coday'
      : 'Webdesign für Gastronomie & Restaurants | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Appetizing websites for restaurants and gastronomy in Wetzlar and Hesse. More guests through professional web design and strong local visibility.'
      : 'Appetitliche Webseiten für Restaurants und Gastronomie in Wetzlar und Hessen. Mehr Gäste durch professionelles Webdesign und lokale Auffindbarkeit.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <SeoHead
        title="Coday | gastronomie"
        description="Erfahren Sie mehr über gastronomie"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
