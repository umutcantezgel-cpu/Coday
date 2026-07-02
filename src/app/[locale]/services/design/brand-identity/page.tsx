import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BrandIdentityClient } from '@/features/services/ui/BrandIdentityClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Corporate Design & Branding Agency | Wetzlar',
      description:
        'Strong brand identity and corporate design by Coday in Wetzlar. Logo, colors and typography for your business in Hesse. Start building your brand now.',
      path: '/en/services/design/brand-identity',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Corporate Design & Branding Agentur | Wetzlar',
    description:
      'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.',
    path: '/de/services/design/brand-identity',
    type: 'money',
  });
}

export default async function BrandIdentityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BrandIdentityClient />;
}
