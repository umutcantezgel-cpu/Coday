import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EnterpriseWebClient } from '@/features/services/ui/EnterpriseWebClient';
import { setRequestLocale } from 'next-intl/server';
import { getServiceSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Enterprise Web Development Wetzlar | Web-Apps · Coday',
      description:
        'Scalable and secure enterprise web solutions by Coday in Wetzlar. Portals, intranets and complex web applications for businesses in Hesse. Inquire.',
      keywords: [
        'Enterprise Web Development',
        'Web Portals Development Wetzlar',
        'B2B Web Applications',
        'Next.js Enterprise Agency',
        'Coday Enterprise Web',
      ],
      path: '/en/services/enterprise-web',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Enterprise Webentwicklung Wetzlar | Web-Apps · Coday',
    description:
      'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen. Jetzt anfragen.',
    keywords: [
      'Enterprise Webentwicklung',
      'Webportale Entwicklung Wetzlar',
      'B2B Webanwendungen',
      'Next.js Enterprise Agentur',
      'Coday Enterprise Web',
    ],
    path: '/de/services/enterprise-web',
    type: 'money',
  });
}

export default async function EnterpriseWebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Services' : 'Leistungen', url: `/${_locale}/services` },
    {
      name: isEn ? 'Enterprise Web' : 'Enterprise Web',
      url: `/${_locale}/services/enterprise-web`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    // The root layout defines #organization for the whole site; omit it here.
    '@graph': [
      breadcrumbs,
      getServiceSchema({
        name:
          _locale === 'en'
            ? 'Enterprise Web Development Wetzlar'
            : 'Enterprise Webentwicklung Wetzlar',
        description:
          _locale === 'en'
            ? 'Scalable and secure enterprise web solutions by Coday in Wetzlar. Portals, intranets and complex web applications.'
            : 'Skalierbare und sichere Enterprise Web-Lösungen von Coday in Wetzlar. Portale, Intranets und Webanwendungen für Unternehmen in Hessen.',
        url: `${BASE_URL}/${_locale}/services/enterprise-web`,
      }),
    ],
  };

  return (
    <>
      <script
        id="schema-enterprise-web"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <EnterpriseWebClient />

      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Enterprise Web Development Wetzlar – Scalable &amp; Secure
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Enterprise web development demands a fundamentally different approach than building
                a standard business website. At Coday in Wetzlar, we design and develop scalable,
                secure web applications and Web-Apps that meet the complex requirements of larger
                organisations, growing mid-market companies, and ambitious start-ups that need
                enterprise-grade infrastructure from the outset. Our solutions encompass
                customer-facing portals, internal management dashboards, multi-tenant SaaS
                platforms, and complex data-driven Web-Apps – all built on a modern stack of
                Next.js, React, and TypeScript. We understand that enterprise projects involve
                multiple stakeholders, strict compliance requirements, and long-term maintenance
                horizons, and we structure every engagement accordingly.
              </p>
              <p>
                Scalability is at the core of our enterprise web development methodology. We
                architect applications with horizontal scaling in mind, leveraging edge computing
                through Vercel's global network, database connection pooling via Supabase, and
                stateless API designs that can handle traffic spikes without degradation. Our code
                follows strict separation of concerns, making it straightforward to add new
                features, integrate third-party systems, or migrate individual modules without
                affecting the broader application. We implement comprehensive role-based access
                control, audit logging, and data encryption both in transit and at rest to meet the
                security standards that enterprise clients require. Every architectural decision is
                documented in architecture decision records so that your internal teams can maintain
                and extend the system with full confidence.
              </p>
              <p>
                Our enterprise development process in Wetzlar is structured around predictability
                and risk mitigation. We begin with a thorough requirements analysis and technical
                feasibility study, followed by iterative development sprints that deliver working
                software at regular intervals. Automated testing suites – including unit tests,
                integration tests, and end-to-end tests – run on every commit to catch regressions
                early. We integrate continuous deployment pipelines that promote code from
                development through staging to production with full traceability. For projects that
                involve sensitive data or regulated industries, we conduct security penetration
                testing and ensure compliance with relevant standards such as GDPR data processing
                requirements. This disciplined approach ensures that enterprise projects stay on
                schedule, within budget, and free of critical defects.
              </p>
              <p>
                Partnering with Coday for enterprise web development in Hesse means gaining a
                technology partner who thinks beyond the initial launch. We provide long-term
                support agreements that include performance monitoring, security patch management,
                dependency updates, and incremental feature development aligned with your product
                roadmap. Our documentation-first culture ensures that knowledge transfer is seamless
                whether you are onboarding internal developers or transitioning to an in-house team
                in the future. Whether you need to replace a legacy system, build a new digital
                product from scratch, or integrate disparate business systems into a unified web
                platform, Coday's enterprise expertise in Wetzlar delivers scalable, maintainable
                solutions that stand the test of time. Contact us to discuss your enterprise
                requirements.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Enterprise Webentwicklung Wetzlar – Skalierbar &amp; Sicher
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Enterprise Webentwicklung erfordert einen grundlegend anderen Ansatz als die
                Erstellung einer Standard-Unternehmenswebsite. Bei Coday in Wetzlar konzipieren und
                entwickeln wir skalierbare, sichere Webanwendungen und Web-Apps, die den komplexen
                Anforderungen größerer Organisationen, wachsender Mittelständler und ambitionierter
                Start-ups gerecht werden, die von Beginn an eine Enterprise-taugliche Infrastruktur
                benötigen. Unsere Lösungen umfassen kundenorientierte Portale, interne
                Management-Dashboards, mandantenfähige SaaS-Plattformen und komplexe datengetriebene
                Web-Apps – alle aufgebaut auf einem modernen Stack aus Next.js, React und
                TypeScript. Wir verstehen, dass Enterprise-Projekte mehrere Stakeholder, strenge
                Compliance-Anforderungen und langfristige Wartungshorizonte beinhalten, und
                strukturieren jedes Engagement entsprechend.
              </p>
              <p>
                Skalierbarkeit steht im Zentrum unserer Enterprise-Webentwicklungs-Methodik. Wir
                konzipieren Anwendungen mit horizontaler Skalierung im Blick und nutzen Edge
                Computing über Vercels globales Netzwerk, Datenbank-Connection-Pooling über Supabase
                sowie zustandslose API-Designs, die Lastspitzen ohne Leistungseinbußen bewältigen.
                Unser Code folgt strikter Trennung von Verantwortlichkeiten, sodass neue Features
                hinzugefügt, Drittanbieter-Systeme integriert oder einzelne Module migriert werden
                können, ohne die gesamte Anwendung zu beeinträchtigen. Wir implementieren umfassende
                rollenbasierte Zugriffskontrolle, Audit-Logging und Datenverschlüsselung sowohl bei
                der Übertragung als auch im Ruhezustand, um die Sicherheitsstandards zu erfüllen,
                die Enterprise-Kunden verlangen. Jede Architekturentscheidung wird in Architecture
                Decision Records dokumentiert, damit Ihre internen Teams das System mit vollem
                Vertrauen warten und erweitern können.
              </p>
              <p>
                Unser Enterprise-Entwicklungsprozess in Wetzlar ist auf Vorhersagbarkeit und
                Risikominimierung ausgerichtet. Wir beginnen mit einer gründlichen
                Anforderungsanalyse und technischen Machbarkeitsstudie, gefolgt von iterativen
                Entwicklungssprints, die in regelmäßigen Abständen funktionierende Software liefern.
                Automatisierte Testsuiten – einschließlich Unit-Tests, Integrationstests und
                End-to-End-Tests – laufen bei jedem Commit, um Regressionen frühzeitig zu erkennen.
                Wir integrieren Continuous-Deployment-Pipelines, die Code vom Entwicklungs- über das
                Staging- in das Produktions-Environment mit voller Nachverfolgbarkeit befördern. Für
                Projekte mit sensiblen Daten oder regulierten Branchen führen wir
                Sicherheits-Penetrationstests durch und stellen die Einhaltung relevanter Standards
                wie der DSGVO-Datenverarbeitungsanforderungen sicher. Dieser disziplinierte Ansatz
                gewährleistet, dass Enterprise-Projekte im Zeitplan bleiben, im Budget liegen und
                frei von kritischen Fehlern sind.
              </p>
              <p>
                Mit Coday als Partner für Enterprise Webentwicklung in Hessen gewinnen Sie einen
                Technologiepartner, der über den initialen Launch hinausdenkt. Wir bieten
                langfristige Support-Vereinbarungen, die Performance-Monitoring,
                Sicherheits-Patch-Management, Dependency-Updates und inkrementelle
                Feature-Entwicklung entlang Ihrer Produkt-Roadmap umfassen. Unsere
                Dokumentation-First-Kultur stellt sicher, dass der Wissenstransfer nahtlos verläuft
                – ob Sie interne Entwickler einarbeiten oder in Zukunft zu einem internen Team
                übergehen. Ob Sie ein Legacy-System ablösen, ein neues digitales Produkt von Grund
                auf entwickeln oder disparate Geschäftssysteme in eine einheitliche Webplattform
                integrieren müssen – Codays Enterprise-Expertise in Wetzlar liefert skalierbare,
                wartbare Lösungen, die dem Zahn der Zeit standhalten. Kontaktieren Sie uns, um Ihre
                Enterprise-Anforderungen zu besprechen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
