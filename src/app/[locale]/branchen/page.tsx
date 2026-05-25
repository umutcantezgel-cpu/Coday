import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryOverviewClient } from '@/features/industries/ui/IndustryOverviewClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Industry Solutions',
      description: 'Specialized digital solutions for different industries by Coday.',
      path: '/en/branchen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Branchenlösungen',
    description: 'Spezialisierte digitale Lösungen für verschiedene Branchen von Coday.',
    path: '/de/branchen',
    type: 'money',
  });
}

export default async function IndustryOverviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IndustryOverviewClient />;
}
