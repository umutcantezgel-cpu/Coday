import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'SEO & GEO Optimization',
      description: 'Search Engine Optimization and Generative Engine Optimization strategies by Coday.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'SEO & GEO Optimierung',
    description: 'Suchmaschinenoptimierung und Generative Engine Optimization Strategien von Coday.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SeoClient />;
}
