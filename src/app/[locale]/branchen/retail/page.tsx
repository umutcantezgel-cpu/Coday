import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import RetailClient from '@/features/industries/ui/RetailClient';
import { setRequestLocale } from 'next-intl/server';
import {
  getOrganizationSchema,
  getServiceSchema,
  getBreadcrumbSchema,
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
      title: 'Web Design for Retail & Shops | Wetzlar Hesse',
      description:
        'Boost your retail sales with modern online shops and websites. Benefit from tailored e-commerce solutions crafted in Hesse.',
      path: '/en/branchen/retail',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Einzelhandel & Shops | Wetzlar',
    description:
      'Steigern Sie Ihre Umsätze im Einzelhandel mit modernen Onlineshops und Webseiten. Profitieren Sie von passgenauen E-Commerce-Lösungen aus Hessen.',
    path: '/de/branchen/retail',
    type: 'money',
  });
}

export default async function RetailPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Retail & Shops | Wetzlar Hesse | Coday'
      : 'Webdesign für Einzelhandel & Shops | Wetzlar | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Online shops and websites for retail in Wetzlar and Hesse. More revenue through professional web design and e-commerce solutions by Coday from Wetzlar.'
      : 'Onlineshops und Webseiten für den Einzelhandel in Wetzlar und Hessen. Mehr Umsatz durch professionelles Webdesign und E-Commerce Lösungen von Coday.';
  return (
    <>
      <script
        id="schema-branchen-retail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getBreadcrumbSchema([
                { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
                { name: _locale === 'en' ? 'Industries' : 'Branchen', url: `/${_locale}/branchen` },
                {
                  name: _locale === 'en' ? 'Retail' : 'Einzelhandel',
                  url: `/${_locale}/branchen/retail`,
                },
              ]),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/retail`,
              }),
            ],
          }),
        }}
      />
      <RetailClient />

      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {locale === 'de' ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Modernes Webdesign für Einzelhandel und Shops in Wetzlar
            </h2>
            <p className="mb-4 leading-relaxed">
              Der Einzelhandel in Wetzlar und Hessen erlebt eine grundlegende Veränderung im
              Kaufverhalten. Kundinnen und Kunden informieren sich heute online, bevor sie ein
              Geschäft betreten – sie vergleichen Preise, lesen Bewertungen und erwarten ein
              nahtloses Einkaufs­erlebnis über alle Kanäle hinweg. Für lokale Shops, Boutiquen,
              Fachgeschäfte und Filialisten ist eine professionelle Webseite daher unverzichtbar
              geworden. Coday entwickelt als Webdesign-Agentur in Wetzlar maßgeschneiderte digitale
              Lösungen für den Einzelhandel, die Ihre Marke online genauso überzeugend präsentieren
              wie in Ihrem stationären Geschäft. Ob eleganter Onlineshop, informative
              Produktwebseite oder hybrides Omnichannel-Konzept – wir gestalten Webauftritte, die
              Besucher begeistern und in zahlende Kunden verwandeln. Dabei verbinden wir
              ansprechendes Design mit durchdachter Benutzerführung, schnellen Ladezeiten und einer
              technischen Basis, die mit Ihrem Geschäft mitwächst.
            </p>
            <p className="mb-4 leading-relaxed">
              Ein erfolgreicher Onlineshop für den Einzelhandel benötigt weit mehr als nur eine
              Produktliste mit Warenkorb. Coday konzipiert E-Commerce-Lösungen, die den gesamten
              Kaufprozess optimieren: von der intelligenten Produktsuche über übersichtliche
              Kategorieseiten bis hin zu einem reibungslosen Checkout-Prozess. Für Einzelhändler in
              Wetzlar und der Region bieten wir die Integration bewährter Shop-Systeme sowie die
              Anbindung an bestehende Warenwirtschaftssysteme und Kassenlösungen. So bleibt Ihr
              Bestand stets synchron – online wie im Laden. Besonders für den stationären Handel
              sind Funktionen wie Click &amp; Collect, Filialverfügbarkeit und lokale Lieferoptionen
              wichtige Differenzierungsmerkmale. Coday implementiert diese Funktionen nahtlos in
              Ihre Webseite, sodass Ihre Kunden die Bequemlichkeit des Online-Shoppings mit der
              persönlichen Beratung vor Ort verbinden können.
            </p>
            <p className="mb-4 leading-relaxed">
              Die lokale Sichtbarkeit ist für den Einzelhandel in Wetzlar und Hessen ein
              entscheidender Erfolgsfaktor. Wenn potenzielle Kunden nach „Geschäft in Wetzlar",
              „Boutique Altstadt" oder „Fachgeschäft in meiner Nähe" suchen, muss Ihr Unternehmen an
              prominenter Stelle erscheinen. Coday optimiert Ihre Shop-Webseite gezielt für lokale
              Suchanfragen und stellt sicher, dass Ihre Google-Sichtbarkeit, strukturierte Daten und
              Kundenbewertungen ein stimmiges Gesamtbild erzeugen. Wir erstellen ansprechende
              Landingpages für Ihre Produktkategorien, optimieren Bilder und Metadaten für
              Suchmaschinen und sorgen dafür, dass Ihre Webseite auf allen Geräten einwandfrei
              funktioniert. Ergänzend beraten wir Sie zur Anbindung an lokale Plattformen und
              Marktplätze, die Ihre Reichweite im regionalen Einzelhandel nachhaltig steigern
              können.
            </p>
            <p className="mb-4 leading-relaxed">
              Als Solo-Agentur in Wetzlar versteht Coday die Realität des Einzelhandels: knappe
              Budgets, saisonale Schwankungen und der ständige Wettbewerb mit großen
              Online-Plattformen. Genau deshalb setzen wir auf Lösungen, die wirtschaftlich
              sinnvoll, wartungsarm und langfristig skalierbar sind. Jede Einzelhandels-Webseite
              wird individuell gestaltet – keine austauschbaren Templates, kein Einheitslook. Von
              der strategischen Beratung über das visuelle Konzept bis zur technischen Umsetzung mit
              modernsten Webtechnologien erhalten Sie alles aus einer Hand. Ob Sie eine
              traditionsreiche Buchhandlung in der Wetzlarer Altstadt betreiben, ein Modegeschäft
              mit Onlineshop aufbauen oder als Feinkost-Händler Ihre Spezialitäten regional
              vermarkten möchten: Coday ist Ihr Partner für Webdesign im Einzelhandel, das Kunden
              gewinnt und Ihren Umsatz nachhaltig steigert. Kontaktieren Sie uns noch heute für ein
              unverbindliches Beratungsgespräch und erfahren Sie, wie Ihr Shop online durchstarten
              kann.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-secondary-900">
              Modern Web Design for Retail and Shops in Wetzlar
            </h2>
            <p className="mb-4 leading-relaxed">
              The retail landscape in Wetzlar and Hesse is experiencing a fundamental shift in
              consumer behaviour. Today&apos;s customers research online before stepping into a
              store – they compare prices, read reviews, and expect a seamless shopping experience
              across every channel. For local shops, boutiques, specialty stores, and retail chains,
              a professional website has become indispensable. As a web design agency based in
              Wetzlar, Coday develops tailor-made digital solutions for retail that present your
              brand online just as compellingly as in your physical store. Whether you need an
              elegant online shop, an informative product website, or a hybrid omnichannel concept,
              we create web presences that captivate visitors and convert them into paying
              customers. We combine attractive design with intuitive navigation, fast loading times,
              and a technical foundation that scales with your business.
            </p>
            <p className="mb-4 leading-relaxed">
              A successful online shop for retail requires far more than a product list with a
              shopping cart. Coday designs e-commerce solutions that optimize the entire purchasing
              journey: from intelligent product search and well-organized category pages to a
              frictionless checkout process. For retailers in Wetzlar and the surrounding region, we
              offer integration with proven shop systems as well as connections to existing
              inventory management and point-of-sale solutions. This keeps your stock synchronized
              in real time – online and in-store. Features such as Click &amp; Collect, store
              availability checks, and local delivery options are especially important
              differentiators for brick-and-mortar retailers. Coday implements these capabilities
              seamlessly into your website, enabling your customers to combine the convenience of
              online shopping with the personal advice they receive in your physical store.
            </p>
            <p className="mb-4 leading-relaxed">
              Local visibility is a decisive success factor for retail businesses in Wetzlar and
              Hesse. When potential customers search for &quot;shop in Wetzlar,&quot; &quot;boutique
              old town,&quot; or &quot;specialty store near me,&quot; your business needs to appear
              prominently. Coday optimizes your shop website specifically for local search queries,
              ensuring that your Google visibility, structured data, and customer reviews create a
              coherent overall impression. We create compelling landing pages for your product
              categories, optimize images and metadata for search engines, and guarantee your
              website performs flawlessly across all devices. Additionally, we advise you on
              connecting to local platforms and marketplaces that can sustainably increase your
              reach in regional retail.
            </p>
            <p className="mb-4 leading-relaxed">
              As a solo agency in Wetzlar, Coday understands the reality of retail: tight budgets,
              seasonal fluctuations, and constant competition from large online platforms. That is
              exactly why we focus on solutions that are economically sensible, low-maintenance, and
              scalable over the long term. Every retail website is individually designed – no
              interchangeable templates, no one-size-fits-all look. From strategic consulting and
              visual concept through to technical implementation with cutting-edge web technologies,
              you receive everything from a single source. Whether you run a time-honoured bookshop
              in Wetzlar&apos;s old town, are building a fashion store with an online shop, or want
              to market your gourmet specialties regionally as a fine food retailer, Coday is your
              partner for retail web design that wins customers and sustainably grows your revenue.
              Contact us today for a free consultation and discover how your shop can thrive online.
            </p>
          </>
        )}
      </section>
    </>
  );
}
