import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebDevelopmentClient } from '@/features/services/ui/WebDevelopmentClient';
import { setRequestLocale } from 'next-intl/server';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';
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
      title: 'Web Development Wetzlar | Next.js & React Agency',
      description:
        'Custom React and Next.js web applications from Wetzlar. High-performance architecture for businesses in Hesse. Discuss your project with us today.',
      path: '/en/services/web-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webentwicklung Wetzlar | Next.js & React Agentur',
    description:
      'Maßgeschneiderte React und Next.js Webanwendungen aus Wetzlar. High-Performance Architektur für Unternehmen in Hessen. Jetzt Ihr Projekt besprechen.',
    path: '/de/services/web-development',
    type: 'money',
  });
}

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Development Wetzlar | Next.js & React Agency | Coday'
      : 'Webentwicklung Wetzlar | Next.js & React Agentur | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Custom React and Next.js web applications from Wetzlar. High-performance architecture for businesses in Hesse. Discuss your project with us today.'
      : 'Maßgeschneiderte React und Next.js Webanwendungen aus Wetzlar. High-Performance Architektur für Unternehmen in Hessen. Jetzt Ihr Projekt besprechen.';
  return (
    <>
      <script
        id="schema-web-development"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/web-development`,
              }),
            ],
          }),
        }}
      />
      <WebDevelopmentClient />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Web Development Wetzlar – Next.js &amp; React Agency
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Coday is a dedicated web development agency in Wetzlar, Hesse, specialising in
                Next.js and React to build modern, high-performance web applications for businesses
                of every size. Our development process is rooted in engineering excellence: we write
                strictly typed TypeScript, follow component-driven architecture, and adhere to
                performance budgets that keep every route under 100 KB of first-load JavaScript. The
                result is a web application that loads instantly, responds to user input without
                perceptible delay, and scores consistently high on Core Web Vitals – the metrics
                Google uses to evaluate user experience in search rankings. From single-page
                marketing sites to complex multi-tenant platforms, our Wetzlar-based agency delivers
                scalable code that grows with your business.
              </p>
              <p>
                What sets our web development apart is the depth of our technical stack. We leverage
                the Next.js App Router with React Server Components for optimal server-side
                rendering, minimising client-side JavaScript and maximising initial load speed. Data
                flows through server actions and edge functions deployed on Vercel, ensuring
                low-latency responses regardless of where your users are located. For content
                management we integrate Sanity CMS, and for authentication and database needs we
                rely on Supabase – a modern, open-source alternative to Firebase. Every technology
                choice is deliberate: we select tools that offer long-term maintainability, strong
                community support, and seamless integration with the wider Next.js ecosystem.
              </p>
              <p>
                Our development workflow in Wetzlar is built around quality assurance at every step.
                We begin each project with a technical discovery phase where we map out data models,
                API contracts, and routing structures before writing any code. During
                implementation, continuous integration pipelines run automated type checks, linting,
                and build verification on every commit. We practice infrastructure-as-code
                principles so that staging and production environments are identical, eliminating
                the classic "works on my machine" problem. Before launch, we conduct thorough load
                testing, security audits, and accessibility reviews to confirm that the application
                is production-ready and robust against real-world traffic patterns.
              </p>
              <p>
                Choosing Coday as your Next.js and React agency in Wetzlar means partnering with
                developers who care about the craft. We do not chase trends or add unnecessary
                complexity – every line of code serves a purpose, and every architectural decision
                is documented for the next developer who will read it. Our post-launch support
                includes performance monitoring, dependency updates, and incremental feature
                development so your web application stays current and competitive. Whether you are
                modernising a legacy system, building a customer portal, or launching a new digital
                product, our web development expertise in Hesse ensures you receive a solution that
                is fast, secure, and built to last. Reach out today to start your project.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Webentwicklung Wetzlar – Next.js &amp; React Agentur
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Coday ist eine auf Webentwicklung spezialisierte Agentur in Wetzlar, Hessen, die mit
                Next.js und React moderne, hochperformante Webanwendungen für Unternehmen jeder
                Größe entwickelt. Unser Entwicklungsprozess basiert auf technischer Exzellenz: Wir
                schreiben strikt typisierten TypeScript-Code, folgen einer komponentengetriebenen
                Architektur und halten uns an Performance-Budgets, die jede Route unter 100 KB
                First-Load-JavaScript halten. Das Ergebnis ist eine Webanwendung, die sofort lädt,
                auf Nutzereingaben ohne wahrnehmbare Verzögerung reagiert und konsistent hohe
                Core-Web-Vitals-Werte erzielt – die Metriken, anhand derer Google die
                Nutzererfahrung im Suchranking bewertet. Von einseitigen Marketing-Seiten bis hin zu
                komplexen Multi-Tenant-Plattformen liefert unsere Agentur in Wetzlar skalierbaren
                Code, der mit Ihrem Unternehmen wächst.
              </p>
              <p>
                Was unsere Webentwicklung besonders macht, ist die Tiefe unseres technischen Stacks.
                Wir nutzen den Next.js App Router mit React Server Components für optimales
                serverseitiges Rendering, minimieren clientseitiges JavaScript und maximieren die
                initiale Ladegeschwindigkeit. Datenflüsse laufen über Server Actions und Edge
                Functions, die auf Vercel deployt werden, um niedrige Latenzzeiten unabhängig vom
                Standort Ihrer Nutzer zu gewährleisten. Für Content-Management integrieren wir
                Sanity CMS, und für Authentifizierung und Datenbankbedürfnisse setzen wir auf
                Supabase – eine moderne, quelloffene Alternative zu Firebase. Jede
                Technologieentscheidung ist bewusst getroffen: Wir wählen Werkzeuge, die
                langfristige Wartbarkeit, starke Community-Unterstützung und nahtlose Integration in
                das Next.js-Ökosystem bieten.
              </p>
              <p>
                Unser Entwicklungs-Workflow in Wetzlar ist auf Qualitätssicherung in jedem Schritt
                ausgelegt. Wir beginnen jedes Projekt mit einer technischen Discovery-Phase, in der
                wir Datenmodelle, API-Verträge und Routing-Strukturen festlegen, bevor eine Zeile
                Code geschrieben wird. Während der Implementierung führen
                Continuous-Integration-Pipelines bei jedem Commit automatisierte Typprüfungen,
                Linting und Build-Verifikation durch. Wir praktizieren
                Infrastructure-as-Code-Prinzipien, sodass Staging- und Produktionsumgebungen
                identisch sind und das klassische „funktioniert auf meinem Rechner"-Problem
                eliminiert wird. Vor dem Launch führen wir gründliche Lasttests, Sicherheitsaudits
                und Barrierefreiheitsprüfungen durch, um zu bestätigen, dass die Anwendung
                produktionsreif und robust gegen reale Datenverkehrsmuster ist.
              </p>
              <p>
                Sich für Coday als Next.js- und React-Agentur in Wetzlar zu entscheiden bedeutet,
                mit Entwicklern zusammenzuarbeiten, denen ihr Handwerk am Herzen liegt. Wir jagen
                keinen Trends hinterher und fügen keine unnötige Komplexität hinzu – jede Codezeile
                erfüllt einen Zweck, und jede Architekturentscheidung ist für den nächsten
                Entwickler dokumentiert. Unsere Betreuung nach dem Launch umfasst
                Performance-Monitoring, Dependency-Updates und inkrementelle Feature-Entwicklung,
                damit Ihre Webanwendung aktuell und wettbewerbsfähig bleibt. Ob Sie ein
                Legacy-System modernisieren, ein Kundenportal aufbauen oder ein neues digitales
                Produkt auf den Markt bringen – unsere Webentwicklungs-Expertise in Hessen stellt
                sicher, dass Sie eine Lösung erhalten, die schnell, sicher und langlebig ist.
                Kontaktieren Sie uns heute, um Ihr Projekt zu starten.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
