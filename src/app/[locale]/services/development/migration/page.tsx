import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { MigrationClient } from '@/features/services/ui/MigrationClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Website Migration & Relaunch Wetzlar | Secure',
      description:
        'Secure website migration and relaunch by Coday in Wetzlar. We transfer your content while optimizing SEO and performance. For businesses across Hesse.',
      path: '/en/services/development/migration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Website Migration & Relaunch Wetzlar | Sicher',
    description:
      'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.',
    path: '/de/services/development/migration',
    type: 'money',
  });
}

export default async function MigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MigrationClient />;
}
