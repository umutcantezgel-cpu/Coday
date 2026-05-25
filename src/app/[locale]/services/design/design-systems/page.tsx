import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { DesignSystemsClient } from '@/features/services/ui/DesignSystemsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Design Systems',
    description: 'Comprehensive Design Systems.',
    path: `/${locale}/services/design/design-systems`,
    type: 'money',
  });
}

export default async function DesignSystemsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DesignSystemsClient />;
}
