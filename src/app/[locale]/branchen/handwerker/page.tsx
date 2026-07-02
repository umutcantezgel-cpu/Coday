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
      title: 'Web Design for Craftsmen | Agency Wetzlar Hesse',
      description:
        'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.',
      path: `/en/branchen/handwerker`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Agentur Wetzlar Hessen',
    description:
      'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
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
