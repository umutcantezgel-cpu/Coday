import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EnterpriseWebClient } from '@/features/services/ui/EnterpriseWebClient';
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Enterprise Web Development Wetzlar | Scalable | Coday'
      : 'Enterprise Webentwicklung Wetzlar | Skalierbar | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
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
    </>
  );
}
