import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UiUxClient } from '@/features/services/ui/UiUxClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'UI/UX Design',
    description: 'User Interface and User Experience Design.',
    path: `/${locale}/services/design/ui-ux`,
    type: 'money',
  });
}

export default async function UiUxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UiUxClient />;
}
