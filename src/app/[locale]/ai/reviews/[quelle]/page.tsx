import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/ReviewAggregatePageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Coday | reviewaggregatepage',
    description: 'Erfahren Sie mehr über reviewaggregatepage',
    path: `/${locale}`,
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | reviewaggregatepage"
        description="Erfahren Sie mehr über reviewaggregatepage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
