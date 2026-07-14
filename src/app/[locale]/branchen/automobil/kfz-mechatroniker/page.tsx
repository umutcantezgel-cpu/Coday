import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';

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
      'kfz-mechatroniker.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/branchen/automobil/kfz-mechatroniker`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'Webdesign für KFZ-Mechatroniker | Hessen',
      description: 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/automobil/kfz-mechatroniker`,
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
      'kfz-mechatroniker.json'
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

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Webdesign für KFZ-Mechatroniker | Hessen | Coday'
      : 'Webdesign für KFZ-Mechatroniker | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Digitale Dominanz für Ihre Branche.'
      : 'Digitale Dominanz für Ihre Branche.';
  return (
    <>
      <script
        id="schema-branchen-kfz-mechatroniker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(),
              getServiceSchema({
                name: 'Webdesign für KFZ-Mechatroniker',
                description:
                  'Webdesign für KFZ-Mechatroniker in Hessen. Digitale Dominanz für Ihre Branche.',
                url: `${BASE_URL}/de/branchen/automobil/kfz-mechatroniker`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={undefined} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center">
        <p className="opacity-[0.01] pointer-events-none text-[2px] leading-none select-none overflow-hidden h-px w-full">
          {_seoTitle}
        </p>
      </div>
    </>
  );
}
