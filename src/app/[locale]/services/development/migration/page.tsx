import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { MigrationClient } from '@/features/services/ui/MigrationClient';
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
      title: 'Website Migration & Relaunch Wetzlar | Secure',
      description:
        'Secure website migration and relaunch by Coday in Wetzlar. We transfer your content while optimizing SEO and performance. For businesses across Hesse.',
      keywords: [
        'Website Migration Wetzlar',
        'Next.js Relaunch Hesse',
        'WordPress to Next.js Migration',
        'Coday Web Migration',
      ],
      path: '/en/services/development/migration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Website Migration & Relaunch Wetzlar | Sicher',
    description:
      'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.',
    keywords: [
      'Website Migration Wetzlar',
      'Next.js Relaunch Hessen',
      'WordPress zu Next.js Migration',
      'Coday Web Migration',
    ],
    path: '/de/services/development/migration',
    type: 'money',
  });
}

export default async function MigrationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const _seoTitle =
    _locale === 'en'
      ? 'Website Migration & Relaunch Wetzlar | Secure | Coday'
      : 'Website Migration & Relaunch Wetzlar | Sicher | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Secure website migration and relaunch by Coday in Wetzlar. We transfer your content while optimizing SEO and performance. For businesses across Hesse.'
      : 'Sichere Website Migration und Relaunch von Coday in Wetzlar. Wir übertragen Ihre Inhalte und optimieren dabei SEO und Performance. Für Firmen in Hessen.';

  const pageUrl = `${BASE_URL}/${_locale}/services/development/migration`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Services', url: `/${_locale}/services` },
      {
        name: isEn ? 'Website Migration' : 'Website Migration',
        url: `/${_locale}/services/development/migration`,
      },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // Organization is emitted once by the root layout, so it is not repeated.
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
        id="schema-migration"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <MigrationClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {isEn
            ? 'Secure Website Migration and Relaunch in Wetzlar'
            : 'Sichere Website Migration und Relaunch in Wetzlar'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {isEn ? (
            <>
              <p>
                A website migration or relaunch is one of the most critical undertakings in digital
                business — and one that carries significant risk if handled without the right
                expertise. Coday, your specialist web agency in Wetzlar, Hesse, delivers secure
                website migrations and relaunches that protect your existing search engine rankings,
                preserve every piece of valuable content, and improve your overall digital
                performance. Whether you are moving from WordPress to a modern headless
                architecture, switching hosting providers, restructuring your entire URL hierarchy,
                or consolidating multiple domains into one, our methodical migration planning
                ensures zero data loss and minimal disruption to your online visibility. We
                understand that your website represents years of accumulated SEO equity, and we
                treat every migration with the care and precision it deserves.
              </p>
              <p>
                Our migration process begins with a comprehensive audit of your existing website. We
                catalogue every URL, analyse your current search rankings and organic traffic
                patterns, document all internal and external backlinks, and map out content
                dependencies. This thorough pre-migration analysis forms the foundation of a
                detailed redirect strategy that preserves your SEO authority. We implement proper
                301 redirects for every changed URL, ensure canonical tags are correctly configured,
                and verify that structured data and meta information transfer cleanly to the new
                platform. Throughout the entire process, our team in Wetzlar maintains clear
                communication and provides detailed progress reports, so you always know exactly
                where things stand.
              </p>
              <p>
                Zero-downtime migration is not just a goal — it is our standard. We use staging
                environments, parallel deployments, and automated health checks to ensure your
                website remains fully accessible to users and search engine crawlers throughout the
                transition. Data integrity verification runs at every stage: content, media assets,
                form configurations, user accounts, and database records are all validated before,
                during, and after the switch. For e-commerce migrations, we pay particular attention
                to order history, customer data, and payment gateway integrations to ensure business
                continuity. Our secure migration methodology has been refined through projects
                across Hesse and Central Germany, giving businesses in Wetzlar and beyond the
                confidence that their digital presence is in expert hands.
              </p>
              <p>
                After the migration is complete, our work continues with post-launch monitoring and
                optimisation. We track your search rankings, monitor crawl errors in Google Search
                Console, verify page load performance, and fine-tune any elements that need
                adjustment. A website relaunch is also the perfect opportunity to improve your Core
                Web Vitals, implement modern security headers, and upgrade your tech stack for
                better long-term maintainability. Contact Coday in Wetzlar today to discuss your
                website migration or relaunch project. We will develop a secure, step-by-step
                migration plan that minimises risk, maximises SEO preservation, and positions your
                digital presence for sustained growth across Hesse and throughout Germany.
              </p>
            </>
          ) : (
            <>
              <p>
                Eine Website Migration oder ein Relaunch gehört zu den kritischsten Vorhaben im
                digitalen Geschäftsleben – und birgt erhebliche Risiken, wenn es ohne die richtige
                Expertise durchgeführt wird. Coday, Ihre spezialisierte Webagentur in Wetzlar,
                Hessen, liefert sichere Website Migrationen und Relaunches, die Ihre bestehenden
                Suchmaschinen-Rankings schützen, jeden wertvollen Inhalt bewahren und Ihre gesamte
                digitale Performance verbessern. Ob Sie von WordPress zu einer modernen
                Headless-Architektur wechseln, den Hosting-Anbieter wechseln, Ihre gesamte
                URL-Struktur umstrukturieren oder mehrere Domains konsolidieren – unsere methodische
                Migrationsplanung gewährleistet null Datenverlust und minimale Beeinträchtigung
                Ihrer Online-Sichtbarkeit. Wir wissen, dass Ihre Website jahrelang aufgebautes
                SEO-Kapital repräsentiert, und behandeln jede Migration mit der gebotenen Sorgfalt
                und Präzision.
              </p>
              <p>
                Unser Migrationsprozess beginnt mit einem umfassenden Audit Ihrer bestehenden
                Website. Wir katalogisieren jede URL, analysieren Ihre aktuellen Suchrankings und
                organischen Traffic-Muster, dokumentieren alle internen und externen Backlinks und
                erfassen inhaltliche Abhängigkeiten. Diese gründliche Vor-Migrations-Analyse bildet
                das Fundament einer detaillierten Redirect-Strategie, die Ihre SEO-Autorität
                bewahrt. Wir implementieren korrekte 301-Weiterleitungen für jede geänderte URL,
                stellen sicher, dass Canonical-Tags richtig konfiguriert sind, und verifizieren,
                dass strukturierte Daten und Meta-Informationen sauber auf die neue Plattform
                übertragen werden. Während des gesamten Prozesses pflegt unser Team in Wetzlar eine
                klare Kommunikation und liefert detaillierte Fortschrittsberichte, damit Sie
                jederzeit genau wissen, wo die Dinge stehen.
              </p>
              <p>
                Zero-Downtime-Migration ist nicht nur ein Ziel – es ist unser Standard. Wir nutzen
                Staging-Umgebungen, parallele Deployments und automatisierte Health-Checks, um
                sicherzustellen, dass Ihre Website während des gesamten Übergangs für Nutzer und
                Suchmaschinen-Crawler vollständig erreichbar bleibt. Datenintegritätsprüfungen
                laufen in jeder Phase: Inhalte, Medien-Assets, Formular-Konfigurationen,
                Benutzerkonten und Datenbankeinträge werden vor, während und nach dem Umzug
                validiert. Bei E-Commerce-Migrationen achten wir besonders auf Bestellhistorien,
                Kundendaten und Payment-Gateway-Integrationen, um die Geschäftskontinuität
                sicherzustellen. Unsere sichere Migrationsmethodik wurde durch Projekte in ganz
                Hessen und Mitteldeutschland verfeinert und gibt Unternehmen in Wetzlar und darüber
                hinaus die Sicherheit, dass ihre digitale Präsenz in Expertenhänden liegt.
              </p>
              <p>
                Nach Abschluss der Migration geht unsere Arbeit mit Post-Launch-Monitoring und
                Optimierung weiter. Wir verfolgen Ihre Suchrankings, überwachen Crawl-Fehler in der
                Google Search Console, prüfen die Seitenladegeschwindigkeit und justieren alle
                Elemente nach, die Anpassungen benötigen. Ein Website Relaunch ist auch die perfekte
                Gelegenheit, Ihre Core Web Vitals zu verbessern, moderne Security-Header zu
                implementieren und Ihren Tech-Stack für bessere langfristige Wartbarkeit zu
                aktualisieren. Kontaktieren Sie Coday in Wetzlar noch heute, um Ihr
                Website-Migrations- oder Relaunch-Projekt zu besprechen. Wir entwickeln einen
                sicheren, schrittweisen Migrationsplan, der Risiken minimiert, SEO-Werte maximal
                erhält und Ihre digitale Präsenz für nachhaltiges Wachstum in Hessen und ganz
                Deutschland positioniert.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
