import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/LocalWetzlarClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | localwetzlar"
        description="Erfahren Sie mehr über localwetzlar"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
