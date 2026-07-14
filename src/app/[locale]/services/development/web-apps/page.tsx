import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebAppsClient } from '@/features/services/ui/WebAppsClient';
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
      title: 'Web App Development Wetzlar | Portals & Tools',
      description:
        'Custom web app development and portals by Coday in Wetzlar. Tailored solutions for businesses in Central Hesse. Start your project with us today.',
      path: '/en/services/development/web-apps',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Web-App Entwicklung Wetzlar | Portale & Tools',
    description:
      'Individuelle Web-App Entwicklung und Portale von Coday in Wetzlar. Maßgeschneiderte Lösungen für Unternehmen in Mittelhessen. Jetzt Projekt starten.',
    path: '/de/services/development/web-apps',
    type: 'money',
  });
}

export default async function WebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web App Development Wetzlar | Portals & Tools | Coday'
      : 'Web-App Entwicklung Wetzlar | Portale & Tools | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Custom web app development and portals by Coday in Wetzlar. Tailored solutions for businesses in Central Hesse. Start your project with us today.'
      : 'Individuelle Web-App Entwicklung und Portale von Coday in Wetzlar. Maßgeschneiderte Lösungen für Unternehmen in Mittelhessen. Jetzt Projekt starten.';
  return (
    <>
      <script
        id="schema-web-apps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/development/web-apps`,
              }),
            ],
          }),
        }}
      />
      <WebAppsClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
