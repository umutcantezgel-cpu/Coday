import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/company/ui/PresseClient';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Press & Media | Web Design Agency Wetzlar Hesse',
      description:
        'Press materials and media information from Coday, your web design agency in Wetzlar. Logos, press releases and company info at a glance for journalists.',
      path: '/en/presse',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Pressebereich & Medien | Webdesign Agentur Wetzlar',
    description:
      'Pressematerial und Medieninformationen von Coday, Ihrer Webdesign Agentur in Wetzlar. Logos, Pressemitteilungen und Unternehmensinfos auf einen Blick.',
    path: '/de/presse',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Press & Media | Web Design Agency Wetzlar Hesse | Coday'
      : 'Pressebereich & Medien | Webdesign Agentur Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Press materials and media information from Coday, your web design agency in Wetzlar. Logos, press releases and company info at a glance for journalists.'
      : 'Pressematerial und Medieninformationen von Coday, Ihrer Webdesign Agentur in Wetzlar. Logos, Pressemitteilungen und Unternehmensinfos auf einen Blick.';
  return (
    <>
      <SeoHead
        title="Coday | presse"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      <SeoContentBlock />
    </>
  );
}
