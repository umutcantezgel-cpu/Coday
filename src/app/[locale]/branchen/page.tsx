import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryOverviewClient } from '@/features/industries/ui/IndustryOverviewClient';
import { setRequestLocale } from 'next-intl/server';
import { getServiceSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
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
      title: 'Web Design Industry Solutions Wetzlar & Hesse | Coday',
      description:
        'Specialized web design for every industry by Coday in Wetzlar. Craftsmen, doctors, restaurants and service providers in Central Hesse. Inquire now.',
      keywords: [
        'Industry Web Design',
        'Craftsmen Web Design',
        'Doctor Website Hesse',
        'Restaurant Web Design',
        'Coday Industry Solutions',
      ],
      path: '/en/branchen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Branchenlösungen Wetzlar & Mittelhessen | Coday',
    description:
      'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.',
    keywords: [
      'Webdesign Branchenlösungen',
      'Webdesign Handwerker',
      'Website für Ärzte Wetzlar',
      'Webdesign Gastronomie',
      'B2B Webdesign Hessen',
    ],
    path: '/de/branchen',
    type: 'money',
  });
}

export default async function IndustryOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle = isEn
    ? 'Web Design Industry Solutions Wetzlar & Hesse | Coday'
    : 'Webdesign Branchenlösungen Wetzlar & Mittelhessen | Coday';
  const cleanTitle = _seoTitle.replace(' | Coday', '');
  const _seoDesc = isEn
    ? 'Specialized web design for every industry by Coday in Wetzlar. Craftsmen, doctors, restaurants and service providers in Central Hesse. Inquire now.'
    : 'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Industries' : 'Branchen', url: `/${_locale}/branchen` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is emitted once by the root layout and does not belong in this graph.
    '@graph': [
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/branchen`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-branchen-overview"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <IndustryOverviewClient />
    </>
  );
}
