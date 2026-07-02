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
      title: 'Web Design for the Automotive Industry | Wetzlar',
      description:
        'Websites and digital solutions for car dealerships, workshops and automotive businesses in Wetzlar and Hesse. Premium web design by Coday. Get in touch.',
      path: `/en/branchen/automobil`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für die Automobilbranche | Wetzlar',
    description:
      'Websites und digitale Lösungen für Autohäuser, Werkstätten und KFZ-Betriebe in Wetzlar und Hessen. Premium Webdesign von Coday. Jetzt Termin buchen.',
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
      <IndustryDetailClient industrySlug="automobil" />
      <IndustryToolEmbed industryKey="automobil" />
    </>
  );
}
