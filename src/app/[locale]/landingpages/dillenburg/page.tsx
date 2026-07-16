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
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professional Web Design in Dillenburg
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Dillenburg, a historically significant town in the northern Lahn-Dill district of
                central Hesse, is home to a thriving and resilient economy largely driven by highly
                specialized small and medium-sized enterprises. In this highly competitive regional
                landscape, investing in professional web design in Dillenburg is no longer an
                optional luxury — it is the absolute foundation of every successful, long-term
                customer acquisition strategy. A modern, high-performance website serves as the very
                first and most critical point of contact between your business and potential
                clients. It instantly communicates unwavering trust, deep professionalism, and
                authoritative competence long before a single word is exchanged in person. At Coday,
                we specialise in building highly customized, premium websites for businesses in
                Dillenburg that do far more than simply look visually attractive. Our rigorous web
                design approach seamlessly combines striking visual aesthetics with unparalleled
                technical excellence, ensuring that your digital footprint truly stands out from the
                local crowd.
              </p>
              <p>
                We guarantee blisteringly fast load times, flawless mobile responsiveness
                (mobile-first design), and a highly intuitive user experience that gently but firmly
                guides visitors toward taking a profitable action — whether that means requesting a
                customized quote, booking a consultation appointment, or making a direct online
                purchase. What truly sets our premium web design services in Dillenburg apart is our
                incredibly deep, practical understanding of local search engine optimisation (Local
                SEO). It is simply not enough to have a beautiful website if potential customers in
                the Lahn-Dill district cannot easily find it online. We build every single site from
                the ground up with maximum search engine visibility in mind, strategically targeting
                highly relevant, intent-driven local keywords so your business consistently appears
                at the very top of Google results when people in Dillenburg, Haiger, Herborn, and
                the wider region actively search for your specialized products or services.
              </p>
              <p>
                Our proven SEO methodology encompasses immaculately clean semantic HTML markup,
                deeply optimised URL page structures, highly strategic content placement, and
                comprehensive Google Business Profile enhancement. This highly cohesive approach
                ensures that your professional website does not just passively exist online — it
                actively and relentlessly generates highly qualified leads and measurable, scalable
                revenue for your business month after month. Our holistic approach to outstanding
                web design in Dillenburg begins with a thorough, data-driven analysis of your
                specific target audience and the immediate competitive landscape. We carefully craft
                a bespoke digital strategy perfectly tailored to your specific industry, whether you
                operate a traditional skilled trades business, a specialized medical practice, an
                upscale restaurant, or a B2B service company. Every single UI design element is
                carefully aligned with your overarching brand identity, core values, and unique
                selling propositions.
              </p>
              <p>
                Impeccably high-quality imagery, compelling and persuasive copywriting, and a
                crystal-clear content architecture ensure that busy visitors find the exact
                information they need quickly and are strongly motivated to reach out. We also place
                the absolute highest priority on stringent data protection and strict GDPR
                compliance, employing state-of-the-art security encryption technologies and
                deploying regular technical updates to keep your website completely safe from modern
                vulnerabilities. Scalability is yet another fundamental cornerstone of our advanced
                development process — your website is built on highly flexible, incredibly fast
                modern frameworks like Next.js and React that grow seamlessly and effortlessly
                alongside your expanding business. A successful web project definitely does not end
                at the initial launch. We provide ongoing, proactive support, rigorous performance
                monitoring, and continuous, data-driven optimisation to ensure your professional
                website in Dillenburg keeps delivering exceptional results and a strong return on
                investment over the long term.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professionelles Webdesign in Dillenburg
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Dillenburg, als historisch bedeutsame Oranierstadt im nördlichen Lahn-Dill-Kreis,
                bietet eine florierende Wirtschaft, die stark von mittelständischen Unternehmen
                geprägt ist. Ein erstklassiges, maßgeschneidertes Webdesign in Dillenburg ist
                heutzutage absolut unerlässlich, um in dieser wettbewerbsintensiven Region
                langfristig erfolgreich zu sein. Eine moderne, ästhetisch ansprechende und technisch
                einwandfreie Website ist oft der erste und wichtigste Berührungspunkt zwischen Ihnen
                und Ihren potenziellen Kunden. Sie vermittelt sofortiges Vertrauen, Professionalität
                und tiefgreifende Kompetenz, lange bevor das erste persönliche Gespräch stattfindet.
                Bei der Erstellung einer neuen, hochkonvertierenden Internetpräsenz für Ihr
                Unternehmen achten wir akribisch darauf, dass das Design nicht nur optisch restlos
                überzeugt, sondern auch technisch auf dem absolut neuesten Stand der Entwicklung
                ist. Wir kreieren digitale Erlebnisse, die Ihre spezifische Zielgruppe emotional
                abholen und Ihre unternehmerischen Werte klar kommunizieren.
              </p>
              <p>
                Blitzschnelle Ladezeiten, kompromisslose mobile Optimierung (Mobile-First-Ansatz)
                und eine intuitive Benutzerführung (UX-Design) sind die entscheidenden Grundlagen
                für eine hohe Conversion-Rate. Darüber hinaus spielt die strategische
                Suchmaschinenoptimierung (SEO) eine zentrale, erfolgskritische Rolle. Denn nur, wenn
                Ihre Website bei Google und anderen Suchmaschinen auf den vordersten Plätzen
                gefunden wird, können Sie nachhaltig neue Kunden gewinnen. Wir optimieren Ihre Seite
                gezielt für lokale Suchanfragen aus Dillenburg, Haiger, Herborn und dem gesamten
                Lahn-Dill-Kreis. So stellen wir sicher, dass Sie exakt dort digital sichtbar sind,
                wo Ihre Zielgruppe aktiv nach Ihren Produkten oder spezialisierten Dienstleistungen
                sucht. Durch sauberen, semantischen Code, strukturierte Daten und
                performance-optimierte Bilder garantieren wir, dass Google Ihre Website als
                hochrelevant und qualitativ hochwertig einstuft.
              </p>
              <p>
                Unser Ansatz für modernes Webdesign in Dillenburg ist vollumfänglich und
                ganzheitlich. Wir beginnen jedes Projekt mit einer umfassenden, detaillierten
                Analyse Ihrer Zielgruppe und Ihrer stärksten Mitbewerber, um eine maßgeschneiderte
                digitale Strategie zu entwickeln. Das Webdesign wird dabei völlig individuell an Ihr
                Corporate Design angepasst und spiegelt die einzigartigen Werte und die Identität
                Ihres Unternehmens präzise wider. Hochwertiges Bildmaterial, verkaufspsychologisch
                optimierte Texte und eine logische, glasklare Strukturierung der Inhalte sorgen
                dafür, dass die Besucher Ihrer Website sofort die gewünschten Informationen finden
                und intuitiv zur Kontaktaufnahme geführt werden. Besonderen Wert legen wir auch auf
                höchste Sicherheitsstandards und strikte DSGVO-Konformität. Mit modernsten
                Servertechnologien und regelmäßigen Wartungsupdates gewährleisten wir, dass Ihre
                Website stets sicher, performant und zuverlässig vor externen Angriffen geschützt
                ist.
              </p>
              <p>
                Ein weiteres wichtiges Element unserer Arbeit ist die uneingeschränkte
                Skalierbarkeit Ihrer neuen Website. Ihre digitale Plattform soll mit Ihrem
                Unternehmen flexibel mitwachsen können. Daher setzen wir auf moderne,
                Headless-basierte Technologien und Next.js, die sich jederzeit nahtlos erweitern und
                an veränderte Marktbedingungen anpassen lassen. Ein erfolgreiches Webprojekt endet
                für uns jedoch nicht mit dem feierlichen Launch der Website. Wir bieten Ihnen eine
                langfristige, partnerschaftliche Betreuung und regelmäßige datenbasierte Analysen,
                um den Erfolg Ihrer Online-Präsenz kontinuierlich zu messen und weiter zu
                optimieren. Durch das systematische Monitoring von Nutzerverhalten und
                Conversion-Raten identifizieren wir ungenutzte Potenziale und setzen zielgerichtete
                Verbesserungen um. Investieren Sie in ein professionelles Webdesign für Dillenburg
                und heben Sie sich deutlich von der Konkurrenz ab – eine moderne Website ist der
                Schlüssel zu mehr Sichtbarkeit, qualifizierten Kundenanfragen und messbarem
                Umsatzwachstum im Lahn-Dill-Kreis.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
