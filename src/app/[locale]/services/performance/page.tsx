import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { PerformanceClient } from '@/features/services/ui/PerformanceClient';
import { setRequestLocale } from 'next-intl/server';
import {
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
  BASE_URL,
} from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Website Speed Optimization | Core Web Vitals | Coday',
      description:
        'Maximum website speed through Core Web Vitals optimization by Coday. Faster load times and better Google rankings.',
      keywords: [
        'Website Speed Optimization',
        'Core Web Vitals Optimization',
        'PageSpeed 100 100',
        'Fast Next.js Websites',
        'Coday Performance',
      ],
      path: '/en/services/performance',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Website Speed Optimierung Wetzlar | Core Web Vitals | Coday',
    description:
      'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.',
    keywords: [
      'Website Speed Optimierung',
      'Core Web Vitals Optimierung',
      'PageSpeed 100 100',
      'Ladezeit Optimierung Wetzlar',
      'Next.js Performance',
    ],
    path: '/de/services/performance',
    type: 'money',
  });
}

export default async function PerformancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Services' : 'Leistungen', url: `/${_locale}/services` },
    { name: isEn ? 'Performance' : 'Performance', url: `/${_locale}/services/performance` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      getServiceSchema({
        name:
          _locale === 'en'
            ? 'Website Speed Optimization | Core Web Vitals'
            : 'Website Speed Optimierung Wetzlar | Core Web Vitals',
        description:
          _locale === 'en'
            ? 'Maximum website speed through Core Web Vitals optimization. Faster load times, better Google ranking.'
            : 'Maximale Website-Geschwindigkeit durch Core Web Vitals Optimierung von Coday in Wetzlar. Schnellere Ladezeiten, besseres Google Ranking in Hessen.',
        url: `${BASE_URL}/${_locale}/services/performance`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-performance"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PerformanceClient />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Website Speed Optimization Wetzlar – Core Web Vitals Experts
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Website speed is no longer a nice-to-have – it is a critical ranking factor and a
                direct driver of user engagement and conversion rates. At Coday in Wetzlar, we
                specialise in website speed optimization grounded in Google's Core Web Vitals
                framework. These three metrics – Largest Contentful Paint (LCP), Interaction to Next
                Paint (INP), and Cumulative Layout Shift (CLS) – define how users perceive your
                site's responsiveness, visual stability, and loading performance. Our goal is to
                bring every metric into the "good" threshold: LCP under two seconds, INP under 150
                milliseconds, and CLS below 0.05. We achieve this through a combination of
                architectural improvements, asset optimization, and rendering strategy refinements
                tailored to your specific technology stack.
              </p>
              <p>
                Our speed optimization process begins with a comprehensive performance audit. We use
                tools like Lighthouse, Chrome DevTools, and real-user monitoring data to identify
                the exact bottlenecks slowing your site down. Common culprits include unoptimised
                images, render-blocking scripts, excessive third-party dependencies, and inefficient
                server response times. For each issue we uncover, we provide a prioritised action
                plan with estimated impact scores so you can see exactly where the biggest gains
                lie. Our approach is data-driven and transparent: we never recommend changes without
                evidence, and every optimization is validated against before-and-after measurements
                to confirm its effectiveness.
              </p>
              <p>
                On the implementation side, Coday leverages the full power of the Next.js and React
                ecosystem to deliver structural speed improvements that go beyond surface-level
                tweaks. We implement automatic image optimisation with next/image, configure edge
                caching and incremental static regeneration for dynamic content, eliminate
                unnecessary client-side JavaScript through React Server Components, and fine-tune
                font loading strategies to prevent layout shifts. For sites with heavy
                interactivity, we optimise event handlers and reduce main-thread blocking to improve
                INP scores. Every change is tested across multiple devices and connection speeds to
                ensure consistent performance for all users, whether they are on fibre broadband in
                Frankfurt or a mobile connection in rural Hesse.
              </p>
              <p>
                The business impact of professional speed optimization is substantial and
                well-documented. Studies consistently show that every 100-millisecond improvement in
                load time correlates with measurable increases in engagement, page views, and
                revenue. Beyond direct user benefits, sites that pass Core Web Vitals thresholds
                receive a ranking boost in Google search results, giving you a competitive edge over
                slower competitors. Coday in Wetzlar combines deep technical expertise with a
                commitment to measurable outcomes: we do not stop until your site meets the
                performance budgets we agree upon together. Contact us to schedule a free
                performance audit and discover how much faster – and more profitable – your website
                can become.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Website Speed Optimierung Wetzlar – Core Web Vitals Experten
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Website-Geschwindigkeit ist längst kein optionaler Luxus mehr – sie ist ein
                entscheidender Ranking-Faktor und ein direkter Treiber für Nutzerengagement und
                Konversionsraten. Bei Coday in Wetzlar haben wir uns auf Website Speed Optimierung
                spezialisiert, die auf Googles Core Web Vitals-Framework basiert. Diese drei
                Metriken – Largest Contentful Paint (LCP), Interaction to Next Paint (INP) und
                Cumulative Layout Shift (CLS) – definieren, wie Nutzer die Reaktionsfähigkeit,
                visuelle Stabilität und Ladeleistung Ihrer Website wahrnehmen. Unser Ziel ist es,
                jede Metrik in den „gut"-Bereich zu bringen: LCP unter zwei Sekunden, INP unter 150
                Millisekunden und CLS unter 0,05. Dies erreichen wir durch eine Kombination aus
                architektonischen Verbesserungen, Asset-Optimierung und
                Rendering-Strategie-Anpassungen, die auf Ihren spezifischen Technologie-Stack
                zugeschnitten sind.
              </p>
              <p>
                Unser Speed-Optimierungsprozess beginnt mit einem umfassenden Performance-Audit. Wir
                nutzen Tools wie Lighthouse, Chrome DevTools und Real-User-Monitoring-Daten, um die
                exakten Engpässe zu identifizieren, die Ihre Website verlangsamen. Häufige
                Verursacher sind nicht optimierte Bilder, render-blockierende Skripte, übermäßige
                Third-Party-Abhängigkeiten und ineffiziente Server-Antwortzeiten. Für jedes
                identifizierte Problem erstellen wir einen priorisierten Maßnahmenplan mit
                geschätzten Auswirkungen, damit Sie genau sehen, wo die größten Gewinne liegen.
                Unser Ansatz ist datengetrieben und transparent: Wir empfehlen niemals Änderungen
                ohne Belege, und jede Optimierung wird anhand von Vorher-Nachher-Messungen
                validiert, um ihre Wirksamkeit zu bestätigen.
              </p>
              <p>
                Auf der Implementierungsseite nutzt Coday die volle Leistungsfähigkeit des Next.js-
                und React-Ökosystems, um strukturelle Geschwindigkeitsverbesserungen zu liefern, die
                über oberflächliche Anpassungen hinausgehen. Wir implementieren automatische
                Bildoptimierung mit next/image, konfigurieren Edge-Caching und inkrementelle
                statische Regenerierung für dynamische Inhalte, eliminieren unnötiges clientseitiges
                JavaScript durch React Server Components und optimieren Font-Loading-Strategien, um
                Layout-Verschiebungen zu verhindern. Für Websites mit intensiver Interaktivität
                optimieren wir Event-Handler und reduzieren Main-Thread-Blockierung, um INP-Werte zu
                verbessern. Jede Änderung wird auf mehreren Geräten und Verbindungsgeschwindigkeiten
                getestet, um konsistente Performance für alle Nutzer sicherzustellen – ob sie mit
                Glasfaser in Frankfurt oder einer Mobilverbindung im ländlichen Hessen surfen.
              </p>
              <p>
                Die geschäftliche Auswirkung professioneller Speed-Optimierung ist erheblich und gut
                dokumentiert. Studien zeigen durchgängig, dass jede Verbesserung der Ladezeit um 100
                Millisekunden mit messbaren Steigerungen bei Engagement, Seitenaufrufen und Umsatz
                korreliert. Über die direkten Nutzervorteile hinaus erhalten Websites, die die
                Core-Web-Vitals-Schwellenwerte bestehen, einen Ranking-Boost in den
                Google-Suchergebnissen, der Ihnen einen Wettbewerbsvorteil gegenüber langsameren
                Konkurrenten verschafft. Coday in Wetzlar vereint tiefgreifende technische Expertise
                mit dem Anspruch messbarer Ergebnisse: Wir hören nicht auf, bis Ihre Website die
                gemeinsam vereinbarten Performance-Budgets erfüllt. Kontaktieren Sie uns, um ein
                kostenloses Performance-Audit zu vereinbaren und zu erfahren, wie viel schneller –
                und profitabler – Ihre Website werden kann.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
