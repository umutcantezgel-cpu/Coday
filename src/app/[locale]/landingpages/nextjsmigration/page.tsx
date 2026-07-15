import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/NextJsMigrationClient';
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
      title: 'Next.js Migration Wetzlar | Website Upgrade Hesse',
      description:
        'Migrate your website to Next.js with Coday from Wetzlar. Better speed, improved SEO and future-proof technology for businesses in Central Hesse.',
      path: '/en/landingpages/nextjsmigration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Next.js Migration Wetzlar | Website Upgrade Hessen',
    description:
      'Migration Ihrer Website auf Next.js mit Coday aus Wetzlar. Mehr Speed, besseres SEO und zukunftssichere Technik für Unternehmen in Mittelhessen.',
    path: '/de/landingpages/nextjsmigration',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Next.js Migration Wetzlar | Website Upgrade Hesse | Coday'
      : 'Next.js Migration Wetzlar | Website Upgrade Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Migrate your website to Next.js with Coday from Wetzlar. Better speed, improved SEO and future-proof technology for businesses in Central Hesse.'
      : 'Migration Ihrer Website auf Next.js mit Coday aus Wetzlar. Mehr Speed, besseres SEO und zukunftssichere Technik für Unternehmen in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | nextjsmigration"
        description="Erfahren Sie mehr über nextjsmigration"
        pageType="default"
      />
      <ClientComponent />
      <div className="sr-only">Von Legacy zu Next.js: Der Performance-Boost für Ihr Business</div>
      <SeoContentBlock />
    </>
  );
}
