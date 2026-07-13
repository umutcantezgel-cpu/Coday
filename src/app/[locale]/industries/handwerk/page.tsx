import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/HandwerkClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Craftsmen | Wetzlar & Hesse',
      description:
        'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.',
      path: '/en/industries/handwerk',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
    path: '/de/industries/handwerk',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen | Wetzlar & Hesse | Coday'
      : 'Webdesign für Handwerker | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.'
      : 'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.';
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
        title="Coday | handwerk"
        description="Erfahren Sie mehr über handwerk"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
