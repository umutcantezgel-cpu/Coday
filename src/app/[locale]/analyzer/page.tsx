import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import UrlInputForm from '@/features/analyzer/ui/UrlInputForm';
import ReportDashboard from '@/features/analyzer/ui/ReportDashboard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'analyzer' });

  return generatePageMetadata({
    title: t('meta.title', { defaultValue: 'Website Analyzer | Coday' }),
    description: t('meta.description', {
      defaultValue: 'Kostenloses Website Audit & Performance Analyse.',
    }),
    path: `/${locale}/analyzer`,
    type: 'money',
  });
}

export default async function AnalyzerPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations({ locale: params.locale, namespace: 'analyzer' });

  const pageTitle = t('meta.title', { defaultValue: 'Website Analyzer | Coday' });
  const pageDescription = t('meta.description', {
    defaultValue: 'Kostenloses Website Audit & Performance Analyse.',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${params.locale}/analyzer`,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-[var(--space-section)] min-h-screen bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-secondary-900 mb-6">
              Website <span className="text-primary-600">Analyzer</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Testen Sie Ihre Website auf Performance, SEO, Accessibility und Best Practices mit dem
              Coday Website Analyzer.
            </p>
          </div>

          <UrlInputForm />

          <div className="mt-16">
            <ReportDashboard />
          </div>
        </div>
      </div>
    </>
  );
}
