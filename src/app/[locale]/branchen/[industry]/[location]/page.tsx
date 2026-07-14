import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { industriesData } from '@/shared/data/industries';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string; location: string }>;
}): Promise<Metadata> {
  const { locale, industry, location } = await params;

  const industryData = industriesData[industry];
  if (!industryData) return notFound();

  try {
    const fileName = `${industry}-${location}.json`;
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      fileName
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const content = JSON.parse(fileContents);
      return generatePageMetadata({
        title: locale === 'en' && content.meta_en ? content.meta_en.title : content.meta.title,
        description:
          locale === 'en' && content.meta_en
            ? content.meta_en.description
            : content.meta.description,
        path: `/${locale}/branchen/${industry}/${location}`,
        type: 'money',
      });
    }
  } catch (e) {
    // Ignore error, fallback
  }

  const formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const title =
    locale === 'en'
      ? `${formattedIndustry} Web Design ${location !== 'allgemein' ? `in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}`
      : `${formattedIndustry} Webdesign ${location !== 'allgemein' ? `in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}`;

  return generatePageMetadata({
    title,
    description:
      locale === 'en'
        ? `Professional web design and custom digital solutions for ${formattedIndustry}${location !== 'allgemein' ? ` in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}. Increase your visibility, attract more customers, and dominate your local market with Coday.`
        : `Professionelles Webdesign und maßgeschneiderte digitale Lösungen für ${formattedIndustry}${location !== 'allgemein' ? ` in ${location.charAt(0).toUpperCase() + location.slice(1)}` : ''}. Steigern Sie Ihre Sichtbarkeit, gewinnen Sie mehr Kunden und dominieren Sie Ihren Markt mit Coday.`,
    path: `/${locale}/branchen/${industry}/${location}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string; location: string }>;
}) {
  const { locale, industry, location } = await params;
  setRequestLocale(locale);

  const formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const formattedLocation =
    location !== 'allgemein' ? location.charAt(0).toUpperCase() + location.slice(1) : '';

  let localContent = null;
  let cityData = null;
  try {
    const fileName = `${industry}-${location}.json`;
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      fileName
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      localContent = JSON.parse(fileContents);
      cityData = getCityBySlug(location);
    }
  } catch (e) {
    // Return 404 if content doesn't exist
    return notFound();
  }

  const schemaScript = (
    <script
      id={`schema-branchen-${industry}-${location}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            getOrganizationSchema(),
            getServiceSchema({
              name: `Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''}`,
              description: `Professionelles Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} von Coday.`,
              url: `${BASE_URL}/de/branchen/${industry}/${location}`,
            }),
          ],
        }),
      }}
    />
  );

  if (localContent) {
    const _locale = (await params)?.locale || 'de';
    return (
      <>
        {schemaScript}
        <LocalSeoTemplate content={localContent} cityData={cityData} />
      </>
    );
  }
  return notFound();
}
