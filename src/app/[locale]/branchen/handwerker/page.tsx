import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Craftsmen | Agency Wetzlar Hesse',
      description:
        'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.',
      path: `/en/branchen/handwerker`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Agentur Wetzlar Hessen',
    description:
      'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
    path: `/de/branchen/handwerker`,
    type: 'money',
  });
}

export default async function HandwerkerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen | Agency Wetzlar Hesse | Coday'
      : 'Webdesign für Handwerker | Agentur Wetzlar Hessen | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <script
        id="schema-branchen-handwerker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Handwerker',
                description:
                  'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
                url: `${BASE_URL}/de/branchen/handwerker`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="handwerk-bau" />
      <IndustryToolEmbed industryKey="handwerk" />
    </>
  );
}
