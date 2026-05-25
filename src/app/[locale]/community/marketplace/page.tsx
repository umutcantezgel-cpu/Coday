import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/MarketplaceClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | marketplace"
        description="Erfahren Sie mehr über marketplace"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
