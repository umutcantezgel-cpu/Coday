import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/ImmobilienClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Real Estate | Wetzlar Hesse Area',
      description:
        'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.',
      path: '/en/industries/immobilien',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Immobilienmakler | Raum Wetzlar',
    description:
      'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.',
    path: '/de/industries/immobilien',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Real Estate | Wetzlar Hesse Area | Coday'
      : 'Webdesign für Immobilienmakler | Raum Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Premium websites for real estate agents in Wetzlar and Hesse. Property listings, search features and lead generation through modern design. Inquire.'
      : 'Hochwertige Webseiten für Immobilienmakler in Wetzlar und Hessen. Exposés, Objektsuche und Lead-Generierung durch modernes Webdesign. Jetzt anfragen.';
  return (
    <>
      <SeoHead
        title="Coday | immobilien"
        description="Erfahren Sie mehr über immobilien"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
