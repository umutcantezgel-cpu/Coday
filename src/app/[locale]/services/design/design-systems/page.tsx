import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { DesignSystemsClient } from '@/features/services/ui/DesignSystemsClient';
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
      title: 'Design Systems Wetzlar | Consistent Components',
      description:
        'Consistent design systems and reusable components by Coday in Wetzlar. Scalable UI libraries for businesses in Hesse. Get in touch to get started.',
      path: '/en/services/design/design-systems',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Design Systems Wetzlar | Konsistente Komponenten',
    description:
      'Konsistente Design Systeme und wiederverwendbare Komponenten von Coday in Wetzlar. Skalierbare UI-Bibliotheken für Unternehmen in Hessen. Anfragen.',
    path: '/de/services/design/design-systems',
    type: 'money',
  });
}

export default async function DesignSystemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Design Systems Wetzlar | Consistent Components | Coday'
      : 'Design Systems Wetzlar | Konsistente Komponenten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Consistent design systems and reusable components by Coday in Wetzlar. Scalable UI libraries for businesses in Hesse. Get in touch to get started.'
      : 'Konsistente Design Systeme und wiederverwendbare Komponenten von Coday in Wetzlar. Skalierbare UI-Bibliotheken für Unternehmen in Hessen. Anfragen.';
  return (
    <>
      <script
        id="schema-design-systems"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/design/design-systems`,
              }),
            ],
          }),
        }}
      />
      <DesignSystemsClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
