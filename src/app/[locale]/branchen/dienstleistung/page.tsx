import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import DienstleistungClient from '@/features/industries/ui/DienstleistungClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Service Industry IT Solutions',
      description: 'Digital solutions for the service industry by Coday.',
      path: '/en/branchen/dienstleistung',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Dienstleistung IT-Lösungen',
    description: 'Digitale Lösungen für Dienstleister von Coday.',
    path: '/de/branchen/dienstleistung',
    type: 'money',
  });
}

export default async function DienstleistungPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DienstleistungClient />;
}
