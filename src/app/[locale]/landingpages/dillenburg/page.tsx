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
      title: 'Web Design Dillenburg | Professional Websites',
      description:
        'Your web agency for Dillenburg and the Lahn-Dill district. High-performance websites that bring new clients. Personal service at a fixed price.',
      path: '/en/landingpages/dillenburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Dillenburg | Webseiten vom Profi',
    description:
      'Ihre Webagentur für Dillenburg und den Lahn-Dill-Kreis. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum Festpreis. Anfragen.',
    path: '/de/landingpages/dillenburg',
    type: 'money',
  });
}

export default async function DillenburgLandingPage(props: {
  params: Promise<{ locale: string }>;
}) {
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
      'dillenburg.json'
    );
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('dillenburg');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Dillenburg | Professional Websites | Coday'
      : 'Webdesign Dillenburg | Webseiten vom Profi | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency for Dillenburg and the Lahn-Dill district. High-performance websites that bring new clients. Personal service at a fixed price.'
      : 'Ihre Webagentur für Dillenburg und den Lahn-Dill-Kreis. Hochperformante Webseiten die messbar neue Kunden bringen. Persönlich und zum Festpreis. Anfragen.';
  return (
    <>
      <SeoHead
        title={`Webdesign Agentur in Dillenburg | Coday`}
        description={`Ihre Webagentur für Dillenburg. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Dillenburg
          </h1>
          <div className="flex flex-col items-center gap-6 mt-4">
            <h2 className="text-gray-400 max-w-2xl text-lg font-normal">
              Als <strong>Ihr Webdesigner in Dillenburg</strong> bauen wir in der Umgebung
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
                Dillenburg und im Lahn-Dill-Kreis digital erfolgreich zu sein. Mit unserer Expertise
                im Bereich Webentwicklung und SEO bringen wir Sie auf die vorderen Plätze.
              </p>
              <p>
                Dillenburg, als historisch bedeutsame Oranierstadt und wirtschaftliches Zentrum im
                nördlichen Lahn-Dill-Kreis, bietet Unternehmen ein enormes Potenzial, sich online
                erfolgreich zu positionieren. Gerade in einer von starkem Mittelstand und Handwerk
                geprägten Region entscheidet der erste digitale Eindruck oft darüber, ob ein
                Interessent zum Kunden wird oder sich für den lokalen Mitbewerber entscheidet. Ein
                exzellentes Webdesign für Ihr Unternehmen in Dillenburg muss daher weit mehr leisten
                als nur gut auszusehen: Es muss Ihre individuellen Werte, Ihre Verlässlichkeit und
                Ihre fachliche Kompetenz authentisch auf den Bildschirm transportieren. Wir
                entwickeln maßgeschneiderte Internetauftritte, die exakt auf Ihre Zielgruppe
                zugeschnitten sind und Ihre Alleinstellungsmerkmale präzise herausarbeiten. So
                entsteht eine digitale Identität, die nachhaltig im Gedächtnis bleibt.
              </p>
              <p>
                Ein wesentlicher Erfolgsfaktor für modernes Webdesign ist die nahtlose Verbindung
                von Ästhetik und technischer Perfektion. Besonders im lokalen Wettbewerb rund um
                Dillenburg, Haiger und Herborn wird die Auffindbarkeit in Suchmaschinen zu einem
                entscheidenden Kriterium. Unsere Webseiten werden von Grund auf für Google und
                andere Suchmaschinen optimiert (SEO), sodass Sie bei relevanten Suchanfragen aus der
                Region ganz oben erscheinen. Gleichzeitig setzen wir auf performante Technologien,
                die blitzschnelle Ladezeiten garantieren – sowohl auf dem Desktop-Rechner im Büro
                als auch mobil auf dem Smartphone von unterwegs. Eine langsame oder unstrukturierte
                Webseite führt heutzutage unweigerlich zu hohen Absprungraten. Wir verhindern das,
                indem wir intuitive Navigationen und glasklare Handlungsaufforderungen
                (Calls-to-Action) implementieren, die den Nutzer direkt zur Kontaktaufnahme oder zur
                Terminbuchung führen.
              </p>
              <p>
                Zusätzlich zur reinen Kundengewinnung spielt das Webdesign heute eine zentrale Rolle
                beim Recruiting neuer Mitarbeiter. Der Fachkräftemangel macht auch vor den
                Unternehmen in Dillenburg nicht Halt. Wer als attraktiver Arbeitgeber wahrgenommen
                werden möchte, braucht eine moderne Karriereseite, die Werte, Teamkultur und
                Benefits klar kommuniziert. Wir integrieren nahtlose, digitale Bewerbungsprozesse in
                Ihre Webseite, die es Talenten extrem einfach machen, sich in wenigen Klicks zu
                bewerben. Das spart Ihnen wertvolle Zeit und reduziert die Hürden für potenzielle
                Bewerber drastisch. Mit einer strategisch aufgebauten Webseite schlagen Sie somit
                zwei Fliegen mit einer Klappe: Sie generieren mehr Umsatz durch neue Kundenanfragen
                und sichern gleichzeitig die Zukunft Ihres Betriebes durch qualifiziertes Personal
                aus der Region.
              </p>
              <p>
                Darüber hinaus verstehen wir uns nicht nur als reine Umsetzer, sondern als
                langfristige strategische Partner für Ihren digitalen Erfolg in Dillenburg. Wir
                begleiten Sie von der ersten Konzeptionsphase über das Design und die Programmierung
                bis hin zur regelmäßigen Wartung und Pflege Ihres neuen Webauftritts. Auch die
                Themen Barrierefreiheit, DSGVO-Konformität und Datensicherheit stehen bei uns an
                oberster Stelle. Ein solides, modernes und rechtssicheres Webdesign schützt Ihr
                Unternehmen vor Abmahnungen und stärkt das Vertrauen Ihrer Kunden. Investieren Sie
                in eine zukunftssichere digitale Plattform, die mit Ihrem Unternehmen wächst, Ihre
                internen Prozesse durch smarte Automatisierungen entlastet und Ihnen messbar mehr
                qualifizierte Anfragen aus Dillenburg und dem gesamten Lahn-Dill-Kreis bringt.
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
                name: 'Coday Webdesign Dillenburg',
                areaServed: 'Dillenburg',
                description: 'Lokale Webdesign-Agentur für Dillenburg und Umgebung.',
              }),
            }}
          />
        </div>
      )}
      <SeoContentBlock />
    </>
  );
}
