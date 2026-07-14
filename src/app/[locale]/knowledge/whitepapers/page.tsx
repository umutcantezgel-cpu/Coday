import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/WhitepapersClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Whitepapers & Studies | Web Design Agency Hesse',
      description:
        'Free whitepapers and studies on web design and digital marketing from Coday in Wetzlar. Expert knowledge for business owners across Central Hesse.',
      path: '/en/knowledge/whitepapers',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Whitepapers & Studien | Webdesign Agentur Hessen',
    description:
      'Kostenlose Whitepapers und Studien zu Webdesign und digitalem Marketing von Coday in Wetzlar. Expertenwissen für Unternehmer in Mittelhessen.',
    path: '/de/knowledge/whitepapers',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Whitepapers & Studies | Web Design Agency Hesse | Coday'
      : 'Whitepapers & Studien | Webdesign Agentur Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Free whitepapers and studies on web design and digital marketing from Coday in Wetzlar. Expert knowledge for business owners across Central Hesse.'
      : 'Kostenlose Whitepapers und Studien zu Webdesign und digitalem Marketing von Coday in Wetzlar. Expertenwissen für Unternehmer in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | whitepapers"
        description="Erfahren Sie mehr über whitepapers"
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
