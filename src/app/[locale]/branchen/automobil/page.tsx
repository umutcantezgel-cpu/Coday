import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
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
      title: 'Web Design for the Automotive Industry | Wetzlar',
      description:
        'Websites and digital solutions for car dealerships, workshops and automotive businesses in Wetzlar and Hesse. Premium web design by Coday. Get in touch.',
      path: `/en/branchen/automobil`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für die Automobilbranche | Wetzlar',
    description:
      'Websites und digitale Lösungen für Autohäuser, Werkstätten und KFZ-Betriebe in Wetzlar und Hessen. Premium Webdesign von Coday. Jetzt Termin buchen.',
    path: `/de/branchen/automobil`,
    type: 'money',
  });
}

export default async function AutomobilHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const pageUrl = `${BASE_URL}/${_locale}/branchen/automobil`;
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for the Automotive Industry | Wetzlar | Coday'
      : 'Webdesign für die Automobilbranche | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Websites and digital solutions for car dealerships, workshops and automotive businesses in Wetzlar and Hesse. Premium web design by Coday. Get in touch.'
      : 'Websites und digitale Lösungen für Autohäuser, Werkstätten und KFZ-Betriebe in Wetzlar und Hessen. Premium Webdesign von Coday. Jetzt Termin buchen.';
  return (
    <>
      <script
        id="schema-branchen-automobil"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // Organization lives in the root layout head and is shared by all pages.
            '@graph': [
              getBreadcrumbSchema(
                [
                  { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                  {
                    name: _locale === 'en' ? 'Industries' : 'Branchen',
                    url: `/${_locale}/branchen`,
                  },
                  {
                    name: _locale === 'en' ? 'Automotive' : 'Automobil & KFZ',
                    url: `/${_locale}/branchen/automobil`,
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
                  _locale === 'en'
                    ? 'Car dealerships, workshops and automotive businesses'
                    : 'Autohäuser, Werkstätten und KFZ-Betriebe',
                name:
                  _locale === 'en'
                    ? 'Car dealerships, workshops and automotive businesses'
                    : 'Autohäuser, Werkstätten und KFZ-Betriebe',
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
      <IndustryDetailClient industrySlug="automobil" />
      <IndustryToolEmbed industryKey="automobil" theme="light" />

      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {locale === 'de' ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Professionelles Webdesign für die Automobilbranche in Wetzlar und Hessen
            </h2>
            <p className="mb-4 leading-relaxed">
              Die Automobilbranche steht vor einem tiefgreifenden digitalen Wandel. Ob Autohaus,
              freie Werkstatt, KFZ-Sachverständiger oder Fahrzeughändler – eine professionelle
              Webpräsenz ist heute kein optionaler Luxus mehr, sondern ein entscheidender
              Wettbewerbsfaktor. In Wetzlar und der gesamten Region Mittelhessen suchen Kundinnen
              und Kunden längst online nach ihrem nächsten Fahrzeug, einem zuverlässigen
              Werkstattservice oder einem Termin zur Hauptuntersuchung. Coday entwickelt als
              spezialisierte Webdesign-Agentur in Wetzlar maßgeschneiderte digitale Lösungen, die
              exakt auf die Anforderungen der Automobilbranche zugeschnitten sind. Vom responsiven
              Fahrzeugkatalog über integrierte Terminbuchungssysteme bis hin zu lokaler
              Suchmaschinenoptimierung sorgen wir dafür, dass Ihr Betrieb dort sichtbar wird, wo
              Ihre Kunden tatsächlich suchen – bei Google, auf dem Smartphone und in den sozialen
              Medien.
            </p>
            <p className="mb-4 leading-relaxed">
              Ein modernes Autohaus-Webdesign geht weit über die reine Darstellung von Fahrzeugen
              hinaus. Es verbindet ansprechende Bildwelten mit einem durchdachten Nutzererlebnis,
              das Besucher gezielt zu Probefahrt-Anfragen, Werkstatt-Terminen oder
              Finanzierungsangeboten führt. Coday realisiert für Autohäuser in Wetzlar und Umgebung
              Webseiten, die den gesamten Kundenlebenszyklus digital abbilden: von der ersten
              Recherche über die Fahrzeugkonfiguration bis zum After-Sales-Service. Dabei setzen wir
              auf schnelle Ladezeiten, mobiloptimiertes Design und barrierefreie Bedienung –
              Faktoren, die nicht nur Ihre Besucher überzeugen, sondern auch Google positiv
              bewerten. Durch die Integration von Fahrzeugbörsen-Schnittstellen,
              Bewertungsplattformen und CRM-Anbindungen wird Ihre Webseite zum zentralen
              Vertriebsinstrument Ihres Autohauses.
            </p>
            <p className="mb-4 leading-relaxed">
              Für freie Werkstätten und KFZ-Betriebe in Wetzlar und Hessen ist lokales Webdesign mit
              gezielter Suchmaschinenoptimierung besonders wertvoll. Wenn potenzielle Kunden nach
              „Werkstatt in der Nähe", „Reifenwechsel Wetzlar" oder „HU Gießen" suchen, entscheidet
              die Online-Sichtbarkeit über den nächsten Auftrag. Coday optimiert Ihre Webseite
              gezielt für diese lokalen Suchanfragen und sorgt dafür, dass Ihr
              Google-Unternehmensprofil, Ihre Webseite und Ihre Bewertungen ein konsistentes,
              vertrauenswürdiges Bild ergeben. Unsere Werkstatt-Webseiten bieten integrierte
              Online-Terminbuchung, übersichtliche Leistungsbeschreibungen und Kundenbewertungen,
              die Vertrauen schaffen. So gewinnen Sie neue Kunden, ohne auf teure Printanzeigen oder
              Vermittlungsportale angewiesen zu sein.
            </p>
            <p className="mb-4 leading-relaxed">
              Was Coday als Webdesign-Agentur für die Automobilbranche in Wetzlar auszeichnet, ist
              die Verbindung aus technischer Exzellenz und tiefem Branchenverständnis. Als
              Solo-Agentur mit Fokus auf Qualität statt Masse bieten wir persönliche Betreuung,
              kurze Kommunikationswege und Ergebnisse, die messbar sind. Jede Webseite wird
              individuell konzipiert – keine Templates, kein Massenprodukt. Von der strategischen
              Beratung über das visuelle Design bis zur technischen Umsetzung mit modernsten
              Webtechnologien erhalten Sie alles aus einer Hand. Ob Sie ein etabliertes Autohaus in
              Wetzlar betreiben, eine Werkstattkette in Hessen aufbauen oder als Fahrzeugaufbereiter
              lokal sichtbar werden möchten: Coday ist Ihr Partner für Webdesign, das Kunden gewinnt
              und Ihr Geschäft nachhaltig stärkt. Vereinbaren Sie noch heute ein unverbindliches
              Beratungsgespräch und entdecken Sie, wie eine professionelle Webpräsenz Ihren Betrieb
              in der Automobilbranche voranbringt.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Professional Web Design for the Automotive Industry in Wetzlar and Hesse
            </h2>
            <p className="mb-4 leading-relaxed">
              The automotive industry is undergoing a profound digital transformation. Whether you
              operate a car dealership, an independent repair shop, a vehicle inspection service, or
              a used car business, a professional web presence is no longer an optional luxury – it
              is a decisive competitive advantage. In Wetzlar and across the greater Hesse region,
              customers search online for their next vehicle, reliable workshop services, or a
              convenient appointment for their annual inspection. Coday, a specialized web design
              agency based in Wetzlar, develops tailor-made digital solutions engineered precisely
              for the needs of the automotive sector. From responsive vehicle catalogues and
              integrated booking systems to local search engine optimization, we ensure your
              business appears exactly where your customers are looking – on Google, on mobile
              devices, and across social media platforms.
            </p>
            <p className="mb-4 leading-relaxed">
              Modern automotive web design goes far beyond simply listing vehicles on a page. It
              combines compelling visual storytelling with a thoughtfully designed user experience
              that guides visitors toward test drive requests, workshop appointments, or financing
              inquiries. For car dealerships in Wetzlar and surrounding areas, Coday builds websites
              that digitally map the entire customer lifecycle: from initial research and vehicle
              configuration through to after-sales service. We prioritize fast loading times,
              mobile-optimized layouts, and accessible navigation – factors that not only impress
              your visitors but also earn positive signals from Google. By integrating vehicle
              marketplace APIs, review platforms, and CRM connections, your website becomes the
              central sales instrument of your dealership.
            </p>
            <p className="mb-4 leading-relaxed">
              For independent workshops and automotive businesses in Wetzlar and Hesse, local web
              design combined with targeted search engine optimization is especially valuable. When
              potential customers search for &quot;workshop near me,&quot; &quot;tire change
              Wetzlar,&quot; or &quot;car inspection Giessen,&quot; your online visibility
              determines whether you win the next job. Coday optimizes your website specifically for
              these local search queries, ensuring your Google Business Profile, website content,
              and customer reviews present a consistent, trustworthy image. Our workshop websites
              feature integrated online appointment scheduling, clear service descriptions, and
              prominently displayed customer testimonials that build confidence. This approach helps
              you attract new customers without relying on expensive print advertising or
              third-party referral portals.
            </p>
            <p className="mb-4 leading-relaxed">
              What sets Coday apart as a web design agency for the automotive industry in Wetzlar is
              the combination of technical excellence and deep industry understanding. As a solo
              agency focused on quality over volume, we offer personal attention, direct
              communication, and results that are measurable. Every website is individually
              conceived – no templates, no mass-produced solutions. From strategic consulting and
              visual design through to technical implementation with cutting-edge web technologies,
              you receive everything from a single source. Whether you run an established car
              dealership in Wetzlar, are building a workshop chain across Hesse, or want to increase
              local visibility as a vehicle detailing specialist, Coday is your partner for web
              design that wins customers and sustainably strengthens your business. Schedule a free
              consultation today and discover how a professional web presence can drive your
              automotive business forward.
            </p>
          </>
        )}
      </section>
    </>
  );
}
