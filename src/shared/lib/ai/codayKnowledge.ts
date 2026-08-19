/**
 * Coday Knowledge Base for Codi AI Assistant
 *
 * This file contains all company information extracted from the website
 * to provide Codi with comprehensive knowledge about Coday.
 */

export const CODAY_KNOWLEDGE_BASE = {
  // ============================================================
  // UNTERNEHMENSIDENTITAET
  // ============================================================
  company: {
    name: 'Coday',
    tagline: 'The Agency Killer',
    slogan: 'Wir bauen Ihren Digitalen Erfolg.',
    mission:
      'Coday ist der neue Standard. Wir kombinieren strategisches Design mit High-End Engineering. Keine Baukästen, keine Ausreden. Nur Ergebnisse, die Ihr Unternehmen voranbringen.',
    philosophy:
      'Traditionelle Agenturen sind Geschichte. Sie bezahlen für Overhead, Meetings und ineffiziente Prozesse. Das alte Agenturmodell funktioniert nicht mehr für moderne KMUs.',
    differentiators: [
      'Schnell. Skalierbar. Professionell.',
      'ROI-fokussiert. Ergebnisorientiert.',
      'Premium Design. High-End Code.',
      'Keine Ausreden. Nur Ergebnisse.',
    ],
  },

  // ============================================================
  // KONTAKTDATEN
  // ============================================================
  contact: {
    legalEntity: 'Umutcan Emre Tezgel',
    address: 'Lessingstraße 4, 35578 Wetzlar, Deutschland',
    email: 'kontakt@codayweb.de',
    phone: '+49 176 41195301',
    website: 'https://www.codayweb.de',
    websiteAlternative: 'https://codayweb.de',
    booking: 'https://www.codayweb.de/de/contact',
    whatsapp: 'https://api.whatsapp.com/send?phone=4917641195301',
  },

  // ============================================================
  // STATISTIKEN & KENNZAHLEN
  // ============================================================
  stats: {
    avgLoadTime: '0.5 Sekunden',
    codeOwnership: '100%',
    support: '24h Support',
    focus: 'ROI-fokussiert',
    rating: '5.0 Sterne Bewertung',
    standard: 'Exzellenz als Standard',
  },

  // ============================================================
  // PREISPAKETE
  // ============================================================
  packages: {
    model:
      'Preise auf Anfrage — Individuelle, verbindliche Festpreise nach kostenloser Bedarfsanalyse (5-10x kosteneffizienter als Großagenturen bei 100/100 Spitzenqualität)',
    starter: {
      name: 'Starter / Local Authority',
      tagline: 'Perfekt für Handwerker & lokale Dienstleister',
      setupPrice: 'Auf Anfrage (Bespoke Festpreis)',
      monthlyPrice: 0,
      features: [
        '3-5 Unterseiten',
        'Next.js 15 Server Components',
        '100/100 Core Web Vitals Garantie',
        'Mobile-First Design',
        'Lokale SEO-Optimierung',
        'DSGVO-konformes Kontakt-Backend',
        '100% Quellcode- & Design-Eigentum',
      ],
      notIncluded: ['Headless CMS', 'E-Commerce', '60s Recruiting-Funnel'],
    },
    professional: {
      name: 'Business Enterprise / B2B Power',
      tagline: 'Der Maßstab für den Mittelstand',
      setupPrice: 'Auf Anfrage (Bespoke Festpreis)',
      monthlyPrice: 0,
      popular: true,
      features: [
        'Bis zu 12 Unterseiten',
        'Sanity v3 Headless CMS',
        '60-Sekunden Mobile Express-Recruiting Funnel',
        'Sub-0,3s Ladezeiten & Zero CLS',
        'Technisches SEO & Schema.org Rich Snippets',
        'Maßgeschneidertes Bento-UI & Micro-Animations',
        'Direkter Draht zum Lead-Architekten',
      ],
      notIncluded: ['Vollständiger Shop-Checkout', 'Custom ERP-Deep-Sync'],
    },
    enterprise: {
      name: 'Custom Web App & E-Commerce',
      tagline: 'Volle digitale Power & Skalierbarkeit',
      setupPrice: 'Auf Anfrage (Bespoke Festpreis)',
      monthlyPrice: 0,
      features: [
        'Full-Stack Next.js 15 & React 19 Applikation',
        'Headless E-Commerce (Shopify / Stripe)',
        'B2B Kunden- & Händlerportale',
        'ERP-, CRM- & Datenbank-Anbindung',
        'Instant-Suche & dynamische Filter (Sub-50ms)',
        'Mehrsprachigkeit (next-intl)',
        'CI/CD Pipelines & Priority SLA Support',
      ],
      notIncluded: [],
    },
  },

  // ============================================================
  // DIENSTLEISTUNGEN
  // ============================================================
  services: {
    webDevelopment: {
      name: 'Web Development',
      description:
        'Next.js, React & TypeScript. Wir bauen hochperformante Web-Applikationen, die skalieren.',
      techStack: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind',
        'Node.js',
        'Supabase',
        'Framer Motion',
        'Vercel',
      ],
      url: '/services/web-development',
    },
    webDesign: {
      name: 'Web Design',
      description:
        'Award-winning UX/UI Design. Ästhetik, die Ihre Marke unvergesslich macht und konvertiert.',
      url: '/services/web-design',
    },
    seo: {
      name: 'SEO',
      description:
        'Suchmaschinenoptimierung für bessere Sichtbarkeit und mehr organischen Traffic.',
      url: '/services/seo',
    },
    performance: {
      name: 'Performance',
      description: 'Core Web Vitals Optimierung für schnelle Ladezeiten und bessere Conversion.',
      url: '/services/performance',
    },
    ecommerce: {
      name: 'E-Commerce Development',
      description: 'Conversion-starke Shopsysteme für erfolgreichen Online-Handel.',
      url: '/services/ecommerce-development',
    },
    appDevelopment: {
      name: 'App Development',
      description: 'Native und Cross-Platform App-Entwicklung.',
      url: '/services/app-development',
    },
  },

  // ============================================================
  // BRANCHEN-SPEZIALISIERUNG
  // ============================================================
  industries: {
    handwerk: {
      name: 'Handwerk & Bau',
      description: 'Digitale Mitarbeitergewinnung und Projekt-Showcases.',
      url: '/branchen/handwerk-bau',
    },
    immobilien: {
      name: 'Immobilien',
      description: 'Hochwertige Exposé-Präsentationen und Lead-Generierung.',
      url: '/branchen/immobilien',
    },
    ecommerce: {
      name: 'E-Commerce',
      description: 'Conversion-starke Shopsysteme.',
      url: '/branchen/retail',
    },
    consulting: {
      name: 'Consulting & Dienstleistung',
      description: 'Erstklassiges Personal Branding.',
      url: '/branchen/unternehmensberatung',
    },
    gesundheit: {
      name: 'Gesundheit',
      description: 'Vertrauenswürdige Webauftritte für medizinische Einrichtungen.',
      url: '/branchen/aerzte-gesundheit',
    },
  },

  // ============================================================
  // GARANTIEN
  // ============================================================
  guarantees: {
    festpreis: {
      name: 'Festpreis-Garantie',
      description:
        'Wir arbeiten zum Festpreis. Nachforderungen gibt es bei uns nicht. Alle Preise sind transparent - keine versteckten Kosten.',
    },
    termin: {
      name: 'Termingarantie',
      description: 'Wir garantieren den Launch-Termin vertraglich.',
    },
    bugFree: {
      name: 'Bug-Free Garantie',
      description: '30 Tage Bug-Fixing Garantie nach Launch inklusive.',
    },
  },

  // ============================================================
  // PROZESS (THE CODAY STANDARD)
  // ============================================================
  process: {
    name: 'The Coday Standard',
    tagline: 'Kein Chaos. Nur Ergebnisse.',
    description:
      'Wir haben Entwicklung systematisiert. Kein Rätselraten, keine versteckten Kosten. Ein verlässlicher Prozess für Ihren Erfolg.',
    phases: [
      { name: 'Beratung', description: 'Kostenloses Erstgespräch zur Bedarfsanalyse' },
      { name: 'Konzept', description: 'Strategische Planung und Design-Entwürfe' },
      { name: 'Development', description: 'Umsetzung mit modernsten Technologien' },
      { name: 'Launch', description: 'Go-Live mit vollständiger Qualitätssicherung' },
    ],
  },

  // ============================================================
  // WEBSITE-ANALYZER
  // ============================================================
  analyzer: {
    name: 'Website-Analyzer',
    description:
      'Kostenloser AI-gestützter Website-Audit, der Ihre Website in 6 Kategorien analysiert und konkrete Verbesserungsvorschläge liefert.',
    categories: [
      'Performance (Core Web Vitals)',
      'SEO (Meta-Tags, Keywords)',
      'Sicherheit (HTTPS, Headers)',
      'Barrierefreiheit (WCAG)',
      'UX/Design (Layout, Mobile)',
      'Content (Lesbarkeit, CTAs)',
    ],
    url: '/analyzer',
    features: [
      'Urgency Score (1-100)',
      'PDF Export',
      'Email Report',
      'Terminbuchung direkt im Report',
    ],
  },

  // ============================================================
  // FAQ ANTWORTEN
  // ============================================================
  faq: {
    pricing:
      'Unsere Websites starten ab 1.250 EUR (Starter-Paket). Das meistgewählte Professional-Paket kostet 2.150 EUR. E-Commerce und Enterprise-Lösungen ab 2.950 EUR.',
    timeline:
      'Je nach Paket und Komplexität: Starter in 2-3 Wochen, Professional in 4-6 Wochen, Enterprise individuell nach Projektumfang.',
    technology:
      'Wir arbeiten ausschließlich mit dem modernen Stack: Next.js, React, TypeScript, Tailwind CSS, Node.js und Supabase. Keine Website-Baukästen.',
    codeOwnership:
      '100% Code-Eigentum. Sie erhalten den kompletten Quellcode und sind nicht von uns abhängig.',
    support:
      'Im Starter-Paket 30 Tage Support, in allen anderen Paketen optional buchbar. 24/7 Support ist im Enterprise-Paket verfügbar.',
    consultation:
      'Vereinbaren Sie ein kostenloses 30-minütiges Beratungsgespräch über unseren Kalender.',
  },
};

export default CODAY_KNOWLEDGE_BASE;
