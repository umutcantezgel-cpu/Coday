import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EnterpriseWebClient } from '@/features/services/ui/EnterpriseWebClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Enterprise Web Development Wetzlar | Scalable',
      description:
        'Scalable and secure enterprise web solutions by Coday in Wetzlar. Portals, intranets and complex web applications for businesses in Hesse. Inquire.',
      path: '/en/services/enterprise-web',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Enterprise Webentwicklung Wetzlar | Skalierbar',
    description:
      'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen. Jetzt anfragen.',
    path: '/de/services/enterprise-web',
    type: 'money',
  });
}

export default async function EnterpriseWebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Enterprise Web Development Wetzlar | Scalable | Coday'
      : 'Enterprise Webentwicklung Wetzlar | Skalierbar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Scalable and secure enterprise web solutions by Coday in Wetzlar. Portals, intranets and complex web applications for businesses in Hesse. Inquire.'
      : 'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-enterprise-web"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Enterprise Webentwicklung Wetzlar | Skalierbar',
                description:
                  'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen. Jetzt anfragen.',
                url: `${BASE_URL}/de/services/enterprise-web`,
              }),
            ],
          }),
        }}
      />
      <EnterpriseWebClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
