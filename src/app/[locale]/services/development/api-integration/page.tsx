import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ApiIntegrationClient } from '@/features/services/ui/ApiIntegrationClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'API Integration',
    description: 'Seamless API Integrations.',
    path: `/${locale}/services/development/api-integration`,
    type: 'money',
  });
}

export default async function ApiIntegrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ApiIntegrationClient />;
}
