import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ApiIntegrationClient } from '@/features/services/ui/ApiIntegrationClient';
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
      title: 'API Integration & Interfaces | Wetzlar Hesse',
      description:
        'Seamless API integrations and interface development by Coday in Wetzlar. We connect your systems reliably and efficiently. For businesses in Hesse.',
      path: '/en/services/development/api-integration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'API Integration & Schnittstellen | Wetzlar',
    description:
      'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.',
    path: '/de/services/development/api-integration',
    type: 'money',
  });
}

export default async function ApiIntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'API Integration & Interfaces | Wetzlar Hesse | Coday'
      : 'API Integration & Schnittstellen | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Seamless API integrations and interface development by Coday in Wetzlar. We connect your systems reliably and efficiently. For businesses in Hesse.'
      : 'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.';
  return (
    <>
      <div className="sr-only" aria-hidden="true">
        <p>{_seoTitle}</p>
        <p>{_seoDesc}</p>
        <p>
          {_locale === 'en'
            ? 'Coday is your partner for digital excellence, UI/UX design, and technical web development.'
            : 'Coday ist Ihr Partner für digitale Exzellenz, UI/UX Design und technische Webentwicklung.'}
        </p>
      </div>
      <script
        id="schema-api-integration"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'API Integration & Schnittstellen | Wetzlar',
                description:
                  'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.',
                url: `${BASE_URL}/de/services/development/api-integration`,
              }),
            ],
          }),
        }}
      />
      <ApiIntegrationClient />
    </>
  );
}
