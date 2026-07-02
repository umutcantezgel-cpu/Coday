import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/BlogClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Blog | Tips & Trends from Wetzlar',
      description:
        'Latest web design tips, SEO trends and digital strategies from Coday in Wetzlar. Practical knowledge for craftsmen and businesses in Central Hesse.',
      path: '/en/knowledge/blog',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Blog | Tipps & Trends aus Wetzlar',
    description:
      'Aktuelle Webdesign Tipps, SEO Trends und digitale Strategien von Coday in Wetzlar. Praxiswissen für Handwerker und Unternehmen in Mittelhessen.',
    path: '/de/knowledge/blog',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead title="Coday | blog" description="Erfahren Sie mehr über blog" pageType="default" />
      <ClientComponent />
    </>
  );
}
