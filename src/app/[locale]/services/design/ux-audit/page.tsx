import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UxAuditClient } from '@/features/services/ui/UxAuditClient';
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
      title: 'UX Audit & Usability Review Wetzlar | Analysis',
      description:
        'Professional UX audit by Coday in Wetzlar. We analyze your website for usability and conversion potential. For businesses across Hesse. Get started.',
      path: '/en/services/design/ux-audit',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'UX Audit & Usability Check Wetzlar | Optimierung',
    description:
      'Professioneller UX Audit von Coday in Wetzlar. Wir analysieren Ihre Website auf Nutzerfreundlichkeit und Konversionspotenzial. Für Firmen in Hessen.',
    path: '/de/services/design/ux-audit',
    type: 'money',
  });
}

export default async function UxAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'UX Audit & Usability Review Wetzlar | Analysis | Coday'
      : 'UX Audit & Usability Check Wetzlar | Optimierung | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <script
        id="schema-ux-audit"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'UX Audit & Usability Check Wetzlar | Optimierung',
                description:
                  'Professioneller UX Audit von Coday in Wetzlar. Wir analysieren Ihre Website auf Nutzerfreundlichkeit und Konversionspotenzial. Für Firmen in Hessen.',
                url: `${BASE_URL}/de/services/design/ux-audit`,
              }),
            ],
          }),
        }}
      />
      <UxAuditClient />
    </>
  );
}
