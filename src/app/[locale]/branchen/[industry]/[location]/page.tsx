import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getServiceSchema, getBreadcrumbSchema, getWebPageSchema, BASE_URL } from '@/lib/schema';
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

// Maps the bare city slug carried in the `location` param to the page slug the
// city pyramid (CITIES_HIERARCHY in schemaPyramid.ts) uses for that place, e.g.
// "wetzlar" -> "webdesign-agentur-wetzlar" for /webdesign-agentur-wetzlar#city.
// Only cities with a built city page belong here; a location with no entry
// gets no areaServedIds rather than a link to a page that does not exist.
const CITY_PAGE_SLUGS: Record<string, string> = {
  wetzlar: 'webdesign-agentur-wetzlar',
  giessen: 'webdesign-giessen',
};

export function generateStaticParams() {
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
      // Region files (kreis-offenbach, landkreis-giessen, …) also end in a city
      // slug, but their prefix is not an industry. generateMetadata below calls
      // notFound() for those, yet Next still emits a 200 page carrying the root
      // layout's metadata — i.e. the homepage title with canonical /de.
      if (!industriesData[industry]) continue;
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
      const isEn = locale === 'en';
      const meta = isEn && content.meta_en ? content.meta_en : content.meta;
      if (meta) {
        const formattedLoc = location.charAt(0).toUpperCase() + location.slice(1);
        const formattedInd = industry.charAt(0).toUpperCase() + industry.slice(1);
        return generatePageMetadata({
          title: meta.title,
          description: meta.description,
          keywords: [
            `Webdesign ${formattedInd} ${formattedLoc}`,
            `Website für ${formattedInd} in ${formattedLoc}`,
            `Homepage ${formattedLoc}`,
            'Coday Web Agentur',
          ],
          path: `/${locale}/branchen/${industry}/${location}`,
          type: 'money',
        });
      }
    }
  } catch (e) {
    // ignore
  }

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const formattedLocation =
    location !== 'allgemein' ? location.charAt(0).toUpperCase() + location.slice(1) : '';

  if (locale === 'en') {
    return generatePageMetadata({
      title: `Web Design for ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} | Coday`,
      description: `Tailored web design and digital strategy for ${formattedIndustry} in ${formattedLocation || 'the region'}. High performance and conversion-focused websites by Coday.`,
      keywords: [
        `Web Design ${formattedIndustry} ${formattedLocation}`,
        `Website ${formattedIndustry}`,
        'Coday Web',
      ],
      path: `/en/branchen/${industry}/${location}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} | Coday`,
    description: `Maßgeschneidertes Webdesign und digitale Strategien für ${formattedIndustry} in ${formattedLocation || 'der Region'}. Performant, modern und konversionsstark von Coday.`,
    keywords: [
      `Webdesign ${formattedIndustry} ${formattedLocation}`,
      `Website für ${formattedIndustry} ${formattedLocation}`,
      'Coday Webdesign',
    ],
    path: `/de/branchen/${industry}/${location}`,
    type: 'money',
  });
}

export default async function IndustryLocationPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string; location: string }>;
}) {
  const { locale, industry, location } = await params;
  setRequestLocale(locale);
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  let formattedIndustry = industry
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

  const pageUrl = `${BASE_URL}/${_locale}/branchen/${industry}/${location}`;
  const pageName = isEn
    ? `Web Design for ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''}`
    : `Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''}`;
  const pageDescription = isEn
    ? `Professional web design for ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} by Coday.`
    : `Professionelles Webdesign für ${formattedIndustry}${formattedLocation ? ` in ${formattedLocation}` : ''} von Coday.`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: isEn ? 'Industries' : 'Branchen', url: `/${_locale}/branchen` },
      { name: formattedIndustry, url: `/${_locale}/branchen/${industry}` },
      { name: formattedLocation, url: `/${_locale}/branchen/${industry}/${location}` },
    ],
    pageUrl
  );

  const schemaScript = (
    <script
      id={`schema-branchen-${industry}-${location}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          // The root layout supplies the Organization node for every page.
          '@graph': [
            breadcrumbs,
            getWebPageSchema({
              url: pageUrl,
              name: pageName,
              description: pageDescription,
              locale: _locale,
              mainEntityId: `${pageUrl}#service`,
            }),
            getServiceSchema({
              name: pageName,
              description: pageDescription,
              url: pageUrl,
              // References the parent industry page's Audience rather than
              // declaring a new one — this page is the intersection of that
              // trade and a place, not a third thing.
              audienceId: `${BASE_URL}/${_locale}/branchen/${industry}#audience`,
              ...(CITY_PAGE_SLUGS[location]
                ? { areaServedIds: [`${BASE_URL}/${_locale}/${CITY_PAGE_SLUGS[location]}#city`] }
                : {}),
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
