import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDesignClient } from '@/features/services/ui/WebDesignClient';
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
      title: 'Professional Web Design in Wetzlar & Hesse',
      description:
        'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics for your business in Central Hesse. Get started.',
      path: '/en/services/web-design',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Professionelles Webdesign in Wetzlar & Hessen',
    description:
      'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
    path: '/de/services/web-design',
    type: 'money',
  });
}

export default async function WebDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Professional Web Design in Wetzlar & Hesse | Coday'
      : 'Professionelles Webdesign in Wetzlar & Hessen | Coday';
  return (
    <>
      <script
        id="schema-web-design"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Professional Web Design in Wetzlar & Hesse'
                    : 'Professionelles Webdesign in Wetzlar & Hessen',
                description:
                  _locale === 'en'
                    ? 'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics.'
                    : 'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
                url: `${BASE_URL}/${_locale}/services/web-design`,
              }),
            ],
          }),
        }}
      />
      <WebDesignClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
