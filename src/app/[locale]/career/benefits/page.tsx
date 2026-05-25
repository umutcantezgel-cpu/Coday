import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/BenefitsClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | benefits"
        description="Erfahren Sie mehr über benefits"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
