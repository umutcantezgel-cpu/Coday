import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDevelopmentClient } from '@/features/services/ui/WebDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Development Wetzlar | Next.js & React Agency',
      description:
        'Custom React and Next.js web applications from Wetzlar. High-performance architecture for businesses in Hesse. Discuss your project with us today.',
      path: '/en/services/web-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webentwicklung Wetzlar | Next.js & React Agentur',
    description:
      'Maßgeschneiderte React und Next.js Webanwendungen aus Wetzlar. High-Performance Architektur für Unternehmen in Hessen. Jetzt Ihr Projekt besprechen.',
    path: '/de/services/web-development',
    type: 'money',
  });
}

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Development Wetzlar | Next.js & React Agency | Coday'
      : 'Webentwicklung Wetzlar | Next.js & React Agentur | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Custom React and Next.js web applications from Wetzlar. High-performance architecture for businesses in Hesse. Discuss your project with us today.'
      : 'Maßgeschneiderte React und Next.js Webanwendungen aus Wetzlar. High-Performance Architektur für Unternehmen in Hessen. Jetzt Ihr Projekt besprechen.';
  return (
    <>
      <script
        id="schema-web-development"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webentwicklung Wetzlar | Next.js & React Agentur',
                description:
                  'Maßgeschneiderte React und Next.js Webanwendungen aus Wetzlar. High-Performance Architektur für Unternehmen in Hessen. Jetzt Ihr Projekt besprechen.',
                url: `${BASE_URL}/de/services/web-development`,
              }),
            ],
          }),
        }}
      />
      <WebDevelopmentClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
      <SeoContentBlock />
    </>
  );
}
