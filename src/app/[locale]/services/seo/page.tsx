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
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
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
    </>
  );
}
