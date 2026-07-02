import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EcommerceDevelopmentClient } from '@/features/services/ui/EcommerceDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'E-Commerce Shop Development | Wetzlar & Hesse',
      description:
        'Professional e-commerce and online shop development by Coday in Wetzlar. High performance and conversion rates for your business in Hesse. Get in touch.',
      path: '/en/services/ecommerce-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Onlineshop erstellen lassen | Wetzlar & Hessen',
    description:
      'Professionelle E-Commerce und Onlineshop Entwicklung von Coday in Wetzlar. Hohe Performance und Konversionsraten für Ihr Geschäft in Hessen. Anfragen.',
    path: '/de/services/ecommerce-development',
    type: 'money',
  });
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EcommerceDevelopmentClient />;
}
