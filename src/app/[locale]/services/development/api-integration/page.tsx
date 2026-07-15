import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ApiIntegrationClient } from '@/features/services/ui/ApiIntegrationClient';
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
      title: 'API Integration & Interfaces | Wetzlar Hesse',
      description:
        'Seamless API integrations and interface development by Coday in Wetzlar. We connect your systems reliably and efficiently. For businesses in Hesse.',
      path: '/en/services/development/api-integration',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'API Integration & Schnittstellen | Wetzlar',
    description:
      'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.',
    path: '/de/services/development/api-integration',
    type: 'money',
  });
}

export default async function ApiIntegrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'API Integration & Interfaces | Wetzlar Hesse | Coday'
      : 'API Integration & Schnittstellen | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Seamless API integrations and interface development by Coday in Wetzlar. We connect your systems reliably and efficiently. For businesses in Hesse.'
      : 'Nahtlose API Integrationen und Schnittstellenentwicklung von Coday in Wetzlar. Wir verbinden Ihre Systeme zuverlässig und effizient. Für Firmen in Hessen.';
  const isEn = _locale === 'en';
  return (
    <>
      <script
        id="schema-api-integration"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/development/api-integration`,
              }),
            ],
          }),
        }}
      />
      <ApiIntegrationClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {isEn
            ? 'Custom API Integrations and Interface Development for Your Business'
            : 'Maßgeschneiderte API-Integrationen für Ihr Unternehmen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {isEn ? (
            <>
              <p>
                Welcome to Coday, your specialist for seamless API integrations and custom interface
                development in Wetzlar, Hesse. In today's digital business landscape, smooth
                communication between different software systems, databases, and cloud services is a
                critical success factor. Isolated data silos and manual data transfers are not only
                time-consuming but also highly error-prone. This is exactly where our professional
                API integration services come in. We connect your existing IT infrastructures
                efficiently and securely to automate your business processes, improve data
                consistency, and ultimately boost your productivity. As a dedicated web agency based
                in Wetzlar, we serve businesses throughout Hesse and across Germany with reliable,
                enterprise-grade interface solutions tailored to real-world requirements.
              </p>
              <p>
                Our experienced development team brings deep expertise in working with a wide range
                of protocols and architectural styles, including REST, GraphQL, SOAP, and Webhooks.
                We reliably integrate third-party systems such as ERP solutions, CRM platforms like
                Salesforce and HubSpot, payment service providers, marketing automation tools, and
                e-commerce systems into your existing website or web application. Security,
                scalability, and performance are our highest priorities at every stage of
                development. Every interface we build undergoes rigorous testing to guarantee
                error-free data transmission and optimal protection of sensitive business and
                customer data. Whether you need a single point-to-point integration or a
                comprehensive middleware layer connecting dozens of services, Coday in Wetzlar
                delivers interfaces that work flawlessly from day one.
              </p>
              <p>
                Beyond connecting existing systems, we also develop custom APIs that allow you to
                securely expose your own data and services to partners, customers, or internal
                applications. We design clean, well-documented, and developer-friendly interfaces
                that fit seamlessly into modern software ecosystems. From initial strategic planning
                and architecture analysis through implementation and deployment to continuous
                monitoring and maintenance — we guide you holistically through the entire
                integration process. Our API documentation follows OpenAPI standards, making it
                straightforward for external developers and partners in Hesse and beyond to consume
                your interfaces without friction or ambiguity.
              </p>
              <p>
                Trust in our technical excellence and extensive experience in delivering complex
                backend projects for businesses in Central Hesse and beyond. With our API solutions,
                we make your company future-proof, agile, and ready for the challenges of digital
                transformation. Contact Coday in Wetzlar today to learn more about our API
                integration services. Together, we will analyze your system landscape and develop an
                integration strategy perfectly tailored to your individual business requirements.
                Whether you are modernizing legacy interfaces or building entirely new connections
                between cloud-native services, our team delivers scalable, secure, and maintainable
                solutions that grow alongside your enterprise.
              </p>
            </>
          ) : (
            <>
              <p>
                Willkommen bei Coday, Ihrem Experten für nahtlose API-Integrationen und die
                Entwicklung maßgeschneiderter Schnittstellen in Wetzlar und ganz Hessen. In der
                modernen digitalen Geschäftswelt ist die reibungslose Kommunikation zwischen
                verschiedenen Software-Systemen, Datenbanken und Cloud-Diensten ein entscheidender
                Erfolgsfaktor. Isolierte Datensilos und manuelle Datenübertragungen kosten nicht nur
                wertvolle Zeit, sondern sind auch extrem fehleranfällig. Genau hier setzen unsere
                professionellen Integrationsdienstleistungen an. Wir verbinden Ihre bestehenden
                IT-Infrastrukturen effizient und sicher, um Ihre Geschäftsprozesse zu
                automatisieren, die Datenkonsistenz zu erhöhen und letztendlich Ihre Produktivität
                signifikant zu steigern.
              </p>
              <p>
                Unser erfahrenes Entwicklerteam verfügt über tiefgreifendes Know-how in der Arbeit
                mit einer Vielzahl von Protokollen und Architekturstilen, darunter REST, GraphQL,
                SOAP und Webhooks. Wir integrieren zuverlässig Drittanbieter-Systeme wie
                ERP-Lösungen, CRM-Plattformen (z.B. Salesforce, HubSpot), Zahlungsdienstleister,
                Marketing-Automatisierungstools und E-Commerce-Systeme in Ihre bestehende Website
                oder Web-Applikation. Dabei legen wir höchsten Wert auf Sicherheit, Skalierbarkeit
                und Performance. Jede von uns entwickelte Schnittstelle wird strengen Tests
                unterzogen, um eine fehlerfreie Datenübertragung und den optimalen Schutz sensibler
                Unternehmens- und Kundendaten zu garantieren.
              </p>
              <p>
                Darüber hinaus bieten wir die Entwicklung individueller, maßgeschneiderter APIs an,
                mit denen Sie Ihre eigenen Daten und Services sicher für Partner, Kunden oder andere
                interne Anwendungen bereitstellen können. Wir konzipieren saubere, gut dokumentierte
                und entwicklerfreundliche Schnittstellen, die sich nahtlos in moderne
                Software-Ökosysteme einfügen. Von der ersten strategischen Planung und
                Architektur-Analyse über die eigentliche Programmierung bis hin zum kontinuierlichen
                Monitoring und Wartungsservice – wir begleiten Sie ganzheitlich durch den gesamten
                Integrationsprozess.
              </p>
              <p>
                Vertrauen Sie auf unsere technische Exzellenz und unsere langjährige Erfahrung in
                der Realisierung komplexer Backend-Projekte für Unternehmen in Mittelhessen und
                darüber hinaus. Mit unseren API-Lösungen machen wir Ihr Unternehmen zukunftssicher,
                agil und bereit für die Herausforderungen der digitalen Transformation. Kontaktieren
                Sie uns noch heute, um mehr über unsere Leistungen im Bereich API-Integration zu
                erfahren. Gemeinsam analysieren wir Ihre Systemlandschaft und entwickeln eine
                Integrationsstrategie, die perfekt auf Ihre individuellen geschäftlichen
                Anforderungen zugeschnitten ist.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
