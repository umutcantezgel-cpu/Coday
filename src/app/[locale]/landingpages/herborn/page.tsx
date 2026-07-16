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
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Local Professional Web Design in Herborn
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Herborn, the beautifully preserved half-timbered town in the heart of the Lahn-Dill
                district, is home to a highly vibrant, resilient, and diverse business community.
                From specialized skilled tradespeople and highly established medical practices to
                local retailers and innovative professional service providers, Herborn's strong
                local economy truly thrives on personal relationships, shared history, and deep
                regional trust. In today's highly competitive, digital-first business world,
                however, a local professional website has undeniably become the single most
                important and effective tool for building that essential trust before a customer
                ever walks through your physical door. At Coday, we create exceptionally
                high-performance, bespoke web design solutions specifically tailored to ambitious
                businesses in Herborn that genuinely need to stand out dominantly in their local
                market. Our comprehensive approach goes far beyond cheap templates and generic,
                uninspired layouts. We build highly customized, ruthlessly conversion-optimised
                websites that authentically represent your unique brand identity, vividly showcase
                your professional expertise, and make it completely effortless for potential
                customers to contact you or seamlessly book your services online.
              </p>
              <p>
                What makes our web design for Herborn truly effective and highly sought-after is our
                incredibly deep, data-driven expertise in local search engine optimisation (Local
                SEO). When residents of Herborn, Sinn, Burg, or the wider Lahn-Dill district search
                for specialized services or local products on their smartphones, your business
                absolutely needs to appear at the very top of those competitive search results. We
                meticulously engineer every single website with advanced local SEO built directly
                into its very foundation — from a flawlessly clean semantic HTML structure and
                highly strategic keyword placement to deeply optimised meta data and comprehensive
                Google Business Profile integration. This powerful combination means your local
                professional website does not just look visually impressive; it actively works
                around the clock as a dedicated sales engine to attract highly qualified leads and
                paying customers from your specific region. Combined with lightning-fast,
                server-side rendered page load speeds and flawless, fluid responsive design across
                all mobile devices, our web design ensures that every single visitor who lands on
                your site has a seamless, confidence-building digital experience that strongly
                encourages them to take the next profitable step.
              </p>
              <p>
                As your dedicated local professional web design partner, we fundamentally understand
                that small and medium-sized businesses in Herborn have entirely unique, highly
                specific requirements that vastly differ from those of large, impersonal
                metropolitan companies. You deeply need a modern digital presence that naturally
                feels personal, completely authentic, and firmly rooted in the local community —
                absolutely not a cookie-cutter corporate site that lacks soul. That is precisely why
                we begin every single web project with an in-depth, face-to-face (or virtual)
                consultation to deeply understand your specific business goals, your ideal
                clientele, and the exact competitive dynamics of your specific local market in the
                wider Lahn-Dill region. We then skillfully translate these valuable insights into a
                custom, highly strategic web design strategy that includes extremely thoughtful user
                experience (UX) design, strategically placed calls-to-action such as smart
                appointment booking systems and interactive contact forms, and carefully crafted,
                persuasive content that speaks directly and empathetically to your local audience.
                Whether you are a dedicated craftsman looking to fill your order book for the
                season, a medical doctor actively seeking new patients, or a premium service
                provider wanting to rapidly expand your regional reach, our bespoke websites
                consistently deliver measurable, scalable results.
              </p>
              <p>
                Expanding well beyond simple customer acquisition, a modern local professional
                website in Herborn also serves as an incredibly powerful, indispensable employer
                branding tool for your growing company. In an era of widespread skilled-labour
                shortages across Germany, presenting your business online as an attractive, highly
                forward-thinking employer is absolutely essential for long-term survival. We
                purposefully design dedicated, highly engaging career pages equipped with
                beautifully streamlined digital application processes that make it remarkably easy
                for top local talent to connect with your company in just a few clicks. Our ongoing,
                comprehensive support also includes rigorous performance monitoring, robust security
                maintenance, strict GDPR data compliance, and continuous, data-driven content
                optimisation. We are not a faceless, offshore agency operating from a distant city —
                Coday is a highly trusted, deeply regional web design partner based nearby in
                Wetzlar, fiercely committed to your long-term, sustainable digital success. Invest
                confidently in a premium, professional website for your Herborn business today and
                tangibly experience the tremendous difference that genuine, highly dedicated local
                expertise makes in your bottom line.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webdesign vom lokalen Profi in Herborn
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Die historische Fachwerkstadt Herborn im Lahn-Dill-Kreis besticht nicht nur durch
                ihren architektonischen Charme, sondern auch durch eine vielfältige und äußerst
                dynamische Unternehmenslandschaft. Vom spezialisierten Handwerksbetrieb über die
                etablierte Arztpraxis bis hin zum innovativen B2B-Dienstleister – Herborns
                Wirtschaft lebt von persönlicher Nähe, regionaler Verwurzelung und tiefem
                gegenseitigem Vertrauen. Genau diese zentralen Werte müssen sich auch in Ihrer
                digitalen Präsenz auf den ersten Blick widerspiegeln. Ein exzellentes,
                professionelles Webdesign vom lokalen Profi ist heute branchenübergreifend der
                wichtigste Faktor, um potenzielle Kunden noch vor dem ersten persönlichen Kontakt
                restlos von Ihrer Kompetenz zu überzeugen. Bei Coday entwickeln wir hochgradig
                maßgeschneiderte, extrem performante Webseiten für Unternehmen in Herborn, die weit
                über eine simple digitale Visitenkarte hinausgehen. Wir schaffen individuelle,
                verkaufsstarke Online-Auftritte, die Ihre Markenidentität authentisch
                transportieren, Ihre Alleinstellungsmerkmale präzise herausarbeiten und die
                Kontaktaufnahme für Ihre Besucher so einfach und reibungslos wie möglich gestalten.
              </p>
              <p>
                Was unser Webdesign für Herborn besonders wirkungsvoll und einzigartig macht, ist
                unsere tiefgreifende, langjährige Expertise in der lokalen Suchmaschinenoptimierung
                (Local SEO). Die optisch schönste Webseite nützt Ihrem Unternehmen rein gar nichts,
                wenn potenzielle Kunden aus Herborn, Sinn, Burg oder dem weiteren Lahn-Dill-Kreis
                sie bei Google nicht auf der ersten Seite finden. Wir bauen daher jede Website von
                Grund auf mit maximaler lokaler Auffindbarkeit als absolutem Kernziel – von einer
                makellos sauberen, semantischen HTML-Struktur und der hochstrategischen
                Keyword-Platzierung bis zur ganzheitlichen Optimierung Ihres Google
                Unternehmensprofils. So wird Ihre Webseite vom lokalen Profi nicht nur optisch tief
                beeindruckend, sondern arbeitet rund um die Uhr als hochaktiver, verlässlicher
                Vertriebskanal, der kontinuierlich qualifizierte Anfragen aus Ihrer direkten Region
                generiert. Blitzschnelle Ladezeiten und eine perfekte Darstellung auf allen
                Endgeräten runden das Erlebnis für jeden Besucher nahtlos ab und schaffen
                tiefgreifendes Vertrauen von der ersten Sekunde an.
              </p>
              <p>
                Als lokaler Profi für Webdesign wissen wir ganz genau, dass Unternehmen in Herborn
                sehr spezifische Anforderungen haben, die sich von großstädtischen Betrieben
                grundlegend unterscheiden. Sie brauchen eine starke digitale Präsenz, die
                persönlich, höchst authentisch und tief in der regionalen Gemeinschaft verwurzelt
                wirkt – und keine austauschbare Agentur-Schablone. Deshalb beginnt jedes unserer
                spannenden Web-Projekte mit einer sehr intensiven, ehrlichen Beratung, in der wir
                Ihre geschäftlichen Ziele, Ihre exakte Zielgruppe und die Wettbewerbsdynamik Ihres
                Marktes im Lahn-Dill-Kreis präzise analysieren. Daraus entwickeln wir eine
                individuell zugeschnittene Webdesign-Strategie mit einer extrem durchdachten
                Nutzerführung (UX-Design), hochgradig konversionsstarken Elementen wie
                automatisierten Terminbuchungssystemen und interaktiven Kontaktformularen sowie
                strategisch aufbereiteten, verkaufspsychologisch optimierten Inhalten, die direkt
                die Sprache Ihrer lokalen Zielgruppe in Herborn und Umgebung sprechen.
              </p>
              <p>
                Über die reine Kundengewinnung hinaus ist eine moderne Webseite vom lokalen Profi in
                Herborn heute auch ein absolut unverzichtbares Instrument für die zielgerichtete
                Mitarbeitergewinnung geworden. In Zeiten des Fachkräftemangels gestalten wir
                überzeugende Karriereseiten mit nahtlosen, digitalen Bewerbungsprozessen, die es
                talentierten Fachkräften aus der Region extrem einfach machen, sich in wenigen
                Klicks direkt vom Smartphone bei Ihnen zu bewerben. Unser fortlaufender,
                partnerschaftlicher Support umfasst zudem professionelles Performance-Monitoring,
                regelmäßige Sicherheitswartung, lückenlose DSGVO-Konformität und kontinuierliche
                datengetriebene Content-Optimierung. Coday ist keine anonyme Agentur aus der Ferne,
                die Sie nach dem Launch alleine lässt – wir sind Ihr verlässlicher, regionaler
                Webdesign-Partner aus dem nahen Wetzlar, der sich Ihrem langfristigen digitalen
                Erfolg in Herborn und dem Lahn-Dill-Kreis voll und ganz verschrieben hat.
                Investieren Sie mutig in professionelles Webdesign vom lokalen Profi und erleben Sie
                den messbaren Unterschied, den echte regionale Expertise für Ihr geschäftliches
                Wachstum ausmacht.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
