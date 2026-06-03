import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
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
    description: t('meta.description', { defaultValue: 'Berechnen Sie die Kosten für Ihr nächstes Webprojekt.' }),
    path: `/${locale}/calculator`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <ClientComponent />
    </>
  );
}
