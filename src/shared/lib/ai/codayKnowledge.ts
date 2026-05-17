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
    email: 'umut@codayweb.de',
    phone: '+49 176 41195301',
    website: 'https://www.codayweb.de',
    websiteAlternative: 'https://codayweb.de',
    calendly: 'https://calendly.com/coday-beratung/30min',
    whatsapp: 'https://wa.me/4917641195301',
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
  // PREISPAKETE (AKTUELL MIT 25% RABATT)
  // ============================================================
  packages: {
    starter: {
      name: 'Starter',
      tagline: 'Perfekt für den Start',
      setupPrice: 939, // Euro (rabattiert von 1250)
      originalPrice: 1250,
      monthlyPrice: 49,
      features: [
        '3-5 Unterseiten',
        'Professionelle Landing Page',
        'Responsive Design',
        'Basis SEO-Optimierung',
        'SSL-Zertifikat',
        '3 Revisionsrunden',
        'Google Analytics Setup',
        '30 Tage Support',
      ],
      notIncluded: ['CMS-System', 'E-Commerce', 'Individuelle Funktionen'],
    },
    professional: {
      name: 'Professional',
      tagline: 'Unser Bestseller',
      setupPrice: 1619, // Euro (rabattiert von 2150)
      originalPrice: 2150,
      monthlyPrice: 99,
      popular: true,
      features: [
        '7-10 Unterseiten',
        'Content Management System',
        'Erweiterte SEO-Strategie',
        'Performance-Optimierung',
        'Blog-Integration',
        'Kontaktformulare',
        '5 Revisionsrunden',
        'Hosting inklusive',
        'Support optional buchbar',
      ],
      notIncluded: ['E-Commerce Features', 'Custom App Development'],
    },
    enterprise: {
      name: 'Enterprise',
      tagline: 'Volle Power',
      setupPrice: 2219, // Euro (rabattiert von 2950)
      originalPrice: 2950,
      monthlyPrice: 199,
      features: [
        'Unbegrenzte Seiten',
        'Custom Web Application',
        'E-Commerce Integration',
        'API-Entwicklung',
        'Premium SEO & Marketing',
        'A/B Testing Setup',
        'Dedizierter Ansprechpartner',
        'SLA-Garantie (Optional)',
        '24/7 Support (Optional)',
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
      url: '/services/ecommerce',
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
      url: '/services/industries/handwerk-bau',
    },
    immobilien: {
      name: 'Immobilien',
      description: 'Hochwertige Exposé-Präsentationen und Lead-Generierung.',
      url: '/services/industries/immobilien-makler',
    },
    ecommerce: {
      name: 'E-Commerce',
      description: 'Conversion-starke Shopsysteme.',
      url: '/services/industries/ecommerce-retail',
    },
    consulting: {
      name: 'Consulting & Dienstleistung',
      description: 'Erstklassiges Personal Branding.',
      url: '/services/industries/unternehmensberatung',
    },
    gesundheit: {
      name: 'Gesundheit',
      description: 'Vertrauenswürdige Webauftritte für medizinische Einrichtungen.',
      url: '/services/industries/aerzte-gesundheit',
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
  // AKTUELLE ANGEBOTE
  // ============================================================
  currentOffers: {
    grandOpening: {
      name: 'Grand Opening Special',
      discount: '25% Rabatt',
      description: 'Auf alle Pakete für begrenzte Zeit.',
    },
  },

  // ============================================================
  // FAQ ANTWORTEN
  // ============================================================
  faq: {
    pricing:
      'Unsere Websites starten ab 939 EUR (Starter-Paket mit 25% Rabatt). Das meistgewählte Professional-Paket kostet 1.619 EUR. E-Commerce und Enterprise-Lösungen ab 2.219 EUR.',
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
