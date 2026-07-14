import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/LocalWetzlarClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Designer Wetzlar | Local Website Experts',
      description:
        'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.',
      path: '/en/landingpages/localwetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesigner Wetzlar | Lokale Webseiten Experten',
    description:
      'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.',
    path: '/de/landingpages/localwetzlar',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Designer Wetzlar | Local Website Experts | Coday'
      : 'Webdesigner Wetzlar | Lokale Webseiten Experten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.'
      : 'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | localwetzlar"
        description="Erfahren Sie mehr über localwetzlar"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
      <SeoContentBlock />
    </>
  );
}
