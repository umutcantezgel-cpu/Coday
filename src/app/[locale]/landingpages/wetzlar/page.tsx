import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Wetzlar | Websites That Bring Clients',
      description:
        'Your web agency in Wetzlar. High-performance websites that measurably bring new clients. Regional, personal and at a guaranteed fixed price. Inquire.',
      path: '/en/landingpages/wetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wetzlar | Webseiten die Kunden bringen',
    description:
      'Ihre Webagentur in Wetzlar. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum garantierten Festpreis. Anfragen.',
    path: '/de/landingpages/wetzlar',
    type: 'money',
  });
}

export default async function WetzlarLandingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'wetzlar.json'
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('wetzlar');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Wetzlar | Websites That Bring Clients | Coday'
      : 'Webdesign Wetzlar | Webseiten die Kunden bringen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency in Wetzlar. High-performance websites that measurably bring new clients. Regional, personal and at a guaranteed fixed price. Inquire.'
      : 'Ihre Webagentur in Wetzlar. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum garantierten Festpreis. Anfragen.';
  return (
    <>
      <SeoHead
        title={`Webdesign Agentur in Wetzlar | Coday`}
        description={`Ihre Webagentur für Wetzlar. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Wetzlar
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Als <strong>Ihr Webdesigner in Wetzlar</strong> bauen wir in der Umgebung
            hochperformante Webseiten für Handwerker, Ärzte und Dienstleister.
          </p>

          {/* Geo/LocalBusiness Schema injection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Coday Webdesign Wetzlar',
                areaServed: 'Wetzlar',
                description: 'Lokale Webdesign-Agentur für Wetzlar und Umgebung.',
              }),
            }}
          />
        </div>
      )}
      {/* SEO Title für Keyword-Konsistenz */}
      <div className="container mx-auto px-4 pb-12 text-center text-xs text-gray-400 font-mono">
        Themen: {_seoTitle}
      </div>
    </>
  );
}
