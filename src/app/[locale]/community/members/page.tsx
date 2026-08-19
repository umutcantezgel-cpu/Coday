import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/community/ui/MembersClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Community Members | Web Design Agency Hesse',
      description:
        'Members of the Coday community in Wetzlar and Hesse. Connect with entrepreneurs, designers and developers in Central Hesse. Join the network today.',
      keywords: [
        'Coday Community Members',
        'Business Network Wetzlar',
        'Entrepreneurs Central Hesse',
        'Coday Network',
      ],
      path: '/en/community/members',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Community Mitglieder | Webdesign Agentur Hessen',
    description:
      'Mitglieder der Coday Community in Wetzlar und Hessen. Vernetzen Sie sich mit Unternehmern, Designern und Entwicklern in Mittelhessen. Jetzt beitreten.',
    keywords: [
      'Coday Community Mitglieder',
      'Business Netzwerk Wetzlar',
      'Unternehmer Netzwerk Mittelhessen',
      'Coday Netzwerk',
    ],
    path: '/de/community/members',
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
    { name: 'Community', url: `/${_locale}/community/events` },
    { name: isEn ? 'Members' : 'Mitglieder', url: `/${_locale}/community/members` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/${_locale}/community/members#collection`,
        name: isEn ? 'Coday Community Members' : 'Coday Community Mitglieder',
        url: `${BASE_URL}/${_locale}/community/members`,
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
