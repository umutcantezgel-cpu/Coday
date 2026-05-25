import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import HandwerkClient from '@/features/industries/ui/HandwerkClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Crafts IT Solutions',
      description: 'Digital solutions for crafts and trades by Coday.',
      path: '/en/branchen/handwerk',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Handwerk IT-Lösungen',
    description: 'Digitale Lösungen für Handwerk und Gewerbe von Coday.',
    path: '/de/branchen/handwerk',
    type: 'money',
  });
}

export default async function HandwerkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HandwerkClient />;
}
