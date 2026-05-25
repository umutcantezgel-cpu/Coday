import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import RetailClient from '@/features/industries/ui/RetailClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Retail IT Solutions',
      description: 'Digital solutions for retail and e-commerce by Coday.',
      path: '/en/branchen/retail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Einzelhandel IT-Lösungen',
    description: 'Digitale Lösungen für Einzelhandel und E-Commerce von Coday.',
    path: '/de/branchen/retail',
    type: 'money',
  });
}

export default async function RetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RetailClient />;
}
