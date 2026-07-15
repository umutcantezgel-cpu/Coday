import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDesignClient } from '@/features/services/ui/WebDesignClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Professional Web Design in Wetzlar & Hesse',
      description:
        'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics for your business in Central Hesse. Get started.',
      path: '/en/services/web-design',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Professionelles Webdesign in Wetzlar & Hessen',
    description:
      'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
    path: '/de/services/web-design',
    type: 'money',
  });
}

export default async function WebDesignPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Professional Web Design in Wetzlar & Hesse | Coday'
      : 'Professionelles Webdesign in Wetzlar & Hessen | Coday';
  return (
    <>
      <script
        id="schema-web-design"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Professional Web Design in Wetzlar & Hesse'
                    : 'Professionelles Webdesign in Wetzlar & Hessen',
                description:
                  _locale === 'en'
                    ? 'Premium web design by experts in Wetzlar. Modern layouts, high conversion rates and outstanding aesthetics.'
                    : 'Premium Webdesign vom Profi in Wetzlar. Moderne Layouts, hohe Konversionsraten und zeitlose Ästhetik für Unternehmen in Mittelhessen. Jetzt starten.',
                url: `${BASE_URL}/${_locale}/services/web-design`,
              }),
            ],
          }),
        }}
      />
      <WebDesignClient />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professional Web Design in Wetzlar &amp; Hesse
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                At Coday, professional web design means far more than attractive visuals. Based in
                Wetzlar, Hesse, we create digital experiences that merge brand-aligned aesthetics
                with measurable business results. Every website we build starts with a deep
                understanding of your target audience, your competitive landscape, and your specific
                conversion goals. From that foundation we craft responsive layouts that feel natural
                on smartphones, tablets, and desktops alike – ensuring that no visitor is left
                behind regardless of how they access your site. Our design philosophy centres on
                clarity, hierarchy, and purposeful use of whitespace, producing interfaces that
                guide users effortlessly toward the actions that matter most to your business.
              </p>
              <p>
                The technology behind our web design sets us apart from traditional agencies. We
                develop on Next.js and React with Tailwind CSS, a stack that combines the creative
                freedom of component-based architecture with outstanding runtime performance. This
                modern approach means your website loads faster, ranks higher, and is easier to
                maintain over time. Every design element – from hero sections and navigation menus
                to forms and product galleries – is implemented as a reusable, accessible component
                that meets WCAG standards. We pay particular attention to typography, colour
                systems, and micro-interactions because these subtle details are what transform a
                functional website into a memorable brand experience.
              </p>
              <p>
                Our web design process in Wetzlar follows a structured yet flexible methodology. We
                begin with a discovery workshop where we define your brand positioning, content
                strategy, and key user journeys. Next, we move into wireframing and high-fidelity
                prototyping, allowing you to see and interact with the design before a single line
                of production code is written. Once the design is approved, our development phase
                integrates pixel-perfect implementation with performance budgets, SEO best
                practices, and Core Web Vitals targets. Before launch, every page undergoes rigorous
                cross-browser testing, accessibility audits, and speed optimisation to ensure a
                flawless experience from day one.
              </p>
              <p>
                Choosing Coday for your web design project in Hesse means working with a partner who
                is invested in your long-term digital success. We do not hand over a website and
                disappear. Our ongoing support includes content updates, design refinements,
                analytics reviews, and proactive maintenance so that your site continues to evolve
                alongside your business. Whether you are a local craftsman in Wetzlar, a mid-size
                company in Frankfurt, or a start-up anywhere in Germany, our professional web design
                services are tailored to deliver a premium online presence that earns trust, drives
                engagement, and converts visitors into loyal customers. Reach out today to discuss
                how we can bring your vision to life.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professionelles Webdesign in Wetzlar &amp; Hessen
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Bei Coday bedeutet professionelles Webdesign weit mehr als ansprechende Optik. Mit
                Sitz in Wetzlar, Hessen, gestalten wir digitale Erlebnisse, die markengerechte
                Ästhetik mit messbaren Geschäftsergebnissen verbinden. Jede Website, die wir
                erstellen, beginnt mit einem tiefen Verständnis Ihrer Zielgruppe, Ihrer
                Wettbewerbslandschaft und Ihrer spezifischen Konversionsziele. Auf dieser Basis
                entwerfen wir responsive Layouts, die sich auf Smartphones, Tablets und Desktops
                gleichermaßen natürlich anfühlen – damit kein Besucher zurückgelassen wird, egal wie
                er auf Ihre Seite zugreift. Unsere Designphilosophie setzt auf Klarheit, visuelle
                Hierarchie und den gezielten Einsatz von Weißraum, um Oberflächen zu schaffen, die
                Nutzer mühelos zu den entscheidenden Aktionen führen.
              </p>
              <p>
                Die Technologie hinter unserem Webdesign hebt uns von traditionellen Agenturen ab.
                Wir entwickeln auf Basis von Next.js und React mit Tailwind CSS – einem Stack, der
                die kreative Freiheit komponentenbasierter Architektur mit herausragender
                Laufzeit-Performance vereint. Dieser moderne Ansatz sorgt dafür, dass Ihre Website
                schneller lädt, besser rankt und langfristig einfacher zu warten ist. Jedes
                Designelement – von Hero-Sektionen und Navigationsmenüs bis hin zu Formularen und
                Produktgalerien – wird als wiederverwendbare, barrierefreie Komponente umgesetzt,
                die den WCAG-Standards entspricht. Besonderes Augenmerk legen wir auf Typografie,
                Farbsysteme und Micro-Interaktionen, denn genau diese subtilen Details verwandeln
                eine funktionale Website in ein unvergessliches Markenerlebnis.
              </p>
              <p>
                Unser Webdesign-Prozess in Wetzlar folgt einer strukturierten, aber flexiblen
                Methodik. Wir beginnen mit einem Discovery-Workshop, in dem wir Ihre
                Markenpositionierung, Content-Strategie und wichtigsten Nutzerreisen definieren.
                Anschließend erstellen wir Wireframes und High-Fidelity-Prototypen, sodass Sie das
                Design sehen und testen können, bevor eine einzige Zeile Produktionscode geschrieben
                wird. Sobald das Design freigegeben ist, integriert unsere Entwicklungsphase
                pixelgenaue Umsetzung mit Performance-Budgets, SEO-Best-Practices und
                Core-Web-Vitals-Zielen. Vor dem Launch durchläuft jede Seite umfassende
                Cross-Browser-Tests, Barrierefreiheits-Audits und Geschwindigkeitsoptimierungen, um
                ein einwandfreies Erlebnis vom ersten Tag an sicherzustellen.
              </p>
              <p>
                Sich für Coday als Webdesign-Partner in Hessen zu entscheiden heißt, mit einem
                Unternehmen zu arbeiten, das in Ihren langfristigen digitalen Erfolg investiert ist.
                Wir übergeben keine Website und verschwinden. Unsere laufende Betreuung umfasst
                Content-Updates, Design-Verfeinerungen, Analytics-Reviews und proaktive Wartung,
                damit Ihre Seite sich kontinuierlich mit Ihrem Unternehmen weiterentwickelt. Ob Sie
                ein lokaler Handwerksbetrieb in Wetzlar, ein mittelständisches Unternehmen in
                Frankfurt oder ein Start-up irgendwo in Deutschland sind – unser professionelles
                Webdesign ist darauf ausgerichtet, eine erstklassige Online-Präsenz zu schaffen, die
                Vertrauen aufbaut, Engagement fördert und Besucher in treue Kunden verwandelt.
                Kontaktieren Sie uns noch heute, um Ihre Vision Wirklichkeit werden zu lassen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
