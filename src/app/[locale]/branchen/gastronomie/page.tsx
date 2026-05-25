import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GastronomieClient from '@/features/industries/ui/GastronomieClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Gastronomy IT Solutions',
      description: 'Digital solutions for restaurants and gastronomy by Coday.',
      path: '/en/branchen/gastronomie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Gastronomie IT-Lösungen',
    description: 'Digitale Lösungen für Restaurants und Gastronomie von Coday.',
    path: '/de/branchen/gastronomie',
    type: 'money',
  });
}

export default async function GastronomiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GastronomieClient />;
}
