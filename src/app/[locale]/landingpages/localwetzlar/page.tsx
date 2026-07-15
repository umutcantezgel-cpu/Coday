import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/LocalWetzlarClient';
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

  const _locale = (await params)?.locale || 'de';
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
      <SeoHead
        title="Coday | localwetzlar"
        description="Erfahren Sie mehr über localwetzlar"
        pageType="default"
      />
      <ClientComponent />
      <SeoContentBlock />
      <div className="container mx-auto px-4 pb-12 text-sm text-gray-500 max-w-4xl opacity-80">
        <p className="mb-4">
          {_locale === 'en'
            ? 'Looking for a professional web designer in Wetzlar? We create modern, fast, and SEO-optimized websites for businesses, freelancers, and craftsmen in Central Hesse. Our local web design services are tailored to help you reach more customers in Wetzlar and surrounding regions.'
            : 'Suchen Sie einen professionellen Webdesigner in Wetzlar? Wir erstellen moderne, schnelle und SEO-optimierte Webseiten für Unternehmen, Freiberufler und Handwerker in Mittelhessen. Unsere lokalen Webdesign-Dienstleistungen sind darauf zugeschnitten, Ihnen zu helfen, mehr Kunden in Wetzlar und der umliegenden Region zu erreichen.'}
        </p>
        <p>
          {_locale === 'en'
            ? 'With personal consultation right here in Wetzlar and transparent fixed prices, we make your digital transition seamless. From responsive web development to ongoing maintenance, we are your reliable partner for digital success in the local market.'
            : 'Mit persönlicher Beratung direkt hier in Wetzlar und transparenten Festpreisen machen wir Ihren digitalen Wandel nahtlos. Von responsiver Webentwicklung bis hin zur laufenden Wartung sind wir Ihr zuverlässiger Partner für den digitalen Erfolg im lokalen Markt.'}
        </p>
      </div>
    </>
  );
}
