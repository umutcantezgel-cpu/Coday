import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';
import { workData } from '@/shared/data/work';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return Object.keys(workData).map((slug) => ({ slug }));
}

export default async function Page(props: { params: Promise<{ locale: string; slug: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  // Validate that the slug exists in workData
  if (!workData[params.slug]) {
    notFound();
  }

  const project = workData[params.slug];
  const content = params.locale === 'en' ? project.content.en : project.content.de;

  return (
    <>
      <SeoHead
        title={`${content.title} – Case Study | Coday`}
        description={`${content.title}: ${content.subtitle}. ${content.challenge.description}`}
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
