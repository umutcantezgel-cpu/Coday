import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Giessen | Websites That Bring Clients',
      description:
        'Your web agency for Giessen and the surrounding area. High-performance websites that bring new clients. Personal and at a guaranteed fixed price.',
      path: '/en/landingpages/giessen',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Gießen | Webseiten die Kunden bringen',
    description:
      'Ihre Webagentur für Gießen und Umgebung. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis. Anfragen.',
    path: '/de/landingpages/giessen',
    type: 'money',
  });
}

export default async function GiessenLandingPage(props: { params: Promise<{ locale: string }> }) {
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
      'giessen.json'
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('giessen');

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Giessen | Websites That Bring Clients | Coday'
      : 'Webdesign Gießen | Webseiten die Kunden bringen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency for Giessen and the surrounding area. High-performance websites that bring new clients. Personal and at a guaranteed fixed price.'
      : 'Ihre Webagentur für Gießen und Umgebung. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis. Anfragen.';
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
      <SeoHead
        title={`Webdesign Agentur in Gießen | Coday`}
        description={`Ihre Webagentur für Gießen. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Gießen
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Als <strong>Ihr Webdesigner in Gießen</strong> bauen wir in der Umgebung hochperformante
            Webseiten für Handwerker, Ärzte und Dienstleister.
          </p>

          {/* Geo/LocalBusiness Schema injection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Coday Webdesign Gießen',
                areaServed: 'Gießen',
                description: 'Lokale Webdesign-Agentur für Gießen und Umgebung.',
              }),
            }}
          />
        </div>
      )}
    </>
  );
}
