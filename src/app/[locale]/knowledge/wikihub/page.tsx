import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/WikiHubClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Wiki & Glossary | Web Design Wetzlar',
      description:
        'Clear web design glossary and digital wiki from Coday in Wetzlar. Technical terms simply explained for business owners and freelancers across Hesse.',
      path: '/en/knowledge/wikihub',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Digitales Wiki & Glossar | Webdesign Wetzlar',
    description:
      'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar. Fachbegriffe einfach erklärt für Unternehmer und Selbstständige in Hessen.',
    path: '/de/knowledge/wikihub',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Digital Wiki & Glossary | Web Design Wetzlar | Coday'
      : 'Digitales Wiki & Glossar | Webdesign Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Clear web design glossary and digital wiki from Coday in Wetzlar. Technical terms simply explained for business owners and freelancers across Hesse.'
      : 'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar. Fachbegriffe einfach erklärt für Unternehmer und Selbstständige in Hessen.';
  return (
    <>
      <SeoHead
        title="Coday | wikihub"
        description="Erfahren Sie mehr über wikihub"
        pageType="default"
      />
      <ClientComponent />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
