import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-static';

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
        'Web design and digital visibility for craft businesses in Wetzlar and Hesse. Generate lucrative orders through a professional online presence.',
      path: `/en/branchen/handwerker`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Agentur Wetzlar Hessen',
    description:
      'Webdesign und digitale Sichtbarkeit für Handwerker in Wetzlar und Hessen. Generieren Sie lukrative Aufträge durch professionelle Online-Präsenz.',
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
  permanentRedirect(`/${locale}/branchen/handwerk-bau`);
}
