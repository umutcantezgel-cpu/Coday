import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
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
      title: 'Partner Network Central Hesse | Freelancers & Agencies · Coday',
      description:
        'Coday works with freelancers and agencies across Central Hesse: frontend, design, content and SEO. Fixed briefs, fixed prices, the owner as your contact.',
      keywords: [
        'Web Design Partner Network Hesse',
        'Freelance Next.js Developer Wetzlar',
        'Whitelabel Web Development Hesse',
        'Agency Partnership Central Hesse',
      ],
      path: '/en/community/members',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Partner-Netzwerk Mittelhessen | Freelancer & Agenturen · Coday',
    description:
      'Coday arbeitet mit Freelancern und Agenturen aus Mittelhessen: Frontend, Design, Content und SEO. Klare Briefings, Festpreise, der Inhaber als Ansprechpartner.',
    keywords: [
      'Partner-Netzwerk Webdesign Mittelhessen',
      'Freelancer Next.js Wetzlar',
      'Whitelabel Webentwicklung Hessen',
      'Agentur Partnerschaft Mittelhessen',
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

  const pageUrl = `${BASE_URL}/${_locale}/community/members`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Community', url: `/${_locale}/community/events` },
      { name: isEn ? 'Partners' : 'Partner', url: `/${_locale}/community/members` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization comes from the root layout, so this graph starts at the breadcrumbs.
    '@graph': [
      breadcrumbs,
      // Not a CollectionPage: there is no collection of members to describe.
      getWebPageSchema({
        url: pageUrl,
        name: isEn ? 'Coday Partner Network' : 'Coday Partner-Netzwerk',
        description: isEn
          ? 'Coday works with freelancers and agencies across Central Hesse: frontend, design, content and SEO. Fixed briefs, fixed prices, the owner as your contact.'
          : 'Coday arbeitet mit Freelancern und Agenturen aus Mittelhessen: Frontend, Design, Content und SEO. Klare Briefings, Festpreise, der Inhaber als Ansprechpartner.',
        locale: _locale,
      }),
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
