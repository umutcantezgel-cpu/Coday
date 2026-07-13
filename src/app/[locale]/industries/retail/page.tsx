import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/RetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Retail | Wetzlar & Hesse Region',
      description:
        'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday Wetzlar.',
      path: '/en/industries/retail',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel | Wetzlar & Hessen',
    description:
      'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
    path: '/de/industries/retail',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Retail | Wetzlar & Hesse Region | Coday'
      : 'Webdesign für Einzelhandel | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday Wetzlar.'
      : 'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.';
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
      <SeoHead
        title="Coday | retail"
        description="Erfahren Sie mehr über retail"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
