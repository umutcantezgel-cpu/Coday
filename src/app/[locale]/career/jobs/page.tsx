import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/JobsClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Job Openings | Web Design Agency Wetzlar Hesse',
      description:
        'Current job openings at Coday in Wetzlar. We are looking for web designers, developers and creatives for exciting projects in Central Hesse. Apply now.',
      path: '/en/career/jobs',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Stellenangebote | Webdesign Agentur Wetzlar Hessen',
    description:
      'Aktuelle Stellenangebote bei Coday in Wetzlar. Wir suchen Webdesigner, Entwickler und Kreative für spannende Projekte in Mittelhessen. Jetzt bewerben.',
    path: '/de/career/jobs',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Job Openings | Web Design Agency Wetzlar Hesse | Coday'
      : 'Stellenangebote | Webdesign Agentur Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Current job openings at Coday in Wetzlar. We are looking for web designers, developers and creatives for exciting projects in Central Hesse. Apply now.'
      : 'Aktuelle Stellenangebote bei Coday in Wetzlar. Wir suchen Webdesigner, Entwickler und Kreative für spannende Projekte in Mittelhessen. Jetzt bewerben.';
  return (
    <>
      <SeoHead title="Coday | jobs" description="Erfahren Sie mehr über jobs" pageType="default" />
      <ClientComponent />
    </>
  );
}
