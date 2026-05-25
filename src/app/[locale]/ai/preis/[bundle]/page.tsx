import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/PricingBundlePageClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | pricingbundlepage"
        description="Erfahren Sie mehr über pricingbundlepage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
