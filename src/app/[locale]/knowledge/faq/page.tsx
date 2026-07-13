import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/FAQClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'FAQ | Web Design Agency Wetzlar Central Hesse',
      description:
        'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.',
      path: '/en/knowledge/faq',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar',
    description:
      'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.',
    path: '/de/knowledge/faq',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'FAQ | Web Design Agency Wetzlar Central Hesse | Coday'
      : 'Häufige Fragen (FAQ) | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Answers to frequently asked questions about web design, pricing and process at Coday in Wetzlar. Everything business owners in Hesse need to know.'
      : 'Antworten auf häufige Fragen zu Webdesign, Preisen und Ablauf bei Coday in Wetzlar. Alles was Unternehmer in Mittelhessen wissen müssen. Jetzt lesen.';
  return (
    <>
      <SeoHead title="Coday | faq" description="Erfahren Sie mehr über faq" pageType="default" />
      <ClientComponent />
    </>
  );
}
