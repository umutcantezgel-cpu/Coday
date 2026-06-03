import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/UseCasePageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Coday | usecasepage',
    description: 'Erfahren Sie mehr über usecasepage',
    path: `/${locale}`,
    type: 'money',
  });
}

export function generateStaticParams() {
  return [];
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | usecasepage"
        description="Erfahren Sie mehr über usecasepage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
