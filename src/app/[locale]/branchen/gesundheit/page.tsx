import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import GesundheitClient from '@/features/industries/ui/GesundheitClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Healthcare IT Solutions',
      description: 'Digital solutions for healthcare and medicine by Coday.',
      path: '/en/branchen/gesundheit',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Gesundheitswesen IT-Lösungen',
    description: 'Digitale Lösungen für Gesundheitswesen und Medizin von Coday.',
    path: '/de/branchen/gesundheit',
    type: 'money',
  });
}

export default async function GesundheitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GesundheitClient />;
}
