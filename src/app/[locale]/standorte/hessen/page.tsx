import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
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
      `hessen.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design Agency Hesse | Premium Websites';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Web agency and Next.js developer in Hesse.' : content.meta.description,
      path: `/${locale}/standorte/hessen`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design Agency Hesse | Premium Websites'
          : 'Webdesign Agentur Hessen | Premium Webseiten',
      description:
        locale === 'en'
          ? 'Web agency and Next.js developer in Hesse.'
          : 'Webagentur und Next.js Entwickler in Hessen.',
      path: `/${locale}/standorte/hessen`,
      type: 'money',
    });
  }
}

export default async function HessenLocationPage({
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
      `hessen.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Hessen SEO Content is currently being generated...</div>
    );
  }

  const _locale = (await params)?.locale || 'de';

  const locationSchema = getDynamicLocationSchema({
    city: 'Hessen',
    description:
      _locale === 'en'
        ? 'Web design agency in Hesse — Premium websites with Next.js, SEO & Generative Engine Optimization.'
        : 'Webdesign Agentur in Hessen — Premium Websites mit Next.js, SEO & Generative Engine Optimization für Unternehmen in ganz Hessen.',
    url: `${BASE_URL}/${_locale}/standorte/hessen`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(), locationSchema],
  };

  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Agency Hesse | Premium Websites | Coday'
      : 'Webdesign Agentur Hessen | Premium Webseiten | Coday';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
