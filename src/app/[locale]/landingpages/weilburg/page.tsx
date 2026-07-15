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
      'Ihre Webagentur für Weilburg und Umgebung. Hochperformante Webseiten, die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis.',
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
      : 'Ihre Webagentur für Weilburg und Umgebung. Hochperformante Webseiten, die messbar neue Kunden bringen. Persönlich und zum garantierten Festpreis.';
  return (
    <>
      <SeoHead title={_seoTitle} description={_seoDesc} pageType="default" />
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
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Local Professional Web Design in Weilburg
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In today's highly interconnected, digital-first world, a professional and extremely
                modern website is the definitive calling card for any serious, growth-oriented
                business. In a historically rich and economically significant region like Weilburg —
                with its picturesque, highly attractive setting along the River Lahn and the iconic,
                majestic Weilburg Castle — it is absolutely essential for local businesses to be
                optimally positioned in the highly competitive digital space. At Coday, we deeply
                understand the specific, nuanced requirements and unique commercial dynamics of the
                regional market in the wider Lahn-Dill district, and we actively deliver local
                professional websites that do not merely look visually impressive but actively
                generate highly measurable, scalable business results. Our rigorous web design
                approach for businesses in Weilburg focuses heavily on presenting your unique brand
                highly authentically online while precisely and effectively targeting your ideal,
                high-value audience.
              </p>
              <p>
                However, a visually compelling UI design is only half the equation when it comes to
                true online success. Uncompromising technological excellence, lightning-fast
                server-side rendered page load speeds, and a highly intuitive, frictionless user
                experience (UX) are the decisive technical factors that keep demanding visitors
                engaged on your site and ultimately seamlessly convert them into highly loyal,
                paying customers. A central, indispensable pillar of our comprehensive web design
                work is advanced local search engine optimisation (Local SEO). When potential,
                highly motivated customers in Weilburg and the immediate surrounding area actively
                search for skilled tradespeople, medical doctors, high-end restaurants, or
                specialized professional services, Google is almost always their very first point of
                contact. Even the most beautifully and expensively designed website is practically
                useless if it remains completely invisible on the critical first page of search
                results.
              </p>
              <p>
                That is precisely why we strategically and meticulously optimise your entire online
                digital presence for highly relevant, intent-driven local keywords. We absolutely
                ensure that your local business is prominently and authoritatively placed for
                lucrative search queries in Weilburg, Löhnberg, and the wider Lahn-Dill district,
                aggressively optimise your crucial Google Business Profile, and sustainably
                strengthen your overall local visibility over the long term. With carefully crafted,
                data-driven SEO strategies and high-quality, engaging content precisely aligned to
                the specific search intent of your potential customers, we build a rock-solid
                digital foundation for your long-term commercial success. We never ever leave you
                with generic, off-the-shelf template solutions — instead, we develop highly
                individual, bespoke concepts that beautifully highlight your uniqueness and
                significantly strengthen your overall competitive market position in Weilburg.
              </p>
              <p>
                Beyond dominant search visibility, we place the absolute greatest emphasis on
                seamless, flawless cross-device functionality through uncompromising responsive web
                design. An ever-growing, massive number of people now use mobile smartphones and
                tablets exclusively to research, compare, and purchase local services online. A
                local professional website that does not instantly display optimally on mobile
                devices or proves frustratingly difficult to navigate quickly leads to massive
                bounce rates and severely lost business opportunities. Our local professional
                websites for Weilburg are brilliantly conceived as mobile-responsive from the very
                first line of custom code. This means your website's layout automatically and
                fluidly adapts to the exact screen size of whichever device your visitor is using,
                guaranteeing a perfect browsing experience every single time. Trust Coday — your
                highly dependable, deeply regional partner for future-proof web design and highly
                successful online marketing in Weilburg and across Hesse.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webdesign Weilburg: Webseiten vom lokalen Profi im Lahn-Dill-Kreis
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In der heutigen, stark vernetzten Welt ist eine professionelle und extrem moderne
                Website das unverzichtbare Aushängeschild Ihres Unternehmens. Gerade in einer
                historisch und wirtschaftlich bedeutenden Region wie Weilburg, mit ihrer malerischen
                Lage an der Lahn und dem berühmten Weilburger Schloss, ist es für lokale Unternehmen
                essenziell, digital optimal aufgestellt zu sein. Wir von der Coday Webdesign Agentur
                verstehen die spezifischen Anforderungen und besonderen Bedürfnisse des regionalen
                Marktes im Lahn-Dill-Kreis und bieten Ihnen maßgeschneiderte digitale Lösungen, die
                nicht nur optisch restlos überzeugen, sondern auch echte, messbare Ergebnisse
                liefern. Unser strategischer Ansatz im Bereich Webdesign für Weilburg zielt darauf
                ab, Ihre Marke hochgradig authentisch im Internet zu präsentieren und gleichzeitig
                Ihre Zielgruppe absolut zielgenau und verkaufspsychologisch optimiert anzusprechen.
                Eine ansprechende Optik ist dabei jedoch immer nur die halbe Miete.
              </p>
              <p>
                Technologische Exzellenz, blitzschnelle Ladezeiten und eine äußerst intuitive
                Benutzerführung (UX) sind heutzutage die entscheidenden Faktoren, um Besucher auf
                Ihrer Seite zu halten und sie schließlich in treue Kunden zu verwandeln. Ein
                weiterer zentraler, unverzichtbarer Aspekt unserer Arbeit ist die tiefgreifende
                lokale Suchmaschinenoptimierung (Local SEO). Wenn potenzielle Kunden in Weilburg und
                der näheren Umgebung nach Dienstleistungen, Handwerkern, Ärzten oder
                Gastronomieangeboten suchen, ist Google in der Regel die allererste Anlaufstelle.
                Eine hervorragend gestaltete Webseite vom lokalen Profi nützt Ihnen geschäftlich
                wenig, wenn sie in den organischen Suchergebnissen völlig unsichtbar bleibt. Daher
                optimieren wir Ihre gesamte Online-Präsenz höchst strategisch auf absolut relevante,
                kaufstarke lokale Suchbegriffe. Wir sorgen dafür, dass Ihr Unternehmen bei
                Suchanfragen in Weilburg, Löhnberg und im gesamten Lahn-Dill-Kreis äußerst prominent
                auf der ersten Seite platziert wird.
              </p>
              <p>
                Zudem optimieren wir Ihr Google Unternehmensprofil und stärken so Ihre lokale
                Sichtbarkeit langfristig und extrem nachhaltig. Mit durchdachten, datenbasierten
                SEO-Strategien und hochwertigem Content, der exakt auf die Suchintention Ihrer
                potenziellen Kunden abgestimmt ist, bauen wir eine solide digitale Basis für Ihren
                langfristigen unternehmerischen Erfolg auf. Wir lassen Sie niemals mit generischen,
                austauschbaren Schablonen-Lösungen allein, sondern entwickeln hochindividuelle,
                einzigartige Konzepte, die Ihre Alleinstellungsmerkmale präzise unterstreichen und
                Ihre Wettbewerbsposition in Weilburg signifikant und dauerhaft stärken. Darüber
                hinaus legen wir allergrößten Wert auf eine absolut nahtlose, geräteübergreifende
                Funktionstüchtigkeit durch striktes Responsive Webdesign. Immer mehr Menschen nutzen
                heutzutage fast ausschließlich Smartphones und Tablets, um sich im Internet lokal zu
                informieren oder direkt online Dienstleistungen anzufragen.
              </p>
              <p>
                Eine Webseite, die auf mobilen Endgeräten nicht absolut optimal dargestellt wird
                oder schwer zu bedienen ist, führt extrem schnell zu hohen Absprungraten und damit
                zu massiven, unwiederbringlich verlorenen Geschäftsmöglichkeiten. Unsere exzellenten
                Webdesign-Lösungen für ambitionierte Unternehmen in Weilburg sind von Grund auf
                streng responsive (Mobile-First) konzipiert. Das bedeutet in der Praxis, dass sich
                das Layout Ihrer Webseite vollkommen automatisch an die Bildschirmgröße des
                jeweiligen Geräts anpasst und so stets ein perfektes, flüssiges Nutzererlebnis
                garantiert. Zu unserem umfassenden Leistungsportfolio gehört auf Wunsch auch die
                nahtlose Integration moderner Features wie automatisierte
                Online-Terminbuchungssysteme, hochsichere Kontaktformulare oder interaktive Karten,
                die den Mehrwert für Ihre Besucher massiv erhöhen. Vertrauen Sie auf Coday – Ihren
                verlässlichen, regional verwurzelten Partner für zukunftssicheres, professionelles
                Webdesign und messbar erfolgreiches Online-Marketing in Weilburg und ganz Hessen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
