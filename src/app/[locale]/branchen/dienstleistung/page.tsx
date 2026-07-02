import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import DienstleistungClient from '@/features/industries/ui/DienstleistungClient';
import { setRequestLocale } from 'next-intl/server';

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
      path: '/en/branchen/dienstleistung',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Dienstleister | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.',
    path: '/de/branchen/dienstleistung',
    type: 'money',
  });
}

export default async function DienstleistungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DienstleistungClient />;
}
