import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ImmobilienClient from '@/features/industries/ui/ImmobilienClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Real Estate IT Solutions',
      description: 'Digital solutions for real estate and property management by Coday.',
      path: '/en/branchen/immobilien',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Immobilien IT-Lösungen',
    description: 'Digitale Lösungen für Immobilien und Hausverwaltung von Coday.',
    path: '/de/branchen/immobilien',
    type: 'money',
  });
}

export default async function ImmobilienPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ImmobilienClient />;
}
