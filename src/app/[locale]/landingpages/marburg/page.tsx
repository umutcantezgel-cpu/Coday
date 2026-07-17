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
      title: 'Web Design Marburg | Websites That Bring Clients',
      description:
        'Your web agency for Marburg and the surrounding area. High-performance websites that bring new clients. Personal and at a guaranteed fixed price.',
      path: '/en/landingpages/marburg',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Marburg | Webseiten die Kunden bringen',
    description:
      'Ihre Webagentur für Marburg und Umgebung. Hochperformante Webseiten, die messbar neue Kunden bringen. Persönlich & zum garantierten Festpreis.',
    path: '/de/landingpages/marburg',
    type: 'money',
  });
}

export default async function MarburgLandingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  let content = null;
  try {
    const contentDir = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content');
    const jsonFile = params.locale === 'en' ? 'marburg.en.json' : 'marburg.json';
    let filePath = path.join(contentDir, jsonFile);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(contentDir, 'marburg.json');
    }
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch {
    // Content is being generated
  }

  const cityData = getCityBySlug('marburg');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Marburg | Websites That Bring Clients | Coday'
      : 'Webdesign Marburg | Webseiten die Kunden bringen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your web agency for Marburg and the surrounding area. High-performance websites that bring new clients. Personal and at a guaranteed fixed price.'
      : 'Ihre Webagentur für Marburg und Umgebung. Hochperformante Webseiten, die messbar neue Kunden bringen. Persönlich & zum garantierten Festpreis.';
  return (
    <>
      <SeoHead title={_seoTitle} description={_seoDesc} pageType="default" />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ihr Webdesigner in Marburg
          </h1>
          <h2 className="text-gray-400 max-w-2xl text-lg font-normal">
            Als <strong>Ihr Webdesigner in Marburg</strong> bauen wir in der Umgebung
            hochperformante Webseiten für Handwerker, Ärzte und Dienstleister.
          </h2>

          {/* Geo/LocalBusiness Schema injection */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Coday Webdesign Marburg',
                areaServed: 'Marburg',
                description: 'Lokale Webdesign-Agentur für Marburg und Umgebung.',
              }),
            }}
          />
        </div>
      )}
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Web Design Marburg — Websites That Bring Clients'
            : 'Webdesign Marburg — Webseiten die Kunden bringen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Marburg is a university city brimming with ambition — from internationally recognised research institutions at Philipps-Universität to a thriving independent business scene spread across the historic Oberstadt and the modern commercial districts along the Lahn. Yet many local businesses still lack the digital presence their quality of work deserves. A slow, visually dated website sends entirely the wrong signal to potential clients who are comparing options on their smartphone in real time. Coday delivers web design for Marburg that changes this equation. We build high-performance websites on Next.js, React and Vercel edge infrastructure that load in under one second, score above 90 on Google PageSpeed and are engineered to bring clients — not just exist as a static online brochure. Whether you run a physiotherapy practice near the Elisabethkirche, a law firm on the Universitätsstraße or a restaurant tucked into one of the narrow lanes of the Altstadt, your website should actively generate enquiries, bookings and revenue around the clock.'
              : 'Marburg ist eine Universitätsstadt voller Ambitionen — von international anerkannten Forschungseinrichtungen an der Philipps-Universität bis hin zu einer florierenden unabhängigen Geschäftsszene, die sich über die historische Oberstadt und die modernen Gewerbeviertel entlang der Lahn erstreckt. Dennoch fehlt vielen lokalen Unternehmen noch die digitale Präsenz, die die Qualität ihrer Arbeit verdient. Eine langsame, optisch veraltete Webseite sendet genau das falsche Signal an potenzielle Kunden, die Angebote in Echtzeit auf ihrem Smartphone vergleichen. Coday liefert Webdesign für Marburg, das diese Gleichung verändert. Wir bauen hochperformante Webseiten auf Next.js, React und Vercels Edge-Infrastruktur, die in unter einer Sekunde laden, über 90 Punkte im Google PageSpeed erzielen und darauf ausgelegt sind, Kunden zu bringen — nicht nur als statische Online-Broschüre zu existieren. Ob Sie eine Physiotherapiepraxis nahe der Elisabethkirche betreiben, eine Kanzlei auf der Universitätsstraße oder ein Restaurant in einer der engen Gassen der Altstadt — Ihre Webseite sollte aktiv Anfragen, Buchungen und Umsatz rund um die Uhr generieren.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'The difference between a website that brings clients and one that merely occupies digital space comes down to two factors: speed and local search optimisation. Google uses Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift — as direct ranking signals. A site that scores poorly on these metrics is actively penalised in search results, losing visibility to competitors with faster, better-optimised pages. Coday engineers every Marburg web project to exceed these thresholds comfortably. We implement server-side rendering for instant content delivery, automatic image optimisation that serves next-gen formats like WebP and AVIF, and aggressive code splitting that ensures visitors only download the JavaScript they actually need. On the SEO side, we integrate JSON-LD structured data, configure Google Business Profile connections, create hreflang tags for bilingual German-English setups and produce regionally targeted content that naturally ranks for queries like "web design Marburg", "website erstellen Marburg" and dozens of long-tail variations specific to your industry.'
              : 'Der Unterschied zwischen einer Webseite, die Kunden bringt, und einer, die nur digitalen Raum belegt, läuft auf zwei Faktoren hinaus: Geschwindigkeit und lokale Suchoptimierung. Google nutzt Core Web Vitals — Largest Contentful Paint, Interaction to Next Paint und Cumulative Layout Shift — als direkte Ranking-Signale. Eine Seite, die bei diesen Metriken schlecht abschneidet, wird in den Suchergebnissen aktiv abgestraft und verliert Sichtbarkeit an Wettbewerber mit schnelleren, besser optimierten Seiten. Coday entwickelt jedes Marburger Webprojekt so, dass diese Schwellenwerte komfortabel übertroffen werden. Wir implementieren Server-Side Rendering für sofortige Inhaltsauslieferung, automatische Bildoptimierung, die Next-Gen-Formate wie WebP und AVIF ausliefert, und aggressives Code-Splitting, das sicherstellt, dass Besucher nur das JavaScript herunterladen, das sie tatsächlich benötigen. Auf der SEO-Seite integrieren wir JSON-LD strukturierte Daten, konfigurieren Google Business Profile Verbindungen, erstellen Hreflang-Tags für zweisprachige Deutsch-Englisch-Setups und produzieren regional ausgerichtete Inhalte, die natürlich für Suchanfragen wie „Webdesign Marburg", „Website erstellen Marburg" und Dutzende von Long-Tail-Varianten speziell für Ihre Branche ranken.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Coday operates from neighbouring Wetzlar — just twenty minutes by car or a short train ride along the Lahn — which means you get the attentiveness of a local partner without the overhead costs of a Marburg city-centre office. As a solo web agency, we keep our structure deliberately lean: you communicate directly with the developer who architects, designs and codes your site. No account managers, no outsourced teams, no miscommunication. Every project runs on a transparent fixed-price model agreed before a single line of code is written, so there are never surprise invoices or scope-creep charges. Our proven workflow starts with a strategic audit of your current digital presence, followed by architecture planning, iterative development with staging previews you can test on your own devices, and a zero-downtime launch with post-go-live monitoring. After launch we track Core Web Vitals, search console data and conversion metrics to continuously refine performance.'
              : 'Coday arbeitet vom benachbarten Wetzlar aus — nur zwanzig Minuten mit dem Auto oder eine kurze Zugfahrt entlang der Lahn — was bedeutet, dass Sie die Aufmerksamkeit eines lokalen Partners erhalten, ohne die Gemeinkosten eines Marburger Innenstadtbüros. Als Solo-Webagentur halten wir unsere Struktur bewusst schlank: Sie kommunizieren direkt mit dem Entwickler, der Ihre Seite konzipiert, designt und programmiert. Keine Account-Manager, keine ausgelagerten Teams, keine Missverständnisse. Jedes Projekt läuft auf einem transparenten Festpreismodell, das vereinbart wird, bevor eine einzige Zeile Code geschrieben ist — es gibt also nie überraschende Rechnungen oder Scope-Creep-Kosten. Unser bewährter Workflow beginnt mit einem strategischen Audit Ihrer aktuellen digitalen Präsenz, gefolgt von Architekturplanung, iterativer Entwicklung mit Staging-Previews, die Sie auf Ihren eigenen Geräten testen können, und einem Zero-Downtime-Launch mit Post-Go-Live-Monitoring. Nach dem Launch verfolgen wir Core Web Vitals, Search-Console-Daten und Conversion-Metriken, um die Performance kontinuierlich zu optimieren.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'The businesses we serve in the Marburg-Biedenkopf district and across Central Hesse share a common trait: they want a website that works as a genuine growth engine rather than a cost centre. Whether you are a start-up emerging from the university ecosystem, an established craft business in Cappel or Wehrda, a medical specialist looking to attract patients, or a hospitality venue seeking more reservations, the goal is the same — measurably more clients through a digital presence that inspires trust at first glance. Coday combines striking, conversion-focused design with the technical rigour of a modern performance-first stack to deliver exactly that. Every pixel, every line of code and every content decision is guided by a single question: does this help bring clients? If you are ready for web design in Marburg that genuinely drives results, contact us for a free initial consultation. We will analyse your situation, outline a clear roadmap and present a fixed-price proposal — no obligations, no hidden fees. Coday: web design Marburg, websites that bring clients.'
              : 'Die Unternehmen, die wir im Landkreis Marburg-Biedenkopf und in ganz Mittelhessen betreuen, haben eines gemeinsam: Sie wollen eine Webseite, die als echter Wachstumsmotor funktioniert und nicht als Kostenstelle. Ob Sie ein Start-up aus dem Universitäts-Ökosystem sind, ein etablierter Handwerksbetrieb in Cappel oder Wehrda, ein Facharzt, der Patienten gewinnen möchte, oder ein Gastronomiebetrieb, der mehr Reservierungen sucht — das Ziel ist dasselbe: messbar mehr Kunden durch eine digitale Präsenz, die auf den ersten Blick Vertrauen weckt. Coday verbindet ausdrucksstarkes, konversionsorientiertes Design mit der technischen Strenge eines modernen Performance-First-Stacks, um genau das zu liefern. Jeder Pixel, jede Codezeile und jede inhaltliche Entscheidung wird von einer einzigen Frage geleitet: Bringt das Kunden? Wenn Sie bereit sind für Webdesign in Marburg, das tatsächlich Ergebnisse liefert, kontaktieren Sie uns für ein kostenloses Erstgespräch. Wir analysieren Ihre Situation, skizzieren eine klare Roadmap und präsentieren ein Festpreis-Angebot — ohne Verpflichtungen, ohne versteckte Kosten. Coday: Webdesign Marburg, Webseiten die Kunden bringen.'}
          </p>
        </div>
      </section>
    </>
  );
}
