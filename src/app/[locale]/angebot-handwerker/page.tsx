import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/AngebotHandwerkerClient';

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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Offer for Craftsmen | Central Hesse | Coday'
      : 'Webdesign Angebot für Handwerker | Mittelhessen | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <SeoHead
        title="Coday | angebot-handwerker"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
