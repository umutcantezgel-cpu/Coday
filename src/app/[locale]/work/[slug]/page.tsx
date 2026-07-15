import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';
import { workData } from '@/shared/data/work';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const dynamic = 'force-static';

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const project = workData[slug];

  if (!project) {
    return generatePageMetadata({
      title: 'Coday Web-Agentur',
      description: 'Premium Webentwicklung & Design',
      path: `/${locale}/work/${slug}`,
      type: 'default',
    });
  }

  const content = locale === 'en' ? project.content.en : project.content.de;
  const description =
    `${content.title}: ${content.subtitle}. ${content.challenge?.description || ''}`.trim();

  return generatePageMetadata({
    title: `${content.title} – Case Study | Coday`,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    path: `/${locale}/work/${slug}`,
    type: 'default',
  });
}

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

  const _locale = (await params)?.locale || 'de';
  const _seoTitle = _locale === 'en' ? 'Coday Web-Agentur' : 'Coday Web-Agentur';
  const _seoDesc =
    _locale === 'en' ? 'Premium Webentwicklung & Design' : 'Premium Webentwicklung & Design';
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
