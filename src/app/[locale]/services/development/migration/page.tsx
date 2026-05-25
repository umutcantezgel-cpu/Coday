import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { MigrationClient } from '@/features/services/ui/MigrationClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Website Migration',
    description: 'Smooth Website and Data Migrations.',
    path: `/${locale}/services/development/migration`,
    type: 'money',
  });
}

export default async function MigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MigrationClient />;
}
