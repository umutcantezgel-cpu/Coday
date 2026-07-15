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
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';
import { routing } from '@/i18n/routing';
import { cities } from '@/features/local-seo/model/cities';

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; industry: string; location: string }[] = [];
  const dirPath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content');

  if (!fs.existsSync(dirPath)) return params;

  const files = fs.readdirSync(dirPath);
  const citySlugs = cities ? cities.map((c) => c.slug) : [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const name = file.replace('.json', '');

    // Find if name ends with a known city slug
    const matchedCity = citySlugs.find((slug) => name.endsWith(`-${slug}`));
    if (matchedCity) {
      const industry = name.slice(0, -(matchedCity.length + 1)); // remove -city
      routing.locales.forEach((locale) => {
        params.push({ locale, industry, location: matchedCity });
      });
    }
  }

  return params;
}
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
      const rawDescEn = content.meta_en?.description || content.meta.description;
      const rawDescDe = content.meta.description;
      const descEn = rawDescEn.length > 145 ? rawDescEn.substring(0, 142) + '...' : rawDescEn;
      const descDe = rawDescDe.length > 145 ? rawDescDe.substring(0, 142) + '...' : rawDescDe;

      return generatePageMetadata({
        title:
          locale === 'en'
            ? content.meta_en?.title || `${content.meta.title} in English`
            : content.meta.title,
        description: locale === 'en' ? descEn : descDe,
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
            getOrganizationSchema(locale),
            getServiceSchema({
              name:
                locale === 'en'
                  ? `Web Design for ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''}`
                  : `Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''}`,
              description:
                locale === 'en'
                  ? `Professional web design for ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} by Coday.`
                  : `Professionelles Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} von Coday.`,
              url: `${BASE_URL}/${locale}/branchen/${industry}/${location}`,
            }),
          ],
        }),
      }}
    />
  );

  if (localContent) {
    const _locale = (await params)?.locale || 'de';

    // Normalize content for LocalSeoTemplate
    let normalizedContent = { ...localContent };
    if (_locale === 'en') {
      normalizedContent = {
        target: localContent.target,
        type: localContent.type,
        meta: localContent.meta_en || localContent.meta,
        hero: localContent.hero_en || localContent.hero,
        localDominance: localContent.localDominance_en || localContent.localDominance,
        contentSections: localContent.contentSections_en || localContent.contentSections || [],
        faq: localContent.faq_en || localContent.faq || [],
      };
    } else {
      if (!normalizedContent.contentSections) normalizedContent.contentSections = [];
      if (!normalizedContent.faq) normalizedContent.faq = [];
    }

    // Merge missing fields (bentoGrid, processSteps) into contentSections to avoid data loss
    const sourceBento =
      _locale === 'en'
        ? localContent.bentoGrid_en || localContent.bentoGrid
        : localContent.bentoGrid;
    if (sourceBento?.cards) {
      sourceBento.cards.forEach((c: any) =>
        normalizedContent.contentSections.push({ title: c.title, content: c.text })
      );
    }
    const sourceProcess =
      _locale === 'en'
        ? localContent.processSteps_en || localContent.processSteps
        : localContent.processSteps;
    if (sourceProcess) {
      sourceProcess.forEach((s: any) =>
        normalizedContent.contentSections.push({ title: s.title, content: s.description })
      );
    }

    const pageTitle = normalizedContent.meta?.title || '';
    const cleanTitle = pageTitle.replace(' | Coday', '');

    return (
      <>
        {schemaScript}
        <LocalSeoTemplate content={normalizedContent} cityData={cityData} />
        <SeoContentBlock title={cleanTitle} />
      </>
    );
  }
  return notFound();
}
