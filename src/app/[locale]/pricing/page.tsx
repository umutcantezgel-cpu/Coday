import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BASE_URL, getBreadcrumbSchema, getPricingSchema, getFaqSchema } from '@/lib/schema';
import Packages from '@/features/pricing/ui/Packages';
import type { FaqItemCopy } from '@/features/pricing/model/types';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: isEn
      ? [
          'Website Packages',
          'Web Design Pricing',
          'Website Costs Wetzlar',
          'Fixed Price Web Development',
          'Coday Web Pricing',
        ]
      : [
          'Website Pakete',
          'Webdesign Preise',
          'Website Kosten Wetzlar',
          'Festpreis Webentwicklung',
          'Coday Web Preise',
        ],
    path: `/${isEn ? 'en' : 'de'}/pricing`,
    type: 'default',
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  const t = await getTranslations({ locale: _locale, namespace: 'pricing' });

  const breadcrumbs = getBreadcrumbSchema([
    { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: _locale === 'en' ? 'Packages' : 'Pakete', url: `/${_locale}/pricing` },
  ]);

  // The visible FAQ and the FAQ rich result share one source: pricing.json → faq.items
  const faqItems = t.raw('faq.items') as FaqItemCopy[];
  const pricingFaq = {
    '@type': 'FAQPage',
    '@id': `${BASE_URL}/${_locale}/pricing#faq`,
    mainEntity: getFaqSchema(faqItems).mainEntity,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization node lives in the root layout, so it stays out of this graph.
    '@graph': [breadcrumbs, getPricingSchema(_locale), pricingFaq],
  };

  return (
    <>
      <script
        id="schema-pricing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Packages />
    </>
  );
}
