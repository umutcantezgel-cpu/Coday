import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/ai/ui/TriplePageClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | triplepage"
        description="Erfahren Sie mehr über triplepage"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
