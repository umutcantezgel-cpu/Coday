import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutClient } from '@/features/about/ui/AboutClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Ihr Webdesigner in Wetzlar — Lernen Sie uns kennen | Coday',
    description:
      'Lernen Sie Ihren lokalen Webdesigner in Wetzlar kennen. Persönliche Beratung, faire Preise und moderne Webseiten für Handwerk und Mittelstand.',
    path: `/${locale}`,
    type: 'money',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <>
      <SeoHead
        title="Ihr Webdesigner in Wetzlar — Lernen Sie uns kennen | Coday"
        description="Lernen Sie Ihren lokalen Webdesigner in Wetzlar kennen. Persönliche Beratung, faire Preise und moderne Webseiten für Handwerk und Mittelstand."
        pageType="about"
      />
      <AboutClient />
    </>
  );
}
