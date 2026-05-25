import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/GesundheitClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | gesundheit"
        description="Erfahren Sie mehr über gesundheit"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
