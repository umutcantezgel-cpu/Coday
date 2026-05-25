import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebAppsClient } from '@/features/services/ui/WebAppsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Web Applications',
    description: 'Custom Web Application Development.',
    path: `/${locale}/services/development/web-apps`,
    type: 'money',
  });
}

export default async function WebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WebAppsClient />;
}
