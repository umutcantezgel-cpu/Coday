export interface AiCostBreakdown {
  item: string;
  costMin: number;
  costMax: number;
}

export interface AiCostFaq {
  question: string;
  answer: string;
}

export interface AiCostData {
  branche: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  costMin: number;
  costMax: number;
  currency: string;
  breakdown: AiCostBreakdown[];
  factors: string[];
  roi_timeline: string;
  faqs: AiCostFaq[];
}

export const aiCostData: AiCostData[] = [
  {
    branche: 'Handwerk',
    slug: 'handwerk',
    metaTitle: 'Website Kosten für Handwerker 2026 | Preise & ROI',
    metaDescription:
      'Detaillierte Preisaufschlüsselung für Handwerker-Websites. Kosten für SEO, Recruiting-Funnel und Conversion-Optimierung (SHK, Elektriker, Dachdecker).',
    costMin: 2850,
    costMax: 8400,
    currency: 'EUR',
    breakdown: [
      { item: 'UI/UX Design & Local Branding', costMin: 950, costMax: 2200 },
      { item: 'Frontend Development (Next.js/React)', costMin: 1400, costMax: 3800 },
      { item: 'Local SEO & Content-Architektur', costMin: 500, costMax: 2400 },
    ],
    factors: [
      'Entwicklung eines interaktiven Recruiting-Trichters (steigert Bewerber-Conversion um ca. 42%)',
      'Integration strukturierter Daten (LocalBusiness Schema) für 35% mehr Sichtbarkeit im Google Local Pack',
      'One-Click-Kontakt (Sticky Mobile Buttons) für eine 28% höhere Lead-Rate bei Notdiensten',
    ],
    roi_timeline:
      '4,5 bis 6 Monate (Amortisation durch durchschnittlich 2,3 zusätzliche Wartungsverträge/Monat)',
    faqs: [
      {
        question: 'Warum kostet eine moderne Handwerker-Website über 2.800 Euro?',
        answer:
          'Eine moderne Website ist kein digitales Flyer mehr, sondern ein 24/7 Vertriebs- und Recruiting-Mitarbeiter. Die Kosten von 2.850€ bis 8.400€ resultieren aus hochperformantem Code (PageSpeed > 90) und technischem SEO, was zu nachweislich 40% günstigeren Lead-Preisen (CPL) führt.',
      },
      {
        question: 'Wie schnell rechnet sich die Investition für einen SHK-Betrieb?',
        answer:
          'Bei einem durchschnittlichen Kundenwert (CLV) von 3.500€ im SHK-Bereich ist der ROI oft nach 4,5 Monaten erreicht, da die Sichtbarkeit für Suchanfragen wie "Wärmepumpe installieren [Stadt]" massiv steigt.',
      },
    ],
  },
  {
    branche: 'Steuerberater',
    slug: 'steuerberater',
    metaTitle: 'Website Kosten für Steuerberater & Kanzleien 2026',
    metaDescription:
      'Was kostet eine Kanzlei-Website? Preise für DATEV-Integrationen, Mandanten-Onboarding und Employer Branding im Steuerbereich.',
    costMin: 3800,
    costMax: 12500,
    currency: 'EUR',
    breakdown: [
      { item: 'Trust-UI & Corporate Design', costMin: 1200, costMax: 3200 },
      { item: 'Development & Security-Audit', costMin: 1600, costMax: 5500 },
      { item: 'Fachkräfte-SEO & Employer Branding', costMin: 1000, costMax: 3800 },
    ],
    factors: [
      'Entwicklung eines Karrieretrichters für Steuerfachangestellte (senkt Cost-per-Hire um bis zu 60%)',
      'Integration von DATEV-Mandantenportalen (z.B. DATEV Unternehmen online)',
      'Digitale Onboarding-Formulare zur Reduzierung des administrativen Aufwands um 3 Stunden pro Neumandant',
    ],
    roi_timeline:
      '6 bis 8 Monate (Amortisation primär durch eingesparte Headhunter-Kosten für Fachpersonal)',
    faqs: [
      {
        question: 'Wo liegt der größte Kostenblock bei Kanzlei-Websites?',
        answer:
          'Rund 35-40% des Budgets fließen in das Employer Branding und den Bewerbungsprozess. Da Mandanten oft vorhanden sind, Fachkräfte jedoch fehlen, ist ein reibungsloser Mobile-Bewerbungsprozess ohne Anschreiben der größte Wachstumshebel.',
      },
    ],
  },
  {
    branche: 'B2B SaaS',
    slug: 'b2b-saas',
    metaTitle: 'Website Kosten für B2B SaaS Unternehmen 2026',
    metaDescription:
      'Transparente Website-Preise für B2B SaaS Startups. Kosten für Conversion-Optimierung, Headless CMS und HubSpot-API.',
    costMin: 8500,
    costMax: 28000,
    currency: 'EUR',
    breakdown: [
      { item: 'Conversion-Design (Figma) & WebGL', costMin: 2800, costMax: 8500 },
      { item: 'Headless CMS & Next.js/React', costMin: 4200, costMax: 13500 },
      { item: 'Tech-SEO & Analytics Setup', costMin: 1500, costMax: 6000 },
    ],
    factors: [
      'Implementierung interaktiver Pricing-Slider (steigert Signups oft um 15-22%)',
      'Headless CMS (z.B. Sanity) für Ladezeiten unter 800ms (reduziert Bounce-Rate um 35%)',
      'Nahtlose CRM-Integration (HubSpot/Salesforce) zur automatisierten Lead-Qualifizierung',
    ],
    roi_timeline: '3 bis 5 Monate (durch 18% höhere Demo-Request-Conversion-Rate)',
    faqs: [
      {
        question: 'Warum kostet eine SaaS-Website oft über 15.000 Euro?',
        answer:
          'B2B SaaS-Käufer entscheiden in Sekunden. Die Website erfordert komplexe Erklärungs-Animationen (Framer Motion), eine extrem schnelle Architektur und ein CMS, das Marketing-Teams tägliche A/B-Tests ermöglicht. Die technische Komplexität ist hier am höchsten.',
      },
    ],
  },
  {
    branche: 'Arztpraxen',
    slug: 'arztpraxen',
    metaTitle: 'Website Kosten für Arztpraxen & Kliniken 2026',
    metaDescription:
      'Preise für moderne Praxis-Websites. Kosten für Doctolib-Integration, Jameda-Schnittstellen und DSGVO-Compliance.',
    costMin: 3200,
    costMax: 9800,
    currency: 'EUR',
    breakdown: [
      { item: 'Barrierefreies Clean-UI Design', costMin: 1100, costMax: 2800 },
      { item: 'Frontend Development & Performance', costMin: 1500, costMax: 4800 },
      { item: 'Termin-API & DSGVO-Auditing', costMin: 600, costMax: 2200 },
    ],
    factors: [
      'Native API-Integration für Online-Termine (Doctolib/Jameda) spart durchschnittlich 12 Stunden Telefonie pro Woche',
      'Strikte DSGVO-Konformität (Cookie-freies Tracking, verschlüsselte Formulare)',
      'Barrierefreiheit (WCAG 2.1 AA Standards) für ältere Patientengruppen',
    ],
    roi_timeline: '5 bis 7 Monate (durch Reduktion von Personalkosten im Empfangsbereich)',
    faqs: [
      {
        question: 'Was kostet die Einbindung von Doctolib?',
        answer:
          'Ein einfaches iFrame-Widget ist meist inklusive. Eine nahtlose native API-Integration, die sich dem Design anpasst und Conversion-Hürden abbaut, liegt entwicklungstechnisch bei ca. 800 bis 1.600 Euro.',
      },
    ],
  },
  {
    branche: 'Immobilienmakler',
    slug: 'immobilienmakler',
    metaTitle: 'Website Kosten für Immobilienmakler 2026',
    metaDescription:
      'Wie viel kostet eine Makler-Website mit OpenImmo-Schnittstelle? Preise für FlowFact-Anbindung und Lead-Generierung.',
    costMin: 4500,
    costMax: 16500,
    currency: 'EUR',
    breakdown: [
      { item: 'Premium Branding & UI Design', costMin: 1400, costMax: 4500 },
      { item: 'Makler-Software API (OpenImmo)', costMin: 2200, costMax: 8500 },
      { item: 'Lead-Gen (Eigentümer) & Local SEO', costMin: 900, costMax: 3500 },
    ],
    factors: [
      'Automatische Echtzeit-Synchronisation der Immobilien via OpenImmo (FlowFact, onOffice)',
      'Interaktive Immobilienbewertungs-Tools (Lead-Magnets generieren bis zu 30% mehr Verkäufer-Leads)',
      'Hochwertige interaktive Exposé-Darstellungen (360°-Rundgänge, interaktive Maps)',
    ],
    roi_timeline:
      '1 bis 3 Monate (oft bereits durch die erste vermittelte Immobilie über einen Website-Lead gedeckt)',
    faqs: [
      {
        question: 'Warum ist die Immobilien-Synchronisation so aufwendig?',
        answer:
          'Die Entwicklung einer stabilen OpenImmo-API-Schnittstelle (ca. 2.500 - 7.000 Euro) ist komplex, aber sie spart dem Makler wöchentlich 5-10 Stunden manueller Datenpflege, da alle Objekte aus der Maklersoftware in Echtzeit auf der Website erscheinen.',
      },
    ],
  },
  {
    branche: 'Industrieunternehmen',
    slug: 'industrieunternehmen',
    metaTitle: 'Website Kosten für Maschinenbau & Industrie',
    metaDescription:
      'Detaillierte Kosten für Industrie-Websites: Produktkonfiguratoren, PIM-Schnittstellen und mehrsprachiges SEO.',
    costMin: 12000,
    costMax: 42000,
    currency: 'EUR',
    breakdown: [
      { item: 'B2B Enterprise UX & 3D-Integration', costMin: 3500, costMax: 12000 },
      { item: 'Custom Development & i18n', costMin: 6000, costMax: 22000 },
      { item: 'PIM/ERP-Integration & SEO', costMin: 2500, costMax: 8000 },
    ],
    factors: [
      'Nahtlose Anbindung an PIM (Product Information Management) und ERP-Systeme (SAP, Microsoft Dynamics)',
      'Komplexe i18n-Architektur (Mehrsprachigkeit mit Hreflang-Optimierung für 10+ Länder)',
      'Interaktive 3D-Produktkonfiguratoren via WebGL für komplexe Maschinen',
    ],
    roi_timeline: '8 bis 12 Monate (signifikanter ROI durch internationale B2B-Enterprise-Leads)',
    faqs: [
      {
        question: 'Welcher Faktor treibt den Preis im Industrie-Sektor?',
        answer:
          'Neben der PIM-Schnittstelle ist es die Mehrsprachigkeit. Ein sauberes i18n-Setup für globale Märkte erfordert komplexe Routing-Logiken und technisches SEO, was die Entwicklungskosten schnell um 30-50% anhebt.',
      },
    ],
  },
  {
    branche: 'E-Commerce',
    slug: 'e-commerce',
    metaTitle: 'Onlineshop Kosten 2026 | Headless & Shopify Preise',
    metaDescription:
      'Was kostet ein Onlineshop? Übersicht der Entwicklungs- und Designkosten für Shopify, Shopware und Headless Commerce.',
    costMin: 6500,
    costMax: 45000,
    currency: 'EUR',
    breakdown: [
      { item: 'Conversion-Optimiertes UI/UX', costMin: 2000, costMax: 9000 },
      { item: 'Shop-Entwicklung (Shopify/Headless)', costMin: 3500, costMax: 25000 },
      { item: 'System-Integrationen (ERP/PIM/Logistik)', costMin: 1000, costMax: 11000 },
    ],
    factors: [
      'Migration von Bestandsdatenstrukturen (Produkte, Kunden, Bestellhistorie)',
      'Sub-Sekunden Ladezeiten durch Headless Commerce (Next.js + Shopify Storefront API) – steigert Conversion-Raten um bis zu 25%',
      'Komplexe Logiken für Produktvarianten, Faceted Search und Personalisierung',
    ],
    roi_timeline:
      '6 bis 9 Monate (stark abhängig von Conversion-Rate-Lifts und Marketing-Ausgaben)',
    faqs: [
      {
        question: 'Wann lohnt sich Headless Commerce gegenüber Standard-Shopify?',
        answer:
          'Standard-Shopify reicht bis ca. 5 Mio. Euro Jahresumsatz (Kosten 6.500 - 18.000€). Headless Commerce (ab 25.000€) lohnt sich für Enterprise-Marken, die Millisekunden-Ladezeiten, extreme Flexibilität und Omnichannel-Architekturen benötigen.',
      },
    ],
  },
  {
    branche: 'Gastronomie',
    slug: 'gastronomie',
    metaTitle: 'Website Kosten für Restaurants & Gastronomie',
    metaDescription:
      'Preise für Restaurant-Websites: Kosten für Speisekarten-Management, Tischreservierung und lokales SEO.',
    costMin: 1800,
    costMax: 5500,
    currency: 'EUR',
    breakdown: [
      { item: 'Visual Design & Fotografie-UI', costMin: 600, costMax: 1800 },
      { item: 'Mobile-First Development', costMin: 900, costMax: 2800 },
      { item: 'Reservierungs-API & Local SEO', costMin: 300, costMax: 900 },
    ],
    factors: [
      'Einbindung von OpenTable, Quandoo oder Resmio (spart Personalzeit bei der Annahme)',
      'Digitale Speisekarten mit CMS-Anbindung statt unzugänglicher PDFs (steigert SEO-Sichtbarkeit)',
      'Extreme Optimierung auf mobile Endgeräte (90% der Restaurant-Suchanfragen sind mobil)',
    ],
    roi_timeline:
      '2 bis 4 Monate (durch Einsparung der Drittanbieter-Provisionen bei direkten Buchungen)',
    faqs: [
      {
        question: 'Warum sind PDFs als Speisekarte ein Problem?',
        answer:
          'PDFs werden von Google schlecht gecrawlt und sind auf Smartphones unleserlich. Wir implementieren datenbankbasierte Speisekarten, die Ihre SEO-Sichtbarkeit für Gerichte (z.B. "bestes Sushi [Stadt]") massiv erhöhen.',
      },
    ],
  },
  {
    branche: 'Personalberater',
    slug: 'personalberater',
    metaTitle: 'Website Kosten für Headhunter & Personalberatungen',
    metaDescription:
      'Was kostet eine Website für Recruiting-Agenturen? Preis-Breakdown für ATS-Integrationen und Lead-Generierung.',
    costMin: 4500,
    costMax: 14000,
    currency: 'EUR',
    breakdown: [
      { item: 'Premium Trust Design', costMin: 1400, costMax: 4000 },
      { item: 'Jobportal & ATS-Integration (API)', costMin: 2200, costMax: 7000 },
      { item: 'Conversion-Optimierung (B2B & Kandidaten)', costMin: 900, costMax: 3000 },
    ],
    factors: [
      'API-Anbindung an Applicant Tracking Systeme wie Personio, Recruitee oder Bullhorn',
      'Dualer User-Flow: Getrennte, optimierte Journeys für B2B-Auftraggeber und Top-Kandidaten',
      'Automatisches Schema-Markup (JobPosting) für Google Jobs Integration',
    ],
    roi_timeline:
      '3 bis 5 Monate (oft gedeckt durch ein einziges erfolgreich besetztes C-Level Mandat)',
    faqs: [
      {
        question: 'Müssen wir Jobs manuell auf der Website einpflegen?',
        answer:
          'Nein. Durch eine direkte ATS-Integration (Kosten ca. 2.000 - 5.000€) werden Jobs, die Sie in Personio oder Recruitee anlegen, in Echtzeit im Design Ihrer Website veröffentlicht.',
      },
    ],
  },
  {
    branche: 'IT-Dienstleister',
    slug: 'it-dienstleister',
    metaTitle: 'Website Kosten für IT-Systemhäuser 2026',
    metaDescription:
      'Preise für Systemhaus-Websites: Lösungspräsentation, Managed Services Kalkulatoren und B2B-Lead-Gen.',
    costMin: 5500,
    costMax: 19500,
    currency: 'EUR',
    breakdown: [
      { item: 'Tech-Brand UI Design', costMin: 1600, costMax: 5500 },
      { item: 'Frontend Architecture & Headless CMS', costMin: 2800, costMax: 9500 },
      { item: 'Technical SEO & Content-Struktur', costMin: 1100, costMax: 4500 },
    ],
    factors: [
      'Entwicklung dynamischer ROI- oder Cloud-Kosten-Kalkulatoren (generieren 3x mehr MQLs)',
      'Anbindung von Support-Ticketing-Systemen (Zendesk, Jira) für Bestandskunden',
      'Erstellung von tiefgehenden Lösungsarchitektur-Grafiken und Whitepaper-Funnels',
    ],
    roi_timeline: '4 bis 7 Monate (durch Generierung von lukrativen Managed-Services Verträgen)',
    faqs: [
      {
        question: 'Wie überzeugen IT-Dienstleister CTOs und IT-Leiter?',
        answer:
          'Durch technische Tiefe. Eine Website, die Millisekunden lädt und komplexe Themen in interaktiven Architektur-Grafiken erklärt, beweist technologische Kompetenz – das stärkste Verkaufsargument im IT-Sektor.',
      },
    ],
  },
  {
    branche: 'Finanzberater',
    slug: 'finanzberater',
    metaTitle: 'Website Kosten für Finanzberater & Vermögensverwalter',
    metaDescription:
      'Kosten für Websites in der Finanzbranche. Trust-Design, Terminbuchungs-Integration und Lead-Funnel für B2B/B2C.',
    costMin: 4000,
    costMax: 11500,
    currency: 'EUR',
    breakdown: [
      { item: 'Authority & Trust UI', costMin: 1200, costMax: 3500 },
      { item: 'Secure Development & CMS', costMin: 1800, costMax: 5500 },
      { item: 'Lead-Funnel & Analytics', costMin: 1000, costMax: 2500 },
    ],
    factors: [
      'Umsetzung von DSGVO-konformen Consent-Layern für Tools wie HubSpot',
      'Integration von Lead-Magnets (z.B. PDF-Ratgeber zu ETF-Strategien oder Altersvorsorge)',
      'Aufbau von "Social Proof"-Sektionen mit verifizierten ProvenExpert-APIs',
    ],
    roi_timeline: '3 bis 6 Monate (oft durch 2-3 Neumandate im AUM-Bereich gedeckt)',
    faqs: [
      {
        question: 'Ist die Terminbuchung DSGVO-konform?',
        answer:
          'Ja. Bei Finanzdaten ist Sicherheit kritisch. Wir nutzen Server-Side-Tracking und eine DSGVO-sichere Eigenentwicklung für die Terminbuchung, um Datensicherheit zu garantieren.',
      },
    ],
  },
  {
    branche: 'Rechtsanwälte',
    slug: 'rechtsanwaelte',
    metaTitle: 'Website Kosten für Anwaltskanzleien 2026',
    metaDescription:
      'Was kostet eine Kanzlei-Website? Mandantengewinnung, Legal Tech und SEO für Rechtsanwälte.',
    costMin: 4200,
    costMax: 13000,
    currency: 'EUR',
    breakdown: [
      { item: 'Corporate Identity Design', costMin: 1300, costMax: 4000 },
      { item: 'Secure Development', costMin: 1900, costMax: 6000 },
      { item: 'Local & Niche SEO', costMin: 1000, costMax: 3000 },
    ],
    factors: [
      'Ende-zu-Ende verschlüsselte Kontaktformulare zur sicheren Aktenübermittlung',
      'Spezifisches Nischen-SEO (z.B. Optimierung auf "Kündigungsschutzklage Anwalt München")',
      'Aufbau eines Legal-Tech FAQ-Bereichs, der "Position Zero" in Google generiert',
    ],
    roi_timeline:
      '4 bis 6 Monate (skaliert stark mit dem durchschnittlichen Streitwert der generierten Mandate)',
    faqs: [
      {
        question: 'Wie gewinnen Kanzleien online lukrative Mandate?',
        answer:
          'Durch extrem zielgerichtetes Long-Tail SEO (Kostenpunkt SEO-Setup: 1.000-3.000€). Wer auf spezifische Rechtsprobleme optimiert, gewinnt Mandanten, die akut Hilfe benötigen und hohe Conversion-Raten aufweisen.',
      },
    ],
  },
  {
    branche: 'Agenturen',
    slug: 'agenturen',
    metaTitle: 'Website Kosten für Werbe- & Digitalagenturen',
    metaDescription:
      'Kosten für Agentur-Websites: High-End WebGL Animationen, Portfolio-Architektur und Lead-Gen.',
    costMin: 6000,
    costMax: 24000,
    currency: 'EUR',
    breakdown: [
      { item: 'Creative UI/UX & WebGL Animation', costMin: 2500, costMax: 9000 },
      { item: 'Performance Engineering (React/Three.js)', costMin: 2500, costMax: 10000 },
      { item: 'Headless CMS Architektur', costMin: 1000, costMax: 5000 },
    ],
    factors: [
      'Komplexe Scroll-Animationen (GSAP, Framer Motion) ohne Performance-Einbußen (60 FPS)',
      'Maßgeschneidertes Headless CMS (Sanity), um Case Studies schnell zu publizieren',
      'Dynamische Seitenübergänge (Page Transitions) für eine App-ähnliche Experience',
    ],
    roi_timeline:
      '6 bis 12 Monate (stärkt primär die Verhandlungsposition für High-Ticket Retainer)',
    faqs: [
      {
        question: 'Warum sind Award-Winning-Animationen so teuer?',
        answer:
          'Flüssige, komplexe Animationen erfordern tiefgreifendes Frontend-Engineering (oft 50%+ des Budgets), um sicherzustellen, dass sie auf allen Geräten ruckelfrei bei 60 Frames pro Sekunde laufen, ohne die Google Core Web Vitals zu zerstören.',
      },
    ],
  },
  {
    branche: 'Fitnessstudios',
    slug: 'fitnessstudios',
    metaTitle: 'Website Kosten für Fitnessstudios & Personal Trainer',
    metaDescription:
      'Preise für Fitnessstudio-Webseiten: Probetraining-Funnel, Kurspläne via API und lokales SEO.',
    costMin: 2800,
    costMax: 7500,
    currency: 'EUR',
    breakdown: [
      { item: 'Dynamic UI Design', costMin: 900, costMax: 2200 },
      { item: 'Frontend Development', costMin: 1400, costMax: 3800 },
      { item: 'Mitglieder-Funnel & API', costMin: 500, costMax: 1500 },
    ],
    factors: [
      'Nahtlose API-Anbindung an Studio-Management-Software (z.B. Eversports, Magicline)',
      'Optimierter "Kostenloses Probetraining" Funnel (steigert Leads um ca. 22%)',
      'Lokales SEO-Setup zur Dominanz in den Google Maps Resultaten (Local Pack)',
    ],
    roi_timeline:
      '2 bis 5 Monate (durch Reduzierung der Customer Acquisition Costs (CAC) bei Laufkunden)',
    faqs: [
      {
        question: 'Müssen unsere Trainer den Kursplan doppelt pflegen?',
        answer:
          'Nein. Mit einer API-Integration (ca. 800 - 1.500 Euro) zieht sich die Website die aktuellen Kursdaten und Ausfälle in Echtzeit direkt aus Ihrer Magicline- oder Eversports-Software.',
      },
    ],
  },
  {
    branche: 'Logistik',
    slug: 'logistik',
    metaTitle: 'Website Kosten für Speditionen & Logistik',
    metaDescription:
      'Was kostet eine Website für Logistikunternehmen? Preise für B2B-Websites inkl. Sendungsverfolgung und Recruiting.',
    costMin: 5500,
    costMax: 16500,
    currency: 'EUR',
    breakdown: [
      { item: 'Corporate B2B Design', costMin: 1600, costMax: 4500 },
      { item: 'Entwicklung & Tracking API', costMin: 2800, costMax: 8500 },
      { item: 'Karriere-Portal (Kraftfahrer)', costMin: 1100, costMax: 3500 },
    ],
    factors: [
      'Schnittstellen zur Sendungsverfolgung (Track & Trace API) für B2B-Kunden',
      'Spezialisiertes Recruiting-Portal für Berufskraftfahrer (One-Click-Bewerbung ohne Lebenslauf)',
      'Multilinguale Architektur für den internationalen Frachtverkehr',
    ],
    roi_timeline: '5 bis 8 Monate (Amortisation durch beschleunigte Besetzung von Fahrer-Vakanzen)',
    faqs: [
      {
        question: 'Wie rekrutieren wir LKW-Fahrer über die Website?',
        answer:
          'Fahrer bewerben sich mobil aus der Kabine. Ein klassisches Formular funktioniert nicht. Wir implementieren WhatsApp-Bewerbungen und 60-Sekunden-Funnels, was die Conversion-Rate oft um 300% steigert.',
      },
    ],
  },
  {
    branche: 'Architekten',
    slug: 'architekten',
    metaTitle: 'Website Kosten für Architekturbüros',
    metaDescription:
      'Kostenaufschlüsselung für Architekten-Websites: High-Res Portfolios, Minimalistisches Webdesign und B2B SEO.',
    costMin: 4000,
    costMax: 13000,
    currency: 'EUR',
    breakdown: [
      { item: 'Minimalistic Premium UI', costMin: 1400, costMax: 4500 },
      { item: 'Media-Heavy Development', costMin: 1800, costMax: 6500 },
      { item: 'CMS für Projekt-Portfolios', costMin: 800, costMax: 2000 },
    ],
    factors: [
      'Next-Gen Bildoptimierung (AVIF/WebP) für extrem hochauflösende Renderings ohne Ladezeit-Verlust',
      'Komplexes, fließendes Portfolio-Filtering (Masonry-Grids)',
      'Subtiles, preisgekröntes Interaktions-Design, das den Fokus auf die Architektur lenkt',
    ],
    roi_timeline:
      '6 bis 10 Monate (dient oft als zentrales Pitch-Element bei Bauträger-Ausschreibungen)',
    faqs: [
      {
        question: 'Wie bleiben riesige Projektbilder performant?',
        answer:
          'Durch serverseitige Bild-Skalierung (Next.js Image) und Lazy-Loading. Die Website lädt nur die Bilder, die der User sieht. Das hält den PageSpeed über 90, selbst bei 4K-Bildern.',
      },
    ],
  },
  {
    branche: 'Coaching',
    slug: 'coaching',
    metaTitle: 'Website Kosten für Coaches & Berater',
    metaDescription:
      'Was kostet eine Website für Business- und Life-Coaches? Kosten für Video-Funnels und Personal Branding.',
    costMin: 3500,
    costMax: 10500,
    currency: 'EUR',
    breakdown: [
      { item: 'Personal Branding UI', costMin: 1100, costMax: 3000 },
      { item: 'Funnel Development', costMin: 1400, costMax: 4800 },
      { item: 'Automation & Termin-API', costMin: 1000, costMax: 2700 },
    ],
    factors: [
      'Aufbau eines hochkonvertierenden Video-Sales-Letter (VSL) Funnels',
      'Tiefgreifende Automatisierung (Zapier/Make) zwischen Website, CRM (ActiveCampaign) und Kalender',
      'Social-Proof-Sektionen zur psychologischen Conversion-Steigerung',
    ],
    roi_timeline: '1 bis 3 Monate (durch den direkten Verkauf von High-Ticket Coaching-Paketen)',
    faqs: [
      {
        question: 'Ersetzt die Website externe Funnel-Builder wie ClickFunnels?',
        answer:
          'Ja. Eine maßgeschneiderte React-Website konvertiert besser, hat keine monatlichen Abo-Kosten (oft 300€+/Monat bei Tools) und lädt in Millisekunden, was die Abbruchraten bei Ads halbiert.',
      },
    ],
  },
  {
    branche: 'Events',
    slug: 'events',
    metaTitle: 'Website Kosten für Eventagenturen & Messen',
    metaDescription:
      'Preise für Event-Websites. Ticketverkauf, interaktive Lineups und emotionale Bildsprache.',
    costMin: 4500,
    costMax: 16000,
    currency: 'EUR',
    breakdown: [
      { item: 'Emotional Design', costMin: 1400, costMax: 4500 },
      { item: 'Ticketing & Event-System', costMin: 2200, costMax: 8500 },
      { item: 'Performance & Scaling', costMin: 900, costMax: 3000 },
    ],
    factors: [
      'Architektur für extreme Traffic-Spitzen (Serverless Caching für Ticket-Drops)',
      'Integration von Ticketing-Anbietern (Eventbrite, Ticketmaster API)',
      'Interaktive, filterbare Festival- oder Konferenz-Zeitpläne',
    ],
    roi_timeline: '3 bis 6 Monate (ROI pro Event durch erhöhten direkten Ticket-Absatz)',
    faqs: [
      {
        question: 'Bricht die Seite beim Vorverkaufsstart zusammen?',
        answer:
          'Nicht bei moderner Serverless-Architektur (wie Vercel/Next.js). Durch Edge-Caching kann die Seite zehntausende parallele Zugriffe verarbeiten, was bei traditionellen WordPress-Servern oft zum Absturz führt.',
      },
    ],
  },
  {
    branche: 'Startups',
    slug: 'startups',
    metaTitle: 'Website Kosten für Tech-Startups (Seed/Series A)',
    metaDescription:
      'Pricing für Tech-Startup Websites. Schnelle Iteration, Investoren-Pitch-Design und tiefes Tracking.',
    costMin: 5500,
    costMax: 22000,
    currency: 'EUR',
    breakdown: [
      { item: 'Pitch-Deck / Innovatives UI', costMin: 1800, costMax: 6500 },
      { item: 'Agile Frontend Development', costMin: 2700, costMax: 11000 },
      { item: 'Analytics & A/B Testing', costMin: 1000, costMax: 4500 },
    ],
    factors: [
      'Integration komplexer Analytics (PostHog, Amplitude) zur Messung der User-Journey',
      'Flexibles Headless CMS-Setup, um dem Growth-Team stündliche A/B-Tests zu ermöglichen',
      'Hochwertige interaktive Demos (Product-Led-Growth Architektur)',
    ],
    roi_timeline:
      '3 bis 5 Monate (durch Senkung der Customer Acquisition Costs (CAC) und Investor-Trust)',
    faqs: [
      {
        question: 'Warum ist eine flexible CMS-Architektur für Startups so wichtig?',
        answer:
          'In der Seed-Phase ändert sich das Messaging wöchentlich. Ein Headless CMS ermöglicht es dem Marketing-Team, Landingpages für Kampagnen ohne Entwickler in Minuten zu launchen.',
      },
    ],
  },
  {
    branche: 'Vereine',
    slug: 'vereine',
    metaTitle: 'Website Kosten für Vereine & Verbände',
    metaDescription:
      'Kosten für Vereinswebsites: Mitgliederportale, Spenden-Funnel und einfache Redaktionssysteme.',
    costMin: 2800,
    costMax: 8500,
    currency: 'EUR',
    breakdown: [
      { item: 'Accessible UI Design', costMin: 900, costMax: 2200 },
      { item: 'CMS & Development', costMin: 1400, costMax: 4800 },
      { item: 'Spenden-/Mitglieder-Tools', costMin: 500, costMax: 1500 },
    ],
    factors: [
      'Extrem intuitives CMS-Interface (Sanity Studio) für ehrenamtliche Laien-Redakteure',
      'Reibungslose Integration von Spendenformularen (z.B. Twingly, PayPal)',
      'Passwortgeschützte Intranet-Bereiche für Vereinsdokumente',
    ],
    roi_timeline:
      'Vereinsabhängig (oft finanziert durch erhöhte Spenden-Conversions und weniger Verwaltungsaufwand)',
    faqs: [
      {
        question: 'Ist das System von ehrenamtlichen Mitarbeitern ohne IT-Kenntnisse bedienbar?',
        answer:
          'Ja. Im Gegensatz zum komplexen WordPress-Backend konfigurieren wir Headless CMS-Oberflächen so, dass Redakteure visuell und ohne Risiko, das Layout zu zerstören, arbeiten können.',
      },
    ],
  },
  {
    branche: 'Hotellerie',
    slug: 'hotellerie',
    metaTitle: 'Website Kosten für Hotels & Resorts',
    metaDescription:
      'Was kostet eine Hotel-Website? Channel-Manager, Booking Engines und visuelle Experiences.',
    costMin: 6500,
    costMax: 28000,
    currency: 'EUR',
    breakdown: [
      { item: 'Premium Hospitality Design', costMin: 2200, costMax: 8000 },
      { item: 'Booking Engine (IBE) API', costMin: 3200, costMax: 13000 },
      { item: 'SEO & Mehrsprachigkeit', costMin: 1100, costMax: 7000 },
    ],
    factors: [
      'Tiefe API-Anbindung an Internet Booking Engines (IBE) wie DIRS21, HotelSpider oder Mews',
      'Hreflang-optimierte Mehrsprachigkeit für internationale Märkte',
      'High-Performance Video-Header, die das Buchungs-Erlebnis emotional aufladen',
    ],
    roi_timeline:
      '4 bis 8 Monate (Amortisation durch Einsparung der 15-20% OTA-Provisionen bei Booking.com)',
    faqs: [
      {
        question: 'Wie steigern wir Direktbuchungen gegenüber Booking.com?',
        answer:
          'Durch Preisparität und eine User-Experience, die besser ist als die von Booking.com. Schnelle Ladezeiten, exklusive "Direct Booking Perks" und eine reibungslose IBE-Integration senken die OTA-Abhängigkeit.',
      },
    ],
  },
  {
    branche: 'Handel',
    slug: 'handel',
    metaTitle: 'Website Kosten für stationären Einzelhandel',
    metaDescription:
      'Preise für Retail-Websites: Click-and-Collect, lokales Inventar und Filial-Finder.',
    costMin: 3500,
    costMax: 13500,
    currency: 'EUR',
    breakdown: [
      { item: 'Retail UI/UX', costMin: 1100, costMax: 3500 },
      { item: 'O2O (Online to Offline) Features', costMin: 1800, costMax: 7500 },
      { item: 'Local SEO & Store-Locator', costMin: 600, costMax: 2500 },
    ],
    factors: [
      'Entwicklung von Store-Locators (Mapbox/Google Maps API) mit individuellen Öffnungszeiten',
      'Integration von Click-and-Collect oder lokalen Inventar-Prüfungen (Google LIA)',
      'Omnichannel-Tracking zur Messung von Online-Recherche zu Offline-Kauf (ROPO-Effekt)',
    ],
    roi_timeline: '5 bis 7 Monate (gemessen an erhöhter Footfall-Frequenz in den Filialen)',
    faqs: [
      {
        question: 'Was bringt eine Website ohne Onlineshop?',
        answer:
          'Rund 80% der stationären Käufe werden heute online recherchiert (ROPO). Eine performante Website mit lokalen Bestandsdaten führt Kunden direkt von der Google Suche in Ihr Geschäft.',
      },
    ],
  },
  {
    branche: 'Software',
    slug: 'software',
    metaTitle: 'Website Kosten für Softwareentwickler & Systemhäuser',
    metaDescription: 'B2B Software-Websites: Kosten für Dokumentations-Portale, API-Demos und MDX.',
    costMin: 7500,
    costMax: 27000,
    currency: 'EUR',
    breakdown: [
      { item: 'Tech-Forward UI & Darkmode', costMin: 2200, costMax: 6500 },
      { item: 'Complex Integrations', costMin: 3800, costMax: 15000 },
      { item: 'Docs (MDX) & API Portal', costMin: 1500, costMax: 5500 },
    ],
    factors: [
      'Aufbau Git-basierter Dokumentationsportale (mit MDX), die von Entwicklern über GitHub gepflegt werden',
      'Interaktive, ausführbare Code-Snippets (z.B. Sandpack) direkt in der Website',
      'Nativer Dark Mode Support (essenziell für die Entwickler-Zielgruppe)',
    ],
    roi_timeline:
      '4 bis 8 Monate (beschleunigt durch geringere Support-Tickets dank herausragender Docs)',
    faqs: [
      {
        question: 'Wie pflegen unsere Entwickler die Dokumentation?',
        answer:
          'Wir implementieren MDX-basierte Systeme. Ihre Entwickler schreiben Markdown in ihrem gewohnten Code-Editor und pushen auf GitHub – die Website rendert daraus automatisch interaktive Doku-Seiten.',
      },
    ],
  },
  {
    branche: 'Bauunternehmen',
    slug: 'bauunternehmen',
    metaTitle: 'Website Kosten für Bauunternehmen & Bauträger',
    metaDescription:
      'Website Kosten in der Baubranche: Projekt-Showcases, Fachkräfte-Recruiting und Investor-Relations.',
    costMin: 4800,
    costMax: 16500,
    currency: 'EUR',
    breakdown: [
      { item: 'Corporate Trust Design', costMin: 1400, costMax: 4500 },
      { item: 'Projekt-CMS & Development', costMin: 2200, costMax: 8500 },
      { item: 'Recruiting-Funnel (Gewerbe)', costMin: 1200, costMax: 3500 },
    ],
    factors: [
      'Headless CMS zur einfachen Pflege von Bautagebüchern und Immobilien-Referenzen',
      'Spezifische Recruiting-Funnels für gewerbliche Mitarbeiter (Polier, Bauleiter, Baggerfahrer)',
      'Drohnen-Video-Integration im Header ohne Performance-Verluste',
    ],
    roi_timeline:
      '4 bis 7 Monate (oft primär durch die Einstellung von 1-2 Fachkräften amissioniert)',
    faqs: [
      {
        question: 'Können wir unsere Referenz-Bauprojekte selbst verwalten?',
        answer:
          'Ja. Über das CMS können Sie Projekte mit Eckdaten (Volumen, Bauzeit) und Galerien anlegen. Das System generiert daraus automatisch SEO-optimierte Projektseiten.',
      },
    ],
  },
  {
    branche: 'Fotografen',
    slug: 'fotografen',
    metaTitle: 'Website Kosten für Fotografen & Videographen',
    metaDescription:
      'Preise für Portfolio-Websites. Next-Gen Bildoptimierung, Client-Gallerien und Print-Shops.',
    costMin: 2200,
    costMax: 7500,
    currency: 'EUR',
    breakdown: [
      { item: 'Visual-First Design', costMin: 800, costMax: 2200 },
      { item: 'Performance & Galerie-System', costMin: 1100, costMax: 4200 },
      { item: 'Shop/Client-Area', costMin: 300, costMax: 1100 },
    ],
    factors: [
      'Implementierung passwortgeschützter, performanter Galerien für Kunden-Shootings',
      'Integration von kleinen E-Commerce Modulen (Stripe/Shopify Lite) für Print-Verkäufe',
      'Extreme Performance-Optimierung (WebP/AVIF Formatierung im Build-Prozess)',
    ],
    roi_timeline: '2 bis 4 Monate (durch direkten Booking-Zuwachs und Print-Verkäufe)',
    faqs: [
      {
        question: 'Werden meine hochauflösenden Bilder die Seite verlangsamen?',
        answer:
          'Nein. Moderne Frontend-Frameworks wie Next.js generieren automatisch responsive Bildgrößen (WebP) und laden diese "lazy" (erst beim Scrollen). Die Qualität bleibt makellos, die Ladezeit minimal.',
      },
    ],
  },
  {
    branche: 'Apotheken',
    slug: 'apotheken',
    metaTitle: 'Website Kosten für Apotheken',
    metaDescription:
      'Kosten für Apotheken-Websites: E-Rezept-Upload, Notdienstkalender und lokales Suchvolumen.',
    costMin: 2800,
    costMax: 8500,
    currency: 'EUR',
    breakdown: [
      { item: 'Trust & Clean UI', costMin: 900, costMax: 2200 },
      { item: 'Schnittstellen & Security', costMin: 1400, costMax: 4800 },
      { item: 'Local SEO (Notdienst)', costMin: 500, costMax: 1500 },
    ],
    factors: [
      'Hochsichere, verschlüsselte Formulare für E-Rezept Uploads (Telematikinfrastruktur-Vorbereitung)',
      'Automatisierte API-Integration des offiziellen Apotheken-Notdienstkalenders',
      'Lokales SEO-Targeting für "Notfall Apotheke [Stadt]" zur Kundengewinnung',
    ],
    roi_timeline: '3 bis 5 Monate (durch Umsatzsteigerung im OTC-Sortiment via Click & Collect)',
    faqs: [
      {
        question: 'Ist die Übermittlung von Rezepten datenschutzrechtlich sicher?',
        answer:
          'Wir implementieren AES-256 Verschlüsselung auf Formular-Ebene und nutzen ausschließlich DSGVO-konforme Serverstandorte (ISO 27001) in Deutschland.',
      },
    ],
  },
  {
    branche: 'Schulen',
    slug: 'schulen',
    metaTitle: 'Website Kosten für Schulen & Bildungseinrichtungen',
    metaDescription:
      'Preise für Schul-Websites. Strikte Barrierefreiheit (WCAG), Vertretungsplan-API und Intranet.',
    costMin: 4500,
    costMax: 13500,
    currency: 'EUR',
    breakdown: [
      { item: 'Accessibility (WCAG) Design', costMin: 1200, costMax: 3500 },
      { item: 'CMS & Frontend', costMin: 2200, costMax: 6800 },
      { item: 'Schnittstellen (Stundenplan)', costMin: 1100, costMax: 3200 },
    ],
    factors: [
      'Garantierte Barrierefreiheit nach WCAG 2.1 AA/AAA (gesetzliche Vorgabe für öffentliche Einrichtungen nach BITV 2.0)',
      'API-Integration von Vertretungsplan-Software (z.B. WebUntis)',
      'Internes Dashboard zur sicheren Kommunikation für das Lehrerkollegium',
    ],
    roi_timeline:
      'Institutionell (Fokus auf drastische Reduktion administrativer Telefon-Rückfragen)',
    faqs: [
      {
        question: 'Erfüllt die Seite alle gesetzlichen Vorgaben für Schulen?',
        answer:
          'Absolut. Neben der strengen Barrierefreiheit (Kontraste, Screenreader-Kompatibilität) integrieren wir datenschutzsichere Architekturen ohne US-Drittanbieter-Tracking.',
      },
    ],
  },
  {
    branche: 'KfZ',
    slug: 'kfz',
    metaTitle: 'Website Kosten für KfZ-Werkstätten & Autohäuser',
    metaDescription:
      'Kosten für Werkstatt-Webseiten: Mobile-Booking, Mobile.de Schnittstelle und Local SEO.',
    costMin: 2800,
    costMax: 9800,
    currency: 'EUR',
    breakdown: [
      { item: 'Lokales Conversion-Design', costMin: 900, costMax: 2800 },
      { item: 'Development & Fahrzeug-APIs', costMin: 1400, costMax: 5500 },
      { item: 'Local SEO & Google Business', costMin: 500, costMax: 1500 },
    ],
    factors: [
      'Mobile.de Händler-API Integration zur automatischen Synchronisation des Fahrzeugbestandes',
      'Intelligente Online-Terminvergabe für Inspektionen und Reifenwechsel (steigert Auslastung um 15%)',
      'Integration von Werkstatt-Bewertungen zur Steigerung des lokalen Trust-Faktors',
    ],
    roi_timeline:
      '3 bis 6 Monate (durch Einsparung von Personalzeit bei Terminvereinbarungen und mehr Probefahrten)',
    faqs: [
      {
        question: 'Müssen wir unsere Autos doppelt einpflegen?',
        answer:
          'Nein. Mit der Mobile.de API (ca. 1.500 - 3.000€) werden Fahrzeuge, die Sie bei Mobile.de einstellen, automatisch auf Ihrer eigenen Website im Design Ihres Autohauses angezeigt.',
      },
    ],
  },
  {
    branche: 'Kosmetik',
    slug: 'kosmetik',
    metaTitle: 'Website Kosten für Kosmetikstudios & Friseure',
    metaDescription:
      'Preise für Beauty-Websites: Terminbuchungs-Integration, Social Media Sync und Gutschein-Verkauf.',
    costMin: 1800,
    costMax: 5500,
    currency: 'EUR',
    breakdown: [
      { item: 'Aesthetic Premium UI Design', costMin: 600, costMax: 1800 },
      { item: 'Development & Animation', costMin: 900, costMax: 2700 },
      { item: 'Booking-Setup & E-Commerce', costMin: 300, costMax: 1000 },
    ],
    factors: [
      'Nahtlose Einbindung von Terminsoftware (Treatwell, Phorest, Shore)',
      'Automatisierter Instagram/TikTok-Feed (Edge-Cached für Performance)',
      'Implementation eines leichten E-Commerce Systems (Stripe) für den vollautomatisierten Gutscheinverkauf',
    ],
    roi_timeline:
      '1 bis 3 Monate (oft extrem schnell durch passive Gutschein-Verkäufe vor Feiertagen amortisiert)',
    faqs: [
      {
        question: 'Lohnt sich ein Online-Gutscheinverkauf?',
        answer:
          'Massiv. Ein integrierter Stripe-Checkout ermöglicht den 24/7 Kauf von Gutscheinen. Unsere Kunden generieren vor Weihnachten oder Muttertag oft mehrere Tausend Euro passiven Umsatz dadurch.',
      },
    ],
  },
  {
    branche: 'Tierärzte',
    slug: 'tierärzte',
    metaTitle: 'Website Kosten für Tierärzte & Tierkliniken',
    metaDescription:
      'Kosten für Tierarzt-Webseiten. Notfall-Architektur, Terminvergabe und Vertrauensaufbau (Trust-SEO).',
    costMin: 2800,
    costMax: 7800,
    currency: 'EUR',
    breakdown: [
      { item: 'Trust & Empathy UI', costMin: 900, costMax: 2200 },
      { item: 'Development & CMS', costMin: 1300, costMax: 4400 },
      { item: 'Local SEO (Notdienst)', costMin: 600, costMax: 1200 },
    ],
    factors: [
      'Sticky-Notfall-Architektur für Mobile (1-Click Notruf), da 85% der Notfallsuchen auf dem Handy passieren',
      'Digitale Anamnesebögen zur Zeitersparnis im Wartezimmer',
      'Lokales SEO für hochprofitable Nischen (z.B. "Tierkardiologie [Stadt]" oder "Goldimplantate Hund")',
    ],
    roi_timeline: '3 bis 5 Monate (durch Zugewinn lukrativer Spezialbehandlungen über Nischen-SEO)',
    faqs: [
      {
        question: 'Warum ist die mobile Performance für Tierärzte so kritisch?',
        answer:
          'Im tiermedizinischen Notfall suchen Besitzer auf dem Smartphone und klicken das erste, schnell ladende Ergebnis mit einer sichtbaren Telefonnummer. Ladezeiten über 2 Sekunden kosten hier buchstäblich Patienten.',
      },
    ],
  },
];

export function getAiCostBySlug(slug: string): AiCostData | undefined {
  return aiCostData.find((data) => data.slug === slug);
}

export function getAllAiCostSlugs(): string[] {
  return aiCostData.map((data) => data.slug);
}
