import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { MigrationClient } from '@/features/services/ui/MigrationClient';
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
      title: 'Website Migration & Relaunch Wetzlar | Secure',
      description:
        'Secure website migration and relaunch by Coday in Wetzlar. We transfer your content while optimizing SEO and performance. For businesses across Hesse.',
      path: '/en/services/development/migration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Website Migration & Relaunch Wetzlar | Sicher',
    description:
      'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.',
    path: '/de/services/development/migration',
    type: 'money',
  });
}

export default async function MigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Website Migration & Relaunch Wetzlar | Secure | Coday'
      : 'Website Migration & Relaunch Wetzlar | Sicher | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Secure website migration and relaunch by Coday in Wetzlar. We transfer your content while optimizing SEO and performance. For businesses across Hesse.'
      : 'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.';
  return (
    <>
      <script
        id="schema-migration"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/development/migration`,
              }),
            ],
          }),
        }}
      />
      <MigrationClient />
    </>
  );
}
