import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { ServicesOverview } from '@/features/services/ui/ServicesOverview';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design & SEO Services | Agency in Wetzlar',
      description:
        'All web design and SEO services from your agency in Wetzlar at a glance. From business websites to online shops, everything from one source. Inquire now.',
      path: '/en/services',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign & SEO Leistungen | Agentur in Wetzlar',
    description:
      'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.',
    path: '/de/services',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design & SEO Services | Agency in Wetzlar | Coday'
      : 'Webdesign & SEO Leistungen | Agentur in Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'All web design and SEO services from your agency in Wetzlar at a glance. From business websites to online shops, everything from one source. Inquire now.'
      : 'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.';
  return (
    <>
      <SeoHead
        title="Webseite erstellen lassen in Wetzlar & Mittelhessen | Coday"
        description="Wir erstellen Ihre Firmenwebseite in Wetzlar. Zuverlässig, schnell und sicher. Alle Leistungen aus einer Hand vom lokalen Webdesigner."
        pageType="default"
      />
      <ServicesOverview />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
