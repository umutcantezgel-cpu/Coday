import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/pricing/ui/PackagesClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | packages"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
