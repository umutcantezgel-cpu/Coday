import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { getOrganizationSchema, getDynamicLocationSchema, BASE_URL } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      `wetzlar.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design Agency Wetzlar | Top Websites';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Local expertise meets high-end tech.' : content.meta.description,
      path: `/${locale}/standorte/wetzlar`,
      type: 'money',
    });
  } catch (e) {
    // Fallback if file doesn't exist yet
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design Agency Wetzlar | Top Websites'
          : 'Webdesign Agentur Wetzlar | Top Webseiten',
      description:
        locale === 'en'
          ? 'Local expertise meets high-end tech.'
          : 'Lokale Expertise trifft auf High-End Tech.',
      path: `/${locale}/standorte/wetzlar`,
      type: 'money',
    });
  }
}

export default async function WetzlarLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      `wetzlar.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Wetzlar SEO Content is currently being generated...</div>
    );
  }

  const cityData = getCityBySlug('wetzlar');

  const _locale = (await params)?.locale || 'de';

  const locationSchema = getDynamicLocationSchema({
    city: 'Wetzlar',
    description:
      _locale === 'en'
        ? 'Web design agency in Wetzlar — Premium websites with Next.js.'
        : 'Webdesign Agentur in Wetzlar — Premium Websites mit Next.js, SEO & Generative Engine Optimization für lokale Unternehmen.',
    url: `${BASE_URL}/${_locale}/standorte/wetzlar`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), locationSchema],
  };

  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Agency Wetzlar | Top Websites | Coday'
      : 'Webdesign Agentur Wetzlar | Top Webseiten | Coday';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} cityData={cityData} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
