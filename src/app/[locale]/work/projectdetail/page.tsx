import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/work/ui/ProjectDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Project Details | Web Design References Wetzlar',
      description:
        'Detailed insight into our web design projects by Coday in Wetzlar. Learn how we help businesses in Central Hesse succeed in the digital landscape.',
      path: '/en/work/projectdetail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Projektdetails | Webdesign Referenzen Wetzlar',
    description:
      'Detaillierter Einblick in unsere Webdesign Projekte von Coday in Wetzlar. Erfahren Sie wie wir Unternehmen in Mittelhessen digital erfolgreich machen.',
    path: '/de/work/projectdetail',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | projectdetail"
        description="Erfahren Sie mehr über projectdetail"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
