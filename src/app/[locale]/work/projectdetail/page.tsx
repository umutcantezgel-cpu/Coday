import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | projectdetail"
        description="Erfahren Sie mehr über projectdetail"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
