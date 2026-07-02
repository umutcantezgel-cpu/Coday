import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/RetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Retail | Wetzlar & Hesse Region',
      description:
        'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday Wetzlar.',
      path: '/en/industries/retail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel | Wetzlar & Hessen',
    description:
      'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
    path: '/de/industries/retail',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | retail"
        description="Erfahren Sie mehr über retail"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
