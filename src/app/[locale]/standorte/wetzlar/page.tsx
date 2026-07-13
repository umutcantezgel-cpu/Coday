import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { getOrganizationSchema, getDynamicLocationSchema, BASE_URL } from '@/lib/schema';
import fs from 'fs';
import path from 'path';

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

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/standorte/wetzlar`,
      type: 'money',
    });
  } catch (e) {
    // Fallback if file doesn't exist yet
    return generatePageMetadata({
      title: 'Webdesign Agentur Wetzlar | Top Webseiten',
      description: 'Lokale Expertise trifft auf High-End Tech.',
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

  const locationSchema = getDynamicLocationSchema({
    city: 'Wetzlar',
    description:
      'Webdesign Agentur in Wetzlar — Premium Websites mit Next.js, SEO & Generative Engine Optimization für lokale Unternehmen.',
    url: `${BASE_URL}/de/standorte/wetzlar`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(), locationSchema],
  };

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Webdesign Agentur Wetzlar | Top Webseiten | Coday'
      : 'Webdesign Agentur Wetzlar | Top Webseiten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Lokale Expertise trifft auf High-End Tech.'
      : 'Lokale Expertise trifft auf High-End Tech.';
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
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} cityData={cityData} />
    </>
  );
}
