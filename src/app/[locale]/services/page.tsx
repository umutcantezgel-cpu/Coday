export const dynamic = 'force-static';
export const dynamicParams = false;

import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { ServicesOverview } from '@/features/services/ui/ServicesOverview';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return generatePageMetadata({
    title: t('meta.title', { fallback: 'Webdesign & SEO Leistungen | Agentur in Wetzlar' }),
    description: t('meta.description', {
      fallback:
        'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.',
    }),
    path: `/${locale}/services`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });

  const _seoTitle = t('meta.title', {
    fallback: 'Webdesign & SEO Leistungen | Agentur in Wetzlar | Coday',
  });
  const _seoDesc = t('meta.description', {
    fallback:
      'Alle Webdesign und SEO Leistungen Ihrer Agentur in Wetzlar auf einen Blick. Von der Firmenwebseite bis zum Onlineshop, alles aus einer Hand. Anfragen.',
  });
  return (
    <>
      <SeoHead title={_seoTitle} description={_seoDesc} pageType="default" />
      <ServicesOverview />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
      <SeoContentBlock />
    </>
  );
}
