import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/LocalWetzlarClient';
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
      title: 'Web Designer Wetzlar | Local Website Experts',
      description:
        'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.',
      path: '/en/landingpages/localwetzlar',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesigner Wetzlar | Lokale Webseiten Experten',
    description:
      'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.',
    path: '/de/landingpages/localwetzlar',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Designer Wetzlar | Local Website Experts | Coday'
      : 'Webdesigner Wetzlar | Lokale Webseiten Experten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Your local web designer in Wetzlar. Personal consultation, fair fixed prices and modern websites for craftsmen and businesses in Central Hesse.'
      : 'Ihr lokaler Webdesigner in Wetzlar. Persönliche Beratung, faire Festpreise und moderne Webseiten für Handwerker und Unternehmen in Mittelhessen.';
  return (
    <>
      <SeoHead
        title="Coday | localwetzlar"
        description="Erfahren Sie mehr über localwetzlar"
        pageType="default"
      />
      <ClientComponent />
      <SeoContentBlock />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Your Local Website Experts in Wetzlar'
            : 'Ihre lokalen Webseiten Experten in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'Finding a reliable web designer in Wetzlar who truly understands the needs of local businesses is not always straightforward. Many agencies operate remotely from Berlin or Hamburg, outsource to anonymous development teams abroad and deliver template-based websites that look identical to a hundred other sites. Coday takes a fundamentally different approach. As a solo web agency based directly in Wetzlar, we offer something increasingly rare in the digital industry: a single point of contact who knows your city, speaks your language and is personally invested in your project from the first consultation through to launch and beyond. When you sit down with us for a planning meeting at a café on the Eisenmarkt or in your own office on the Colchesteranlage, you are talking to the same person who will design, develop and deploy your website. That directness eliminates miscommunication, accelerates decision-making and ensures the finished product genuinely reflects your brand, your audience and the market realities of Central Hesse.'
              : 'Einen zuverlässigen Webdesigner in Wetzlar zu finden, der die Bedürfnisse lokaler Unternehmen wirklich versteht, ist nicht immer einfach. Viele Agenturen arbeiten remote aus Berlin oder Hamburg, lagern an anonyme Entwicklerteams im Ausland aus und liefern Template-basierte Webseiten, die genauso aussehen wie hundert andere Seiten. Coday verfolgt einen grundlegend anderen Ansatz. Als Solo-Webagentur mit Sitz direkt in Wetzlar bieten wir etwas, das in der digitalen Branche zunehmend selten wird: einen einzigen Ansprechpartner, der Ihre Stadt kennt, Ihre Sprache spricht und persönlich in Ihr Projekt investiert ist — vom ersten Beratungsgespräch über den Launch bis darüber hinaus. Wenn Sie sich mit uns zu einem Planungstreffen in einem Café am Eisenmarkt oder in Ihrem eigenen Büro an der Colchesteranlage zusammensetzen, sprechen Sie mit derselben Person, die Ihre Webseite designen, entwickeln und deployen wird. Diese Direktheit eliminiert Missverständnisse, beschleunigt Entscheidungen und stellt sicher, dass das fertige Produkt tatsächlich Ihre Marke, Ihre Zielgruppe und die Marktgegebenheiten in Mittelhessen widerspiegelt.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'What sets a local web designer apart from a generic online service is the ability to create websites that are strategically optimised for the regional market. In Wetzlar and the surrounding communities — Aßlar, Solms, Braunfels, Leun and the Lahn-Dill district at large — customers search with local intent. They type queries like "locksmith Wetzlar", "Italian restaurant near Altstadt" or "physiotherapy Lahn-Dill-Kreis" into Google and expect to find a fast, trustworthy, mobile-optimised website within the first three results. As local website experts, we build every page with this search behaviour in mind. That means implementing precise local SEO signals: Google Business Profile integration, location-specific schema markup, regionally relevant content and natural keyword placement that ranks without resorting to keyword stuffing. We have helped real businesses in the region — from Batherm to MS Schlüsseldienst Wetzlar — achieve exactly this kind of visibility, and the results speak for themselves in higher organic traffic and more qualified enquiries.'
              : 'Was einen lokalen Webdesigner von einem generischen Online-Service unterscheidet, ist die Fähigkeit, Webseiten zu erstellen, die strategisch für den regionalen Markt optimiert sind. In Wetzlar und den umliegenden Gemeinden — Aßlar, Solms, Braunfels, Leun und dem Lahn-Dill-Kreis insgesamt — suchen Kunden mit lokaler Absicht. Sie geben Suchanfragen wie „Schlüsseldienst Wetzlar", „italienisches Restaurant Altstadt" oder „Physiotherapie Lahn-Dill-Kreis" bei Google ein und erwarten, innerhalb der ersten drei Ergebnisse eine schnelle, vertrauenswürdige und mobiloptimierte Webseite zu finden. Als lokale Webseiten Experten bauen wir jede Seite mit diesem Suchverhalten im Hinterkopf. Das bedeutet die Implementierung präziser lokaler SEO-Signale: Google Business Profile Integration, standortspezifisches Schema-Markup, regional relevante Inhalte und natürliche Keyword-Platzierung, die rankt, ohne auf Keyword-Stuffing zurückzugreifen. Wir haben echten Unternehmen in der Region geholfen — von Batherm bis MS Schlüsseldienst Wetzlar — genau diese Art von Sichtbarkeit zu erreichen, und die Ergebnisse sprechen für sich in höherem organischen Traffic und qualifizierteren Anfragen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Technology matters, and we believe local businesses in Wetzlar deserve the same high-performance web stack that Fortune 500 companies use. Every website we deliver is built with Next.js and React, deployed on Vercel edge infrastructure, and optimised to score above 90 on Google PageSpeed Insights for both mobile and desktop. That translates into sub-second load times, silky-smooth interactions and Core Web Vitals metrics that actively boost your search rankings. We pair this technical foundation with a design philosophy rooted in clarity and conversion: clean typography, intuitive navigation, prominent calls to action, and responsive layouts that look impeccable on every device from a smartphone in the hand of a passer-by on the Bahnhofstraße to a desktop monitor in a corporate office. Accessibility is non-negotiable — every site meets WCAG standards so that no potential customer is excluded. And because we work with transparent fixed prices agreed upfront, you never face surprise invoices or scope-creep charges that erode your budget.'
              : 'Technologie ist entscheidend, und wir sind überzeugt, dass lokale Unternehmen in Wetzlar denselben hochperformanten Web-Stack verdienen, den Fortune-500-Unternehmen nutzen. Jede Webseite, die wir liefern, wird mit Next.js und React gebaut, auf Vercels Edge-Infrastruktur deployed und optimiert, um sowohl auf Mobilgeräten als auch auf dem Desktop über 90 Punkte im Google PageSpeed Insights zu erzielen. Das bedeutet Ladezeiten unter einer Sekunde, butterweiche Interaktionen und Core Web Vitals Metriken, die Ihre Suchmaschinen-Rankings aktiv verbessern. Wir verbinden dieses technische Fundament mit einer Designphilosophie, die auf Klarheit und Conversion ausgerichtet ist: saubere Typografie, intuitive Navigation, prominente Handlungsaufforderungen und responsive Layouts, die auf jedem Gerät makellos aussehen — vom Smartphone in der Hand eines Passanten auf der Bahnhofstraße bis zum Desktop-Monitor in einem Firmenbüro. Barrierefreiheit ist nicht verhandelbar — jede Seite erfüllt die WCAG-Standards, damit kein potenzieller Kunde ausgeschlossen wird. Und weil wir mit transparenten, vorab vereinbarten Festpreisen arbeiten, gibt es nie überraschende Rechnungen oder Scope-Creep-Kosten, die Ihr Budget auffressen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Choosing local website experts in Wetzlar is ultimately about choosing a partner who is as invested in your success as you are. We live here, we shop in the same stores, we recommend the same restaurants to friends. When your website generates more calls, more bookings and more revenue, that strengthens the local economy we are part of. Our process is straightforward: we start with a free initial consultation where we analyse your current online presence, discuss your goals and outline a clear roadmap. Development happens in iterative sprints with staging previews you can review on your own phone. Launch day includes post-go-live monitoring and a detailed handover so you always retain full control over your content. Whether you are a craftsman in the Altstadt, a medical practice near the Forum, or a start-up in the Dillfeld industrial area, Coday is your web designer in Wetzlar — personal, technical, results-driven and always just a short drive or phone call away.'
              : 'Lokale Webseiten Experten in Wetzlar zu wählen bedeutet letztlich, einen Partner zu wählen, der genauso in Ihren Erfolg investiert ist wie Sie selbst. Wir leben hier, kaufen in denselben Geschäften ein und empfehlen Freunden dieselben Restaurants. Wenn Ihre Webseite mehr Anrufe, mehr Buchungen und mehr Umsatz generiert, stärkt das die lokale Wirtschaft, zu der auch wir gehören. Unser Prozess ist unkompliziert: Wir beginnen mit einem kostenlosen Erstgespräch, in dem wir Ihre aktuelle Online-Präsenz analysieren, Ihre Ziele besprechen und eine klare Roadmap skizzieren. Die Entwicklung erfolgt in iterativen Sprints mit Staging-Previews, die Sie auf Ihrem eigenen Handy überprüfen können. Der Launch-Tag umfasst Post-Go-Live-Monitoring und eine detaillierte Übergabe, damit Sie jederzeit die volle Kontrolle über Ihre Inhalte behalten. Ob Sie ein Handwerker in der Altstadt sind, eine Arztpraxis in der Nähe des Forums oder ein Start-up im Gewerbegebiet Dillfeld — Coday ist Ihr Webdesigner in Wetzlar — persönlich, technisch, ergebnisorientiert und immer nur eine kurze Fahrt oder einen Anruf entfernt.'}
          </p>
        </div>
      </section>
    </>
  );
}
