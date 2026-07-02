import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
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
      'handwerk-bau-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/branchen/handwerker/wetzlar`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'Webdesign für Handwerker in Wetzlar | Agentur',
      description: 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/handwerker/wetzlar`,
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
      'handwerk-bau-wetzlar.json'
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
        {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
      </div>
    );
  }

  const cityData = getCityBySlug('wetzlar');

  return (
    <>
      <GamifiedIndustryTemplate content={content} cityData={cityData} />
      {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
    </>
  );
}
