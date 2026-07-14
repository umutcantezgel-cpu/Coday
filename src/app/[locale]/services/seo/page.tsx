import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SeoClient } from '@/features/services/ui/SeoClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'SEO Agency | Professional Search Optimization',
      description:
        'Professional SEO and GEO optimization by Coday. More visibility for your business on Google. Get your free consultation today.',
      path: '/en/services/seo',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'SEO Agentur | Suchmaschinenoptimierung & GEO',
    description:
      'Professionelle SEO und GEO Optimierung von Coday. Mehr Sichtbarkeit für Ihr Unternehmen bei Google. Jetzt kostenlos beraten lassen.',
    path: '/de/services/seo',
    type: 'money',
  });
}

export default async function SeoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'SEO Agency | Professional Search Optimization | Coday'
      : 'SEO Agentur | Suchmaschinenoptimierung & GEO | Coday';
  return (
    <>
      <script
        id="schema-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'SEO Agency | Professional Search Optimization'
                    : 'SEO Agentur | Suchmaschinenoptimierung & GEO',
                description:
                  _locale === 'en'
                    ? 'Professional SEO and GEO optimization by Coday. More visibility for your business on Google.'
                    : 'Professionelle SEO und GEO Optimierung von Coday. Mehr Sichtbarkeit für Ihr Unternehmen bei Google. Jetzt kostenlos beraten lassen.',
                url: `${BASE_URL}/${_locale}/services/seo`,
              }),
            ],
          }),
        }}
      />
      <SeoClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
