import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/community/ui/MembersClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Community Members | Web Design Agency Hesse',
      description:
        'Members of the Coday community in Wetzlar and Hesse. Connect with entrepreneurs, designers and developers in Central Hesse. Join the network today.',
      path: '/en/community/members',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Mitglieder | Webdesign Agentur Hessen',
    description:
      'Mitglieder der Coday Community in Wetzlar und Hessen. Vernetzen Sie sich mit Unternehmern, Designern und Entwicklern in Mittelhessen. Jetzt beitreten.',
    path: '/de/community/members',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Community Members | Web Design Agency Hesse | Coday'
      : 'Community Mitglieder | Webdesign Agentur Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Members of the Coday community in Wetzlar and Hesse. Connect with entrepreneurs, designers and developers in Central Hesse. Join the network today.'
      : 'Mitglieder der Coday Community in Wetzlar und Hessen. Vernetzen Sie sich mit Unternehmern, Designern und Entwicklern in Mittelhessen. Jetzt beitreten.';
  return (
    <>
      <SeoHead
        title="Coday | members"
        description="Erfahren Sie mehr über members"
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
