import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/legal/ui/GarantieClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Quality Guarantee | Web Design Wetzlar',
      description:
        'Coday guarantees premium web design from Wetzlar. Satisfaction, fixed price and on-time delivery for your business. For companies across Central Hesse.',
      path: '/en/garantie',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Qualitätsgarantie | Webdesign Wetzlar',
    description:
      'Coday garantiert Ihnen Premium Webdesign aus Wetzlar. Zufriedenheit, Festpreis und termingerechte Lieferung. Für Unternehmen in ganz Mittelhessen.',
    path: '/de/garantie',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | garantie"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
