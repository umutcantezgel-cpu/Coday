import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/BlogClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | blog"
        description="Erfahren Sie mehr über blog"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
