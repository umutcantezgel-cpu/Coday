import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { IndustryOverviewClient } from '@/features/industries/ui/IndustryOverviewClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Industry Solutions Wetzlar & Hesse',
      description:
        'Specialized web design for every industry by Coday in Wetzlar. Craftsmen, doctors, restaurants and service providers in Central Hesse. Inquire now.',
      path: '/en/branchen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Branchenlösungen Wetzlar & Mittelhessen',
    description:
      'Spezialisiertes Webdesign für jede Branche von Coday in Wetzlar. Handwerker, Ärzte, Gastronomen und Dienstleister in Mittelhessen. Jetzt anfragen.',
    path: '/de/branchen',
    type: 'money',
  });
}

export default async function IndustryOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <IndustryOverviewClient />;
}
