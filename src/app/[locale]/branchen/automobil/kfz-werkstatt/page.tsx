import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';

import fs from 'fs';
import path from 'path';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

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
      'kfz-werkstatt.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Auto Repair Shops | Wetzlar Area';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Digital dominance for your industry.' : content.meta.description,
      path: `/${locale}/branchen/automobil/kfz-werkstatt`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Auto Repair Shops | Wetzlar Area'
          : 'Webdesign für KFZ-Werkstätten | Raum Wetzlar',
      description:
        locale === 'en'
          ? 'Digital dominance for your industry.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/automobil/kfz-werkstatt`,
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
      'kfz-werkstatt.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h2 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h2>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
      </div>
    );
  }

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Auto Repair Shops | Wetzlar Area | Coday'
      : 'Webdesign für KFZ-Werkstätten | Raum Wetzlar | Coday';
  return (
    <>
      <script
        id="schema-branchen-kfz-werkstatt"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Web Design for Auto Repair Shops'
                    : 'Webdesign für KFZ-Werkstätten',
                description:
                  _locale === 'en'
                    ? 'Web design for auto repair shops in the Wetzlar area. Digital dominance for your industry.'
                    : 'Webdesign für KFZ-Werkstätten im Raum Wetzlar. Digitale Dominanz für Ihre Branche.',
                url: `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={undefined} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
