import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/PublicSectorClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | publicsector"
        description="Erfahren Sie mehr über publicsector"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
