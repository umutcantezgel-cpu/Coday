import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/legal/ui/GarantieClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Quality Guarantee | Web Design Wetzlar',
      description:
        'Coday guarantees premium web design from Wetzlar. Satisfaction, fixed price and on-time delivery for your business. For companies across Central Hesse.',
      path: '/en/garantie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Qualitätsgarantie | Webdesign Wetzlar',
    description:
      'Coday garantiert Ihnen Premium Webdesign aus Wetzlar. Zufriedenheit, Festpreis und termingerechte Lieferung. Für Unternehmen in ganz Mittelhessen.',
    path: '/de/garantie',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Our Quality Guarantee | Web Design Wetzlar | Coday'
      : 'Unsere Qualitätsgarantie | Webdesign Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Coday guarantees premium web design from Wetzlar. Satisfaction, fixed price and on-time delivery for your business. For companies across Central Hesse.'
      : 'Coday garantiert Ihnen Premium Webdesign aus Wetzlar. Zufriedenheit, Festpreis und termingerechte Lieferung. Für Unternehmen in ganz Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | garantie"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
      <SeoContentBlock />
    </>
  );
}
