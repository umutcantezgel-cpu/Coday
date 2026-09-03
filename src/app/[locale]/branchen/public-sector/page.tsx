import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import PublicSectorClient from '@/features/industries/ui/PublicSectorClient';
import { setRequestLocale } from 'next-intl/server';
import {
  getServiceSchema,
  getAudienceSchema,
  getBreadcrumbSchema,
  getWebPageSchema,
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
      title: 'Web Design for the Public Sector | Hesse Region',
      description:
        'Digitalization for the public sector in Hesse. We develop accessible, secure, and performant websites for authorities and municipalities.',
      path: '/en/branchen/public-sector',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für den Öffentlichen Sektor | Hessen',
    description:
      'Digitalisierung im öffentlichen Sektor in Hessen. Wir entwickeln barrierefreie, sichere und performante Webseiten für Behörden und Kommunen.',
    path: '/de/branchen/public-sector',
    type: 'money',
  });
}

export default async function PublicSectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const pageUrl = `${BASE_URL}/${_locale}/branchen/public-sector`;
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for the Public Sector | Hesse Region | Coday'
      : 'Webdesign für den Öffentlichen Sektor | Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Accessible and GDPR-compliant websites for municipalities and authorities in Hesse. Secure web development by Coday from Wetzlar. Get in touch today.'
      : 'Barrierefreie und DSGVO-konforme Webseiten für Kommunen und Behörden in Hessen. Sichere Webentwicklung von Coday aus Wetzlar. Jetzt Kontakt aufnehmen.';
  return (
    <>
      <script
        id="schema-branchen-public-sector"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // The site-wide Organization node comes from the root layout head.
            '@graph': [
              getBreadcrumbSchema(
                [
                  { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                  {
                    name: _locale === 'en' ? 'Industries' : 'Branchen',
                    url: `/${_locale}/branchen`,
                  },
                  {
                    name: _locale === 'en' ? 'Public Sector' : 'Öffentlicher Sektor',
                    url: `/${_locale}/branchen/public-sector`,
                  },
                ],
                pageUrl
              ),
              getWebPageSchema({
                url: pageUrl,
                name: _seoTitle,
                description: _seoDesc,
                locale: _locale,
                mainEntityId: `${pageUrl}#service`,
              }),
              getAudienceSchema({
                url: pageUrl,
                audienceType:
                  _locale === 'en' ? 'Authorities and municipalities' : 'Behörden und Kommunen',
                name: _locale === 'en' ? 'Authorities and municipalities' : 'Behörden und Kommunen',
              }),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: pageUrl,
                audienceId: `${pageUrl}#audience`,
              }),
            ],
          }),
        }}
      />
      <PublicSectorClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h3 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Web Design for the Public Sector – Accessible & Secure Government Portals in Hesse'
            : 'Webdesign für den Öffentlichen Sektor – Barrierefreie & sichere Behördenportale in Hessen'}
        </h3>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'The public sector in Hesse and across Germany faces a fundamental digital transformation challenge: delivering government services online in a way that is accessible to every citizen, regardless of ability, age, or technical proficiency. Municipalities, county administrations, public utilities, and government agencies are required by law to provide digital services that comply with strict accessibility standards. The Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) and the Web Content Accessibility Guidelines (WCAG 2.1 / 2.2) set the benchmark for inclusive web design in the public sector. At Coday, we specialize in developing government portals and municipal websites that meet and exceed these accessibility requirements. Our approach begins with a thorough accessibility audit of existing digital infrastructure, identifying barriers that prevent citizens with visual, auditory, motor, or cognitive impairments from accessing public information and services. We then implement semantic HTML structures, proper heading hierarchies, ARIA landmarks, keyboard navigation patterns, sufficient color contrast ratios, and screen reader compatibility throughout every page. Accessibility is not an afterthought in our development process — it is a foundational design principle that informs every decision from the first wireframe to the final deployment.'
              : 'Der öffentliche Sektor in Hessen und ganz Deutschland steht vor einer grundlegenden Herausforderung der digitalen Transformation: die Bereitstellung von Verwaltungsleistungen online, die für jeden Bürger zugänglich sind — unabhängig von Fähigkeit, Alter oder technischem Kenntnisstand. Kommunen, Kreisverwaltungen, öffentliche Versorgungsunternehmen und Behörden sind gesetzlich verpflichtet, digitale Dienste bereitzustellen, die strenge Barrierefreiheitsstandards erfüllen. Die Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) und die Web Content Accessibility Guidelines (WCAG 2.1 / 2.2) setzen den Maßstab für inklusives Webdesign im öffentlichen Sektor. Bei Coday sind wir darauf spezialisiert, Behördenportale und kommunale Websites zu entwickeln, die diese Anforderungen an Barrierefreiheit erfüllen und übertreffen. Unser Ansatz beginnt mit einem gründlichen Barrierefreiheits-Audit der bestehenden digitalen Infrastruktur, um Barrieren zu identifizieren, die Bürger mit visuellen, auditiven, motorischen oder kognitiven Einschränkungen daran hindern, auf öffentliche Informationen und Dienste zuzugreifen. Anschließend implementieren wir semantische HTML-Strukturen, korrekte Überschriftenhierarchien, ARIA-Landmarks, Tastaturnavigationsmuster, ausreichende Farbkontrastverhältnisse und Screenreader-Kompatibilität auf jeder Seite. Barrierefreiheit ist in unserem Entwicklungsprozess kein nachträglicher Gedanke — sie ist ein grundlegendes Designprinzip, das jede Entscheidung vom ersten Wireframe bis zur finalen Bereitstellung bestimmt.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'The Onlinezugangsgesetz (OZG) mandates that German government agencies digitize their administrative services, making them available to citizens and businesses through user-friendly online portals. This legislation has created an urgent need for modern, performant, and citizen-centric web applications that streamline bureaucratic processes. Coday helps municipalities and public institutions in the Hesse region design and implement OZG-compliant service portals that transform cumbersome paper-based workflows into efficient digital experiences. From online building permit applications and residence registration to waste management scheduling and public event notifications, we develop intuitive interfaces that guide citizens through complex administrative procedures step by step. Our solutions integrate with existing government IT systems and identity verification services such as the eID function of the German identity card, ensuring a seamless and legally compliant user journey. We prioritize plain language and clear information architecture so that citizens of all backgrounds can navigate government services without confusion or frustration. Multilingual support is built in where needed, reflecting the diverse population that public sector websites must serve.'
              : 'Das Onlinezugangsgesetz (OZG) verpflichtet deutsche Behörden, ihre Verwaltungsleistungen zu digitalisieren und über benutzerfreundliche Online-Portale für Bürger und Unternehmen zugänglich zu machen. Diese Gesetzgebung hat einen dringenden Bedarf an modernen, leistungsstarken und bürgerzentrierten Webanwendungen geschaffen, die bürokratische Prozesse vereinfachen. Coday unterstützt Kommunen und öffentliche Einrichtungen in der Region Hessen bei der Konzeption und Umsetzung OZG-konformer Serviceportale, die umständliche papierbasierte Abläufe in effiziente digitale Erlebnisse verwandeln. Von Online-Bauanträgen und Anmeldungen über die Abfallwirtschaftsplanung bis hin zu Veranstaltungsbenachrichtigungen — wir entwickeln intuitive Benutzeroberflächen, die Bürger Schritt für Schritt durch komplexe Verwaltungsverfahren führen. Unsere Lösungen integrieren sich nahtlos in bestehende behördliche IT-Systeme und Identitätsprüfungsdienste wie die eID-Funktion des deutschen Personalausweises und gewährleisten eine reibungslose und rechtskonforme Nutzerführung. Wir legen besonderen Wert auf einfache Sprache und eine klare Informationsarchitektur, damit Bürger aller Hintergründe ohne Verwirrung oder Frustration durch die Verwaltungsdienste navigieren können. Mehrsprachige Unterstützung wird dort integriert, wo sie benötigt wird, um der vielfältigen Bevölkerung gerecht zu werden, die öffentliche Websites bedienen müssen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Security is paramount when developing websites and portals for the public sector. Government digital infrastructure is a high-value target for cyberattacks, and the consequences of a security breach — from leaked citizen data to disrupted public services — can be severe. At Coday, we implement defense-in-depth security strategies that include HTTPS everywhere with HSTS headers, Content Security Policies (CSP) with strict nonce-based script execution, XSS and CSRF protection, rate limiting, input validation, and regular security audits. All data processing complies with GDPR and the German Bundesdatenschutzgesetz (BDSG). Hosting is exclusively within certified European data centers that meet BSI IT-Grundschutz standards. We also implement comprehensive logging and monitoring systems that provide audit trails for regulatory compliance and incident response. Our public sector websites achieve consistently high performance scores, with Largest Contentful Paint (LCP) under 2.0 seconds on mobile connections, ensuring that citizens in rural areas of Hesse with slower internet connections can still access services reliably. Performance is not just a technical metric — in the public sector, it is a matter of equal access and digital inclusion.'
              : 'Sicherheit hat bei der Entwicklung von Websites und Portalen für den öffentlichen Sektor höchste Priorität. Behördliche digitale Infrastruktur ist ein hochwertiges Ziel für Cyberangriffe, und die Folgen eines Sicherheitsvorfalls — von durchgesickerten Bürgerdaten bis hin zu gestörten öffentlichen Diensten — können gravierend sein. Bei Coday implementieren wir Defense-in-Depth-Sicherheitsstrategien, die HTTPS überall mit HSTS-Headern, Content Security Policies (CSP) mit strikter Nonce-basierter Skriptausführung, XSS- und CSRF-Schutz, Rate Limiting, Input-Validierung und regelmäßige Sicherheitsaudits umfassen. Jede Datenverarbeitung erfolgt DSGVO- und BDSG-konform. Das Hosting erfolgt ausschließlich in zertifizierten europäischen Rechenzentren, die BSI-IT-Grundschutz-Standards erfüllen. Wir implementieren zudem umfassende Logging- und Monitoring-Systeme, die Audit-Trails für die regulatorische Compliance und Incident Response bereitstellen. Unsere Websites für den öffentlichen Sektor erzielen durchgängig hohe Performance-Werte mit einem Largest Contentful Paint (LCP) unter 2,0 Sekunden auf mobilen Verbindungen, sodass auch Bürger in ländlichen Gebieten Hessens mit langsameren Internetverbindungen zuverlässig auf die Dienste zugreifen können. Performance ist nicht nur eine technische Kennzahl — im öffentlichen Sektor ist sie eine Frage des gleichberechtigten Zugangs und der digitalen Inklusion.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Choosing the right digital partner for public sector web development requires expertise that goes beyond conventional web design. Government projects demand an understanding of procurement processes, administrative workflows, regulatory frameworks, and the unique expectations of citizen users. Coday brings this specialized knowledge to every public sector engagement. We work closely with project leads and department heads to define clear requirements, establish realistic timelines, and deliver solutions that pass rigorous acceptance testing. Our iterative development methodology ensures that stakeholders are involved at every milestone, reducing the risk of costly late-stage revisions. We provide comprehensive documentation, content management training for non-technical staff, and long-term maintenance agreements that keep government websites secure, current, and performant. Whether you represent a small municipality in Hesse seeking a modern town website, a regional authority requiring a citizen service portal, or a public institution that needs to meet upcoming BITV 2.0 deadlines, Coday delivers accessible, secure, and user-friendly digital solutions tailored to the unique demands of the public sector. Contact us today to schedule a no-obligation consultation and learn how we can support your digital transformation goals.'
              : 'Die Wahl des richtigen digitalen Partners für die Webentwicklung im öffentlichen Sektor erfordert Expertise, die über konventionelles Webdesign hinausgeht. Behördenprojekte verlangen ein Verständnis für Vergabeprozesse, Verwaltungsabläufe, regulatorische Rahmenbedingungen und die besonderen Erwartungen der Bürger als Nutzer. Coday bringt dieses spezialisierte Wissen in jedes Projekt im öffentlichen Sektor ein. Wir arbeiten eng mit Projektleitern und Abteilungsleitern zusammen, um klare Anforderungen zu definieren, realistische Zeitpläne zu erstellen und Lösungen zu liefern, die strenge Abnahmetests bestehen. Unsere iterative Entwicklungsmethodik stellt sicher, dass Stakeholder bei jedem Meilenstein eingebunden sind, wodurch das Risiko kostenintensiver Korrekturen in späten Projektphasen reduziert wird. Wir erstellen umfassende Dokumentationen, bieten Content-Management-Schulungen für nicht-technisches Personal und langfristige Wartungsverträge, die Behörden-Websites sicher, aktuell und performant halten. Ob Sie eine kleine Kommune in Hessen vertreten, die eine moderne Gemeinde-Website benötigt, eine Regionalverwaltung, die ein Bürger-Serviceportal braucht, oder eine öffentliche Einrichtung, die anstehende BITV 2.0-Fristen einhalten muss — Coday liefert barrierefreie, sichere und benutzerfreundliche digitale Lösungen, die auf die besonderen Anforderungen des öffentlichen Sektors zugeschnitten sind. Kontaktieren Sie uns noch heute für ein unverbindliches Beratungsgespräch und erfahren Sie, wie wir Ihre digitale Transformation unterstützen können.'}
          </p>
        </div>
      </section>
    </>
  );
}
