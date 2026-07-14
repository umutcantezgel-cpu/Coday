import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Karriere bei Coday | Webdesign Agentur Jobs Wetzlar',
    description: 'Karrieremöglichkeiten bei Coday.',
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
        description: 'Karrieremöglichkeiten bei Coday.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  const _locale: string = 'de';
  const _seoTitle = _locale === 'en' ? 'Karriere bei Coday' : 'Karriere bei Coday';
  const _seoDesc =
    _locale === 'en' ? 'Karrieremöglichkeiten bei Coday.' : 'Karrieremöglichkeiten bei Coday.';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerOverviewClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
