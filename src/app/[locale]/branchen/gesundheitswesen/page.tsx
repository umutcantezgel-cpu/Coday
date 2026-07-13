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
      title: 'Web Design for Doctors & Clinics | Agency Hesse',
      description:
        'Professional practice websites for doctors in Wetzlar and Hesse. Attract patients through modern web design and local SEO optimization. Inquire today.',
      path: `/en/branchen/gesundheitswesen`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Agentur in Hessen',
    description:
      'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.',
    path: `/de/branchen/gesundheitswesen`,
    type: 'money',
  });
}

export default async function GesundheitswesenHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors & Clinics | Agency Hesse | Coday'
      : 'Webdesign für Ärzte & Praxen | Agentur in Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional practice websites for doctors in Wetzlar and Hesse. Attract patients through modern web design and local SEO optimization. Inquire today.'
      : 'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.';
  return (
    <>
      <script
        id="schema-branchen-gesundheitswesen"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Ärzte & Praxen',
                description:
                  'Professionelle Praxis-Webseiten für Ärzte in Wetzlar und Hessen. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen.',
                url: `${BASE_URL}/de/branchen/gesundheitswesen`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="aerzte-gesundheit" />
      <IndustryToolEmbed industryKey="gesundheit" />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
