import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import RetailClient from '@/features/industries/ui/RetailClient';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Retail & Shops | Wetzlar Hesse',
      description:
        'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday from Wetzlar.',
      path: '/en/branchen/retail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel & Shops | Wetzlar',
    description:
      'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
    path: '/de/branchen/retail',
    type: 'money',
  });
}

export default async function RetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RetailClient />;
}
