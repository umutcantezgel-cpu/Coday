import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UiUxClient } from '@/features/services/ui/UiUxClient';
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
      title: 'UI/UX Design Agency Wetzlar | User-Friendly',
      description:
        'Professional UI/UX design by Coday in Wetzlar. User-centered interfaces for higher conversions and satisfied customers in Central Hesse. Get in touch.',
      path: '/en/services/design/ui-ux',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'UI/UX Design Agentur Wetzlar | Nutzerfreundlich',
    description:
      'Professionelles UI/UX Design von Coday in Wetzlar. Nutzerzentrierte Interfaces für höhere Konversion und zufriedene Kunden in Mittelhessen. Anfragen.',
    path: '/de/services/design/ui-ux',
    type: 'money',
  });
}

export default async function UiUxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'UI/UX Design Agency Wetzlar | User-Friendly | Coday'
      : 'UI/UX Design Agentur Wetzlar | Nutzerfreundlich | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional UI/UX design by Coday in Wetzlar. User-centered interfaces for higher conversions and satisfied customers in Central Hesse. Get in touch.'
      : 'Professionelles UI/UX Design von Coday in Wetzlar. Nutzerzentrierte Interfaces für höhere Konversion und zufriedene Kunden in Mittelhessen. Anfragen.';
  return (
    <>
      <script
        id="schema-ui-ux"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'UI/UX Design Agentur Wetzlar | Nutzerfreundlich',
                description:
                  'Professionelles UI/UX Design von Coday in Wetzlar. Nutzerzentrierte Interfaces für höhere Konversion und zufriedene Kunden in Mittelhessen. Anfragen.',
                url: `${BASE_URL}/de/services/design/ui-ux`,
              }),
            ],
          }),
        }}
      />
      <UiUxClient />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
