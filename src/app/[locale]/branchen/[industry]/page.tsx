import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; industry: string }> }): Promise<Metadata> {
  const { locale, industry } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: `${industry} IT Solutions`,
      description: `Custom software and IT solutions for the ${industry} industry.`,
      path: `/en/branchen/${industry}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `${industry} IT-Lösungen`,
    description: `Maßgeschneiderte Software- und IT-Lösungen für die Branche ${industry}.`,
    path: `/de/branchen/${industry}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ locale: string; industry: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IndustryDetailClient />;
}
