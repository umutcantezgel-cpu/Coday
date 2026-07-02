import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GastronomieClient from '@/features/industries/ui/GastronomieClient';
import { setRequestLocale } from 'next-intl/server';

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
  return <GastronomieClient />;
}
