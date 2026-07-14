import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { industriesData } from '@/shared/data/industries';
import { routing } from '@/i18n/routing';

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

  const formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

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

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

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
              getOrganizationSchema(),
              getServiceSchema({
                name: locale === 'en' ? `Web Design for ${industry}` : `Webdesign für ${industry}`,
                description:
                  locale === 'en'
                    ? `Custom web design solutions for the ${industry} industry by Coday in Wetzlar.`
                    : `Maßgeschneiderte Webdesign-Lösungen für die Branche ${industry} von Coday in Wetzlar.`,
                url: `${BASE_URL}/${locale}/branchen/${industry}`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient />
    </>
  );
}
