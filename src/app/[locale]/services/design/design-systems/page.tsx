import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { DesignSystemsClient } from '@/features/services/ui/DesignSystemsClient';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getServiceSchema, getBreadcrumbSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Design Systems Wetzlar | Consistent Components',
      description:
        'Consistent design systems and reusable components by Coday in Wetzlar. Scalable UI libraries for businesses in Hesse. Get in touch to get started.',
      keywords: [
        'Design Systems Wetzlar',
        'UI Component Library Hesse',
        'Scalable UI Architecture',
        'Coday Design Systems',
      ],
      path: '/en/services/design/design-systems',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Design Systems Wetzlar | Konsistente Komponenten',
    description:
      'Konsistente Design Systeme und wiederverwendbare Komponenten von Coday in Wetzlar. Skalierbare UI-Bibliotheken für Unternehmen in Hessen. Anfragen.',
    keywords: [
      'Design Systems Wetzlar',
      'UI Komponenten Bibliothek',
      'Skalierbare Designarchitektur Hessen',
      'Coday Design Systems',
    ],
    path: '/de/services/design/design-systems',
    type: 'money',
  });
}

export default async function DesignSystemsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'Design Systems Wetzlar | Consistent Components | Coday'
      : 'Design Systems Wetzlar | Konsistente Komponenten | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Consistent design systems and reusable components by Coday in Wetzlar. Scalable UI libraries for businesses in Hesse. Get in touch to get started.'
      : 'Konsistente Design Systeme und wiederverwendbare Komponenten von Coday in Wetzlar. Skalierbare UI-Bibliotheken für Unternehmen in Hessen. Anfragen.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Services', url: `/${_locale}/services` },
    {
      name: isEn ? 'Design Systems' : 'Design Systeme',
      url: `/${_locale}/services/design/design-systems`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization lives in the root layout's graph, so it stays out of here.
    '@graph': [
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/services/design/design-systems`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-design-systems"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <DesignSystemsClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Design Systems & Consistent Components in Wetzlar'
            : 'Design Systems & Konsistente Komponenten in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {_locale === 'en' ? (
            <>
              <p>
                A well-architected design system is the backbone of scalable digital products. At
                Coday in Wetzlar, we build comprehensive design systems that unify your user
                interface across every platform, product and team. Our approach starts with a
                thorough audit of your existing components, patterns and visual language. We
                identify inconsistencies, redundancies and gaps, then architect a component library
                that serves as a single source of truth for designers and developers alike. Each
                component is designed with accessibility, responsiveness and performance in mind,
                ensuring your digital products meet the highest quality standards from day one.
                Design tokens—the atomic values for color, spacing, typography and elevation—form
                the foundation of every system we create. By abstracting these values into a token
                architecture, we enable seamless theming, dark mode support and brand-consistent
                white-label solutions without rewriting a single line of component code.
              </p>
              <p>
                Reusable component libraries dramatically accelerate development cycles and reduce
                maintenance costs. Instead of rebuilding buttons, forms, navigation patterns and
                data tables for every new feature, your engineering team draws from a tested,
                documented catalogue of consistent components. At Coday, we deliver component
                libraries in the technologies your team already uses—React, Vue, Angular or
                framework-agnostic Web Components. Every component ships with clear API
                documentation, usage examples, accessibility annotations (WCAG 2.2 AA compliance)
                and visual regression tests. This level of engineering rigor means fewer bugs,
                faster code reviews and a smoother onboarding experience for new developers. For
                businesses in Wetzlar, Hesse and beyond, this translates to tangible competitive
                advantage: you ship features faster, with higher quality, at lower cost.
              </p>
              <p>
                Scalable UI requires more than a component catalogue—it demands governance,
                documentation and tooling. We establish contribution guidelines, versioning
                strategies (semantic versioning) and change-management workflows that keep your
                design system healthy as your product evolves. Our documentation sites—powered by
                Storybook or custom solutions—serve as living style guides where designers can
                inspect components, developers can copy code snippets and product managers can
                understand the design language. We also integrate design-to-code workflows that
                synchronize Figma tokens with your codebase, eliminating the drift between design
                files and production UI. This automated pipeline ensures that when a designer
                updates a color value or adjusts spacing, the change propagates consistently across
                your entire product suite without manual intervention.
              </p>
              <p>
                Investing in a design system is investing in the long-term velocity and quality of
                your digital products. At Coday in Wetzlar, we have seen first-hand how a mature
                design system transforms organizations—reducing design-to-development handoff
                friction, eliminating pixel-level debates and freeing creative resources for
                innovation rather than repetition. Whether you are building your first design system
                from scratch, migrating from a legacy pattern library or scaling an existing system
                across multiple products and teams, our expertise guides you through every phase.
                From strategy and token architecture through component development, documentation
                and rollout, every deliverable is crafted for maintainability and growth. Contact
                Coday today for a consultation and discover how a consistent, scalable design system
                can elevate your digital products and streamline your entire product development
                lifecycle.
              </p>
            </>
          ) : (
            <>
              <p>
                Ein durchdacht aufgebautes Design System ist das Rückgrat skalierbarer digitaler
                Produkte. Bei Coday in Wetzlar entwickeln wir umfassende Design Systems, die Ihre
                Benutzeroberfläche über alle Plattformen, Produkte und Teams hinweg
                vereinheitlichen. Unser Ansatz beginnt mit einem gründlichen Audit Ihrer bestehenden
                Komponenten, Patterns und visuellen Sprache. Wir identifizieren Inkonsistenzen,
                Redundanzen und Lücken und konzipieren dann eine Komponentenbibliothek, die als
                zentrale Quelle der Wahrheit für Designer und Entwickler gleichermaßen dient. Jede
                Komponente wird mit Barrierefreiheit, Responsivität und Performance im Blick
                gestaltet, sodass Ihre digitalen Produkte von Anfang an höchsten Qualitätsstandards
                entsprechen. Design Tokens – die atomaren Werte für Farbe, Abstände, Typografie und
                Elevation – bilden das Fundament jedes Systems, das wir erstellen. Durch die
                Abstraktion dieser Werte in eine Token-Architektur ermöglichen wir nahtloses
                Theming, Dark-Mode-Unterstützung und markenkonsistente White-Label-Lösungen, ohne
                eine einzige Zeile Komponentencode umschreiben zu müssen.
              </p>
              <p>
                Wiederverwendbare Komponentenbibliotheken beschleunigen Entwicklungszyklen
                dramatisch und senken Wartungskosten. Anstatt Buttons, Formulare, Navigationsmuster
                und Datentabellen für jedes neue Feature neu zu erstellen, greift Ihr
                Engineering-Team auf einen getesteten, dokumentierten Katalog konsistenter
                Komponenten zurück. Bei Coday liefern wir Komponentenbibliotheken in den
                Technologien, die Ihr Team bereits nutzt – React, Vue, Angular oder
                framework-agnostische Web Components. Jede Komponente wird mit klarer
                API-Dokumentation, Nutzungsbeispielen, Barrierefreiheits-Annotationen (WCAG 2.2 AA
                konform) und visuellen Regressionstests ausgeliefert. Dieses Maß an
                Engineering-Sorgfalt bedeutet weniger Bugs, schnellere Code-Reviews und eine
                reibungslosere Einarbeitung neuer Entwickler. Für Unternehmen in Wetzlar, Hessen und
                darüber hinaus übersetzt sich dies in einen greifbaren Wettbewerbsvorteil: Sie
                liefern Features schneller, in höherer Qualität und zu geringeren Kosten.
              </p>
              <p>
                Skalierbare UI erfordert mehr als einen Komponentenkatalog – es braucht Governance,
                Dokumentation und Tooling. Wir etablieren Beitragsrichtlinien,
                Versionierungsstrategien (Semantic Versioning) und Change-Management-Workflows, die
                Ihr Design System gesund halten, während Ihr Produkt sich weiterentwickelt. Unsere
                Dokumentationsseiten – betrieben mit Storybook oder maßgeschneiderten Lösungen –
                dienen als lebendige Styleguides, in denen Designer Komponenten inspizieren,
                Entwickler Code-Snippets kopieren und Produktmanager die Designsprache verstehen
                können. Wir integrieren zudem Design-to-Code-Workflows, die Figma-Tokens mit Ihrer
                Codebasis synchronisieren und den Drift zwischen Design-Dateien und Produktions-UI
                eliminieren. Diese automatisierte Pipeline stellt sicher, dass eine Farbwertänderung
                oder Abstandsanpassung im Design sich konsistent über Ihre gesamte Produktsuite
                ausbreitet – ohne manuelles Eingreifen.
              </p>
              <p>
                Die Investition in ein Design System ist eine Investition in die langfristige
                Geschwindigkeit und Qualität Ihrer digitalen Produkte. Bei Coday in Wetzlar haben
                wir aus erster Hand erfahren, wie ein ausgereiftes Design System Organisationen
                transformiert – es reduziert Reibung im Design-to-Development-Handoff, eliminiert
                Pixel-Level-Diskussionen und befreit kreative Ressourcen für Innovation statt
                Wiederholung. Ob Sie Ihr erstes Design System von Grund auf aufbauen, von einer
                Legacy-Pattern-Library migrieren oder ein bestehendes System über mehrere Produkte
                und Teams hinweg skalieren – unsere Expertise begleitet Sie durch jede Phase. Von
                Strategie und Token-Architektur über Komponentenentwicklung, Dokumentation bis hin
                zum Rollout ist jedes Ergebnis auf Wartbarkeit und Wachstum ausgelegt. Kontaktieren
                Sie Coday noch heute für eine Beratung und entdecken Sie, wie ein konsistentes,
                skalierbares Design System Ihre digitalen Produkte auf ein neues Level hebt und
                Ihren gesamten Produktentwicklungsprozess optimiert.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
