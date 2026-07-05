import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/CultureClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Agency Culture | Web Design Wetzlar Hesse',
      description:
        'The culture at Coday in Wetzlar. Collaboration, innovation and passion for excellent web design. This is how we work at our agency in Hesse region.',
      path: '/en/career/culture',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Unsere Agenturkultur | Webdesign Wetzlar Hessen',
    description:
      'Die Kultur bei Coday in Wetzlar. Kollaboration, Innovation und Leidenschaft für exzellentes Webdesign. So arbeiten wir in unserer Agentur in Hessen.',
    path: '/de/career/culture',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | culture"
        description="Erfahren Sie mehr über culture"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
