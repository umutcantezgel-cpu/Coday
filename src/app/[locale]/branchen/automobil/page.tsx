import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Automotive IT Solutions',
      description: 'Custom software and IT solutions for the Automotive industry.',
      path: `/en/branchen/automobil`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Automobil IT-Lösungen',
    description: 'Maßgeschneiderte Software- und IT-Lösungen für die Branche Automobil.',
    path: `/de/branchen/automobil`,
    type: 'money',
  });
}

export default async function AutomobilHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <IndustryDetailClient />
      {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
    </>
  );
}
