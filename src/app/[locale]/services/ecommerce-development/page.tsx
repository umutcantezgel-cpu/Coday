import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EcommerceDevelopmentClient } from '@/features/services/ui/EcommerceDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'E-Commerce Development',
      description: 'Custom e-commerce solutions with high performance and conversions by Coday.',
      path: '/en/services/ecommerce-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'E-Commerce Entwicklung',
    description: 'Individuelle E-Commerce Lösungen mit hoher Performance und Konversionsrate von Coday.',
    path: '/de/services/ecommerce-development',
    type: 'money',
  });
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EcommerceDevelopmentClient />;
}
