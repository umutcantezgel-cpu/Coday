import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { UxAuditClient } from '@/features/services/ui/UxAuditClient';
import { setRequestLocale } from 'next-intl/server';
import {
  BASE_URL,
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
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
      title: 'UX Audit & Usability Review Wetzlar | Analysis',
      description:
        'Professional UX audit by Coday in Wetzlar. We analyze your website for usability and conversion potential. For businesses across Hesse. Get started.',
      keywords: [
        'UX Audit Wetzlar',
        'Website Usability Check Hesse',
        'Conversion Rate Optimization',
        'Coday UX Audit',
      ],
      path: '/en/services/design/ux-audit',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'UX Audit & Usability Check Wetzlar | Optimierung',
    description:
      'Professioneller UX Audit von Coday in Wetzlar. Wir analysieren Ihre Website auf Nutzerfreundlichkeit und Konversionspotenzial. Für Firmen in Hessen.',
    keywords: [
      'UX Audit Wetzlar',
      'Usability Check Hessen',
      'Conversion Rate Optimierung',
      'Coday UX Audit',
    ],
    path: '/de/services/design/ux-audit',
    type: 'money',
  });
}

export default async function UxAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'UX Audit & Usability Review Wetzlar | Analysis | Coday'
      : 'UX Audit & Usability Check Wetzlar | Optimierung | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional UX audit by Coday in Wetzlar. We analyze your website for usability and conversion potential. For businesses across Hesse. Get started.'
      : 'Professioneller UX Audit von Coday in Wetzlar. Wir analysieren Ihre Website auf Nutzerfreundlichkeit und Konversionspotenzial. Für Firmen in Hessen.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Services', url: `/${_locale}/services` },
    { name: 'UX Audit', url: `/${_locale}/services/design/ux-audit` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/services/design/ux-audit`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-ux-audit"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <UxAuditClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'UX Audit & Usability Analysis in Wetzlar'
            : 'UX Audit & Usability Optimierung in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {_locale === 'en' ? (
            <>
              <p>
                A professional UX audit is the most effective way to uncover hidden usability issues
                that cost your business conversions, revenue and customer trust. At Coday in
                Wetzlar, we conduct systematic, evidence-based usability analyses that go far beyond
                surface-level observations. Our UX audit methodology combines heuristic evaluation
                against established usability principles (Nielsen's ten heuristics, Shneiderman's
                golden rules) with quantitative data analysis from tools like Google Analytics,
                heatmaps and session recordings. We examine every critical user flow—from landing
                page entry through product exploration to checkout or lead form
                submission—identifying friction points, confusing navigation patterns, unclear
                calls-to-action and accessibility barriers that prevent users from completing their
                goals. The result is a prioritized, actionable report that maps each issue to its
                business impact and provides clear, implementable recommendations for optimization.
              </p>
              <p>
                Our usability review process is structured into three rigorous phases. In the first
                phase, we conduct an expert heuristic evaluation where our UX specialists
                systematically assess your interface against established usability criteria. We
                evaluate information architecture, visual hierarchy, form design, error handling,
                loading performance and mobile responsiveness. In the second phase, we analyze real
                user behavior through quantitative and qualitative data—click patterns, scroll
                depth, task completion rates, bounce rates and exit pages. Where applicable, we
                conduct moderated usability testing sessions with representative users from your
                target audience, observing how they navigate your product and where they struggle.
                The third phase synthesizes all findings into a comprehensive analysis report with
                severity ratings (critical, major, minor, cosmetic), annotated screenshots and
                concrete design recommendations that your team can implement immediately.
              </p>
              <p>
                The value of a thorough UX audit extends far beyond fixing individual usability
                problems. It provides strategic clarity about your users' mental models,
                expectations and decision-making patterns. At Coday in Wetzlar, we have seen how
                targeted usability optimizations can increase conversion rates by significant
                margins—because removing friction from user journeys has a compounding effect on
                business metrics. A form that loads faster, a navigation that matches user
                expectations, error messages that guide rather than confuse, a checkout flow that
                minimizes steps—each improvement independently lifts performance, and together they
                transform the overall user experience. Our audit reports also serve as a baseline
                for measuring the impact of future design changes, enabling data-driven iteration
                and continuous improvement of your digital products.
              </p>
              <p>
                Choosing the right partner for your UX audit is essential. At Coday in Wetzlar, we
                bring deep expertise in usability analysis, interaction design and conversion
                optimization to every engagement. We do not deliver generic checklists—we provide
                tailored, context-specific recommendations that account for your industry, target
                audience and business objectives. Whether you need a comprehensive audit of your
                entire website, a focused review of a specific conversion funnel or a competitive
                usability benchmarking study, our analysis services adapt to your requirements.
                Every finding is documented with visual evidence, severity classification and a
                clear implementation roadmap. We also offer follow-up workshops where we walk your
                design and development team through the findings and collaboratively prioritize the
                optimization backlog. Contact Coday today for a complimentary initial assessment and
                discover how a professional UX audit can unlock the full conversion potential of
                your digital presence.
              </p>
            </>
          ) : (
            <>
              <p>
                Ein professioneller UX Audit ist der effektivste Weg, versteckte Usability-Probleme
                aufzudecken, die Ihr Unternehmen Konversionen, Umsatz und Kundenvertrauen kosten.
                Bei Coday in Wetzlar führen wir systematische, evidenzbasierte Usability-Analysen
                durch, die weit über oberflächliche Beobachtungen hinausgehen. Unsere
                UX-Audit-Methodik kombiniert heuristische Evaluation anhand etablierter
                Usability-Prinzipien (Nielsens zehn Heuristiken, Shneidermans goldene Regeln) mit
                quantitativer Datenanalyse aus Tools wie Google Analytics, Heatmaps und
                Session-Recordings. Wir untersuchen jeden kritischen Nutzerfluss – vom
                Landingpage-Einstieg über die Produkterkundung bis zum Checkout oder Lead-Formular –
                und identifizieren Reibungspunkte, verwirrende Navigationsmuster, unklare
                Handlungsaufforderungen und Barrierefreiheits-Hindernisse, die Nutzer daran hindern,
                ihre Ziele zu erreichen. Das Ergebnis ist ein priorisierter, umsetzbarer Bericht,
                der jedes Problem seinem geschäftlichen Impact zuordnet und klare, implementierbare
                Empfehlungen zur Optimierung liefert.
              </p>
              <p>
                Unser Usability-Review-Prozess ist in drei rigorose Phasen strukturiert. In der
                ersten Phase führen unsere UX-Spezialisten eine experten-basierte heuristische
                Evaluation durch, bei der Ihr Interface systematisch gegen etablierte
                Usability-Kriterien geprüft wird. Wir bewerten Informationsarchitektur, visuelle
                Hierarchie, Formular-Design, Fehlerbehandlung, Ladeleistung und
                Mobile-Responsiveness. In der zweiten Phase analysieren wir reales Nutzerverhalten
                anhand quantitativer und qualitativer Daten – Klickmuster, Scrolltiefe,
                Aufgaben-Abschlussraten, Absprungraten und Ausstiegsseiten. Wo sinnvoll, führen wir
                moderierte Usability-Tests mit repräsentativen Nutzern Ihrer Zielgruppe durch und
                beobachten, wie diese Ihr Produkt navigieren und wo sie Schwierigkeiten haben. Die
                dritte Phase synthetisiert alle Erkenntnisse in einen umfassenden Analysebericht mit
                Schweregradklassifizierung (kritisch, schwerwiegend, geringfügig, kosmetisch),
                annotierten Screenshots und konkreten Design-Empfehlungen, die Ihr Team sofort
                umsetzen kann.
              </p>
              <p>
                Der Wert eines gründlichen UX Audits reicht weit über die Behebung einzelner
                Usability-Probleme hinaus. Er liefert strategische Klarheit über die mentalen
                Modelle, Erwartungen und Entscheidungsmuster Ihrer Nutzer. Bei Coday in Wetzlar
                haben wir erlebt, wie gezielte Usability-Optimierungen die Konversionsraten
                signifikant steigern können – denn das Entfernen von Reibung aus Nutzerreisen hat
                einen kumulierenden Effekt auf Geschäftskennzahlen. Ein Formular, das schneller
                lädt, eine Navigation, die den Nutzererwartungen entspricht, Fehlermeldungen, die
                leiten statt verwirren, ein Checkout-Prozess, der Schritte minimiert – jede einzelne
                Verbesserung steigert die Performance unabhängig, und zusammen transformieren sie
                das gesamte Nutzererlebnis. Unsere Audit-Berichte dienen zudem als Baseline zur
                Messung des Impacts zukünftiger Designänderungen und ermöglichen datengetriebene
                Iteration und kontinuierliche Verbesserung Ihrer digitalen Produkte.
              </p>
              <p>
                Die Wahl des richtigen Partners für Ihren UX Audit ist entscheidend. Bei Coday in
                Wetzlar bringen wir tiefe Expertise in Usability-Analyse, Interaction Design und
                Konversionsoptimierung in jedes Engagement ein. Wir liefern keine generischen
                Checklisten – wir bieten maßgeschneiderte, kontextspezifische Empfehlungen, die Ihre
                Branche, Zielgruppe und Geschäftsziele berücksichtigen. Ob Sie einen umfassenden
                Audit Ihrer gesamten Website, eine fokussierte Überprüfung eines bestimmten
                Konversionstrichters oder eine wettbewerbsbezogene Usability-Benchmarking-Studie
                benötigen – unsere Analyse-Services passen sich Ihren Anforderungen an. Jedes
                Ergebnis wird mit visuellem Beweismaterial, Schweregrad-Klassifizierung und einer
                klaren Implementierungs-Roadmap dokumentiert. Wir bieten auch Follow-up-Workshops
                an, in denen wir Ihr Design- und Entwicklungsteam durch die Ergebnisse führen und
                gemeinsam das Optimierungs-Backlog priorisieren. Kontaktieren Sie Coday noch heute
                für eine kostenlose Ersteinschätzung und entdecken Sie, wie ein professioneller UX
                Audit das volle Konversionspotenzial Ihrer digitalen Präsenz freischalten kann.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
