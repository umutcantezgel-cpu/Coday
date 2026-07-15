import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/DienstleistungClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Service Providers | Wetzlar Hesse',
      description:
        'Professional websites for service providers in Wetzlar and Hesse. Tax advisors, brokers and consultants win more clients online. Get started today.',
      path: '/en/industries/dienstleistung',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Dienstleister | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.',
    path: '/de/industries/dienstleistung',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | dienstleistung"
        description="Erfahren Sie mehr über dienstleistung"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
