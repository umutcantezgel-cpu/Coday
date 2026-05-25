import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/ApiDocsPageClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | apidocspage"
        description="Erfahren Sie mehr über apidocspage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
