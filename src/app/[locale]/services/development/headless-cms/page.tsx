import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { HeadlessCmsClient } from '@/features/services/ui/HeadlessCmsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Headless CMS Development Wetzlar | Flexible',
      description:
        'Modern headless CMS solutions by Coday in Wetzlar. Flexible content management with Sanity, Strapi or Contentful for your business in Hesse region.',
      path: '/en/services/development/headless-cms',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Headless CMS Entwicklung Wetzlar | Flexibel',
    description:
      'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.',
    path: '/de/services/development/headless-cms',
    type: 'money',
  });
}

export default async function HeadlessCmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeadlessCmsClient />;
}
