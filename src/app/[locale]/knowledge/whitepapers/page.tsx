import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import ClientComponent from '@/features/knowledge/ui/WhitepapersClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Whitepapers & Studies | Web Design Agency Hesse',
      description:
        'Free whitepapers and studies on web design and digital marketing from Coday in Wetzlar. Expert knowledge for business owners across Central Hesse.',
      keywords: [
        'Web Design Whitepapers',
        'SEO Studies Germany',
        'Web Performance Whitepaper',
        'Coday Whitepapers',
      ],
      path: '/en/knowledge/whitepapers',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Whitepapers & Studien | Webdesign Agentur Hessen',
    description:
      'Kostenlose Whitepapers und Studien zu Webdesign und digitalem Marketing von Coday in Wetzlar. Expertenwissen für Unternehmer in Mittelhessen.',
    keywords: [
      'Webdesign Whitepapers',
      'SEO Studien Mittelhessen',
      'Website Conversion Whitepaper',
      'Coday Studien',
    ],
    path: '/de/knowledge/whitepapers',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/knowledge/whitepapers`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Knowledge', url: `/${_locale}/knowledge/blog` },
      { name: 'Whitepapers', url: `/${_locale}/knowledge/whitepapers` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization entity is emitted once by the root layout and not repeated here.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: isEn
          ? 'Coday Web Design Studies & Whitepapers'
          : 'Coday Webdesign Studien & Whitepapers',
        description: isEn
          ? 'Free whitepapers and studies on web design and digital marketing from Coday in Wetzlar.'
          : 'Kostenlose Whitepapers und Studien zu Webdesign und digitalem Marketing von Coday in Wetzlar.',
        locale: _locale,
        type: 'CollectionPage',
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
