import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/knowledge/ui/AcademyClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Academy | Knowledge for Central Hesse',
      description:
        'Learn web design basics at Coday Academy Wetzlar. Courses and tutorials for entrepreneurs and freelancers in Hesse. Start building your skills today.',
      path: '/en/knowledge/academy',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Academy | Wissen für Mittelhessen',
    description:
      'Lernen Sie Webdesign Grundlagen in der Coday Academy Wetzlar. Kurse und Tutorials für Unternehmer und Selbstständige in Hessen. Jetzt Wissen aufbauen.',
    path: '/de/knowledge/academy',
    type: 'noindex',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | academy"
        description="Erfahren Sie mehr über academy"
        pageType="default"
      />
      <ClientComponent />
    </>
  );
}
