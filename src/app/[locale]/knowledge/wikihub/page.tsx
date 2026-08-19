import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/knowledge/ui/WikiHubClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Digital Wiki & Glossary | Web Design Wetzlar',
      description:
        'Clear web design glossary and digital wiki from Coday in Wetzlar. Technical terms simply explained for business owners and freelancers across Hesse.',
      keywords: [
        'Web Design Glossary',
        'SEO Wiki Germany',
        'Web Development Terms Explained',
        'Coday WikiHub',
      ],
      path: '/en/knowledge/wikihub',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Digitales Wiki & Glossar | Webdesign Wetzlar',
    description:
      'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar. Fachbegriffe einfach erklärt für Unternehmer und Selbstständige in Hessen.',
    keywords: [
      'Webdesign Glossar',
      'Web Agentur Wiki',
      'Fachbegriffe Webentwicklung',
      'Coday WikiHub',
    ],
    path: '/de/knowledge/wikihub',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
    { name: 'WikiHub', url: `/${_locale}/knowledge/wikihub` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/knowledge/wikihub#collection`,
        name: isEn ? 'Coday Digital & Web Design WikiHub' : 'Coday Digitales & Webdesign WikiHub',
        url: `${BASE_URL}/${_locale}/knowledge/wikihub`,
        description: isEn
          ? 'Clear web design glossary and digital wiki from Coday in Wetzlar.'
          : 'Verständliches Webdesign Glossar und digitales Wiki von Coday in Wetzlar.',
        inLanguage: _locale,
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
