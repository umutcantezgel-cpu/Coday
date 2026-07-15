import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/NextJsMigrationClient';
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
      title: 'Next.js Migration Wetzlar | Website Upgrade Hesse',
      description:
        'Migrate your website to Next.js with Coday from Wetzlar. Better speed, improved SEO and future-proof technology for businesses in Central Hesse.',
      path: '/en/landingpages/nextjsmigration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Next.js Migration Wetzlar | Website Upgrade Hessen',
    description:
      'Migration Ihrer Website auf Next.js mit Coday aus Wetzlar. Mehr Speed, besseres SEO und zukunftssichere Technik für Unternehmen in Mittelhessen.',
    path: '/de/landingpages/nextjsmigration',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Next.js Migration Wetzlar | Website Upgrade Hesse | Coday'
      : 'Next.js Migration Wetzlar | Website Upgrade Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Migrate your website to Next.js with Coday from Wetzlar. Better speed, improved SEO and future-proof technology for businesses in Central Hesse.'
      : 'Migration Ihrer Website auf Next.js mit Coday aus Wetzlar. Mehr Speed, besseres SEO und zukunftssichere Technik für Unternehmen in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | nextjsmigration"
        description="Erfahren Sie mehr über nextjsmigration"
        pageType="default"
      />
      <ClientComponent
        h1Title={_locale === 'en' ? 'From Legacy to Next.js:' : 'Von Legacy zu Next.js:'}
        h1Highlight={
          _locale === 'en'
            ? 'The Performance Boost for Your Business'
            : 'Der Performance-Boost für Ihr Business'
        }
      />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Next.js Migration in Wetzlar — Your Website Upgrade for Hesse'
            : 'Next.js Migration in Wetzlar — Ihr Website Upgrade für Hessen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Many businesses in Wetzlar and Central Hesse still rely on outdated content management systems like WordPress, Joomla or custom-built legacy platforms that were state of the art a decade ago. These aging systems often suffer from bloated page sizes, security vulnerabilities, sluggish load times and an architecture that was never designed for the mobile-first, performance-obsessed web of today. A Next.js migration changes all of that. From legacy to Next.js: the performance boost for your business begins by moving your website to the React-based framework used by Netflix, Nike and Notion. You gain server-side rendering, automatic code splitting, image optimisation and an infrastructure that scores consistently above 90 on Google PageSpeed. As your local web agency in Wetzlar, Coday handles the entire migration process so you can focus on running your business while your digital presence gets a measurable upgrade.'
              : 'Viele Unternehmen in Wetzlar und Mittelhessen setzen noch auf veraltete Content-Management-Systeme wie WordPress, Joomla oder individuell programmierte Legacy-Plattformen, die vor einem Jahrzehnt Stand der Technik waren. Diese alternden Systeme leiden oft unter aufgeblähten Seitengrößen, Sicherheitslücken, trägen Ladezeiten und einer Architektur, die nie für das heutige mobile und performanceorientierte Web konzipiert wurde. Eine Next.js Migration ändert das grundlegend. Von Legacy zu Next.js: Der Performance-Boost für Ihr Business beginnt mit dem Umstieg auf das React-basierte Framework, das von Netflix, Nike und Notion eingesetzt wird. Sie erhalten Server-Side Rendering, automatisches Code-Splitting, Bildoptimierung und eine Infrastruktur, die konstant über 90 Punkte im Google PageSpeed erzielt. Als Ihre lokale Webagentur in Wetzlar übernimmt Coday den gesamten Migrationsprozess, damit Sie sich auf Ihr Geschäft konzentrieren können, während Ihre digitale Präsenz ein messbares Upgrade erhält.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'One of the biggest concerns during any website migration is losing hard-earned search engine rankings. Coday addresses this head-on with a meticulous SEO preservation strategy. Before a single line of code is written, we audit every existing URL, meta tag, internal link and structured data snippet on your current site. We then create a comprehensive redirect map that ensures Google and other search engines seamlessly transfer all ranking signals to your new Next.js site. Canonical tags, Open Graph metadata, hreflang attributes for multilingual setups and JSON-LD structured data are all carried over and enhanced. The result is a website upgrade that not only maintains your current search visibility but actively improves it thanks to faster Core Web Vitals scores — a direct ranking factor since Google introduced page experience signals.'
              : 'Eine der größten Sorgen bei jeder Website-Migration ist der Verlust hart erarbeiteter Suchmaschinen-Rankings. Coday begegnet diesem Thema mit einer sorgfältigen SEO-Preservierungsstrategie. Bevor eine einzige Zeile Code geschrieben wird, prüfen wir jede bestehende URL, jeden Meta-Tag, jeden internen Link und jedes Structured-Data-Snippet auf Ihrer aktuellen Seite. Anschließend erstellen wir eine umfassende Weiterleitungs-Map, die sicherstellt, dass Google und andere Suchmaschinen alle Ranking-Signale nahtlos auf Ihre neue Next.js-Seite übertragen. Canonical-Tags, Open-Graph-Metadaten, Hreflang-Attribute für mehrsprachige Setups und JSON-LD Structured Data werden vollständig übernommen und verbessert. Das Ergebnis ist ein Website Upgrade, das Ihre aktuelle Suchsichtbarkeit nicht nur beibehält, sondern aktiv verbessert — dank schnellerer Core Web Vitals, einem direkten Ranking-Faktor, seit Google die Page-Experience-Signale eingeführt hat.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Performance is where Next.js truly shines and where businesses in Hesse see the most immediate return on investment. Typical WordPress sites deliver 2 to 5 megabytes of JavaScript and CSS on first load. After a Next.js migration with Coday, that number drops to well under 250 kilobytes. Pages that once took four or five seconds to become interactive now load in under one second on mobile devices. For local businesses in Wetzlar — whether you are a dental practice, a crafts workshop, a law firm or a restaurant — this speed difference directly translates into lower bounce rates, longer session durations and more conversion actions like phone calls, contact form submissions and appointment bookings. We deploy every migrated site on Vercel edge infrastructure, meaning your pages are served from the data centre closest to each visitor, further reducing latency across Germany, Europe and beyond.'
              : 'Performance ist der Bereich, in dem Next.js wirklich glänzt und in dem Unternehmen in Hessen den unmittelbarsten Return on Investment sehen. Typische WordPress-Seiten liefern beim ersten Laden 2 bis 5 Megabyte an JavaScript und CSS aus. Nach einer Next.js Migration mit Coday sinkt dieser Wert auf deutlich unter 250 Kilobyte. Seiten, die zuvor vier bis fünf Sekunden brauchten, um interaktiv zu werden, laden jetzt in unter einer Sekunde auf mobilen Geräten. Für lokale Unternehmen in Wetzlar — ob Zahnarztpraxis, Handwerksbetrieb, Anwaltskanzlei oder Restaurant — bedeutet dieser Geschwindigkeitsunterschied direkt niedrigere Absprungraten, längere Sitzungsdauern und mehr Conversion-Aktionen wie Anrufe, Kontaktformular-Einsendungen und Terminbuchungen. Wir deployen jede migrierte Seite auf Vercels Edge-Infrastruktur, sodass Ihre Seiten vom nächstgelegenen Rechenzentrum an jeden Besucher ausgeliefert werden und die Latenz in ganz Deutschland, Europa und darüber hinaus weiter reduziert wird.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Coday is a solo web agency based right here in Wetzlar, which means you work directly with the developer who writes your code — no account managers, no outsourced teams, no communication overhead. Our Next.js migration process follows a clear four-phase approach: discovery audit, architecture planning, iterative development with staging previews, and a zero-downtime launch with post-migration monitoring. Whether you are migrating a five-page brochure site or a complex e-commerce platform with hundreds of products, every project is delivered at a transparent fixed price with no hidden costs. Businesses across Hesse — from Gießen and Marburg to Limburg and Herborn — have already made the switch to Next.js with Coday. If your current website feels slow, looks dated or simply is not generating the leads it should, a Next.js migration is the most effective website upgrade you can invest in today. Get in touch for a free initial consultation and discover how much faster, more secure and more profitable your website can become.'
              : 'Coday ist eine Solo-Webagentur mit Sitz direkt hier in Wetzlar, was bedeutet, dass Sie direkt mit dem Entwickler arbeiten, der Ihren Code schreibt — keine Account-Manager, keine ausgelagerten Teams, kein Kommunikationsaufwand. Unser Next.js Migrationsprozess folgt einem klaren Vier-Phasen-Ansatz: Discovery-Audit, Architekturplanung, iterative Entwicklung mit Staging-Previews und ein Zero-Downtime-Launch mit Post-Migrations-Monitoring. Ob Sie eine fünfseitige Broschüren-Website oder eine komplexe E-Commerce-Plattform mit Hunderten von Produkten migrieren — jedes Projekt wird zu einem transparenten Festpreis ohne versteckte Kosten geliefert. Unternehmen in ganz Hessen — von Gießen und Marburg bis Limburg und Herborn — haben bereits den Wechsel zu Next.js mit Coday vollzogen. Wenn Ihre aktuelle Website sich langsam anfühlt, veraltet aussieht oder einfach nicht die Anfragen generiert, die sie sollte, ist eine Next.js Migration das effektivste Website Upgrade, in das Sie heute investieren können. Nehmen Sie Kontakt auf für ein kostenloses Erstgespräch und erfahren Sie, wie viel schneller, sicherer und profitabler Ihre Website werden kann.'}
          </p>
        </div>
      </section>
    </>
  );
}
