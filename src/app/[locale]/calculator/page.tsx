import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import ClientComponent from '@/features/calculator/ui/CalculatorClient';

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

  return generatePageMetadata({
    title: t('meta.title', { defaultValue: 'Projektkosten-Rechner | Coday' }),
    description: t('meta.description', {
      defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.',
    }),
    path: `/${locale}/calculator`,
    type: 'money',
  });
}

import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations({ locale: params.locale, namespace: 'calculator' });

  const pageTitle = t('meta.title', { defaultValue: 'Projektkosten-Rechner | Coday' });
  const pageDescription = t('meta.description', {
    defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.',
  });

  const cleanTitle = pageTitle.replace(' | Coday', '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(params.locale),
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${params.locale}/calculator`,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  const _locale = (await params)?.locale || 'de';
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
