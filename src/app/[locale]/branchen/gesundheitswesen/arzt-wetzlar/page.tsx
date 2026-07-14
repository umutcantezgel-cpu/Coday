import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import fs from 'fs';
import path from 'path';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

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
      'aerzte-gesundheit-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/branchen/gesundheitswesen/arzt-wetzlar`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'Webdesign für Ärzte in Wetzlar | Praxis Homepage',
      description: 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/gesundheitswesen/arzt-wetzlar`,
      type: 'money',
    });
  }
}

export default async function SubIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
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
      'aerzte-gesundheit-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h1 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h1>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
      </div>
    );
  }

  const cityData = getCityBySlug('wetzlar');

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Webdesign für Ärzte in Wetzlar | Praxis Homepage | Coday'
      : 'Webdesign für Ärzte in Wetzlar | Praxis Homepage | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Digitale Dominanz für Ihre Branche.'
      : 'Digitale Dominanz für Ihre Branche.';
  return (
    <>
      <script
        id="schema-branchen-arzt-wetzlar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für Ärzte in Wetzlar',
                description:
                  'Webdesign für Ärzte in Wetzlar. Praxis Homepage mit modernem Design und lokaler SEO.',
                url: `${BASE_URL}/de/branchen/gesundheitswesen/arzt-wetzlar`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={cityData} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="sr-only">{_seoTitle}</p>
      </div>
    </>
  );
}
