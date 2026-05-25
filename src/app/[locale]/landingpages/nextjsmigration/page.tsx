import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/NextJsMigrationClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | nextjsmigration"
        description="Erfahren Sie mehr über nextjsmigration"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
