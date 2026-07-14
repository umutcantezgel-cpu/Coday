import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryOverviewClient } from '@/features/industries/ui/IndustryOverviewClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Industry Solutions Wetzlar & Hesse',
      description:
        'Specialized web design for every industry by Coday in Wetzlar. Craftsmen, doctors, restaurants and service providers in Central Hesse. Inquire now.',
      path: '/en/branchen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Branchenlösungen Wetzlar & Mittelhessen',
    description:
      'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.',
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
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Industry Solutions Wetzlar & Hesse | Coday'
      : 'Webdesign Branchenlösungen Wetzlar & Mittelhessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Specialized web design for every industry by Coday in Wetzlar. Craftsmen, doctors, restaurants and service providers in Central Hesse. Inquire now.'
      : 'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-branchen-overview"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign Branchenlösungen',
                description:
                  'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.',
                url: `${BASE_URL}/de/branchen`,
              }),
            ],
          }),
        }}
      />
      <IndustryOverviewClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
      <SeoContentBlock />
    </>
  );
}
