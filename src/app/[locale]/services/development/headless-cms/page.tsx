import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { HeadlessCmsClient } from '@/features/services/ui/HeadlessCmsClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Headless CMS Development Wetzlar | Flexible',
      description:
        'Modern headless CMS solutions by Coday in Wetzlar. Flexible content management with Sanity, Strapi or Contentful for your business in Hesse region.',
      path: '/en/services/development/headless-cms',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Headless CMS Entwicklung Wetzlar | Flexibel',
    description:
      'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.',
    path: '/de/services/development/headless-cms',
    type: 'money',
  });
}

export default async function HeadlessCmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Headless CMS Development Wetzlar | Flexible | Coday'
      : 'Headless CMS Entwicklung Wetzlar | Flexibel | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Modern headless CMS solutions by Coday in Wetzlar. Flexible content management with Sanity, Strapi or Contentful for your business in Hesse region.'
      : 'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.';
  return (
    <>
      <script
        id="schema-headless-cms"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Headless CMS Entwicklung Wetzlar | Flexibel',
                description:
                  'Moderne Headless CMS Lösungen von Coday in Wetzlar. Flexible Content-Verwaltung mit Sanity, Strapi oder Contentful für Ihr Unternehmen in Hessen.',
                url: `${BASE_URL}/de/services/development/headless-cms`,
              }),
            ],
          }),
        }}
      />
      <HeadlessCmsClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
