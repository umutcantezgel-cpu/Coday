import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/WorkClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Work | Web Design Portfolio Wetzlar Hesse',
      description:
        'The complete web design portfolio from Coday in Wetzlar. Successful projects for businesses in Central Hesse and beyond. Get inspired by our work.',
      path: '/en/work/work',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Arbeiten | Webdesign Portfolio Wetzlar',
    description:
      'Das komplette Webdesign Portfolio von Coday in Wetzlar. Erfolgreiche Projekte für Unternehmen in Mittelhessen und Hessen. Lassen Sie sich inspirieren.',
    path: '/de/work/work',
    type: 'noindex',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Our Work | Web Design Portfolio Wetzlar Hesse | Coday'
      : 'Unsere Arbeiten | Webdesign Portfolio Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'The complete web design portfolio from Coday in Wetzlar. Successful projects for businesses in Central Hesse and beyond. Get inspired by our work.'
      : 'Das komplette Webdesign Portfolio von Coday in Wetzlar. Erfolgreiche Projekte für Unternehmen in Mittelhessen und Hessen. Lassen Sie sich inspirieren.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <SeoHead title="Coday | work" description="Erfahren Sie mehr über work" pageType="default" />
      <ClientComponent />
    </>
  );
}
