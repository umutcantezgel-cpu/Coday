import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/LocalWetzlarClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Designer Wetzlar | Local Website Experts',
      description:
        'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.',
      path: '/en/landingpages/localwetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesigner Wetzlar | Lokale Webseiten Experten',
    description:
      'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.',
    path: '/de/landingpages/localwetzlar',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Designer Wetzlar | Local Website Experts | Coday'
      : 'Webdesigner Wetzlar | Lokale Webseiten Experten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.'
      : 'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.';
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
        title="Coday | localwetzlar"
        description="Erfahren Sie mehr über localwetzlar"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
