import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/DataEndpointPageClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | dataendpointpage"
        description="Erfahren Sie mehr über dataendpointpage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
