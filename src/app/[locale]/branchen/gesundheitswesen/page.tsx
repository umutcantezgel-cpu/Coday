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
      title: 'Web Design for Doctors & Clinics | Agency Hesse',
      description:
        'Professional practice websites for doctors in Wetzlar and Hesse. Attract patients through modern web design and local SEO optimization. Inquire today.',
      path: `/en/branchen/gesundheitswesen`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Agentur in Hessen',
    description:
      'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.',
    path: `/de/branchen/gesundheitswesen`,
    type: 'money',
  });
}

export default async function GesundheitswesenHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <IndustryDetailClient />
      <IndustryToolEmbed industryKey="gesundheit" />
    </>
  );
}
