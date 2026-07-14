import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
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
      'aerzte-gesundheit-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Doctors in Wetzlar | Practice Homepage';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Digital dominance for your practice.' : content.meta.description,
      path: `/${locale}/branchen/gesundheitswesen/arzt-wetzlar`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Doctors in Wetzlar | Practice Homepage'
          : 'Webdesign für Ärzte in Wetzlar | Praxis Homepage',
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

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors in Wetzlar | Practice Homepage | Coday'
      : 'Webdesign für Ärzte in Wetzlar | Praxis Homepage | Coday';
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
                name:
                  _locale === 'en'
                    ? 'Web Design for Doctors in Wetzlar'
                    : 'Webdesign für Ärzte in Wetzlar',
                description:
                  _locale === 'en'
                    ? 'Web design for doctors in Wetzlar. Practice homepage with modern design and local SEO.'
                    : 'Webdesign für Ärzte in Wetzlar. Praxis Homepage mit modernem Design und lokaler SEO.',
                url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={cityData} />
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
