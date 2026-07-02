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
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Öffentlichen Sektor | Hessen',
    description:
      'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.',
    path: '/de/industries/publicsector',
    type: 'noindex',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | publicsector"
        description="Erfahren Sie mehr über publicsector"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
