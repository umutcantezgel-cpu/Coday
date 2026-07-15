import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { industriesData } from '@/shared/data/industries';
import { routing } from '@/i18n/routing';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; industry: string }[] = [];
  routing.locales.forEach((locale) => {
    Object.keys(industriesData).forEach((industry) => {
      params.push({ locale, industry });
    });
  });
  return params;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }

  if (locale === 'en') {
    return generatePageMetadata({
      title: `${formattedIndustry} Web Design & IT Solutions`,
      description: `Custom web design, software development, and IT solutions specifically tailored for the ${formattedIndustry} industry. Elevate your digital presence and optimize your workflows with Coday.`,
      path: `/en/branchen/${industry}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `${formattedIndustry} Webdesign & IT-Lösungen`,
    description: `Maßgeschneidertes Webdesign, Softwareentwicklung und IT-Lösungen speziell für die Branche ${formattedIndustry}. Optimieren Sie Ihre Prozesse und stärken Sie Ihre digitale Präsenz mit Coday.`,
    path: `/de/branchen/${industry}`,
    type: 'money',
  });
}

import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }
  const cleanTitle =
    locale === 'en'
      ? `${formattedIndustry} Web Design & IT Solutions`
      : `${formattedIndustry} Webdesign & IT-Lösungen`;

  const _locale = (await params)?.locale || 'de';
  return (
    <>
      <script
        id={`schema-branchen-${industry}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  locale === 'en'
                    ? `Web Design for ${formattedIndustry}`
                    : `Webdesign für ${formattedIndustry}`,
                description:
                  locale === 'en'
                    ? `Custom web design solutions for the ${formattedIndustry} industry by Coday in Wetzlar.`
                    : `Maßgeschneiderte Webdesign-Lösungen für die Branche ${formattedIndustry} von Coday in Wetzlar.`,
                url: `${BASE_URL}/${locale}/branchen/${industry}`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient />
      <SeoContentBlock title={cleanTitle} />
    </>
  );
}
