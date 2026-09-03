import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';
import ClientComponent from '@/features/community/ui/MarketplaceClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Website Modules | Booking, Calculators, Configurators · Coday',
      description:
        'Twelve modules built on top of a website: appointment booking, application funnels, needs calculators, member areas and more. Quoted with the project.',
      keywords: [
        'Website Booking System Hesse',
        'Online Application Funnel Trades',
        'Website Cost Calculator Module',
        'Product Configurator Website',
      ],
      path: '/en/community/marketplace',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Website-Bausteine | Terminbuchung, Kalkulator & mehr · Coday',
    description:
      'Zwölf Bausteine, die auf einer Website aufsetzen: Terminbuchung, Express-Bewerbung, Bedarfs-Kalkulator, Mitgliederbereich und mehr. Kalkuliert mit dem Projekt.',
    keywords: [
      'Terminbuchung Website Hessen',
      'Express-Bewerbung Handwerk',
      'Bedarfs-Kalkulator Website',
      'Produkt-Konfigurator Website',
    ],
    path: '/de/community/marketplace',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const _locale = params.locale || 'de';
  setRequestLocale(_locale);
  const isEn = _locale === 'en';

  const pageUrl = `${BASE_URL}/${_locale}/community/marketplace`;

  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
      { name: 'Community', url: `/${_locale}/community/events` },
      { name: isEn ? 'Marketplace' : 'Marktplatz', url: `/${_locale}/community/marketplace` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node is rendered once by the root layout, so it is left out below.
    '@graph': [
      breadcrumbs,
      // WebPage rather than an offer catalogue: modules are quoted with the
      // project, so there is no price to put into structured data.
      getWebPageSchema({
        url: pageUrl,
        name: isEn ? 'Coday Website Modules' : 'Coday Website-Bausteine',
        description: isEn
          ? 'Modules built on top of a website: booking, application funnels, calculators, member areas.'
          : 'Bausteine, die auf einer Website aufsetzen: Terminbuchung, Bewerbungsstrecken, Kalkulatoren, Mitgliederbereiche.',
        locale: _locale,
      }),
    ],
  };

  // Rendered on both locales, so it is translated -- and it describes the
  // modules the page lists rather than a directory of third-party providers.
  const seo = isEn
    ? {
        heading: 'Website modules: what gets built on top of the pages',
        paragraphs: [
          'A website is the base. This page lists the twelve modules that get built on top of it when a business needs more than pages. Appointment booking replaces the phone tag that practices, trades and consultancies lose enquiries to. An express application funnel lets candidates apply from a phone in under a minute, which matters wherever hiring is the bottleneck: trades, care, hospitality. A needs calculator qualifies an enquiry before it reaches your inbox and works for trades, agencies and B2B services alike.',
          'Several modules are industry-specific rather than general purpose. A digital intake form takes the paperwork out of a first appointment at practices and clinics. A digital menu and a voucher shop belong to restaurants, hotels, retail and wellness. A product configurator lets manufacturing, retail and automotive customers assemble what they want before they ask what it costs. A member area with a login serves associations, B2B networks and franchises, and a download centre does the same for industry and the public sector.',
          'The remaining modules widen reach rather than deepen a workflow. A multilingual site is what exporters, tourism businesses and clinics need when their customers do not all read German. A blog and knowledge base is the groundwork for anyone building organic search traffic instead of buying it. Virtual tours give real estate agents, hotels and clinics a way to be walked through before anyone drives over.',
          'Modules are quoted with the project rather than sold off a shelf, which is why no price is listed here. What a booking system costs depends on whether it has to talk to the calendar you already use, and what a configurator costs depends on how many options it has to combine. The free needs analysis puts a binding fixed price on the combination you actually need; the cost calculator gives you a range before that conversation happens.',
        ],
      }
    : {
        heading: 'Website-Bausteine: was auf den Seiten aufgebaut wird',
        paragraphs: [
          'Eine Website ist die Basis. Diese Seite listet die zwölf Bausteine, die darauf gebaut werden, wenn ein Betrieb mehr braucht als Seiten. Eine Terminbuchung ersetzt das Telefon-Pingpong, an dem Praxen, Handwerk und Beratung Anfragen verlieren. Eine Express-Bewerbung lässt Kandidaten in unter einer Minute vom Handy aus bewerben — entscheidend überall dort, wo die Personalsuche der Engpass ist: Handwerk, Pflege, Gastronomie. Ein Bedarfs-Kalkulator qualifiziert eine Anfrage, bevor sie im Postfach landet, und passt Handwerk, Agenturen und B2B-Dienstleistern gleichermaßen.',
          'Mehrere Bausteine sind branchenspezifisch statt allgemein. Ein digitaler Anamnesebogen nimmt Praxen und Kliniken den Papierkram aus dem Ersttermin. Digitale Speisekarte und Gutschein-Shop gehören zu Gastronomie, Hotellerie, Handel und Wellness. Ein Produkt-Konfigurator lässt Kunden aus Fertigung, Handel und Automobil zusammenstellen, was sie wollen, bevor sie nach dem Preis fragen. Ein Mitgliederbereich mit Login bedient Verbände, B2B-Netzwerke und Franchise-Systeme, ein Download-Center dasselbe für Industrie und öffentlichen Sektor.',
          'Die übrigen Bausteine erweitern die Reichweite, statt einen Arbeitsablauf zu vertiefen. Mehrsprachigkeit brauchen Exporteure, Tourismusbetriebe und Kliniken, deren Kunden nicht alle Deutsch lesen. Ein Blog- und Wissensbereich ist die Grundlage für alle, die organische Reichweite aufbauen wollen, statt sie zu kaufen. Virtuelle Touren geben Immobilienmaklern, Hotels und Kliniken einen Weg, sich zeigen zu lassen, bevor jemand hinfährt.',
          'Bausteine werden mit dem Projekt kalkuliert statt aus dem Regal verkauft — deshalb steht hier kein Preis. Was eine Terminbuchung kostet, hängt davon ab, ob sie mit dem Kalender sprechen muss, den Sie ohnehin nutzen; was ein Konfigurator kostet, davon, wie viele Optionen er kombinieren muss. Die kostenlose Bedarfsanalyse setzt einen verbindlichen Festpreis auf genau die Kombination, die Sie brauchen. Der Kostenrechner gibt vorher eine Spanne.',
        ],
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">{seo.heading}</h2>
        <div className="space-y-4 text-base leading-relaxed">
          {seo.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
