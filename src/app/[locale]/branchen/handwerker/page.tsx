import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Crafts IT Solutions',
      description: 'Custom software and IT solutions for the Crafts industry.',
      path: `/en/branchen/handwerker`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Handwerker IT-Lösungen',
    description: 'Maßgeschneiderte Software- und IT-Lösungen für die Branche Handwerker.',
    path: `/de/branchen/handwerker`,
    type: 'money',
  });
}

export default async function HandwerkerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <IndustryDetailClient />
      <IndustryToolEmbed industryKey="handwerk" />
    </>
  );
}
