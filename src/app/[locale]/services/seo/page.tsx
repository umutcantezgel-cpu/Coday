import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'SEO Agency Wetzlar | Regional Search Optimization',
      description:
        'Regional SEO and GEO optimization by Coday in Wetzlar. More visibility for your business in Central Hesse on Google. Get your free consultation today.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'SEO Agentur Wetzlar | Regionale Suchoptimierung',
    description:
      'Regionale SEO und GEO Optimierung von Coday in Wetzlar. Mehr Sichtbarkeit für Ihr Unternehmen in Mittelhessen bei Google. Jetzt kostenlos beraten lassen.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SeoClient />;
}
