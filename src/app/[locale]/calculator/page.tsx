import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import ClientComponent from '@/features/calculator/ui/CalculatorClient';

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

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const t = await getTranslations({ locale: params.locale, namespace: 'calculator' });

  const pageTitle = t('meta.title', { defaultValue: 'Projektkosten-Rechner | Coday' });
  const pageDescription = t('meta.description', {
    defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${params.locale}/calculator`,
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
      <ClientComponent />
    </>
  );
}
