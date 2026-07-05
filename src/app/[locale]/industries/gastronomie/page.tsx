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

  return (
    <>
      <SeoHead
        title="Coday | gastronomie"
        description="Erfahren Sie mehr über gastronomie"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
