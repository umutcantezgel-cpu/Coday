// AUTO-GENERATED SSOT: Transparent-Pricing-Pages (Phase 78)
// This file contains 15 pricing bundles for Coday's services.

export interface PricingFaq {
  question: string;
  answer: string;
}

export interface PricingDuration {
  minDays: number;
  maxDays: number;
  text: string;
  isoDuration: string; // e.g. 'P30D' for Schema.org Offer.deliveryLeadTime
}

export interface PricingLocaleData {
  title: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  faqs: PricingFaq[];
}

export interface AiPricingBundle {
  slug: string;
  category: string;
  price: number;
  priceCurrency: string;
  isMonthly: boolean;
  duration: PricingDuration;
  de: PricingLocaleData;
  en: PricingLocaleData;
}

export const aiPricingBundles: AiPricingBundle[] = [
  {
    slug: 'starter-website',
    category: 'Web-Development',
    price: 4900,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 14,
      maxDays: 30,
      text: '2-4 Wochen',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Starter-Website',
      description:
        'Perfekt für junge Unternehmen und lokale Dienstleister, die eine professionelle, blitzschnelle und conversion-optimierte Online-Präsenz benötigen. Kein Template-Brei, sondern maßgeschneiderte Performance.',
      inclusions: [
        'Custom Design (Figma) für bis zu 5 Unterseiten',
        'Next.js / React Frontend',
        'Lighthouse-Score 90+ garantiert',
        'Responsive & Mobile-First Umsetzung',
        'Basic SEO (Meta-Tags, Sitemap)',
        'DSGVO-konformes Cookie-Banner',
      ],
      exclusions: [
        'Content-Erstellung (Texte/Bilder)',
        'Komplexe Backend-Logik / Datenbanken',
        'E-Commerce Funktionalität',
        'Fortlaufende SEO-Optimierung',
      ],
      faqs: [
        {
          question: 'Gibt es versteckte Kosten?',
          answer:
            'Nein, unser Startpreis von 4.900 € deckt die gesamte Konzept-, Design- und Entwicklungsphase für den vereinbarten Scope ab. Hosting und Domain-Kosten fallen separat an.',
        },
        {
          question: 'Kann die Website später erweitert werden?',
          answer:
            'Absolut. Da wir auf moderne Technologien wie Next.js setzen, ist Ihre Website uneingeschränkt skalierbar und kann jederzeit um CMS, Shop-Funktionen oder ein Kundenportal erweitert werden.',
        },
      ],
    },
    en: {
      title: 'Starter Website',
      description:
        'Perfect for new businesses and local service providers needing a professional, lightning-fast, and conversion-optimized online presence. No templates, just custom performance.',
      inclusions: [
        'Custom Design (Figma) up to 5 pages',
        'Next.js / React Frontend',
        'Lighthouse Score 90+ guaranteed',
        'Responsive & Mobile-First implementation',
        'Basic SEO (Meta tags, Sitemap)',
        'GDPR compliant cookie banner',
      ],
      exclusions: [
        'Content creation (Copy/Images)',
        'Complex backend logic / Databases',
        'E-Commerce functionality',
        'Ongoing SEO optimization',
      ],
      faqs: [
        {
          question: 'Are there any hidden costs?',
          answer:
            'No, our starting price covers the entire concept, design, and development phase for the agreed scope. Hosting and domain costs are separate.',
        },
        {
          question: 'Can the website be expanded later?',
          answer:
            'Absolutely. Since we use modern tech like Next.js, your website is infinitely scalable and can be upgraded with CMS, shop features, or a customer portal at any time.',
        },
      ],
    },
  },
  {
    slug: 'business-website',
    category: 'Web-Development',
    price: 9900,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 30,
      maxDays: 60,
      text: '4-8 Wochen',
      isoDuration: 'P60D',
    },
    de: {
      title: 'Business-Website & CMS',
      description:
        'Die Standard-Lösung für etablierte KMUs und Agenturen. Inklusive maßgeschneidertem Headless CMS (Sanity), tiefgehender Zielgruppenanalyse und komplexeren User-Journeys.',
      inclusions: [
        'Design-System in Figma (bis zu 15 Seiten/Templates)',
        'Next.js Frontend (App Router)',
        'Sanity Headless CMS Integration',
        'Dynamische Blog- / Case-Study Architektur',
        'Erweiterte On-Page SEO (Schema.org)',
        'CRM API-Integration (HubSpot, Salesforce etc.)',
      ],
      exclusions: [
        'Migration von tausenden Alt-Beiträgen',
        'E-Commerce Checkout',
        'Individuelle Web-App Module (z.B. Kalkulatoren)',
      ],
      faqs: [
        {
          question: 'Welches CMS nutzen Sie?',
          answer:
            'Wir setzen primär auf Sanity (Headless CMS), da es höchste Performance bietet und Redakteuren maximale Freiheit bei der Content-Pflege ermöglicht, ohne das Frontend zu bremsen.',
        },
        {
          question: 'Übernehmen Sie das Hosting?',
          answer:
            'Wir deployen die Website auf Vercel, kümmern uns um das initiale Setup und übergeben Ihnen die Accounts, sodass Sie 100% Inhaber Ihrer Infrastruktur bleiben.',
        },
      ],
    },
    en: {
      title: 'Business Website & CMS',
      description:
        'The standard solution for established SMEs and agencies. Includes a custom Headless CMS (Sanity), deep target audience analysis, and complex user journeys.',
      inclusions: [
        'Design System in Figma (up to 15 pages/templates)',
        'Next.js Frontend (App Router)',
        'Sanity Headless CMS Integration',
        'Dynamic Blog / Case Study architecture',
        'Advanced On-Page SEO (Schema.org)',
        'CRM API Integration (HubSpot, Salesforce etc.)',
      ],
      exclusions: [
        'Migration of thousands of legacy posts',
        'E-Commerce checkout',
        'Custom web app modules (e.g., calculators)',
      ],
      faqs: [
        {
          question: 'Which CMS do you use?',
          answer:
            'We primarily use Sanity (Headless CMS) because it offers top performance and gives editors maximum freedom in content management without slowing down the frontend.',
        },
        {
          question: 'Do you handle hosting?',
          answer:
            'We deploy the website on Vercel, handle the initial setup, and hand over the accounts so you retain 100% ownership of your infrastructure.',
        },
      ],
    },
  },
  {
    slug: 'ecommerce-shop',
    category: 'Web-Development',
    price: 14900,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 45,
      maxDays: 90,
      text: '6-12 Wochen',
      isoDuration: 'P90D',
    },
    de: {
      title: 'Headless E-Commerce Shop',
      description:
        'Ein entkoppelter, hochperformanter Online-Shop (Shopify Headless + Next.js), der blitzschnelle Ladezeiten garantiert und die Conversion-Rate im Vergleich zu Monolith-Shops drastisch erhöht.',
      inclusions: [
        'Headless Shopify Integration (Storefront API)',
        'Next.js App Router (SSR/ISR für Produkte)',
        'Conversion-optimiertes Checkout-Design',
        'Zahlungsanbieter-Integration (Stripe, PayPal, Klarna)',
        'Kundenkonto & Bestellhistorie',
        'Vercel Analytics & Web Vitals Tracking',
      ],
      exclusions: [
        'Produkt-Datenpflege (Data-Entry)',
        'Produktfotografie',
        'Komplexe ERP-Integrationen (SAP, Navision) - bedarf Custom-Scoping',
      ],
      faqs: [
        {
          question: 'Warum Headless Shopify?',
          answer:
            'Durch die Trennung von Frontend (Next.js) und Backend (Shopify) laden die Seiten in Millisekunden. Studien zeigen, dass jede Sekunde Ladezeit 7% Conversion kostet. Headless eliminiert dieses Problem.',
        },
        {
          question: 'Wer pflegt die Produkte ein?',
          answer:
            'Sie können Produkte ganz gewohnt über das Shopify-Dashboard einpflegen. Das Next.js Frontend holt sich die Daten automatisch ab.',
        },
      ],
    },
    en: {
      title: 'Headless E-Commerce Shop',
      description:
        'A decoupled, high-performance online shop (Shopify Headless + Next.js) that guarantees lightning-fast load times and drastically increases the conversion rate compared to monolith shops.',
      inclusions: [
        'Headless Shopify Integration (Storefront API)',
        'Next.js App Router (SSR/ISR for products)',
        'Conversion-optimized checkout design',
        'Payment provider integration (Stripe, PayPal, Klarna)',
        'Customer account & order history',
        'Vercel Analytics & Web Vitals Tracking',
      ],
      exclusions: [
        'Product data entry',
        'Product photography',
        'Complex ERP integrations (SAP, Navision) - requires custom scoping',
      ],
      faqs: [
        {
          question: 'Why Headless Shopify?',
          answer:
            'By separating the frontend (Next.js) and backend (Shopify), pages load in milliseconds. Studies show every second of load time costs 7% conversion. Headless eliminates this.',
        },
        {
          question: 'Who enters the products?',
          answer:
            'You manage products normally via the Shopify dashboard. The Next.js frontend automatically fetches the data.',
        },
      ],
    },
  },
  {
    slug: 'enterprise-web-app',
    category: 'Web-Development',
    price: 39900,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 90,
      maxDays: 180,
      text: '3-6 Monate',
      isoDuration: 'P180D',
    },
    de: {
      title: 'Next.js Enterprise Web-App',
      description:
        'SaaS-Produkte, interne Dashboards oder komplexe Marktplätze. Wir entwickeln skalierbare Architekturen mit Supabase/PostgreSQL, strengem Typensystem und Enterprise-Sicherheit.',
      inclusions: [
        'Fullstack Next.js Entwicklung (React 19)',
        'PostgreSQL / Supabase Backend Architektur',
        'Auth & Role-Based Access Control (RBAC)',
        'Echtzeit-Daten & WebSockets',
        'Umfangreiches UI/UX Design System',
        'Automatisierte Tests (Playwright/Jest)',
        'SOC2 Vorbereitung',
      ],
      exclusions: ['Legal-Docs für Marktplätze', 'Laufender 24/7 Support (Retainer erforderlich)'],
      faqs: [
        {
          question: 'Welchen Stack nutzen Sie für Enterprise?',
          answer:
            'Wir standardisieren auf Next.js, TypeScript, Tailwind CSS, und Supabase (Postgres). Dies garantiert Typesafety von der Datenbank bis ins UI und ermöglicht massive Skalierbarkeit.',
        },
        {
          question: 'Bieten Sie nach dem Launch Support an?',
          answer:
            'Ja, für Enterprise-Projekte schließen wir in der Regel einen SLA-Retainer ab, der garantierte Reaktionszeiten, Security-Patches und kontinuierliche Weiterentwicklung beinhaltet.',
        },
      ],
    },
    en: {
      title: 'Next.js Enterprise Web App',
      description:
        'SaaS products, internal dashboards, or complex marketplaces. We develop scalable architectures with Supabase/PostgreSQL, strict typing, and enterprise security.',
      inclusions: [
        'Fullstack Next.js Development (React 19)',
        'PostgreSQL / Supabase Backend Architecture',
        'Auth & Role-Based Access Control (RBAC)',
        'Real-time data & WebSockets',
        'Comprehensive UI/UX Design System',
        'Automated testing (Playwright/Jest)',
        'SOC2 Preparation',
      ],
      exclusions: ['Legal docs for marketplaces', 'Ongoing 24/7 support (Retainer required)'],
      faqs: [
        {
          question: 'What stack do you use for Enterprise?',
          answer:
            'We standardize on Next.js, TypeScript, Tailwind CSS, and Supabase (Postgres). This guarantees type safety from the database to the UI and enables massive scalability.',
        },
        {
          question: 'Do you offer post-launch support?',
          answer:
            'Yes, for Enterprise projects we typically set up an SLA retainer covering guaranteed response times, security patches, and continuous development.',
        },
      ],
    },
  },
  {
    slug: 'headless-cms-migration',
    category: 'Web-Development',
    price: 19900,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 60,
      maxDays: 90,
      text: '8-12 Wochen',
      isoDuration: 'P90D',
    },
    de: {
      title: 'WordPress zu Headless CMS Migration',
      description:
        'Retten Sie Ihre Rankings und Performance. Wir migrieren veraltete, langsame WordPress-Systeme auf ein modernes Next.js + Sanity Setup – ohne SEO-Traffic zu verlieren.',
      inclusions: [
        'Audit der bestehenden WordPress-Inhalte',
        'Datenmigration (Posts, Pages, Custom Fields) zu Sanity',
        'Neu-Aufbau des Frontends in Next.js',
        '1:1 301-Redirect Mapping',
        'Performance-Steigerung (Ziel: 90+ Lighthouse)',
        'Schulung des Redaktionsteams in Sanity',
      ],
      exclusions: [
        'Neu-Design der gesamten Marke (Re-Branding)',
        'Migration defekter / veralteter Plugins (Werden durch Custom Code ersetzt)',
      ],
      faqs: [
        {
          question: 'Verliere ich durch den Wechsel mein Google-Ranking?',
          answer:
            'Im Gegenteil. Durch minutiöses 301-Redirect-Mapping fangen wir bestehende Backlinks auf. Die drastisch verbesserte Performance (Core Web Vitals) führt mittelfristig meist zu deutlichen Ranking-Gewinnen.',
        },
      ],
    },
    en: {
      title: 'WordPress to Headless CMS Migration',
      description:
        'Save your rankings and performance. We migrate outdated, slow WordPress systems to a modern Next.js + Sanity setup—without losing SEO traffic.',
      inclusions: [
        'Audit of existing WordPress content',
        'Data migration (Posts, Pages, Custom Fields) to Sanity',
        'Rebuilding the frontend in Next.js',
        '1:1 301-Redirect Mapping',
        'Performance boost (Target: 90+ Lighthouse)',
        'Training the editorial team in Sanity',
      ],
      exclusions: [
        'Complete brand redesign (Re-branding)',
        'Migration of broken/outdated plugins (Replaced by custom code)',
      ],
      faqs: [
        {
          question: 'Will I lose my Google ranking by switching?',
          answer:
            'On the contrary. Through meticulous 301 redirect mapping, we secure existing backlinks. The drastically improved performance (Core Web Vitals) usually leads to significant ranking gains in the medium term.',
        },
      ],
    },
  },
  {
    slug: 'seo-starter-paket',
    category: 'SEO & Performance',
    price: 2490,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 14,
      maxDays: 30,
      text: '2-4 Wochen',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Technical & On-Page SEO Starter',
      description:
        'Das Fundament für organische Sichtbarkeit. Wir analysieren Ihre Website, beheben technische Fehler und optimieren Ihre wichtigsten Core-Pages für Google.',
      inclusions: [
        'Keyword-Analyse für 5 Core-Pages',
        'Technical SEO Audit & Fixing (Canonical, Hreflang, Robots)',
        'Optimierung von Meta-Titles & Descriptions',
        'H1-H6 Hierarchie-Optimierung',
        'Google Search Console Setup & Sitemap Submission',
      ],
      exclusions: [
        'Fortlaufende Off-Page SEO (Backlink Building)',
        'Regelmäßige Content-Produktion (Blog-Artikel)',
      ],
      faqs: [
        {
          question: 'Ist das ein einmaliger Service?',
          answer:
            'Ja, das Starter-Paket ist ein einmaliges Setup, um Ihre Website technisch und inhaltlich auf ein solides SEO-Fundament zu stellen. Danach empfehlen wir den SEO-Retainer.',
        },
      ],
    },
    en: {
      title: 'Technical & On-Page SEO Starter',
      description:
        'The foundation for organic visibility. We analyze your website, fix technical errors, and optimize your most important core pages for Google.',
      inclusions: [
        'Keyword analysis for 5 core pages',
        'Technical SEO audit & fixing (Canonical, Hreflang, Robots)',
        'Optimization of Meta Titles & Descriptions',
        'H1-H6 hierarchy optimization',
        'Google Search Console Setup & Sitemap Submission',
      ],
      exclusions: [
        'Ongoing Off-Page SEO (Backlink Building)',
        'Regular content production (Blog articles)',
      ],
      faqs: [
        {
          question: 'Is this a one-time service?',
          answer:
            'Yes, the Starter Package is a one-time setup to establish a solid technical and content SEO foundation. Afterwards, we recommend the SEO Retainer.',
        },
      ],
    },
  },
  {
    slug: 'seo-full-service-retainer',
    category: 'SEO & Performance',
    price: 1490,
    priceCurrency: 'EUR',
    isMonthly: true,
    duration: {
      minDays: 30,
      maxDays: 30,
      text: 'Monatlich',
      isoDuration: 'P30D',
    },
    de: {
      title: 'SEO Full-Service Retainer',
      description:
        'Kontinuierliches SEO-Wachstum als Managed Service. Wir bauen thematische Autorität auf, publizieren Content und sichern Top-Rankings in umkämpften Nischen.',
      inclusions: [
        'Laufendes Keyword-Tracking & Reporting',
        'Erstellung von 2-4 Long-Form Content Pieces / Monat',
        'Programmatic SEO Setup für Local-SEO',
        'Laufende Schema.org Anpassungen',
        'Wettbewerbsüberwachung',
        'Monatlicher Strategie-Call',
      ],
      exclusions: ['Werbebudget für SEA (Google Ads)'],
      faqs: [
        {
          question: 'Wann sehe ich Ergebnisse?',
          answer:
            'SEO ist ein Marathon, kein Sprint. Erste technische Verbesserungen wirken sofort, aber Content-Rankings dauern in der Regel 3-6 Monate, um messbaren ROI zu generieren.',
        },
      ],
    },
    en: {
      title: 'SEO Full-Service Retainer',
      description:
        'Continuous SEO growth as a managed service. We build topical authority, publish content, and secure top rankings in competitive niches.',
      inclusions: [
        'Ongoing Keyword Tracking & Reporting',
        'Creation of 2-4 long-form content pieces / month',
        'Programmatic SEO Setup for Local SEO',
        'Ongoing Schema.org adjustments',
        'Competitor monitoring',
        'Monthly strategy call',
      ],
      exclusions: ['Ad budget for SEA (Google Ads)'],
      faqs: [
        {
          question: 'When will I see results?',
          answer:
            'SEO is a marathon, not a sprint. Initial technical improvements take effect immediately, but content rankings typically take 3-6 months to generate measurable ROI.',
        },
      ],
    },
  },
  {
    slug: 'cwv-performance-audit',
    category: 'SEO & Performance',
    price: 990,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 5,
      maxDays: 10,
      text: '1-2 Wochen',
      isoDuration: 'P10D',
    },
    de: {
      title: 'Core Web Vitals Audit',
      description:
        'Ihre Website ist zu langsam und verliert Rankings? Wir analysieren LCP, CLS und INP tiefgreifend und liefern einen Code-ready Action-Plan zur Behebung.',
      inclusions: [
        'Detaillierte Analyse der Core Web Vitals',
        'Identifikation von Render-Blocking Resources',
        'Bild- & Video-Optimierungsstrategie',
        'JavaScript-Bundle Size Analyse',
        'Handlungsempfehlungen (Task-Liste für Devs)',
      ],
      exclusions: ['Aktive Behebung der Code-Fehler (Implementierung wird separat angeboten)'],
      faqs: [
        {
          question: 'Setzen Sie die Empfehlungen auch um?',
          answer:
            'Dieser Preis umfasst den Audit und den Action-Plan. Wenn Sie möchten, dass wir die Optimierungen implementieren, erstellen wir auf Basis des Audits ein passendes Angebot.',
        },
      ],
    },
    en: {
      title: 'Core Web Vitals Audit',
      description:
        'Your website is too slow and losing rankings? We deeply analyze LCP, CLS, and INP and provide a code-ready action plan for fixing.',
      inclusions: [
        'Detailed analysis of Core Web Vitals',
        'Identification of Render-Blocking Resources',
        'Image & Video optimization strategy',
        'JavaScript Bundle Size analysis',
        'Actionable recommendations (Task list for devs)',
      ],
      exclusions: ['Active fixing of code errors (Implementation is offered separately)'],
      faqs: [
        {
          question: 'Do you also implement the recommendations?',
          answer:
            'This price covers the audit and action plan. If you want us to implement the optimizations, we will provide a custom quote based on the audit.',
        },
      ],
    },
  },
  {
    slug: 'accessibility-audit',
    category: 'SEO & Performance',
    price: 1490,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 7,
      maxDays: 14,
      text: '1-2 Wochen',
      isoDuration: 'P14D',
    },
    de: {
      title: 'Accessibility Audit (BFSG-Ready)',
      description:
        'Bereiten Sie sich auf das Barrierefreiheitsstärkungsgesetz vor. Wir prüfen Ihre Web-App auf WCAG 2.1 AA Konformität und bewahren Sie vor Abmahnungen.',
      inclusions: [
        'Screenreader-Testing (VoiceOver/NVDA)',
        'Tastatur-Navigations-Audit',
        'Kontrast- und Farb-Prüfung',
        'ARIA-Label Analyse',
        'BFSG Konformitäts-Report',
      ],
      exclusions: ['Code-Fixes der identifizierten Barrieren'],
      faqs: [
        {
          question: 'Ist mein Unternehmen vom BFSG betroffen?',
          answer:
            'Ab Juni 2025 müssen viele kommerzielle Websites im B2C-Bereich (insb. E-Commerce) barrierefrei sein. Wir helfen Ihnen, das Risiko zu evaluieren.',
        },
      ],
    },
    en: {
      title: 'Accessibility Audit',
      description:
        'Prepare for accessibility compliance laws. We test your web app for WCAG 2.1 AA compliance to protect you from legal issues and expand your audience.',
      inclusions: [
        'Screen reader testing (VoiceOver/NVDA)',
        'Keyboard navigation audit',
        'Contrast and color check',
        'ARIA label analysis',
        'Compliance report',
      ],
      exclusions: ['Code fixes for identified barriers'],
      faqs: [
        {
          question: 'Why is accessibility important?',
          answer:
            'Beyond legal requirements in many regions (like the European Accessibility Act), it ensures your website is usable by 15-20% of the population living with disabilities.',
        },
      ],
    },
  },
  {
    slug: 'website-maintenance',
    category: 'Retainer & Compliance',
    price: 490,
    priceCurrency: 'EUR',
    isMonthly: true,
    duration: {
      minDays: 30,
      maxDays: 30,
      text: 'Monatlich',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Website Maintenance Retainer',
      description:
        'Sorgenfreiheit nach dem Launch. Wir halten Ihre NPM-Packages aktuell, überwachen die Uptime und spielen proaktiv Security-Patches ein.',
      inclusions: [
        'Monatliche Dependency-Updates (Vite, React, Node)',
        'Proaktives Security-Patching',
        '24/7 Uptime-Monitoring',
        'Sentry Error-Tracking & Bug-Fixing (bis zu 2h/M)',
        'Monatlicher Status-Report',
      ],
      exclusions: ['Entwicklung neuer Features / Unterseiten'],
      faqs: [
        {
          question: 'Brauche ich Wartung bei einer modernen Next.js Seite?',
          answer:
            'Ja. Das Web-Ecosystem entwickelt sich rasend schnell. Bibliotheken erhalten fast wöchentlich Updates, teils mit kritischen Security-Patches. Ohne Wartung veraltet der Code schnell.',
        },
      ],
    },
    en: {
      title: 'Website Maintenance Retainer',
      description:
        'Peace of mind after launch. We keep your NPM packages updated, monitor uptime, and proactively apply security patches.',
      inclusions: [
        'Monthly dependency updates (Vite, React, Node)',
        'Proactive security patching',
        '24/7 Uptime monitoring',
        'Sentry error tracking & bug fixing (up to 2h/M)',
        'Monthly status report',
      ],
      exclusions: ['Development of new features / pages'],
      faqs: [
        {
          question: 'Do I need maintenance for a modern Next.js site?',
          answer:
            'Yes. The web ecosystem evolves rapidly. Libraries receive updates almost weekly, sometimes with critical security patches. Without maintenance, the code quickly becomes outdated.',
        },
      ],
    },
  },
  {
    slug: 'content-produktion',
    category: 'Retainer & Compliance',
    price: 890,
    priceCurrency: 'EUR',
    isMonthly: true,
    duration: {
      minDays: 30,
      maxDays: 30,
      text: 'Monatlich',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Content-Produktions-Retainer',
      description:
        'Wir versorgen Ihre Website regelmäßig mit SEO-optimiertem, hochqualitativem Fach-Content, um Ihre Themenautorität bei Google aufzubauen.',
      inclusions: [
        'Redaktionsplanung (Content Calendar)',
        'Erstellung von 2 tiefgreifenden Fachartikeln (Blog) pro Monat',
        'SEO-Optimierung (WDF*IDF, Keywords)',
        'Einpflege ins CMS inkl. Formatierung',
        'Erstellung von OpenGraph Beitragsbildern',
      ],
      exclusions: ['Social Media Management (Instagram/LinkedIn Posts)'],
      faqs: [
        {
          question: 'Nutzen Sie KI für die Texte?',
          answer:
            'Wir nutzen KI zur Recherche und für Entwürfe, aber jeder Text wird durch einen menschlichen Copywriter redigiert, auf Fakten geprüft und mit Ihrer Brand-Voice abgeglichen ("Human-in-the-Loop").',
        },
      ],
    },
    en: {
      title: 'Content Production Retainer',
      description:
        'We regularly supply your website with SEO-optimized, high-quality expert content to build your topical authority on Google.',
      inclusions: [
        'Editorial planning (Content Calendar)',
        'Creation of 2 deep-dive expert articles (Blog) per month',
        'SEO optimization (Keywords, semantic structure)',
        'CMS entry incl. formatting',
        'Creation of OpenGraph featured images',
      ],
      exclusions: ['Social Media Management (Instagram/LinkedIn posts)'],
      faqs: [
        {
          question: 'Do you use AI for the texts?',
          answer:
            'We use AI for research and drafting, but every text is edited by a human copywriter, fact-checked, and aligned with your brand voice ("Human-in-the-Loop").',
        },
      ],
    },
  },
  {
    slug: 'dsgvo-compliance-check',
    category: 'Retainer & Compliance',
    price: 690,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 3,
      maxDays: 7,
      text: '3-7 Tage',
      isoDuration: 'P7D',
    },
    de: {
      title: 'DSGVO Compliance-Check',
      description:
        'Sind Ihre Google Fonts lokal? Ist das Cookie-Banner rechtssicher? Wir prüfen Ihr technisches Setup auf typische DSGVO-Fallen.',
      inclusions: [
        'Prüfung der Cookie-Consent-Implementierung (Consent Mode v2)',
        'Netzwerk-Analyse auf Drittanbieter-Requests',
        'Lokal-Hosting Check für Schriften & Assets',
        'Prüfung von Tracking-Skripten (GA4, Meta Pixel)',
        'Technischer Maßnahmen-Katalog',
      ],
      exclusions: [
        'Rechtsberatung (Wir sind keine Anwälte, wir prüfen nur die technische Implementierung)',
      ],
      faqs: [
        {
          question: 'Ersetzt dies eine Rechtsberatung?',
          answer:
            'Nein. Wir prüfen die *technische* Umsetzung (z.B. ob ein Skript feuert, bevor der User zustimmt). Für die Erstellung rechtssicherer Datenschutzerklärungen verweisen wir auf IT-Fachanwälte.',
        },
      ],
    },
    en: {
      title: 'GDPR Compliance Check',
      description:
        'Are your Google Fonts local? Is the cookie banner legally compliant? We check your technical setup for typical GDPR traps.',
      inclusions: [
        'Review of cookie consent implementation (Consent Mode v2)',
        'Network analysis for third-party requests',
        'Local hosting check for fonts & assets',
        'Review of tracking scripts (GA4, Meta Pixel)',
        'Technical action catalog',
      ],
      exclusions: ['Legal advice (We are not lawyers, we only check the technical implementation)'],
      faqs: [
        {
          question: 'Does this replace legal advice?',
          answer:
            'No. We check the *technical* implementation (e.g., whether a script fires before the user consents). For legally compliant privacy policies, we refer to specialized IT lawyers.',
        },
      ],
    },
  },
  {
    slug: 'ai-integration-basic',
    category: 'Retainer & Compliance',
    price: 3490,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 14,
      maxDays: 30,
      text: '2-4 Wochen',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Website AI-Integration (Basic)',
      description:
        'Rüsten Sie Ihre bestehende Website mit KI-Fähigkeiten auf. Wir implementieren intelligente Suchfunktionen oder RAG-basierte Support-Chatbots.',
      inclusions: [
        'Integration der OpenAI / Anthropic API',
        'Aufbau einer Vektordatenbank (Pinecone / Supabase pgvector)',
        'Ingestion Ihrer Unternehmensdaten (PDFs, FAQs)',
        'Custom Chatbot-UI in Ihrem Corporate Design',
        'Prompt-Engineering für sichere Antworten',
      ],
      exclusions: [
        'Laufende API-Kosten (OpenAI Token)',
        'Komplexe Agenten-Workflows mit externen Actions',
      ],
      faqs: [
        {
          question: 'Halluziniert der Bot nicht?',
          answer:
            'Durch "Retrieval-Augmented Generation" (RAG) zwingen wir die KI, Antworten ausschließlich auf Basis Ihrer bereitgestellten Dokumente zu formulieren. Die Fehlerquote sinkt dadurch drastisch.',
        },
      ],
    },
    en: {
      title: 'Website AI Integration (Basic)',
      description:
        'Upgrade your existing website with AI capabilities. We implement intelligent search functions or RAG-based support chatbots.',
      inclusions: [
        'Integration of OpenAI / Anthropic API',
        'Vector database setup (Pinecone / Supabase pgvector)',
        'Ingestion of your company data (PDFs, FAQs)',
        'Custom chatbot UI in your corporate design',
        'Prompt engineering for safe answers',
      ],
      exclusions: [
        'Ongoing API costs (OpenAI tokens)',
        'Complex agent workflows with external actions',
      ],
      faqs: [
        {
          question: 'Does the bot hallucinate?',
          answer:
            'Through "Retrieval-Augmented Generation" (RAG), we force the AI to formulate answers exclusively based on your provided documents. This drastically reduces the error rate.',
        },
      ],
    },
  },
  {
    slug: 'conversion-rate-optimierung',
    category: 'Retainer & Compliance',
    price: 2900,
    priceCurrency: 'EUR',
    isMonthly: true,
    duration: {
      minDays: 30,
      maxDays: 30,
      text: 'Monatlich',
      isoDuration: 'P30D',
    },
    de: {
      title: 'CRO (Conversion Rate Optimierung)',
      description:
        'Machen Sie aus Besuchern mehr Leads. Wir nutzen datengetriebene A/B-Tests, Heatmaps und Psychologie, um Ihre Website-Conversion zu maximieren.',
      inclusions: [
        'Setup von Hotjar & User-Session-Recording',
        'Erstellung von Hypothesen für A/B Tests',
        'Design & Code der Test-Varianten (z.B. in VWO)',
        'Statistische Auswertung nach Laufzeit',
        'Hardcode-Implementierung der Gewinner-Variante',
      ],
      exclusions: [
        'Generierung von neuem Traffic (Sie benötigen mind. 5000 Besucher/Monat für statistische Signifikanz)',
      ],
      faqs: [
        {
          question: 'Macht das für meine kleine Seite Sinn?',
          answer:
            'CRO ergibt erst ab einem gewissen Traffic-Volumen (ca. 5.000 bis 10.000 monatliche Besucher) Sinn, da A/B-Tests sonst keine statistisch belastbaren Ergebnisse liefern.',
        },
      ],
    },
    en: {
      title: 'CRO (Conversion Rate Optimization)',
      description:
        'Turn visitors into leads. We use data-driven A/B tests, heatmaps, and psychology to maximize your website conversion.',
      inclusions: [
        'Setup of Hotjar & User Session Recording',
        'Creation of hypotheses for A/B tests',
        'Design & code of test variants (e.g., in VWO)',
        'Statistical evaluation after runtime',
        'Hardcode implementation of the winning variant',
      ],
      exclusions: [
        'Generation of new traffic (You need at least 5000 visitors/month for statistical significance)',
      ],
      faqs: [
        {
          question: 'Does this make sense for my small site?',
          answer:
            'CRO only makes sense above a certain traffic volume (approx. 5,000 to 10,000 monthly visitors), as A/B tests otherwise do not provide statistically reliable results.',
        },
      ],
    },
  },
  {
    slug: 'security-audit',
    category: 'Retainer & Compliance',
    price: 1990,
    priceCurrency: 'EUR',
    isMonthly: false,
    duration: {
      minDays: 7,
      maxDays: 14,
      text: '1-2 Wochen',
      isoDuration: 'P14D',
    },
    de: {
      title: 'Web-Security Audit',
      description:
        'Schützen Sie Ihre Nutzerdaten und Ihren Ruf. Wir penetrieren Ihre Web-Applikation und decken Schwachstellen nach OWASP Top 10 auf.',
      inclusions: [
        'Prüfung auf XSS, CSRF und SQL-Injection',
        'Analyse von Authentication & Session-Management',
        'Check der HTTP-Security Header (CSP, HSTS)',
        'Dependency Vulnerability Scan',
        'Detaillierter Audit-Report für Ihr Dev-Team',
      ],
      exclusions: ['Automatisierte DDoS-Simulationen', 'Behebung der gefundenen Lücken'],
      faqs: [
        {
          question: 'Was ist die OWASP Top 10?',
          answer:
            'Die Open Web Application Security Project (OWASP) Top 10 ist ein Standarddokument für Entwickler und Sicherheitsbeauftragte. Es repräsentiert einen breiten Konsens über die kritischsten Sicherheitsrisiken für Webanwendungen.',
        },
      ],
    },
    en: {
      title: 'Web Security Audit',
      description:
        'Protect your user data and reputation. We penetrate your web application and uncover vulnerabilities according to OWASP Top 10.',
      inclusions: [
        'Testing for XSS, CSRF, and SQL Injection',
        'Analysis of Authentication & Session Management',
        'Check of HTTP Security Headers (CSP, HSTS)',
        'Dependency Vulnerability Scan',
        'Detailed Audit Report for your dev team',
      ],
      exclusions: ['Automated DDoS simulations', 'Fixing the discovered vulnerabilities'],
      faqs: [
        {
          question: 'What is the OWASP Top 10?',
          answer:
            'The Open Web Application Security Project (OWASP) Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.',
        },
      ],
    },
  },
];
