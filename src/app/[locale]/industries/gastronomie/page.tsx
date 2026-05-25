import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/GastronomieClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | gastronomie"
        description="Erfahren Sie mehr über gastronomie"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
