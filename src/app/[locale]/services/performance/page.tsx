import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { PerformanceClient } from '@/features/services/ui/PerformanceClient';
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
      title: 'Website Speed Optimization | Core Web Vitals',
      description:
        'Maximum website speed through Core Web Vitals optimization by Coday. Faster load times and better Google rankings.',
      path: '/en/services/performance',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Website Speed Optimierung Wetzlar | Core Web Vitals',
    description:
      'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.',
    path: '/de/services/performance',
    type: 'money',
  });
}

export default async function PerformancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Website Speed Optimization Wetzlar | Core Web Vitals | Coday'
      : 'Website Speed Optimierung Wetzlar | Core Web Vitals | Coday';
  return (
    <>
      <script
        id="schema-performance"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Website Speed Optimization | Core Web Vitals'
                    : 'Website Speed Optimierung Wetzlar | Core Web Vitals',
                description:
                  _locale === 'en'
                    ? 'Maximum website speed through Core Web Vitals optimization. Faster load times, better Google ranking.'
                    : 'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.',
                url: `${BASE_URL}/${_locale}/services/performance`,
              }),
            ],
          }),
        }}
      />
      <PerformanceClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
