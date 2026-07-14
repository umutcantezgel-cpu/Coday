import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutClient } from '@/features/about/ui/AboutClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'About Your Web Design Agency in Wetzlar, Hesse',
      description:
        'Meet Coday, your personal web design agency in Wetzlar. We build websites for craftsmen, doctors and local businesses across Central Hesse. Learn more.',
      path: '/en/about',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Über Ihre Webdesign Agentur in Wetzlar, Hessen',
    description:
      'Lernen Sie Coday kennen, Ihre persönliche Webdesign Agentur in Wetzlar. Wir gestalten Webseiten für Handwerker, Ärzte und Unternehmen in Mittelhessen.',
    path: '/de/about',
    type: 'money',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'About Your Web Design Agency in Wetzlar, Hesse | Coday'
      : 'Über Ihre Webdesign Agentur in Wetzlar, Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Meet Coday, your personal web design agency in Wetzlar. We build websites for craftsmen, doctors and local businesses across Central Hesse. Learn more.'
      : 'Lernen Sie Coday kennen, Ihre persönliche Webdesign Agentur in Wetzlar. Wir gestalten Webseiten für Handwerker, Ärzte und Unternehmen in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Ihr Webdesigner in Wetzlar — Lernen Sie uns kennen | Coday"
        description="Lernen Sie Ihren lokalen Webdesigner in Wetzlar kennen. Persönliche Beratung, faire Preise und moderne Webseiten für Handwerk und Mittelstand."
        pageType="about"
      />
      <AboutClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
