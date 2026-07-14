import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';
import { workData } from '@/shared/data/work';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Coday Web-Agentur',
    description: 'Premium Webentwicklung & Design',
    path: `/${locale}`,
    type: 'money',
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
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
