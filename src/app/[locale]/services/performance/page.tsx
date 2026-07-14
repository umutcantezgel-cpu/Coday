import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { PerformanceClient } from '@/features/services/ui/PerformanceClient';
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
      title: 'Website Speed Optimization Wetzlar | Core Web Vitals',
      description:
        'Maximum website speed through Core Web Vitals optimization by Coday in Wetzlar. Faster load times and better Google rankings across Hesse region.',
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Website Speed Optimization Wetzlar | Core Web Vitals | Coday'
      : 'Website Speed Optimierung Wetzlar | Core Web Vitals | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Maximum website speed through Core Web Vitals optimization by Coday in Wetzlar. Faster load times and better Google rankings across Hesse region.'
      : 'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.';
  return (
    <>
      <script
        id="schema-performance"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Website Speed Optimierung Wetzlar | Core Web Vitals',
                description:
                  'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.',
                url: `${BASE_URL}/de/services/performance`,
              }),
            ],
          }),
        }}
      />
      <PerformanceClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
