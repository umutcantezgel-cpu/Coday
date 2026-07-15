import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { EcommerceDevelopmentClient } from '@/features/services/ui/EcommerceDevelopmentClient';
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
      title: 'E-Commerce Shop Development | Wetzlar & Hesse',
      description:
        'Professional e-commerce and online shop development by Coday in Wetzlar. High performance and conversion rates for your business in Hesse. Get in touch.',
      path: '/en/services/ecommerce-development',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Onlineshop erstellen lassen | Wetzlar & Hessen',
    description:
      'Professionelle E-Commerce und Onlineshop Entwicklung von Coday in Wetzlar. Hohe Performance und Konversionsraten für Ihr Geschäft in Hessen. Anfragen.',
    path: '/de/services/ecommerce-development',
    type: 'money',
  });
}

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'E-Commerce Shop Development | Wetzlar & Hesse | Coday'
      : 'Onlineshop erstellen lassen | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional e-commerce and online shop development by Coday in Wetzlar. High performance and conversion rates for your business in Hesse. Get in touch.'
      : 'Professionelle E-Commerce und Onlineshop Entwicklung von Coday in Wetzlar. Hohe Performance und Konversionsraten für Ihr Geschäft in Hessen. Anfragen.';
  return (
    <>
      <script
        id="schema-ecommerce"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/services/ecommerce-development`,
              }),
            ],
          }),
        }}
      />
      <EcommerceDevelopmentClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Professional E-Commerce Development for Maximum Revenue'
            : 'Professionelle E-Commerce-Entwicklung für maximalen Umsatz'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? "Creating a successful online shop requires far more than simply adding a shopping cart to an existing website. Professional e-commerce development is a complex discipline that combines deep technical expertise, a sharp understanding of User Experience (UX), and a strategic focus on Conversion Rate Optimization (CRO). In today's digital economy, where online retail is growing continuously, a high-performance, secure, and intuitively navigable web shop is essential to compete effectively and generate sustainable growth. Customers expect a seamless, fast, and error-free shopping experience from product search to checkout. Every click, every load time, and every design element must be engineered to strengthen buyer confidence and make the purchase process as effortless as possible. If you want to create an online shop that truly drives revenue, you need a development partner who understands both the technical foundations and the commercial strategy behind every design decision."
              : 'Wenn Sie einen Onlineshop erstellen lassen möchten, der wirklich Umsatz generiert, benötigen Sie weit mehr als nur das Hinzufügen eines Warenkorbs zu einer bestehenden Webseite. Professionelle E-Commerce-Entwicklung ist eine komplexe Disziplin, die tiefgreifendes technisches Know-how, ein scharfes Verständnis für User Experience (UX) und eine strategische Ausrichtung auf Conversion-Optimierung (CRO) vereint. In der heutigen digitalen Wirtschaft, in der der Online-Handel kontinuierlich wächst, ist ein leistungsstarker, sicherer und intuitiv bedienbarer Webshop unerlässlich, um sich gegen die Konkurrenz zu behaupten und nachhaltiges Wachstum zu generieren. Kunden erwarten einen reibungslosen, schnellen und fehlerfreien Einkaufsprozess von der Produktsuche bis zum Checkout. Jeder Klick, jede Ladezeit und jedes Designelement muss darauf ausgelegt sein, das Vertrauen des Käufers zu stärken und den Kaufabschluss so einfach wie möglich zu gestalten.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'A decisive factor in online shop development is the technical architecture. A scalable infrastructure ensures that your shop remains performant and stable even under high traffic — for example, during seasonal sales events like Black Friday or holiday promotions. Modern headless commerce approaches, where frontend and backend are decoupled, offer maximum flexibility and speed while enabling seamless integration with third-party services such as payment providers, inventory management, and marketing automation platforms. Additionally, search engine optimization (SEO) plays a central role. An online shop must be visible for relevant search queries. This requires clean, semantic code, structured data markup (Schema.org), optimized product descriptions, and extremely fast load times, since page performance is a direct ranking factor for Google. At Coday in Wetzlar, we build online shops on modern tech stacks like Next.js and React, ensuring your store meets the highest performance standards from day one.'
              : 'Ein entscheidender Faktor, wenn Sie einen Onlineshop erstellen lassen, ist die technische Architektur. Eine skalierbare Infrastruktur stellt sicher, dass Ihr Onlineshop auch bei hohem Traffic, etwa während saisonaler Verkaufsaktionen wie dem Black Friday oder Feiertagsaktionen, performant und stabil bleibt. Moderne Headless-Commerce-Ansätze, bei denen Frontend und Backend voneinander entkoppelt sind, bieten hierbei maximale Flexibilität und Geschwindigkeit bei nahtloser Integration von Drittanbieterdiensten wie Zahlungsanbietern, Lagerverwaltung und Marketing-Automatisierungsplattformen. Zudem spielt die Suchmaschinenoptimierung (SEO) eine zentrale Rolle. Ein Onlineshop muss für relevante Suchanfragen sichtbar sein. Dies erfordert sauberen, semantischen Code, strukturierte Daten (Schema.org), optimierte Produktbeschreibungen und extrem schnelle Ladezeiten, da die Performance ein direkter Rankingfaktor für Google ist. Bei Coday in Wetzlar bauen wir Onlineshops auf modernen Tech-Stacks wie Next.js und React und stellen sicher, dass Ihr Shop von Tag eins an die höchsten Performance-Standards erfüllt.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Beyond technology and SEO, security is a critical element in e-commerce. The implementation of secure payment gateways, SSL encryption, and strict compliance with data protection regulations (such as GDPR) are mandatory requirements to protect customer data and ensure trust. For businesses in Wetzlar and throughout Hesse, compliance with German and European data protection standards is not optional — it is a legal requirement and a competitive differentiator. We also focus on conversion-critical features such as guest checkout options, abandoned cart recovery, intelligent product recommendations, and mobile-first design that captures the growing segment of smartphone shoppers. Every feature we implement is measured against its impact on your conversion rate, ensuring that development effort translates directly into revenue growth.'
              : 'Neben Technik und SEO ist die Sicherheit ein kritisches Element im E-Commerce. Die Implementierung von sicheren Zahlungsgateways, SSL-Verschlüsselung und die strikte Einhaltung von Datenschutzrichtlinien (wie der DSGVO) sind zwingend erforderlich, um Kundendaten zu schützen und das Vertrauen zu gewährleisten. Für Unternehmen in Wetzlar und in ganz Hessen ist die Einhaltung deutscher und europäischer Datenschutzstandards keine Option — es ist eine gesetzliche Anforderung und ein Wettbewerbsvorteil. Wir konzentrieren uns auch auf conversion-kritische Funktionen wie Gast-Checkout-Optionen, Warenkorbabbruch-Wiederherstellung, intelligente Produktempfehlungen und Mobile-First-Design, das das wachsende Segment der Smartphone-Käufer erfasst. Jede Funktion, die wir implementieren, wird an ihrer Auswirkung auf Ihre Konversionsrate gemessen, sodass der Entwicklungsaufwand sich direkt in Umsatzwachstum übersetzt.'}
          </p>
          <p>
            {_locale === 'en'
              ? "At Coday, we understand these complex interdependencies and develop tailored e-commerce solutions that don't just look impressive but deliver measurable results. From initial strategy through development to ongoing optimization, we accompany you on the path to digital sales success and ensure your online shop becomes a powerful revenue channel. As a solo agency based in Wetzlar, every e-commerce project receives direct, senior-level attention — no layers of project managers, no diluted accountability. We work with businesses across Hesse and beyond, bringing international best practices to regional commerce. Whether you need a complete online shop built from scratch, a migration from an outdated platform, or performance optimization of an existing store, Coday delivers the technical excellence and strategic thinking that turn your e-commerce investment into sustained, profitable growth."
              : 'Wir bei Coday verstehen diese komplexen Zusammenhänge und entwickeln maßgeschneiderte E-Commerce-Lösungen, die nicht nur optisch beeindrucken, sondern messbare Ergebnisse liefern. Von der initialen Strategie über die Entwicklung bis hin zur laufenden Optimierung begleiten wir Sie auf dem Weg zum digitalen Verkaufserfolg und sorgen dafür, dass Ihr Onlineshop zu einem leistungsstarken Vertriebskanal wird. Als Solo-Agentur mit Sitz in Wetzlar erhält jedes E-Commerce-Projekt direkte Aufmerksamkeit auf Senior-Level — keine Schichten von Projektmanagern, keine verwässerte Verantwortlichkeit. Wir arbeiten mit Unternehmen in ganz Hessen und darüber hinaus und bringen internationale Best Practices in den regionalen Handel. Ob Sie einen kompletten Onlineshop erstellen lassen möchten, eine Migration von einer veralteten Plattform benötigen oder die Performance eines bestehenden Shops optimieren wollen — Coday liefert die technische Exzellenz und das strategische Denken, das Ihre E-Commerce-Investition in nachhaltiges, profitables Wachstum verwandelt.'}
          </p>
        </div>
      </section>
    </>
  );
}
