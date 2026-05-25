import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/MembersClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | members"
        description="Erfahren Sie mehr über members"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
