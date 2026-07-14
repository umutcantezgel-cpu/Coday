import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/AngebotHandwerkerClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Offer for Craftsmen | Central Hesse',
      description:
        'Special web design package for craftsmen in Wetzlar and Central Hesse. Fixed price, fast delivery and design that brings new clients. Inquire today.',
      path: '/en/angebot-handwerker',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Angebot für Handwerker | Mittelhessen',
    description:
      'Spezielles Webdesign Paket für Handwerker in Wetzlar und Mittelhessen. Festpreis, schnelle Umsetzung und Design das Aufträge bringt. Jetzt anfragen.',
    path: '/de/angebot-handwerker',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Offer for Craftsmen | Central Hesse | Coday'
      : 'Webdesign Angebot für Handwerker | Mittelhessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Special web design package for craftsmen in Wetzlar and Central Hesse. Fixed price, fast delivery and design that brings new clients. Inquire today.'
      : 'Spezielles Webdesign Paket für Handwerker in Wetzlar und Mittelhessen. Festpreis, schnelle Umsetzung und Design das Aufträge bringt. Jetzt anfragen.';
  return (
    <>
      <SeoHead
        title="Coday | angebot-handwerker"
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
    </>
  );
}
