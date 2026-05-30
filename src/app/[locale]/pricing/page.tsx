import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import ClientComponent from '@/features/pricing/ui/PackagesClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Pricing — Transparent Fixed Prices',
      description:
        'Web development packages from €2,500. No hidden costs. See all pricing details and packages.',
      path: '/en/pricing',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Preise — Transparente Festpreise',
    description:
      'Webentwicklung ab 2.500 €. Keine versteckten Kosten. Alle Preise und Pakete im Überblick.',
    path: '/de/pricing',
    type: 'money',
  });
}

export default function PricingPage() {
  return <ClientComponent />;
}
