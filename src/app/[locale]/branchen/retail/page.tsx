import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import RetailClient from '@/features/industries/ui/RetailClient';
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
      title: 'Web Design for Retail & Shops | Wetzlar Hesse',
      description:
        'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday from Wetzlar.',
      path: '/en/branchen/retail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel & Shops | Wetzlar',
    description:
      'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
    path: '/de/branchen/retail',
    type: 'money',
  });
}

export default async function RetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Retail & Shops | Wetzlar Hesse | Coday'
      : 'Webdesign für Einzelhandel & Shops | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday from Wetzlar.'
      : 'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.';
  return (
    <>
      <script
        id="schema-branchen-retail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Einzelhandel & Shops',
                description:
                  'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.',
                url: `${BASE_URL}/de/branchen/retail`,
              }),
            ],
          }),
        }}
      />
      <RetailClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
