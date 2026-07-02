import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import PublicSectorClient from '@/features/industries/ui/PublicSectorClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for the Public Sector | Hesse Region',
      description:
        'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.',
      path: '/en/branchen/public-sector',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für den Öffentlichen Sektor | Hessen',
    description:
      'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.',
    path: '/de/branchen/public-sector',
    type: 'money',
  });
}

export default async function PublicSectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PublicSectorClient />;
}
