import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import fs from 'fs';
import path from 'path';
import { SeoContentBlock } from '@/shared/ui/SeoContentBlock';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Weilburg | Local Professional Websites',
      description:
        'Your web agency for Weilburg and surrounding area. High-performance websites that bring new clients. Personal service at a guaranteed fixed price.',
      path: '/en/landingpages/weilburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Weilburg | Webseiten vom lokalen Profi',
    description:
      'Ihre Webagentur für Weilburg und Umgebung. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis. Anfragen.',
    path: '/de/landingpages/weilburg',
    type: 'money',
  });
}

export default async function WeilburgLandingPage(props: { params: Promise<{ locale: string }> }) {
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
      'weilburg.json'
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('weilburg');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Weilburg | Local Professional Websites | Coday'
      : 'Webdesign Weilburg | Webseiten vom lokalen Profi | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency for Weilburg and surrounding area. High-performance websites that bring new clients. Personal service at a guaranteed fixed price.'
      : 'Ihre Webagentur für Weilburg und Umgebung. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis. Anfragen.';
  return (
    <>
      <SeoHead
        title={`Webdesign Agentur in Weilburg | Coday`}
        description={`Ihre Webagentur für Weilburg. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Weilburg
          </h1>
          <div className="flex flex-col items-center gap-6 mt-4">
            <h2 className="text-gray-400 max-w-2xl text-lg font-normal">
              Als <strong>Ihr Webdesigner in Weilburg</strong> bauen wir in der Umgebung
              hochperformante Webseiten für Handwerker, Ärzte und Dienstleister.
            </h2>
            <div className="text-gray-300 max-w-2xl text-left space-y-4 px-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-base leading-relaxed">
              <p>
                Eine professionelle Webseite ist heute das wichtigste Aushängeschild für jedes
                lokale Unternehmen. Egal ob Sie einen Handwerksbetrieb führen, eine Arztpraxis
                leiten oder spezifische Dienstleistungen anbieten: Ihre potenziellen Kunden suchen
                online nach Ihren Angeboten. Wenn Sie nicht sofort gefunden werden oder Ihre
                Webseite veraltet wirkt, verlieren Sie bares Geld an die regionale Konkurrenz. Eine
                moderne, Conversion-optimierte Internetpräsenz baut Vertrauen auf, noch bevor der
                erste persönliche Kontakt entsteht. Wir wissen, worauf es ankommt, um in der Region
                Weilburg und im Lahn-Dill-Kreis digital erfolgreich zu sein. Mit unserer Expertise
                im Bereich Webentwicklung und SEO bringen wir Sie auf die vorderen Plätze.
              </p>
              <p>
                Wir unterstützen Sie dabei, eine digitale Präsenz aufzubauen, die nicht nur auf den
                ersten Blick überzeugt, sondern auch technisch einwandfrei funktioniert, extrem
                schnelle Ladezeiten bietet und perfekt für Suchmaschinen (SEO) optimiert ist. Dabei
                legen wir großen Wert auf intuitive Benutzerführung und barrierefreie Designs.
                Profitieren Sie von unserer langjährigen Erfahrung im Bereich Webdesign,
                Suchmaschinenoptimierung und digitaler Markenbildung in der Region Lahn-Dill. Lassen
                Sie uns gemeinsam Ihr Projekt besprechen und herausfinden, wie wir Ihr Unternehmen
                digital auf die nächste Stufe heben können.
              </p>
              <p>
                Die digitale Landschaft entwickelt sich rasant weiter, und für Unternehmen in
                Weilburg ist es entscheidend, mit diesem Wandel Schritt zu halten. Eine
                maßgeschneiderte Webseite ist mehr als nur eine digitale Visitenkarte; sie ist ein
                interaktives Werkzeug zur Kundengewinnung und Kundenbindung. Durch gezieltes
                Webdesign, das exakt auf Ihre Zielgruppe im Lahn-Dill-Kreis abgestimmt ist, heben
                Sie sich deutlich von der Konkurrenz ab. Wir integrieren moderne Funktionen wie
                Online-Terminbuchungen, interaktive Kontaktformulare und dynamische Inhalte, die den
                Nutzern einen echten Mehrwert bieten und die Kontaktaufnahme so einfach wie möglich
                gestalten.
              </p>
              <p>
                Darüber hinaus spielt die lokale Suchmaschinenoptimierung (Local SEO) eine immer
                wichtigere Rolle. Es nützt die schönste Webseite nichts, wenn sie von potenziellen
                Kunden aus Weilburg und Umgebung bei Google nicht gefunden wird. Wir optimieren Ihre
                gesamte Internetpräsenz strategisch auf relevante lokale Suchbegriffe, verbessern
                Ihr Google Unternehmensprofil und sorgen dafür, dass Sie bei lokalen Suchanfragen
                prominent platziert werden. Durch sauberen Code, schnelle Ladezeiten und mobile
                Optimierung erfüllen wir alle technischen Anforderungen, die Suchmaschinen heute an
                moderne Webseiten stellen.
              </p>
              <p>
                Sicherheit und Zuverlässigkeit sind weitere Eckpfeiler unserer Webentwicklung. Wir
                setzen auf aktuelle Technologien und höchste Sicherheitsstandards, um Ihre Webseite
                und die Daten Ihrer Nutzer optimal zu schützen. Mit regelmäßigen Updates, Backups
                und einem proaktiven Wartungsservice stellen wir sicher, dass Ihre Online-Präsenz
                jederzeit reibungslos funktioniert. Vertrauen Sie auf unser Know-how als lokale
                Webdesign-Agentur und lassen Sie uns gemeinsam eine digitale Strategie entwickeln,
                die Ihr Unternehmen in Weilburg langfristig und messbar erfolgreich macht.
              </p>
            </div>
          </div>

          {/* Geo/LocalBusiness Schema injection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Coday Webdesign Weilburg',
                areaServed: 'Weilburg',
                description: 'Lokale Webdesign-Agentur für Weilburg und Umgebung.',
              }),
            }}
          />
        </div>
      )}
      <SeoContentBlock />
    </>
  );
}
