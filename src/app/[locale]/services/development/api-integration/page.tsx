import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ApiIntegrationClient } from '@/features/services/ui/ApiIntegrationClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'API Integration & Interfaces | Wetzlar Hesse',
      description:
        'Seamless API integrations and interface development by Coday in Wetzlar. We connect your systems reliably and efficiently. For businesses in Hesse.',
      path: '/en/services/development/api-integration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'API Integration & Schnittstellen | Wetzlar',
    description:
      'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.',
    path: '/de/services/development/api-integration',
    type: 'money',
  });
}

export default async function ApiIntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ApiIntegrationClient />;
}
