import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { MigrationClient } from '@/features/services/ui/MigrationClient';
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
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
        id="schema-migration"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Website Migration & Relaunch Wetzlar | Sicher',
                description:
                  'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.',
                url: `${BASE_URL}/de/services/development/migration`,
              }),
            ],
          }),
        }}
      />
      <MigrationClient />
    </>
  );
}
