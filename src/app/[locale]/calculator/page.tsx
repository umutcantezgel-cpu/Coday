import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import {
  getBreadcrumbSchema,
  getWebApplicationSchema,
  getWebPageSchema,
  BASE_URL,
} from '@/lib/schema';
import ClientComponent from '@/features/calculator/ui/CalculatorClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calculator' });

  const defaultKeywords =
    locale === 'en'
      ? [
          'Website Cost Calculator',
          'Calculate Web Design Price',
          'Web Development Estimator',
          'Coday Calculator',
        ]
      : [
          'Website Kosten Rechner',
          'Webdesign Kosten berechnen',
          'Kostenrechner Webentwicklung',
          'Website Preisrechner',
          'Coday Web Rechner',
        ];

  return generatePageMetadata({
    title: t('meta.title', { defaultValue: 'Projektkosten-Rechner | Coday' }),
    description: t('meta.description', {
      defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.',
    }),
    keywords: defaultKeywords,
    path: `/${locale}/calculator`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);

  const t = await getTranslations({ locale: _locale, namespace: 'calculator' });

  const pageTitle = t('meta.title', { defaultValue: 'Projektkosten-Rechner | Coday' });
  const pageDescription = t('meta.description', {
    defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.',
  });

  const pageUrl = `${BASE_URL}/${_locale}/calculator`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: _locale === 'en' ? 'Calculator' : 'Kostenrechner', url: `/${_locale}/calculator` },
    ],
    pageUrl
  );

  const webApp = getWebApplicationSchema(
    {
      name: _locale === 'en' ? 'Coday Web Project Cost Calculator' : 'Coday Website Kostenrechner',
      description: pageDescription,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
    },
    _locale
  );

  const cleanTitle = pageTitle.replace(' | Coday', '');

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization node is emitted once site-wide by the root layout.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        locale: _locale,
        mainEntityId: `${pageUrl}#webapp`,
      }),
      webApp,
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only">
        <p>Kalkulieren Sie Ihr Webprojekt.</p>
      </div>
      <ClientComponent />
      <SeoContentBlock title={cleanTitle} />
    </>
  );
}
