import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/career/ui/BenefitsClient';

export const dynamic = 'force-static';

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
      keywords: [
        'Coday Benefits',
        'Web Agency Work Culture',
        'Developer Benefits Wetzlar',
        'Coday Career',
      ],
      path: '/en/career/benefits',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Karriere & Benefits | Webdesign Agentur Wetzlar',
    description:
      'Arbeiten bei Coday in Wetzlar. Attraktive Benefits, modernes Arbeitsumfeld und spannende Webdesign Projekte in Mittelhessen. Jetzt Team kennenlernen.',
    keywords: [
      'Coday Benefits',
      'Arbeitskultur Webagentur',
      'Entwickler Benefits Wetzlar',
      'Coday Karriere',
    ],
    path: '/de/career/benefits',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Careers' : 'Karriere', url: `/${_locale}/career` },
    { name: 'Benefits', url: `/${_locale}/career/benefits` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/career/benefits#webpage`,
        name: isEn ? 'Coday Career & Benefits' : 'Coday Karriere & Benefits',
        url: `${BASE_URL}/${_locale}/career/benefits`,
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
      <ClientComponent />
    </>
  );
}
