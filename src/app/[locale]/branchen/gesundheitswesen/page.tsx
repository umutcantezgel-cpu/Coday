import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
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
      title: 'Web Design for Doctors & Clinics | Agency Hesse',
      description:
        'Professional practice websites for Doctors and Clinics by Agency Hesse. Attract patients through modern web design and local SEO optimization. Inquire today.',
      path: '/en/branchen/gesundheitswesen',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Healthcare Marketing',
    description:
      'Professionelle Praxis-Webseiten für Ärzte und im Gesundheitswesen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.',
    path: '/de/branchen/gesundheitswesen',
    type: 'default',
  });
}

export default async function GesundheitswesenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors & Medical Practices | Healthcare Marketing | Coday'
      : 'Webdesign für Ärzte & Praxen | Healthcare Marketing | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional practice websites for Doctors and Clinics by Agency Hesse. Attract patients through modern web design and local SEO optimization. Inquire today.'
      : 'Professionelle Praxis-Webseiten für Ärzte und im Gesundheitswesen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-branchen-gesundheitswesen"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="aerzte-gesundheit" />
      <IndustryToolEmbed industryKey="gesundheit" />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
