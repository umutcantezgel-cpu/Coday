import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BrandIdentityClient } from '@/features/services/ui/BrandIdentityClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Brand Identity',
    description: 'Brand Identity Design Services.',
    path: `/${locale}/services/design/brand-identity`,
    type: 'money',
  });
}

export default async function BrandIdentityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BrandIdentityClient />;
}
