import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Karriere bei Coday',
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
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerOverviewClient />
    </>
  );
}
