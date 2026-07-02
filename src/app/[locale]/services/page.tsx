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
  return generatePageMetadata({
    title: 'Webseite erstellen lassen in Wetzlar & Mittelhessen | Coday',
    description:
      'Wir erstellen Ihre Firmenwebseite in Wetzlar. Zuverlässig, schnell und sicher. Alle Leistungen aus einer Hand vom lokalen Webdesigner.',
    path: `/${locale}`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Webseite erstellen lassen in Wetzlar & Mittelhessen | Coday"
        description="Wir erstellen Ihre Firmenwebseite in Wetzlar. Zuverlässig, schnell und sicher. Alle Leistungen aus einer Hand vom lokalen Webdesigner."
        pageType="default"
      />
      <ServicesOverview />
    </>
  );
}
