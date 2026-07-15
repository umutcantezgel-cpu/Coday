import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Karriere bei Coday | Webdesign Agentur Jobs Wetzlar',
    description:
      'Entdecken Sie spannende Karrieremöglichkeiten bei Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung, Webdesign und digitale Lösungen.',
    path: '/de/career',
    type: 'default',
  });
}

export default function CareerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/de/career`,
        name: 'Karriere bei Coday',
        description:
          'Entdecken Sie spannende Karrieremöglichkeiten bei Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung, Webdesign und digitale Lösungen.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerOverviewClient />
    </>
  );
}
