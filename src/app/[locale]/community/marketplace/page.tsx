import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/MarketplaceClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Community Marketplace | Web Design Network Wetzlar',
      description:
        'The digital marketplace of the Coday community in Wetzlar. Find service providers, tools and resources for your next web project in Central Hesse.',
      path: '/en/community/marketplace',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Marktplatz | Webdesign Netzwerk Wetzlar',
    description:
      'Der digitale Marktplatz der Coday Community in Wetzlar. Finden Sie Dienstleister, Tools und Ressourcen für Ihr nächstes Webprojekt in Mittelhessen.',
    path: '/de/community/marketplace',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Community Marketplace | Web Design Network Wetzlar | Coday'
      : 'Community Marktplatz | Webdesign Netzwerk Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'The digital marketplace of the Coday community in Wetzlar. Find service providers, tools and resources for your next web project in Central Hesse.'
      : 'Der digitale Marktplatz der Coday Community in Wetzlar. Finden Sie Dienstleister, Tools und Ressourcen für Ihr nächstes Webprojekt in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | marketplace"
        description="Erfahren Sie mehr über marketplace"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="sr-only">{_seoTitle}</p>
      </div>
    </>
  );
}
