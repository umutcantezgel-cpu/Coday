import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BrandIdentityClient } from '@/features/services/ui/BrandIdentityClient';
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
      title: 'Corporate Design & Branding Agency | Wetzlar',
      description:
        'Strong brand identity and corporate design by Coday in Wetzlar. Logo, colors and typography for your business in Hesse. Start building your brand now.',
      keywords: [
        'Brand Identity Agency Wetzlar',
        'Corporate Design Hesse',
        'Logo Design Mittelhessen',
        'Brand Strategy Coday',
      ],
      path: '/en/services/design/brand-identity',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Corporate Design & Branding Agentur | Wetzlar',
    description:
      'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.',
    keywords: [
      'Corporate Design Agentur Wetzlar',
      'Branding Hessen',
      'Logo Design Mittelhessen',
      'Markenidentität Coday',
    ],
    path: '/de/services/design/brand-identity',
    type: 'money',
  });
}

export default async function BrandIdentityPage({
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
      ? 'Corporate Design & Branding Agency | Wetzlar | Coday'
      : 'Corporate Design & Branding Agentur | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Strong brand identity and corporate design by Coday in Wetzlar. Logo, colors and typography for your business in Hesse. Start building your brand now.'
      : 'Starke Markenidentität und Corporate Design von Coday in Wetzlar. Logo, Farben und Typografie für Ihr Unternehmen in Hessen. Jetzt Marke gestalten.';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: 'Services', url: `/${_locale}/services` },
    {
      name: isEn ? 'Brand Identity' : 'Corporate Design',
      url: `/${_locale}/services/design/brand-identity`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // The root layout publishes the Organization node for every route.
    '@graph': [
      breadcrumbs,
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: `${BASE_URL}/${_locale}/services/design/brand-identity`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-brand-identity"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BrandIdentityClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Corporate Design & Branding Agency in Wetzlar'
            : 'Corporate Design & Branding Agentur in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {_locale === 'en' ? (
            <>
              <p>
                A strong brand identity is the foundation of every successful business. At Coday,
                your dedicated branding agency in Wetzlar, we develop corporate design systems that
                communicate your values, vision and personality across every touchpoint. From the
                initial brand strategy workshop through logo design, color palette definition and
                typography selection to the final brand guidelines document, we craft visual
                identities that resonate with your target audience and set you apart from
                competitors. Our approach is rooted in strategic thinking: before we sketch a single
                concept, we research your market, analyze your competitive landscape in Hesse and
                beyond, and define the positioning that will drive long-term brand equity. Every
                element we create serves a purpose—whether it is a wordmark that conveys
                trustworthiness, an icon system that improves usability, or a photographic style
                that evokes the right emotional response.
              </p>
              <p>
                Logo design is at the heart of corporate identity. A well-crafted logo is more than
                a graphic—it is the visual shorthand for everything your company stands for. Our
                design process at Coday includes extensive moodboarding, iterative sketching,
                digital refinement and real-world mockup testing. We ensure your logo works
                flawlessly across all media: from favicon sizes on websites to large-format signage,
                from business cards to social media avatars. We design for versatility, creating
                logo variations (horizontal, stacked, icon-only) that maintain clarity and impact at
                every scale. Typography is equally critical. The typefaces you use shape how
                customers perceive your brand—whether professional, approachable, innovative or
                timeless. We select and pair typefaces that reinforce your brand character and
                guarantee excellent readability across digital and print applications.
              </p>
              <p>
                Visual consistency is what transforms a collection of design assets into a cohesive
                brand experience. Our brand guidelines documents provide clear rules for logo usage,
                spacing, color codes (HEX, RGB, CMYK), typographic hierarchy, imagery style and tone
                of voice. These guidelines empower your team—or any external partner—to produce
                on-brand materials without guesswork. For businesses in Wetzlar and across Central
                Hesse, this consistency builds recognition and trust. Customers encounter your brand
                on your website, in email campaigns, on packaging, at trade fairs and in social
                media feeds. When every interaction feels unified, it strengthens brand recall and
                creates a professional impression that translates directly into customer confidence
                and higher conversion rates.
              </p>
              <p>
                Choosing the right branding agency is a strategic decision. At Coday in Wetzlar, we
                combine creative excellence with a data-informed methodology. We do not design based
                on trends alone—we design for longevity, ensuring your corporate identity remains
                relevant as your business grows. Whether you are launching a new venture,
                repositioning an established brand or expanding into new markets, our branding
                services provide the visual foundation you need. From initial consultation to final
                delivery, every step is transparent, collaborative and focused on measurable
                outcomes. Invest in a corporate design that truly represents your business, builds
                customer loyalty and drives sustainable growth. Contact Coday today for a
                non-binding brand strategy consultation and take the first step toward a
                distinctive, memorable brand identity.
              </p>
            </>
          ) : (
            <>
              <p>
                Eine starke Markenidentität ist das Fundament jedes erfolgreichen Unternehmens. Bei
                Coday, Ihrer spezialisierten Branding Agentur in Wetzlar, entwickeln wir Corporate
                Design Systeme, die Ihre Werte, Vision und Persönlichkeit über jeden Berührungspunkt
                hinweg kommunizieren. Vom initialen Markenstrategie-Workshop über Logo-Design,
                Farbpaletten-Definition und Typografie-Auswahl bis hin zum finalen
                Brand-Guidelines-Dokument gestalten wir visuelle Identitäten, die bei Ihrer
                Zielgruppe Resonanz erzeugen und Sie von der Konkurrenz abheben. Unser Ansatz
                basiert auf strategischem Denken: Bevor wir ein einziges Konzept skizzieren,
                recherchieren wir Ihren Markt, analysieren Ihr Wettbewerbsumfeld in Hessen und
                darüber hinaus und definieren die Positionierung, die langfristigen Markenwert
                aufbaut. Jedes Element, das wir kreieren, erfüllt einen Zweck – ob eine Wortmarke,
                die Vertrauenswürdigkeit vermittelt, ein Icon-System, das die Usability verbessert,
                oder ein Bildstil, der die richtige emotionale Reaktion hervorruft.
              </p>
              <p>
                Logo-Design steht im Zentrum der Corporate Identity. Ein durchdachtes Logo ist mehr
                als eine Grafik – es ist die visuelle Kurzformel für alles, wofür Ihr Unternehmen
                steht. Unser Designprozess bei Coday umfasst ausführliches Moodboarding, iteratives
                Skizzieren, digitale Verfeinerung und Tests mit realistischen Mockups. Wir stellen
                sicher, dass Ihr Logo in allen Medien einwandfrei funktioniert: von Favicon-Größen
                auf Websites bis zu großformatigen Schildern, von Visitenkarten bis zu
                Social-Media-Avataren. Wir gestalten für Vielseitigkeit und erstellen Logo-Varianten
                (horizontal, gestapelt, Nur-Icon), die bei jeder Skalierung Klarheit und Wirkung
                bewahren. Typografie ist ebenso entscheidend. Die Schriftarten, die Sie verwenden,
                prägen, wie Kunden Ihre Marke wahrnehmen – ob professionell, nahbar, innovativ oder
                zeitlos. Wir wählen und kombinieren Schriften, die Ihren Markencharakter
                unterstreichen und hervorragende Lesbarkeit in digitalen und Print-Anwendungen
                garantieren.
              </p>
              <p>
                Visuelle Konsistenz ist es, die eine Sammlung von Design-Assets in ein kohärentes
                Markenerlebnis verwandelt. Unsere Brand-Guidelines-Dokumente liefern klare Regeln
                für Logo-Verwendung, Abstände, Farbcodes (HEX, RGB, CMYK), typografische Hierarchie,
                Bildstil und Tonalität. Diese Richtlinien befähigen Ihr Team – oder jeden externen
                Partner – markenkonformes Material ohne Rätselraten zu erstellen. Für Unternehmen in
                Wetzlar und in ganz Mittelhessen baut diese Konsistenz Wiedererkennung und Vertrauen
                auf. Kunden begegnen Ihrer Marke auf Ihrer Website, in E-Mail-Kampagnen, auf
                Verpackungen, auf Messen und in Social-Media-Feeds. Wenn jede Interaktion
                einheitlich wirkt, stärkt dies die Markenerinnerung und erzeugt einen
                professionellen Eindruck, der sich direkt in Kundenvertrauen und höhere
                Konversionsraten übersetzt.
              </p>
              <p>
                Die Wahl der richtigen Branding Agentur ist eine strategische Entscheidung. Bei
                Coday in Wetzlar verbinden wir kreative Exzellenz mit einer datengestützten
                Methodik. Wir gestalten nicht nur nach Trends – wir gestalten für Langlebigkeit und
                stellen sicher, dass Ihre Corporate Identity relevant bleibt, während Ihr
                Unternehmen wächst. Ob Sie ein neues Unternehmen gründen, eine etablierte Marke
                repositionieren oder in neue Märkte expandieren – unser Branding-Service liefert das
                visuelle Fundament, das Sie benötigen. Von der ersten Beratung bis zur finalen
                Lieferung ist jeder Schritt transparent, kollaborativ und auf messbare Ergebnisse
                ausgerichtet. Investieren Sie in ein Corporate Design, das Ihr Unternehmen
                authentisch repräsentiert, Kundenbindung aufbaut und nachhaltiges Wachstum fördert.
                Kontaktieren Sie Coday noch heute für eine unverbindliche Markenstrategie-Beratung
                und machen Sie den ersten Schritt zu einer unverwechselbaren, einprägsamen
                Markenidentität.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
