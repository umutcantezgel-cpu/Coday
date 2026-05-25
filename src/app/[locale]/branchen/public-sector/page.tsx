import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import PublicSectorClient from '@/features/industries/ui/PublicSectorClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Public Sector IT Solutions',
      description: 'Digital solutions for the public sector by Coday.',
      path: '/en/branchen/public-sector',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Public Sector IT-Lösungen',
    description: 'Digitale Lösungen für den öffentlichen Sektor von Coday.',
    path: '/de/branchen/public-sector',
    type: 'money',
  });
}

export default async function PublicSectorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PublicSectorClient />;
}
