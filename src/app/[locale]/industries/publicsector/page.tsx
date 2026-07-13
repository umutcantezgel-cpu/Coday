import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/PublicSectorClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Public Sector | Hesse Germany',
      description:
        'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.',
      path: '/en/industries/publicsector',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Öffentlichen Sektor | Hessen',
    description:
      'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.',
    path: '/de/industries/publicsector',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Public Sector | Hesse Germany | Coday'
      : 'Webdesign für Öffentlichen Sektor | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.'
      : 'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.';
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
        title="Coday | publicsector"
        description="Erfahren Sie mehr über publicsector"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
