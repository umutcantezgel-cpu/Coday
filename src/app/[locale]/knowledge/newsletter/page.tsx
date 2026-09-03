import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema } from '@/lib/schema';
import ClientComponent from '@/features/knowledge/ui/NewsletterClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Newsletter | Web Design Trends from Wetzlar Hesse',
      description:
        'Monthly web design and SEO tips from Coday in Wetzlar directly to your inbox. Exclusive knowledge for business owners in Hesse. Subscribe for free.',
      keywords: [
        'Web Design Newsletter',
        'SEO Newsletter Germany',
        'Web Development Trends',
        'Coday Newsletter',
      ],
      path: '/en/knowledge/newsletter',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Newsletter | Webdesign Trends aus Wetzlar, Hessen',
    description:
      'Monatliche Webdesign und SEO Tipps von Coday in Wetzlar direkt in Ihr Postfach. Exklusives Wissen für Unternehmer in Hessen. Jetzt kostenlos anmelden.',
    keywords: [
      'Webdesign Newsletter',
      'SEO Tipps Newsletter',
      'Webentwicklung Trends Mittelhessen',
      'Coday Newsletter',
    ],
    path: '/de/knowledge/newsletter',
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
    { name: 'Newsletter', url: `/${_locale}/knowledge/newsletter` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization stays in the root layout — duplicating it per page bloats the document.
    '@graph': [
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/knowledge/newsletter#webpage`,
        name: isEn ? 'Coday Web Agency Newsletter' : 'Coday Webagentur Newsletter',
        url: `${BASE_URL}/${_locale}/knowledge/newsletter`,
        description: isEn
          ? 'Monthly web design and SEO tips from Coday in Wetzlar directly to your inbox.'
          : 'Monatliche Webdesign und SEO Tipps von Coday in Wetzlar direkt in Ihr Postfach.',
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
