import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/career/ui/BenefitsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Career & Benefits | Web Design Agency Wetzlar',
      description:
        'Work at Coday in Wetzlar. Attractive benefits, modern work environment and exciting web design projects in Central Hesse. Meet the team today.',
      path: '/en/career/benefits',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Karriere & Benefits | Webdesign Agentur Wetzlar',
    description:
      'Arbeiten bei Coday in Wetzlar. Attraktive Benefits, modernes Arbeitsumfeld und spannende Webdesign Projekte in Mittelhessen. Jetzt Team kennenlernen.',
    path: '/de/career/benefits',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | benefits"
        description="Erfahren Sie mehr über benefits"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
