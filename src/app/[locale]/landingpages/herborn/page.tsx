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
      title: 'Web Design Herborn | Local Professional Websites',
      description:
        'Your web agency for Herborn and the Lahn-Dill district. High-performance websites that bring new clients. Personal service at a fixed price.',
      path: '/en/landingpages/herborn',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Herborn | Webseiten vom lokalen Profi',
    description:
      'Ihre Webagentur für Herborn und den Lahn-Dill-Kreis. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum Festpreis. Anfragen.',
    path: '/de/landingpages/herborn',
    type: 'money',
  });
}

export default async function HerbornLandingPage(props: { params: Promise<{ locale: string }> }) {
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
      'herborn.json'
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('herborn');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Herborn | Local Professional Websites | Coday'
      : 'Webdesign Herborn | Webseiten vom lokalen Profi | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency for Herborn and the Lahn-Dill district. High-performance websites that bring new clients. Personal service at a fixed price.'
      : 'Ihre Webagentur für Herborn und den Lahn-Dill-Kreis. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum Festpreis. Anfragen.';
  return (
    <>
      <SeoHead
        title={`Webdesign Agentur in Herborn | Coday`}
        description={`Ihre Webagentur für Herborn. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Herborn
          </h1>
          <div className="flex flex-col items-center gap-6 mt-4">
            <h2 className="text-gray-400 max-w-2xl text-lg font-normal">
              Als <strong>Ihr Webdesigner in Herborn</strong> bauen wir in der Umgebung
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
                Herborn und im Lahn-Dill-Kreis digital erfolgreich zu sein. Mit unserer Expertise im
                Bereich Webentwicklung und SEO bringen wir Sie auf die vorderen Plätze.
              </p>
              <p>
                Die Fachwerkstadt Herborn zeichnet sich nicht nur durch ihren historischen Charme
                aus, sondern auch durch eine lebendige, vielseitige Unternehmenslandschaft im
                Lahn-Dill-Kreis. Um in diesem dynamischen lokalen Marktumfeld nachhaltig erfolgreich
                zu sein, ist eine moderne, professionelle Internetpräsenz heute unverzichtbar. Ein
                exzellentes Webdesign für Herborn bedeutet für uns, die einzigartige Identität Ihres
                Unternehmens digital erlebbar zu machen. Wir entwickeln keine austauschbaren
                Standard-Webseiten, sondern maßgeschneiderte digitale Plattformen, die Ihre
                Expertise, Ihre Tradition und Ihre Innovationskraft authentisch widerspiegeln. Egal
                ob ambitionierter Handwerksbetrieb, spezialisierte Arztpraxis oder lokales
                Dienstleistungsunternehmen – wir sorgen dafür, dass Sie online genau die Kunden
                ansprechen, die Sie für Ihr weiteres Wachstum benötigen.
              </p>
              <p>
                Neben einer ansprechenden Optik ist die technische Performance das Herzstück eines
                jeden erfolgreichen Webauftritts. Wenn potenzielle Kunden aus Herborn, Sinn oder
                Burg auf dem Smartphone nach Ihren Leistungen suchen, erwarten sie blitzschnelle
                Ladezeiten und eine absolut fehlerfreie Darstellung auf allen Endgeräten. Wir setzen
                auf modernste Webtechnologien, die exakt diese Anforderungen erfüllen und
                gleichzeitig die perfekte Basis für eine erfolgreiche lokale
                Suchmaschinenoptimierung (Local SEO) bilden. Durch eine clevere Strukturierung Ihrer
                Inhalte und die strategische Platzierung relevanter Keywords stellen wir sicher,
                dass Sie bei Google für Suchanfragen aus der Region Herborn prominent gelistet
                werden. Eine hohe Sichtbarkeit ist der Schlüssel, um lokale Marktanteile zu sichern
                und kontinuierlich qualifizierte Anfragen zu generieren.
              </p>
              <p>
                Auch beim Thema Mitarbeitergewinnung ist eine moderne Website für Unternehmen in
                Herborn inzwischen das wichtigste Werkzeug geworden. Um sich in Zeiten des
                allgegenwärtigen Fachkräftemangels als attraktiver und moderner Arbeitgeber zu
                positionieren, genügt eine einfache Stellenanzeige in der Zeitung längst nicht mehr.
                Wir konzipieren und entwickeln dedizierte Karriereseiten, die potenziellen Bewerbern
                sofort zeigen, warum sie Teil Ihres Teams werden sollten. Durch die nahtlose
                Integration von einfachen, digitalen Kurzbewerbungen senken wir die Einstiegshürde
                enorm. So können sich Fachkräfte aus Herborn und Umgebung bequem vom Smartphone aus
                bei Ihnen bewerben. Das stärkt nicht nur Ihre Arbeitgebermarke, sondern beschleunigt
                auch Ihre internen Einstellungsprozesse signifikant und sichert Ihnen die besten
                Talente der Region.
              </p>
              <p>
                Ein ganzheitliches Webdesign-Konzept muss zudem darauf ausgerichtet sein, Besucher
                aktiv in zahlende Kunden oder neue Mitarbeiter zu verwandeln. Deshalb legen wir
                größten Wert auf eine intuitive Nutzerführung (UX) und konversionsstarke Elemente
                wie integrierte Terminbuchungssysteme, smarte Kontaktformulare oder digitale
                Bewerbungsprozesse. Gerade in Zeiten des Fachkräftemangels in der Region Lahn-Dill
                kann eine überzeugende Karriereseite den entscheidenden Unterschied machen. Als Ihr
                verlässlicher Webdesign-Partner aus der Region begleiten wir Sie transparent und auf
                Augenhöhe – von der ersten strategischen Beratung bis zum erfolgreichen Live-Gang
                Ihrer neuen Webseite und darüber hinaus. Wir kümmern uns um die technische Wartung,
                maximale Datensicherheit und die strikte Einhaltung aller DSGVO-Richtlinien, damit
                Sie sich in Herborn voll und ganz auf Ihr Kerngeschäft konzentrieren können.
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
            </div>
          </div>

          {/* Geo/LocalBusiness Schema injection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Coday Webdesign Herborn',
                areaServed: 'Herborn',
                description: 'Lokale Webdesign-Agentur für Herborn und Umgebung.',
              }),
            }}
          />
        </div>
      )}
      <SeoContentBlock />
    </>
  );
}
