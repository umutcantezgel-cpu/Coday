import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/work/ui/WorkClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Work | Web Design Portfolio Wetzlar Hesse',
      description:
        'The complete web design portfolio from Coday in Wetzlar. Successful projects for businesses in Central Hesse and beyond. Get inspired by our work.',
      path: '/en/work/work',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Arbeiten | Webdesign Portfolio Wetzlar',
    description:
      'Das komplette Webdesign Portfolio von Coday in Wetzlar. Erfolgreiche Projekte für Unternehmen in Mittelhessen und Hessen. Lassen Sie sich inspirieren.',
    path: '/de/work/work',
    type: 'noindex',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Portfolio' : 'Portfolio', url: `/${_locale}/work` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization already comes from the root layout — this graph carries breadcrumbs only.
    '@graph': [breadcrumbs],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
    </>
  );
}
