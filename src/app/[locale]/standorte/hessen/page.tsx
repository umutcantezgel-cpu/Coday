import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
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
      `hessen.${locale}.json`
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/standorte/hessen`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'Webdesign Agentur Hessen | Premium Webseiten',
      description: 'Webagentur und Next.js Entwickler in Hessen.',
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

  const locationSchema = getDynamicLocationSchema({
    city: 'Hessen',
    description:
      'Webdesign Agentur in Hessen — Premium Websites mit Next.js, SEO & Generative Engine Optimization für Unternehmen in ganz Hessen.',
    url: `${BASE_URL}/de/standorte/hessen`,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(), locationSchema],
  };

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Webdesign Agentur Hessen | Premium Webseiten | Coday'
      : 'Webdesign Agentur Hessen | Premium Webseiten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Webagentur und Next.js Entwickler in Hessen.'
      : 'Webagentur und Next.js Entwickler in Hessen.';
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalSeoTemplate content={content} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="text-[10px] text-gray-500/40 font-medium tracking-wide">{_seoTitle}</p>
      </div>
    </>
  );
}
