import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { WebAppsClient } from '@/features/services/ui/WebAppsClient';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getServiceSchema, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web App Development Wetzlar | Portals & Tools',
      description:
        'Custom web app development and portals by Coday in Wetzlar. Tailored solutions for businesses in Central Hesse. Start your project with us today.',
      keywords: [
        'Web App Development Wetzlar',
        'Custom Web Applications Hesse',
        'React Next.js Web App',
        'Coday Web Apps',
      ],
      path: '/en/services/development/web-apps',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Web-App Entwicklung Wetzlar | Portale & Tools',
    description:
      'Individuelle Web-App Entwicklung und Portale von Coday in Wetzlar. Maßgeschneiderte Lösungen für Unternehmen in Mittelhessen. Jetzt Projekt starten.',
    keywords: [
      'Web-App Entwicklung Wetzlar',
      'Individuelle Webanwendungen Hessen',
      'React Next.js Web Apps',
      'Coday Web Apps',
    ],
    path: '/de/services/development/web-apps',
    type: 'money',
  });
}

export default async function WebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'Web App Development Wetzlar | Portals & Tools | Coday'
      : 'Web-App Entwicklung Wetzlar | Portale & Tools | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Custom web app development and portals by Coday in Wetzlar. Tailored solutions for businesses in Central Hesse. Start your project with us today.'
      : 'Individuelle Web-App Entwicklung und Portale von Coday in Wetzlar. Maßgeschneiderte Lösungen für Unternehmen in Mittelhessen. Jetzt Projekt starten.';

  const pageUrl = `${BASE_URL}/${_locale}/services/development/web-apps`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Services', url: `/${_locale}/services` },
      { name: isEn ? 'Web Apps' : 'Web-Apps', url: `/${_locale}/services/development/web-apps` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node comes from the root layout, not from this page.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name: _seoTitle,
        description: _seoDesc,
        locale: _locale,
        mainEntityId: `${pageUrl}#service`,
      }),
      getServiceSchema({
        name: _seoTitle,
        description: _seoDesc,
        url: pageUrl,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-web-apps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <WebAppsClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {isEn
            ? 'Professional Web App Development in Wetzlar'
            : 'Professionelle Web-App Entwicklung in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {isEn ? (
            <>
              <p>
                Digitising business processes today demands more than simple websites — it requires
                intelligent, custom-built web applications, portals, and internal tools. Coday is
                your expert for bespoke web app development in Wetzlar and throughout Central Hesse.
                We design, prototype, and build high-performance, scalable, and secure web apps
                tailored precisely to your organisation's unique requirements. Whether you need
                complex B2B customer portals, internal management dashboards, digital booking
                systems, data-intensive SaaS platforms, or specialised workflow tools, we transform
                your vision into a fully functional product. Every web app we develop in Wetzlar is
                architected for real-world use, handling thousands of concurrent users while
                maintaining fast response times and an intuitive interface.
              </p>
              <p>
                Modern web apps offer the decisive advantage of running platform-independently in
                the browser, requiring no installation, and being accessible anytime and anywhere.
                We build with future-proof technologies including React, Next.js, TypeScript, and
                Node.js, combined with modern cloud infrastructure and headless architectures. This
                technology stack guarantees exceptional performance, lightning-fast load times, and
                an excellent user experience that keeps your team and customers engaged. Our agile
                development process ensures we can adapt quickly to changing requirements,
                delivering working portals and tools in iterative sprints rather than making you
                wait months for a monolithic release. For businesses in Hesse looking for reliable
                web app development, Coday in Wetzlar provides the technical depth and design
                sensibility to deliver tools that people actually enjoy using.
              </p>
              <p>
                From requirements analysis through prototyping and UI/UX design to final
                development, comprehensive testing, and deployment, we work closely with you at
                every stage. We place the highest priority on IT security and data protection — our
                web apps are hardened against cyber threats and fully compliant with GDPR
                regulations. Seamless integration with your existing system landscape, whether
                connecting to ERP, CRM, or PIM systems through REST or GraphQL APIs, is a standard
                part of every project we deliver. Our portals and tools are built with role-based
                access control, audit logging, and encryption at rest and in transit, ensuring that
                your sensitive business data remains protected at every layer of the application.
              </p>
              <p>
                After a successful launch, we continue to support you with comprehensive
                maintenance, monitoring, and ongoing development of your web app. Optimise your
                workflows, reduce operational costs, and unlock new digital business models with a
                custom web application from Coday. Contact us today for a free initial analysis of
                your project. Let us work together to build the perfect software solution that
                sustainably digitises your enterprise, streamlines your internal processes, and
                gives you a genuine competitive advantage in your market. From client-facing portals
                to internal productivity tools, Coday in Wetzlar delivers web app development that
                drives measurable results for businesses across Hesse and beyond.
              </p>
            </>
          ) : (
            <>
              <p>
                Die Digitalisierung von Geschäftsprozessen erfordert heute mehr als nur einfache
                Websites; sie verlangt nach intelligenten, maßgeschneiderten Web-Applikationen und
                Portallösungen. Coday ist Ihr Experte für die individuelle Web-App Entwicklung in
                Wetzlar und ganz Mittelhessen. Wir konzipieren, designen und programmieren
                leistungsstarke, skalierbare und sichere Web-Apps, die exakt auf die spezifischen
                Anforderungen Ihres Unternehmens zugeschnitten sind. Ob es sich um komplexe
                B2B-Kundenportale, interne Management-Dashboards, digitale Buchungssysteme oder
                datenintensive SaaS-Plattformen handelt – wir verwandeln Ihre Visionen in
                funktionierende Produkte.
              </p>
              <p>
                Moderne Web-Apps bieten den entscheidenden Vorteil, dass sie plattformunabhängig
                direkt im Browser laufen, keine Installation erfordern und somit jederzeit und
                überall zugänglich sind. Wir setzen bei der Entwicklung auf zukunftssichere
                Technologien wie React, Next.js, TypeScript und Node.js, kombiniert mit modernen
                Cloud-Infrastrukturen und Headless-Architekturen. Dies garantiert höchste
                Performance, blitzschnelle Ladezeiten und eine exzellente User Experience (UX), die
                Ihre Nutzer begeistern wird. Unser agiler Entwicklungsprozess stellt sicher, dass
                wir jederzeit flexibel reagieren können.
              </p>
              <p>
                Von der Anforderungsanalyse über das Prototyping und das UI/UX-Design bis hin zur
                finalen Programmierung, dem Testing und dem Deployment arbeiten wir eng mit Ihnen
                zusammen. Darüber hinaus legen wir größten Wert auf IT-Sicherheit und Datenschutz.
                Unsere Web-Apps sind robust gegen Cyberangriffe und erfüllen alle Vorgaben der
                DSGVO. Eine nahtlose Integration in Ihre bestehende Systemlandschaft – etwa die
                Anbindung an ERP-, CRM- oder PIM-Systeme über REST- oder GraphQL-APIs – gehört für
                uns dabei selbstverständlich zum Standard-Repertoire.
              </p>
              <p>
                Nach dem erfolgreichen Launch lassen wir Sie nicht allein, sondern bieten
                umfassenden Support, Wartung und kontinuierliche Weiterentwicklung. Optimieren Sie
                Ihre Workflows, senken Sie Kosten und erschließen Sie neue digitale Geschäftsmodelle
                mit einer individuellen Web-App von Coday. Kontaktieren Sie uns noch heute für eine
                kostenlose Erstanalyse Ihres Vorhabens. Lassen Sie uns gemeinsam die passende
                Softwarelösung erarbeiten, die Ihr Unternehmen nachhaltig digitalisiert, Ihre
                internen Prozesse effizienter gestaltet und Ihnen einen echten Wettbewerbsvorteil am
                Markt verschafft.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
