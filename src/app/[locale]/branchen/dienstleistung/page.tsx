import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import DienstleistungClient from '@/features/industries/ui/DienstleistungClient';
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
      title: 'Web Design for Service Providers | Wetzlar Hesse',
      description:
        'High-quality web design for service providers in Wetzlar and Hesse. Gain more clients online as a consultant or broker. Contact us today.',
      path: '/en/branchen/dienstleistung',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Dienstleister | Wetzlar & Hessen',
    description:
      'Hochwertiges Webdesign für Dienstleister in Wetzlar und ganz Hessen. Gewinnen Sie als Berater oder Makler neue Kunden online. Sprechen Sie uns an.',
    path: '/de/branchen/dienstleistung',
    type: 'money',
  });
}

export default async function DienstleistungPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const pageUrl = `${BASE_URL}/${_locale}/branchen/dienstleistung`;
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Service Providers | Wetzlar Hesse | Coday'
      : 'Webdesign für Dienstleister | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for service providers in Wetzlar and Hesse. Tax advisors, brokers and consultants win more clients online. Get started today.'
      : 'Professionelle Webseiten für Dienstleister in Wetzlar und Hessen. Steuerberater, Makler und Berater gewinnen online mehr Kunden. Jetzt starten.';
  return (
    <>
      <script
        id="schema-branchen-dienstleistung"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // Organization node omitted on purpose — the root layout renders it globally.
            '@graph': [
              getBreadcrumbSchema(
                [
                  { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                  {
                    name: _locale === 'en' ? 'Industries' : 'Branchen',
                    url: `/${_locale}/branchen`,
                  },
                  {
                    name: _locale === 'en' ? 'Service Providers' : 'Dienstleister',
                    url: `/${_locale}/branchen/dienstleistung`,
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
                audienceType: _locale === 'en' ? 'Service Providers' : 'Dienstleister',
                name: _locale === 'en' ? 'Service Providers' : 'Dienstleister',
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
      <DienstleistungClient />

      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {locale === 'de' ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Überzeugendes Webdesign für Dienstleister in Wetzlar und Hessen
            </h2>
            <p className="mb-4 leading-relaxed">
              Für Dienstleister in Wetzlar und Hessen ist eine professionelle Webseite heute das
              wichtigste Instrument der Kundengewinnung. Ob Steuerberater, Versicherungsmakler,
              Unternehmensberater, Handwerker, Friseur oder Fitnesstrainer – Ihre potenziellen
              Kunden suchen online nach genau den Leistungen, die Sie anbieten. Dabei entscheiden
              der erste Eindruck Ihrer Webseite und Ihre Sichtbarkeit bei Google darüber, ob ein
              Interessent zum Kunden wird oder zur Konkurrenz wechselt. Coday entwickelt als
              spezialisierte Webdesign-Agentur in Wetzlar maßgeschneiderte Webauftritte für
              Dienstleister, die Vertrauen schaffen, Kompetenz vermitteln und Anfragen generieren.
              Wir verstehen, dass jede Branche eigene Anforderungen hat: Ein Steuerberater benötigt
              andere Vertrauenssignale als ein Personal Trainer, und ein Architekturbüro
              kommuniziert anders als eine Reinigungsfirma. Deshalb konzipieren wir jede Webseite
              individuell, basierend auf Ihrer Zielgruppe, Ihrem Leistungsportfolio und Ihren
              Geschäftszielen.
            </p>
            <p className="mb-4 leading-relaxed">
              Ein zentrales Element erfolgreicher Dienstleister-Webseiten ist die Integration
              intelligenter Buchungssysteme. In einer Welt, in der Kunden rund um die Uhr Termine
              buchen möchten, bieten Online-Terminbuchungen einen enormen Wettbewerbsvorteil. Coday
              integriert leistungs­fähige Buchungslösungen direkt in Ihre Webseite, die sich nahtlos
              mit Ihrem Kalender synchronisieren und automatische Erinnerungen versenden. Für
              Dienstleister in Wetzlar bedeutet das weniger Telefonzeit, weniger No-Shows und mehr
              Zeit für das, was wirklich zählt: Ihre eigentliche Arbeit. Darüber hinaus gestalten
              wir überzeugende Leistungsseiten, die Ihre Expertise klar strukturiert darstellen,
              häufige Kundenfragen beantworten und mit aussagekräftigen Referenzen untermauern. Jede
              Seite wird so aufgebaut, dass sie sowohl Besucher als auch Suchmaschinen überzeugt.
            </p>
            <p className="mb-4 leading-relaxed">
              Vertrauensaufbau ist für Dienstleister in Wetzlar und Hessen der Schlüssel zum Erfolg.
              Anders als im Einzelhandel, wo ein Produkt für sich spricht, müssen Dienstleister ihre
              Kompetenz und Zuverlässigkeit glaubhaft kommunizieren – bevor der Kunde sie je
              persönlich erlebt hat. Coday setzt gezielt auf Vertrauenssignale im Webdesign:
              prominente Kundenbewertungen, nachvollziehbare Referenzprojekte, transparente
              Preisgestaltung und professionelle Teamdarstellungen. Wir optimieren Ihre Webseite für
              lokale Suchanfragen wie „Steuerberater Wetzlar", „Maler in meiner Nähe" oder
              „Physiotherapie Gießen" und sorgen dafür, dass Ihr Google-Unternehmensprofil
              konsistent mit Ihrer Webseite auftritt. Diese lokale Suchmaschinenoptimierung ist
              gerade für Dienstleister unverzichtbar, denn Ihre Kunden kommen aus der Region und
              suchen gezielt nach Anbietern in ihrer Umgebung.
            </p>
            <p className="mb-4 leading-relaxed">
              Als Solo-Agentur in Wetzlar bietet Coday Dienstleistern genau die persönliche
              Betreuung, die sie von einer Webagentur erwarten dürfen: direkte Kommunikation, tiefes
              Verständnis für Ihr Geschäftsmodell und Lösungen, die wirtschaftlich sinnvoll sind.
              Wir setzen auf modernste Webtechnologien, die schnelle, sichere und wartungsarme
              Webseiten ermöglichen – ohne aufgeblähte Systeme oder versteckte laufende Kosten.
              Jeder Dienstleister-Webauftritt wird von Grund auf individuell gestaltet: kein
              Template-Design, keine generischen Texte, keine austauschbare Optik. Von der
              Strategieberatung über das visuelle Konzept bis zur technischen Realisierung erhalten
              Sie alles aus einer Hand. Ob Sie als Rechtsanwalt in Wetzlar Mandanten gewinnen, als
              Coach in Hessen Ihre Reichweite ausbauen oder als Gebäudereiniger lokal sichtbar
              werden möchten: Coday ist Ihr Partner für Webdesign, das Dienstleister voranbringt.
              Vereinbaren Sie jetzt ein kostenloses Erstgespräch und erfahren Sie, wie eine
              professionelle Webpräsenz Ihr Geschäft in Wetzlar und Hessen nachhaltig stärkt.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Compelling Web Design for Service Providers in Wetzlar and Hesse
            </h2>
            <p className="mb-4 leading-relaxed">
              For service providers in Wetzlar and Hesse, a professional website is today&apos;s
              most important tool for winning new clients. Whether you are a tax advisor, insurance
              broker, management consultant, tradesperson, hairdresser, or fitness trainer, your
              potential customers search online for exactly the services you offer. The first
              impression your website makes and your visibility on Google determine whether a
              prospect becomes a client or turns to a competitor. Coday, a specialized web design
              agency in Wetzlar, develops tailor-made web presences for service providers that build
              trust, convey expertise, and generate enquiries. We understand that every industry has
              its own requirements: a tax advisor needs different trust signals than a personal
              trainer, and an architecture firm communicates differently from a cleaning company.
              That is why we design every website individually, based on your target audience,
              service portfolio, and business objectives.
            </p>
            <p className="mb-4 leading-relaxed">
              A central element of successful service provider websites is the integration of
              intelligent booking systems. In a world where clients expect to book appointments
              around the clock, online scheduling provides a significant competitive advantage.
              Coday integrates powerful booking solutions directly into your website that
              synchronize seamlessly with your calendar and send automatic reminders. For service
              providers in Wetzlar, this means less time on the phone, fewer no-shows, and more time
              for what truly matters: your actual work. Beyond booking, we design compelling service
              pages that present your expertise in a clearly structured manner, answer common client
              questions, and support claims with meaningful references and case studies. Every page
              is architected to convince both visitors and search engines alike.
            </p>
            <p className="mb-4 leading-relaxed">
              Building trust is the key to success for service providers in Wetzlar and Hesse.
              Unlike retail, where a product speaks for itself, service providers must credibly
              communicate their competence and reliability before a client ever meets them in
              person. Coday strategically deploys trust signals throughout your web design:
              prominent customer reviews, verifiable reference projects, transparent pricing
              structures, and professional team presentations. We optimize your website for local
              search queries such as &quot;tax advisor Wetzlar,&quot; &quot;painter near me,&quot;
              or &quot;physiotherapy Giessen&quot; and ensure your Google Business Profile is
              consistent with your website content. This local search engine optimization is
              essential for service providers because your clients come from the region and
              specifically search for providers in their vicinity.
            </p>
            <p className="mb-4 leading-relaxed">
              As a solo agency in Wetzlar, Coday offers service providers exactly the personal
              attention they deserve from a web agency: direct communication, deep understanding of
              your business model, and solutions that are economically sound. We use cutting-edge
              web technologies that enable fast, secure, and low-maintenance websites – without
              bloated systems or hidden recurring costs. Every service provider website is designed
              from the ground up as a unique creation: no template designs, no generic copy, no
              interchangeable aesthetics. From strategic consulting and visual concept through to
              technical implementation, you receive everything from a single source. Whether you
              want to attract clients as a lawyer in Wetzlar, expand your reach as a coach across
              Hesse, or increase local visibility as a building services provider, Coday is your
              partner for web design that moves service providers forward. Schedule a free initial
              consultation now and discover how a professional web presence can sustainably
              strengthen your business in Wetzlar and Hesse.
            </p>
          </>
        )}
      </section>
    </>
  );
}
