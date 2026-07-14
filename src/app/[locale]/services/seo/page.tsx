import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'SEO Agency Wetzlar | Regional Search Optimization',
      description:
        'Regional SEO and GEO optimization by Coday in Wetzlar. More visibility for your business in Central Hesse on Google. Get your free consultation today.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'SEO Agentur Wetzlar | Regionale Suchoptimierung',
    description:
      'Regionale SEO und GEO Optimierung von Coday in Wetzlar. Mehr Sichtbarkeit für Ihr Unternehmen in Mittelhessen bei Google. Jetzt kostenlos beraten lassen.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'SEO Agency Wetzlar | Regional Search Optimization | Coday'
      : 'SEO Agentur Wetzlar | Regionale Suchoptimierung | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Regional SEO and GEO optimization by Coday in Wetzlar. More visibility for your business in Central Hesse on Google. Get your free consultation today.'
      : 'Regionale SEO und GEO Optimierung von Coday in Wetzlar. Mehr Sichtbarkeit für Ihr Unternehmen in Mittelhessen bei Google. Jetzt kostenlos beraten lassen.';
  return (
    <>
      <script
        id="schema-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'SEO Agentur Wetzlar | Regionale Suchoptimierung',
                description:
                  'Regionale SEO und GEO Optimierung von Coday in Wetzlar. Mehr Sichtbarkeit für Ihr Unternehmen in Mittelhessen bei Google. Jetzt kostenlos beraten lassen.',
                url: `${BASE_URL}/de/services/seo`,
              }),
            ],
          }),
        }}
      />
      <SeoClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
