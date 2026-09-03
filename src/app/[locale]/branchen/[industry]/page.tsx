import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getServiceSchema, getBreadcrumbSchema, BASE_URL } from '@/lib/schema';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import { industriesData } from '@/shared/data/industries';
import { routing } from '@/i18n/routing';

export const dynamicParams = false;

// Industries with a dedicated static route under src/app/[locale]/branchen/<slug>/.
// They must NOT also be generated here — two implementations for the same URL
// make the build output nondeterministic (whichever page is written last wins).
const INDUSTRIES_WITH_STATIC_ROUTE = new Set([
  'automobil',
  'handwerk-bau',
  'immobilien',
  'retail',
  'unternehmensberatung',
]);

export function generateStaticParams() {
  const params: { locale: string; industry: string }[] = [];
  routing.locales.forEach((locale) => {
    Object.keys(industriesData).forEach((industry) => {
      if (!INDUSTRIES_WITH_STATIC_ROUTE.has(industry)) {
        params.push({ locale, industry });
      }
    });
  });
  return params;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }

  const keywords =
    locale === 'en'
      ? [
          `${formattedIndustry} Web Design`,
          `${formattedIndustry} Website Agency`,
          'Industry Specific Websites',
          'Coday Web Solutions',
        ]
      : [
          `Webdesign ${formattedIndustry}`,
          `Website für ${formattedIndustry}`,
          `Homepage ${formattedIndustry} erstellen`,
          'Branchen Webdesign Wetzlar',
          'Coday Webdesign',
        ];

  if (locale === 'en') {
    return generatePageMetadata({
      title: `${formattedIndustry} Web Design & IT Solutions | Coday`,
      description: `Custom web design and IT solutions specifically tailored for the ${formattedIndustry} industry. Elevate your digital presence with Coday.`,
      keywords,
      path: `/en/branchen/${industry}`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: `${formattedIndustry} Webdesign & IT-Lösungen | Coday`,
    description: `Maßgeschneidertes Webdesign und IT-Lösungen speziell für die Branche ${formattedIndustry}. Stärken Sie Ihre digitale Präsenz mit Coday.`,
    keywords,
    path: `/de/branchen/${industry}`,
    type: 'money',
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  setRequestLocale(locale);

  let formattedIndustry = industry
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (locale === 'en' && industry === 'handwerk-bau') {
    formattedIndustry = 'Trades and Construction';
  } else if (locale === 'en' && industry === 'aerzte-gesundheit') {
    formattedIndustry = 'Doctors & Health';
  }

  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: isEn ? 'Industries' : 'Branchen', url: `/${_locale}/branchen` },
    { name: formattedIndustry, url: `/${_locale}/branchen/${industry}` },
  ]);

  return (
    <>
      <script
        id={`schema-branchen-${industry}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            // Organization already ships in the root layout head; no need to duplicate it.
            '@graph': [
              breadcrumbs,
              getServiceSchema({
                name:
                  locale === 'en'
                    ? `Web Design for ${formattedIndustry}`
                    : `Webdesign für ${formattedIndustry}`,
                description:
                  locale === 'en'
                    ? `Custom web design solutions for the ${formattedIndustry} industry by Coday in Wetzlar.`
                    : `Maßgeschneiderte Webdesign-Lösungen für die Branche ${formattedIndustry} von Coday in Wetzlar.`,
                url: `${BASE_URL}/${locale}/branchen/${industry}`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient />
      <IndustryToolEmbed industryKey={industry} theme="light" />
      {/* SEO – unique content per industry */}
      {(() => {
        const seoContent: Record<
          string,
          { de: { p1: string; p2: string }; en: { p1: string; p2: string } }
        > = {
          automobil: {
            de: {
              p1: 'Die Automobilbranche befindet sich im größten Wandel ihrer Geschichte. Elektromobilität, digitale Showrooms und der wachsende Wettbewerb durch Online-Plattformen verändern die Art und Weise, wie Autohäuser und Werkstätten Kunden gewinnen. Eine professionelle Website ist heute das digitale Schaufenster Ihres Autohauses – sie muss Fahrzeugbestände übersichtlich präsentieren, Probefahrt-Anfragen vereinfachen und Werkstatt-Terminbuchungen nahtlos integrieren. Wir bei Coday entwickeln Webdesign-Lösungen, die speziell auf die Anforderungen der Automobilbranche zugeschnitten sind: von interaktiven Fahrzeugkonfiguratoren über dynamische Bestandslisten bis hin zu lokalen SEO-Strategien, die sicherstellen, dass Ihr Autohaus bei Suchanfragen wie „Autohaus in meiner Nähe" prominent erscheint.',
              p2: 'Vertrauen ist in der Automobilbranche der entscheidende Kaufimpuls. Potenzielle Kunden recherchieren heute durchschnittlich drei Monate online, bevor sie ein Autohaus betreten. Wir gestalten Ihre digitale Präsenz so, dass sie diesen Entscheidungsprozess aktiv unterstützt: durch hochwertige Fahrzeugfotografie-Galerien, transparente Preisdarstellungen und authentische Kundenbewertungen. Unsere technischen Lösungen umfassen die Anbindung an Fahrzeugdatenbanken, automatisierte Bestandsaktualisierungen und DSGVO-konforme Kontaktformulare für Finanzierungsanfragen. So wird Ihre Website zum umsatzstärksten Vertriebskanal Ihres Autohauses.',
            },
            en: {
              p1: 'The automotive industry is undergoing its most significant transformation. Electric mobility, digital showrooms, and rising competition from online platforms are reshaping how dealerships and workshops win customers. A professional website is now your dealership\'s digital storefront — it must present vehicle inventory clearly, simplify test-drive requests, and seamlessly integrate workshop appointment booking. At Coday, we develop web design solutions tailored specifically to the automotive sector: from interactive vehicle configurators and dynamic stock listings to local SEO strategies that ensure your dealership appears prominently for searches like "car dealership near me".',
              p2: "Trust is the decisive buying trigger in the automotive industry. Potential customers now research online for an average of three months before visiting a dealership. We shape your digital presence to actively support this decision process: through high-quality vehicle photography galleries, transparent pricing displays, and authentic customer reviews. Our technical solutions include connections to vehicle databases, automated inventory updates, and GDPR-compliant contact forms for financing enquiries. This turns your website into your dealership's most productive sales channel.",
            },
          },
          'handwerk-bau': {
            de: {
              p1: 'Im Handwerk und Baugewerbe zählt vor allem eines: Vertrauen. Bevor ein Kunde einen Handwerker beauftragt, möchte er sicher sein, dass er die richtige Wahl trifft. Genau hier setzt professionelles Webdesign an. Wir entwickeln Websites für Handwerksbetriebe und Bauunternehmen, die Ihre Kompetenz greifbar machen – durch aussagekräftige Projektgalerien, transparente Leistungsbeschreibungen und einfache Kontaktmöglichkeiten. Lokale Suchmaschinenoptimierung sorgt dafür, dass Ihr Betrieb gefunden wird, wenn potenzielle Kunden nach einem Dachdecker, Elektriker oder Fliesenleger in Ihrer Region suchen. Denn im Handwerk entscheidet die lokale Sichtbarkeit über Aufträge.',
              p2: 'Handwerksbetriebe brauchen keine überladenen Websites – sie brauchen digitale Visitenkarten, die funktionieren. Unsere Lösungen umfassen mobiloptimierte Designs, die auf der Baustelle genauso gut aussehen wie am Schreibtisch, Click-to-Call-Buttons für sofortige Kontaktaufnahme und Anfrage-Formulare, die bereits die wichtigsten Projektdetails abfragen. Wir integrieren Referenzprojekte mit Vorher-Nachher-Bildergalerien und sorgen dafür, dass Ihre Meisterqualifikation und Zertifizierungen prominent sichtbar sind. Durch gezielte Content-Strategien mit handwerksrelevanten Ratgeber-Inhalten steigern wir nicht nur Ihre Sichtbarkeit bei Google, sondern positionieren Sie als den Experten in Ihrem Gewerk.',
            },
            en: {
              p1: 'In the trades and construction sector, one thing matters above all: trust. Before a customer hires a tradesperson, they want to be confident they are making the right choice. This is exactly where professional web design comes in. We develop websites for trade businesses and construction companies that make your expertise tangible — through compelling project galleries, transparent service descriptions, and easy contact options. Local SEO ensures your business is found when potential customers search for a roofer, electrician, or tiler in your area. Because in the trades, local visibility determines whether you win the job.',
              p2: 'Trade businesses do not need cluttered websites — they need digital business cards that work. Our solutions include mobile-optimised designs that look just as good on a building site as at a desk, click-to-call buttons for instant contact, and enquiry forms that already capture essential project details. We integrate reference projects with before-and-after image galleries and ensure your master craftsman qualifications and certifications are prominently visible. Through targeted content strategies with trade-relevant advice articles, we boost not just your Google visibility but position you as the expert in your craft.',
            },
          },
          'immobilien-makler': {
            de: {
              p1: 'Der Immobilienmarkt ist hart umkämpft – und die meisten Kaufentscheidungen beginnen heute online. Für Immobilienmakler ist die eigene Website daher nicht nur eine digitale Visitenkarte, sondern das zentrale Akquise-Instrument für Eigentümer und Kaufinteressenten gleichermaßen. Wir gestalten Makler-Websites, die Objekte professionell in Szene setzen: mit großformatigen Bildergalerien, virtuellen 360°-Rundgängen, integrierten Grundrissdarstellungen und intelligenten Suchfiltern. Die Kombination aus ansprechendem Design und durchdachter Benutzerführung sorgt dafür, dass Interessenten länger auf Ihrer Seite verweilen und häufiger Besichtigungstermine anfragen.',
              p2: 'Für Immobilienmakler ist die Gewinnung neuer Verkaufsaufträge ebenso wichtig wie die Vermarktung bestehender Objekte. Wir entwickeln Landingpages, die gezielt Eigentümer ansprechen und zur kostenlosen Immobilienbewertung einladen. Durch lokales SEO für Suchbegriffe wie „Immobilienmakler Wetzlar" oder „Haus verkaufen Mittelhessen" erreichen Sie genau die richtigen Personen in Ihrer Region. Unsere Websites sind zudem für die Anbindung an gängige Immobiliensoftware wie FlowFact oder onOffice vorbereitet und erfüllen selbstverständlich alle DSGVO-Anforderungen an die Verarbeitung sensibler Kundendaten.',
            },
            en: {
              p1: 'The property market is fiercely competitive — and most buying decisions now start online. For estate agents, a website is not just a digital business card but the central acquisition tool for both property owners and prospective buyers. We design estate agent websites that showcase properties professionally: with large-format image galleries, virtual 360° tours, integrated floor plan displays, and intelligent search filters. The combination of appealing design and thoughtful user experience ensures prospects spend more time on your site and request viewings more frequently.',
              p2: 'For estate agents, winning new sales mandates is just as important as marketing existing properties. We develop landing pages specifically targeting property owners, inviting them to a free property valuation. Through local SEO for search terms like "estate agent near me" or "sell house" combined with your region, you reach exactly the right people in your area. Our websites are also prepared for integration with common real estate software platforms, and naturally comply with all GDPR requirements for processing sensitive client data.',
            },
          },
          'aerzte-gesundheit': {
            de: {
              p1: 'Patienten suchen heute online nach einem Arzt, bevor sie zum Telefon greifen. Für Arztpraxen, Zahnärzte und Gesundheitseinrichtungen ist eine professionelle Website daher kein Luxus, sondern eine Notwendigkeit. Wir entwickeln Praxis-Websites, die medizinische Kompetenz und Vertrauen vermitteln – mit warmem, zugänglichem Design, das Patienten willkommen heißt statt einzuschüchtern. Online-Terminbuchungssysteme, übersichtliche Sprechzeiten-Darstellungen und detaillierte Behandlungs-Informationen sorgen dafür, dass potenzielle Patienten schnell die gewünschten Informationen finden und direkt einen Termin vereinbaren können.',
              p2: 'Im Gesundheitsbereich gelten besondere rechtliche Anforderungen an den Internetauftritt. Wir kennen die Vorgaben des Heilmittelwerbegesetzes (HWG) und der Berufsordnungen und stellen sicher, dass Ihre Website rechtssicher bleibt – ohne auf wirksame Patientenkommunikation zu verzichten. Unsere Lösungen umfassen DSGVO-konforme Kontaktformulare, verschlüsselte Datenübertragung und barrierefreie Gestaltung nach WCAG-Standards. Durch gezielte lokale SEO-Optimierung für Suchbegriffe wie „Zahnarzt Wetzlar" oder „Orthopäde in meiner Nähe" steigern wir die Patientengewinnung messbar und nachhaltig.',
            },
            en: {
              p1: 'Patients now search for a doctor online before picking up the phone. For medical practices, dentists, and healthcare facilities, a professional website is therefore not a luxury but a necessity. We develop practice websites that convey medical expertise and trust — with warm, approachable design that welcomes patients rather than intimidating them. Online appointment booking systems, clear consultation hours displays, and detailed treatment information ensure potential patients quickly find the information they need and can book an appointment directly.',
              p2: 'The healthcare sector has special legal requirements for websites. We understand the regulations governing medical advertising and professional codes of conduct, ensuring your website remains legally compliant — without sacrificing effective patient communication. Our solutions include GDPR-compliant contact forms, encrypted data transmission, and accessible design meeting WCAG standards. Through targeted local SEO optimisation for search terms like "dentist near me" or "orthopaedic specialist" combined with your location, we measurably and sustainably increase patient acquisition.',
            },
          },
          'anwaelte-kanzleien': {
            de: {
              p1: 'Für Anwaltskanzleien ist der erste Eindruck entscheidend – und dieser entsteht heute digital. Potenzielle Mandanten suchen online nach Rechtsanwälten, vergleichen Kanzleiprofile und lesen Bewertungen, bevor sie sich für eine Erstberatung entscheiden. Wir entwickeln Kanzlei-Websites, die Seriosität, Kompetenz und Zugänglichkeit ausstrahlen: mit klarer Darstellung der Rechtsgebiete, aussagekräftigen Anwaltsprofilen und einer Benutzerführung, die Mandanten intuitiv zum Erstkontakt führt. Ob Einzelkanzlei oder Sozietät – unser Webdesign positioniert Ihre Kanzlei als vertrauenswürdige erste Anlaufstelle für rechtliche Fragen in Ihrer Region. Dabei achten wir besonders auf eine klare und verständliche Sprache, die juristische Expertise vermittelt, ohne Ratsuchende mit übermäßiger Fachterminologie zu überfordern. Die visuelle Gestaltung unterstreicht diese Professionalität durch ein klares, aufgeräumtes Design, hochwertige Typografie und eine Farbpalette, die Vertrauen und Zuverlässigkeit signalisiert.',
              p2: 'Anwälte unterliegen strengen berufsrechtlichen Vorgaben für ihre Außendarstellung. Wir kennen die Regelungen der BRAO und BORA und gestalten Ihre Website vollständig konform – von der korrekten Impressumspflicht bis zur Darstellung von Fachanwaltsbezeichnungen. Gleichzeitig maximieren wir die Mandantengewinnung durch gezielte SEO-Strategien für rechtsgebietsspezifische Suchbegriffe wie „Fachanwalt Arbeitsrecht Wetzlar" oder „Scheidungsanwalt Mittelhessen". Integrierte Kontaktformulare mit Mandats-Vorqualifizierung und DSGVO-konforme Datenschutzerklärungen runden unsere Kanzlei-Lösungen ab. Darüber hinaus implementieren wir sichere Kommunikationskanäle für den ersten Dokumentenaustausch und integrieren auf Wunsch Terminbuchungssysteme, die sich nahtlos in Ihre bestehende Kanzleisoftware einfügen. So optimieren wir nicht nur Ihre Mandantenakquise, sondern auch die internen Abläufe in Ihrem Sekretariat. Regelmäßige Veröffentlichungen von Rechtstipps und Urteilsbesprechungen im integrierten Kanzlei-Blog stärken zudem Ihre Position als Experte in Ihren jeweiligen Rechtsgebieten und verbessern kontinuierlich Ihre organische Sichtbarkeit in den Suchmaschinen. Mit einer maßgeschneiderten digitalen Strategie wird Ihre Kanzlei-Website zu einem effizienten Motor für kontinuierliches Wachstum.',
            },
            en: {
              p1: 'For law firms, the first impression is decisive — and today, that impression is formed digitally. Prospective clients search for solicitors online, compare firm profiles, and read reviews before deciding on an initial consultation. We develop law firm websites that radiate professionalism, expertise, and approachability: with clear presentation of practice areas, compelling lawyer profiles, and user journeys that intuitively guide clients towards making first contact. Whether you are a sole practitioner or a partnership, our web design positions your firm as the trusted first point of contact for legal matters in your region. We pay special attention to clear and comprehensible language that conveys legal expertise without overwhelming advice-seekers with excessive jargon. The visual design underscores this professionalism through a clean, uncluttered layout, high-quality typography, and a colour palette that signals trust and reliability.',
              p2: 'Lawyers are subject to strict professional regulations governing their public presentation. We understand the rules of legal professional codes and design your website in full compliance — from correct legal notice requirements to the display of specialist qualifications. At the same time, we maximise client acquisition through targeted SEO strategies for practice-area-specific search terms such as "employment law solicitor" or "divorce lawyer" combined with your location. Integrated contact forms with case pre-qualification and GDPR-compliant privacy policies complete our law firm solutions. Furthermore, we implement secure communication channels for initial document exchange and, upon request, integrate appointment booking systems that seamlessly mesh with your existing practice management software. In this way, we optimise not only your client acquisition but also the internal workflows in your secretariat. Regular publication of legal tips and case reviews in the integrated firm blog additionally strengthens your position as an expert in your respective practice areas and continuously improves your organic visibility in search engines. With a tailor-made digital strategy, your law firm website becomes an efficient engine for sustained growth.',
            },
          },
          'gastronomie-hotellerie': {
            de: {
              p1: 'In der Gastronomie und Hotellerie entscheidet der digitale Auftritt über volle oder leere Tische. Gäste informieren sich online über Speisekarten, Öffnungszeiten und Bewertungen – oft nur Minuten bevor sie eine Reservierung tätigen. Wir entwickeln appetitliche Websites für Restaurants, Cafés und Hotels, die Atmosphäre und kulinarisches Erlebnis bereits am Bildschirm spürbar machen. Hochwertige Food-Fotografie, übersichtliche Menü-Darstellungen und nahtlos integrierte Reservierungssysteme sorgen dafür, dass aus Website-Besuchern zahlende Gäste werden. Für Hotels bieten wir Buchungsintegration, Zimmerübersichten und Veranstaltungskalender.',
              p2: 'Lokale Sichtbarkeit ist für Gastronomiebetriebe überlebenswichtig. Wenn hungrige Gäste „Restaurant in der Nähe" oder „Hotel Wetzlar" suchen, muss Ihr Betrieb in den Top-Ergebnissen erscheinen. Wir optimieren Ihre Website für lokale Suchanfragen, pflegen Ihre Google-Business-Profil-Anbindung und integrieren strukturierte Daten, die Suchmaschinen Ihre Öffnungszeiten, Speisekarte und Standort direkt anzeigen lassen. Saisonale Aktionsseiten für Weihnachtsfeiern, Brunch-Angebote oder Catering-Services ergänzen Ihre digitale Strategie und sorgen ganzjährig für neue Gäste.',
            },
            en: {
              p1: 'In the restaurant and hotel industry, your digital presence determines whether tables are full or empty. Guests check menus, opening hours, and reviews online — often just minutes before making a reservation. We develop appetising websites for restaurants, cafés, and hotels that make atmosphere and culinary experience tangible even on screen. High-quality food photography, clear menu presentations, and seamlessly integrated reservation systems ensure website visitors become paying guests. For hotels, we offer booking integration, room overviews, and event calendars.',
              p2: 'Local visibility is vital for hospitality businesses. When hungry guests search for "restaurant near me" or "hotel" plus your city, your business must appear in the top results. We optimise your website for local search queries, manage your Google Business Profile integration, and implement structured data that allows search engines to display your opening hours, menu, and location directly. Seasonal pages for Christmas celebrations, brunch offers, or catering services complement your digital strategy and attract new guests throughout the year.',
            },
          },
          unternehmensberatung: {
            de: {
              p1: 'Für Unternehmensberater und Beratungsfirmen ist die Website das wichtigste Instrument zur Demonstration fachlicher Autorität. Potenzielle Klienten erwarten eine Onlinepräsenz, die dieselbe Präzision und Professionalität ausstrahlt wie die Beratungsleistung selbst. Wir gestalten Berater-Websites, die komplexe Leistungsportfolios verständlich strukturieren, Erfolgsgeschichten überzeugend präsentieren und die persönliche Expertise der Berater in den Vordergrund rücken. Durchdachte Thought-Leadership-Seiten mit Fachartikeln, Whitepapers und Branchenanalysen positionieren Ihre Beratung als Wissensführer in Ihrem Spezialgebiet.',
              p2: 'Lead-Generierung ist für Beratungsunternehmen der zentrale Zweck der Website. Wir entwickeln Conversion-optimierte Landingpages für spezifische Beratungsfelder, integrieren intelligente Kontaktformulare mit Projektbeschreibungs-Feldern und setzen auf strategische Call-to-Actions, die zur Erstberatung einladen. Durch SEO-Optimierung für beratungsspezifische Suchbegriffe wie „Strategieberatung Mittelstand" oder „Digitalisierungsberatung Hessen" erreichen Sie Entscheider genau im richtigen Moment des Informationsprozesses. Newsletter-Integrationen und Download-Bereiche für Studien schaffen zusätzliche Touchpoints mit potenziellen Klienten.',
            },
            en: {
              p1: 'For management consultants and advisory firms, the website is the most important tool for demonstrating professional authority. Prospective clients expect an online presence that radiates the same precision and professionalism as the consultancy itself. We design consultant websites that structure complex service portfolios clearly, present success stories convincingly, and place the personal expertise of advisors front and centre. Thoughtful thought-leadership pages with articles, whitepapers, and industry analyses position your consultancy as a knowledge leader in your specialist field.',
              p2: 'Lead generation is the central purpose of a consultancy website. We develop conversion-optimised landing pages for specific advisory fields, integrate intelligent contact forms with project-description fields, and deploy strategic calls-to-action that invite initial consultations. Through SEO optimisation for consulting-specific search terms such as "strategy consulting for SMEs" or "digital transformation advisory," you reach decision-makers at exactly the right moment in their information-gathering process. Newsletter integrations and download areas for studies create additional touchpoints with prospective clients.',
            },
          },
          'startups-tech': {
            de: {
              p1: 'Startups und Tech-Unternehmen bewegen sich in einem Umfeld, in dem Geschwindigkeit und Innovation über Erfolg entscheiden. Ihre Website muss diesen Anspruch widerspiegeln – modern, schnell und technisch makellos. Wir entwickeln digitale Auftritte für Startups, die nicht nur mit kreativen Designs beeindrucken, sondern auch technisch auf höchstem Niveau performen: blitzschnelle Ladezeiten, perfekte Core-Web-Vitals und ein responsives Design, das auf jedem Gerät überzeugt. Von der MVP-Landingpage für die erste Funding-Runde bis zur skalierbaren Produktwebsite – wir begleiten Tech-Unternehmen in jeder Wachstumsphase.',
              p2: 'Investoren, potenzielle Mitarbeiter und Early Adopter sind die drei Zielgruppen, die eine Startup-Website gleichzeitig ansprechen muss. Wir lösen diese Herausforderung mit strategischer Informationsarchitektur: klare Produkterklärungen für Nutzer, überzeugende Traction-Metriken für Investoren und eine authentische Kultur-Seite für Recruiting. Integration von Analytics-Tools, A/B-Testing-Infrastruktur und CRM-Anbindungen gehören bei Startup-Projekten für uns zum Standard. Durch technisches SEO und Content-Marketing-Strategien stärken wir Ihre organische Sichtbarkeit nachhaltig – ohne Abhängigkeit von bezahlter Werbung.',
            },
            en: {
              p1: 'Startups and tech companies operate in an environment where speed and innovation determine success. Your website must reflect this ambition — modern, fast, and technically flawless. We develop digital presences for startups that not only impress with creative design but also perform at the highest technical level: lightning-fast load times, perfect Core Web Vitals scores, and responsive design that convinces on every device. From the MVP landing page for your first funding round to a scalable product website, we support tech companies through every growth phase.',
              p2: 'Investors, potential employees, and early adopters are the three audiences a startup website must address simultaneously. We solve this challenge with strategic information architecture: clear product explanations for users, compelling traction metrics for investors, and an authentic culture page for recruiting. Integration of analytics tools, A/B testing infrastructure, and CRM connections are standard in our startup projects. Through technical SEO and content marketing strategies, we sustainably strengthen your organic visibility — without dependence on paid advertising.',
            },
          },
          retail: {
            de: {
              p1: 'Der Einzelhandel steht vor der größten Herausforderung seiner Geschichte: Kunden erwarten heute ein nahtloses Einkaufserlebnis über alle Kanäle hinweg. Ob stationäres Geschäft, Onlineshop oder Social Commerce – Ihre digitale Präsenz muss alle Touchpoints miteinander verbinden. Wir entwickeln Retail-Websites, die Ihre Produkte verkaufsfördernd in Szene setzen: mit hochauflösenden Produktfotografien, intuitiver Navigation durch Sortimentskategorien und überzeugenden Produktbeschreibungen. Für lokale Einzelhändler integrieren wir Funktionen wie Click-and-Collect-Reservierungen, Filialfinder und aktuelle Verfügbarkeitsanzeigen, die Online- und Offline-Welt verbinden.',
              p2: 'Im Retail entscheiden Ladegeschwindigkeit und Nutzererfahrung direkt über Umsatz. Studien zeigen, dass jede Sekunde zusätzliche Ladezeit die Conversion-Rate um bis zu sieben Prozent senkt. Unsere Retail-Websites sind daher bis ins Detail performance-optimiert: komprimierte Bilder, effizientes Caching und schlanker Code sorgen für ein Einkaufserlebnis ohne Wartezeiten. Saisonale Aktionsseiten für Sale-Events, Feiertags-Kampagnen und Produktneuheiten lassen sich flexibel erstellen und aktualisieren. Durch lokales SEO und strukturierte Produktdaten steigern wir Ihre Sichtbarkeit sowohl in der organischen Suche als auch in Google Shopping.',
            },
            en: {
              p1: 'Retail faces its greatest challenge: customers now expect a seamless shopping experience across all channels. Whether it is a physical store, online shop, or social commerce, your digital presence must connect all touchpoints. We develop retail websites that showcase your products to drive sales: with high-resolution product photography, intuitive navigation through product categories, and compelling product descriptions. For local retailers, we integrate features such as click-and-collect reservations, store finders, and live availability displays that bridge the online and offline worlds.',
              p2: 'In retail, loading speed and user experience directly impact revenue. Studies show that every additional second of loading time reduces conversion rates by up to seven per cent. Our retail websites are therefore performance-optimised down to the finest detail: compressed images, efficient caching, and lean code deliver a shopping experience without delays. Seasonal campaign pages for sale events, holiday promotions, and new product launches can be created and updated flexibly. Through local SEO and structured product data, we increase your visibility in both organic search results and Google Shopping.',
            },
          },
        };

        const content = seoContent[industry]?.[locale === 'en' ? 'en' : 'de'];

        return content ? (
          <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
            <h2 className="text-3xl font-display font-bold mb-6">
              {locale === 'en'
                ? `Digital Expertise for ${formattedIndustry}`
                : `Digitale Expertise für ${formattedIndustry}`}
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>{content.p1}</p>
              <p>{content.p2}</p>
            </div>
          </section>
        ) : null;
      })()}
    </>
  );
}
