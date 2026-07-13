import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ConsultingClient } from '@/features/services/ui/ConsultingClient';
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
      title: 'Digital Consulting & Web Strategy | Wetzlar',
      description:
        'Strategic digital consulting by Coday in Wetzlar. We guide businesses in Central Hesse through their digital transformation. Book your appointment.',
      path: '/en/services/consulting',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Digitale Beratung & Webstrategie | Wetzlar',
    description:
      'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.',
    path: '/de/services/consulting',
    type: 'money',
  });
}

export default async function ConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Digital Consulting & Web Strategy | Wetzlar | Coday'
      : 'Digitale Beratung & Webstrategie | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Strategic digital consulting by Coday in Wetzlar. We guide businesses in Central Hesse through their digital transformation. Book your appointment.'
      : 'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.';
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
        id="schema-consulting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Digitale Beratung & Webstrategie | Wetzlar',
                description:
                  'Strategische Digitalberatung von Coday in Wetzlar. Wir begleiten Unternehmen in Mittelhessen bei der digitalen Transformation. Jetzt Termin buchen.',
                url: `${BASE_URL}/de/services/consulting`,
              }),
            ],
          }),
        }}
      />
      <ConsultingClient />
    </>
  );
}
