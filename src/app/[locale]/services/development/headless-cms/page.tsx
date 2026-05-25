import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { HeadlessCmsClient } from '@/features/services/ui/HeadlessCmsClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Headless CMS',
    description: 'Modern Headless CMS Solutions.',
    path: `/${locale}/services/development/headless-cms`,
    type: 'money',
  });
}

export default async function HeadlessCmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HeadlessCmsClient />;
}
