import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/BlogPostClient';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | blogpost"
        description="Erfahren Sie mehr über blogpost"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
