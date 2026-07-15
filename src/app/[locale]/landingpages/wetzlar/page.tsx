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
          <h2 className="text-gray-400 max-w-2xl text-lg font-normal">
            Als <strong>Ihr Webdesigner in Wetzlar</strong> bauen wir in der Umgebung
            hochperformante Webseiten für Handwerker, Ärzte und Dienstleister.
          </h2>

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
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Web Design from Wetzlar for Websites That Measurably Win More Clients and Skilled Professionals'
            : 'Webdesign Wetzlar — Webseiten die Kunden bringen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Web design from Wetzlar for websites that measurably win more clients and skilled professionals is the most powerful tool any business can deploy. Yet many companies in Central Hesse still operate with outdated web presences that load slowly, display poorly on mobile devices and fail to convert the visitors they do attract. Coday exists to change that. As a dedicated web design agency based in Wetzlar, we build high-performance websites on modern technology — Next.js, React and Vercel edge infrastructure — that consistently score above 90 on Google PageSpeed. The result is a digital storefront that loads in under one second, ranks prominently for local search queries and turns casual browsers into paying customers. Whether you run a medical practice on the Schillerplatz, a craft workshop in Niedergirmes or a consulting firm overlooking the Lahn, your website should work as hard as you do. Our approach pairs striking visual design with data-driven conversion optimisation so every element on the page serves a purpose: guiding visitors toward a phone call, a contact form submission or an online booking.'
              : 'Eine professionell gestaltete Webseite ist das wirkungsvollste Werkzeug, das ein Unternehmen in Wetzlar einsetzen kann, um messbar mehr Kunden und Fachkräfte zu gewinnen. Dennoch arbeiten viele Unternehmen in Mittelhessen noch mit veralteten Webpräsenzen, die langsam laden, auf mobilen Geräten schlecht dargestellt werden und die Besucher, die sie anziehen, nicht konvertieren. Coday existiert, um das zu ändern. Als spezialisierte Webdesign-Agentur mit Sitz in Wetzlar bauen wir hochperformante Webseiten auf moderner Technologie — Next.js, React und Vercels Edge-Infrastruktur — die konstant über 90 Punkte im Google PageSpeed erzielen. Das Ergebnis ist ein digitales Schaufenster, das in unter einer Sekunde lädt, bei lokalen Suchanfragen prominent rankt und Gelegenheitsbesucher in zahlende Kunden verwandelt. Ob Sie eine Arztpraxis am Schillerplatz betreiben, eine Handwerkswerkstatt in Niedergirmes oder eine Beratungsfirma mit Blick auf die Lahn — Ihre Webseite sollte genauso hart arbeiten wie Sie. Unser Ansatz verbindet ausdrucksstarkes visuelles Design mit datengetriebener Conversion-Optimierung, damit jedes Element auf der Seite einen Zweck erfüllt: Besucher zu einem Anruf, einer Kontaktformular-Einsendung oder einer Online-Buchung zu führen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Search engine visibility is where web design in Wetzlar delivers its highest return on investment. When a potential customer searches for "plumber Wetzlar", "tax advisor Lahn-Dill" or "hairdresser near me" on their smartphone, Google evaluates hundreds of signals to decide which websites appear in the top results. Page speed, mobile usability, structured data and locally relevant content are among the most important. Coday builds every site with these ranking factors engineered in from the start — not bolted on as an afterthought. We implement JSON-LD schema markup for your business type, configure Google Business Profile integration, create location-specific landing pages and write content that naturally incorporates the search terms your customers actually use. This methodical, white-hat SEO approach means your website does not just look impressive; it actively generates qualified leads week after week without relying on expensive paid advertising.'
              : 'Suchmaschinen-Sichtbarkeit ist der Bereich, in dem Webdesign in Wetzlar den höchsten Return on Investment liefert. Wenn ein potenzieller Kunde auf seinem Smartphone nach „Klempner Wetzlar", „Steuerberater Lahn-Dill" oder „Friseur in meiner Nähe" sucht, bewertet Google Hunderte von Signalen, um zu entscheiden, welche Webseiten in den Top-Ergebnissen erscheinen. Seitengeschwindigkeit, mobile Nutzbarkeit, strukturierte Daten und lokal relevante Inhalte gehören zu den wichtigsten. Coday baut jede Seite mit diesen Ranking-Faktoren von Anfang an ein — nicht nachträglich angehängt. Wir implementieren JSON-LD Schema-Markup für Ihren Unternehmenstyp, konfigurieren die Google Business Profile Integration, erstellen standortspezifische Landingpages und schreiben Inhalte, die natürlich die Suchbegriffe einbinden, die Ihre Kunden tatsächlich verwenden. Dieser methodische White-Hat-SEO-Ansatz bedeutet, dass Ihre Webseite nicht nur beeindruckend aussieht, sondern aktiv qualifizierte Anfragen Woche für Woche generiert — ohne auf teure bezahlte Werbung angewiesen zu sein.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'What makes Coday different from larger agencies is the solo-founder model. You work directly with the developer and designer — one person who knows your project inside and out, from the initial discovery call to the post-launch optimisation phase. There are no account managers relaying messages, no junior developers learning on your budget and no layers of bureaucracy slowing things down. This lean structure allows us to deliver websites at transparent fixed prices that larger studios simply cannot match. Every project follows a proven four-step process: strategic audit, architecture and design, iterative development with live staging previews, and a zero-downtime launch with analytics integration. After go-live we monitor Core Web Vitals, crawl errors and conversion data to ensure your site continues to perform at peak levels. Businesses across the region — including Batherm, MS Schlüsseldienst Wetzlar and Lindener Ratsstuben — have experienced firsthand how a modern, conversion-focused website can transform their customer pipeline.'
              : 'Was Coday von größeren Agenturen unterscheidet, ist das Solo-Founder-Modell. Sie arbeiten direkt mit dem Entwickler und Designer zusammen — eine Person, die Ihr Projekt in- und auswendig kennt, vom ersten Discovery-Call bis zur Post-Launch-Optimierungsphase. Es gibt keine Account-Manager, die Nachrichten weiterleiten, keine Junior-Entwickler, die auf Ihrem Budget lernen, und keine Bürokratie-Ebenen, die alles verlangsamen. Diese schlanke Struktur ermöglicht es uns, Webseiten zu transparenten Festpreisen zu liefern, die größere Studios schlicht nicht bieten können. Jedes Projekt folgt einem bewährten Vier-Schritte-Prozess: strategisches Audit, Architektur und Design, iterative Entwicklung mit Live-Staging-Previews und ein Zero-Downtime-Launch mit Analytics-Integration. Nach dem Go-Live überwachen wir Core Web Vitals, Crawl-Fehler und Conversion-Daten, um sicherzustellen, dass Ihre Seite weiterhin auf Spitzenniveau performt. Unternehmen in der gesamten Region — darunter Batherm, MS Schlüsseldienst Wetzlar und Lindener Ratsstuben — haben aus erster Hand erfahren, wie eine moderne, konversionsorientierte Webseite ihre Kundenpipeline transformieren kann.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Wetzlar is a city with deep roots in optics, technology and craftsmanship — from Leica Camera to the thriving Mittelstand businesses along the Dill valley. Your website should reflect that same standard of precision and quality. When visitors land on a Coday-built site, they encounter a fast, elegant and trustworthy digital experience that immediately communicates professionalism. Combined with strategic local SEO, this creates a virtuous cycle: better rankings lead to more traffic, more traffic leads to more enquiries, and more enquiries lead to measurable revenue growth. If you are ready to invest in web design that genuinely brings clients rather than simply existing as a digital business card, get in touch for a free initial consultation. We will analyse your current online presence, identify the biggest opportunities and present a clear, fixed-price proposal — no obligations, no surprises. Coday: your web designer in Wetzlar, building websites that bring clients.'
              : 'Wetzlar ist eine Stadt mit tiefen Wurzeln in Optik, Technologie und Handwerk — von Leica Camera bis zu den florierenden Mittelstandsunternehmen entlang des Dilltals. Ihre Webseite sollte denselben Anspruch an Präzision und Qualität widerspiegeln. Wenn Besucher auf einer von Coday erstellten Seite landen, erleben sie ein schnelles, elegantes und vertrauenswürdiges digitales Erlebnis, das sofort Professionalität kommuniziert. Kombiniert mit strategischem lokalem SEO entsteht ein positiver Kreislauf: bessere Rankings führen zu mehr Traffic, mehr Traffic führt zu mehr Anfragen, und mehr Anfragen führen zu messbarem Umsatzwachstum. Wenn Sie bereit sind, in Webdesign zu investieren, das tatsächlich Kunden bringt, anstatt nur als digitale Visitenkarte zu existieren, nehmen Sie Kontakt auf für ein kostenloses Erstgespräch. Wir analysieren Ihre aktuelle Online-Präsenz, identifizieren die größten Chancen und präsentieren ein klares Festpreis-Angebot — ohne Verpflichtungen, ohne Überraschungen. Coday: Ihr Webdesigner in Wetzlar, der Webseiten baut, die Kunden bringen.'}
          </p>
        </div>
      </section>
    </>
  );
}
