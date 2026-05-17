// AUTO-GENERATED SSOT: Process-Deep-Dives (Phase 77)
// This file contains 20 highly detailed process steps detailing the web design lifecycle.

export interface ProcessMicroStep {
  name: string;
  text: string;
}

export interface ProcessDuration {
  minDays: number;
  maxDays: number;
  text: string;
  isoDuration: string; // e.g. 'P5D' for Schema.org
}

export interface ProcessLocaleData {
  title: string;
  description: string;
  microSteps: ProcessMicroStep[];
}

export interface AiProcessData {
  slug: string;
  number: number;
  category: string;
  codayRole: string;
  clientRole: string;
  tools: string[];
  deliverables: string[];
  duration: ProcessDuration;
  previousStep: string | null;
  nextStep: string | null;
  de: ProcessLocaleData;
  en: ProcessLocaleData;
}

export const aiProcesses: AiProcessData[] = [
  {
    slug: 'erstgespraech',
    number: 1,
    category: 'Strategy & Design',
    codayRole: 'Bedarfsanalyse, Zielgruppen-Definition & Tech-Stack Evaluierung',
    clientRole: 'Bereitstellung von Geschäftsdaten & Zielsetzungen',
    tools: ['Google Meet', 'Notion', 'Miro'],
    deliverables: ['Discovery-Protokoll', 'Grob-Konzept-Scribble'],
    duration: {
      minDays: 1,
      maxDays: 3,
      text: '1-3 Tage',
      isoDuration: 'P3D',
    },
    de: {
      title: 'Strategisches Erstgespräch',
      description:
        'Der erste Touchpoint: Wir analysieren den Status Quo, identifizieren Pain-Points und definieren messbare Ziele für das anstehende Webprojekt.',
      microSteps: [
        {
          name: 'Onboarding Questionnaire',
          text: 'Vorab-Abfrage der Kern-Metriken (CPA, CLV, Traffic).',
        },
        {
          name: 'Deep-Dive Call',
          text: 'Gemeinsame Analyse der Ist-Situation und Ziel-Situation.',
        },
        {
          name: 'Tech-Stack Scoping',
          text: 'Auswahl der optimalen Technologien (z.B. Vite, React, Supabase).',
        },
      ],
    },
    en: {
      title: 'Strategic Discovery Call',
      description:
        'The first touchpoint: We analyze the status quo, identify pain points, and define measurable goals for the upcoming web project.',
      microSteps: [
        {
          name: 'Onboarding Questionnaire',
          text: 'Pre-assessment of core metrics (CPA, CLV, Traffic).',
        },
        {
          name: 'Deep-Dive Call',
          text: 'Joint analysis of the current situation and target state.',
        },
        {
          name: 'Tech-Stack Scoping',
          text: 'Selection of optimal technologies (e.g., Vite, React, Supabase).',
        },
      ],
    },
    previousStep: null,
    nextStep: 'audit-und-recherche',
  },
  {
    slug: 'audit-und-recherche',
    number: 2,
    category: 'Strategy & Design',
    codayRole: 'Wettbewerbsanalyse, SEO-Audit & UX-Evaluierung',
    clientRole: 'Zugriff auf bestehende Analytics (Google Analytics, Search Console)',
    tools: ['Ahrefs', 'Lighthouse', 'Hotjar'],
    deliverables: ['SEO & UX Audit Report', 'Wettbewerbs-Matrix'],
    duration: {
      minDays: 2,
      maxDays: 5,
      text: '2-5 Tage',
      isoDuration: 'P5D',
    },
    de: {
      title: 'Audit & Wettbewerbsrecherche',
      description:
        'Wir durchleuchten den Markt, analysieren die Top-Konkurrenten und decken technische sowie inhaltliche Schwachstellen im bestehenden Setup auf.',
      microSteps: [
        {
          name: 'SEO Gap Analysis',
          text: 'Ermittlung ungenutzter Suchbegriffe und Content-Lücken.',
        },
        {
          name: 'Competitor Benchmarking',
          text: 'Analyse der UI/UX-Patterns der stärksten Marktteilnehmer.',
        },
        {
          name: 'Technical Audit',
          text: 'Prüfung von Ladezeiten, Core Web Vitals und Mobile-Usability.',
        },
      ],
    },
    en: {
      title: 'Audit & Competitor Research',
      description:
        'We examine the market, analyze top competitors, and uncover technical and content-related weaknesses in the existing setup.',
      microSteps: [
        {
          name: 'SEO Gap Analysis',
          text: 'Identification of untapped search terms and content gaps.',
        },
        {
          name: 'Competitor Benchmarking',
          text: 'Analysis of UI/UX patterns of top market players.',
        },
        {
          name: 'Technical Audit',
          text: 'Review of load times, Core Web Vitals, and mobile usability.',
        },
      ],
    },
    previousStep: 'erstgespraech',
    nextStep: 'informationsarchitektur',
  },
  {
    slug: 'informationsarchitektur',
    number: 3,
    category: 'Strategy & Design',
    codayRole: 'Strukturierung von Sitemaps, User-Journeys & Funnel-Logik',
    clientRole: 'Feedback zur Navigationsstruktur & Produktkategorisierung',
    tools: ['Figma', 'Miro', 'MindNode'],
    deliverables: ['Sitemap-Visualisierung', 'User-Journey-Flowcharts'],
    duration: {
      minDays: 1,
      maxDays: 3,
      text: '1-3 Tage',
      isoDuration: 'P3D',
    },
    de: {
      title: 'Informationsarchitektur (IA)',
      description:
        'Das Fundament der Usability: Wir strukturieren Inhalte so, dass User intuitiv navigieren und Suchmaschinen die Hierarchie perfekt crawlen können.',
      microSteps: [
        {
          name: 'Sitemap Definition',
          text: 'Visuelle Strukturierung aller Seiten und Sub-Seiten.',
        },
        {
          name: 'User Flow Mapping',
          text: 'Aufbau der Conversion-Pfade (z.B. Home -> Service -> Kontakt).',
        },
        {
          name: 'Taxonomie & Kategorisierung',
          text: 'Logische Zuordnung von Blog-Posts, Cases und Produkten.',
        },
      ],
    },
    en: {
      title: 'Information Architecture (IA)',
      description:
        'The foundation of usability: We structure content so users navigate intuitively and search engines can perfectly crawl the hierarchy.',
      microSteps: [
        {
          name: 'Sitemap Definition',
          text: 'Visual structuring of all pages and sub-pages.',
        },
        {
          name: 'User Flow Mapping',
          text: 'Construction of conversion paths (e.g., Home -> Service -> Contact).',
        },
        {
          name: 'Taxonomy & Categorization',
          text: 'Logical assignment of blog posts, cases, and products.',
        },
      ],
    },
    previousStep: 'audit-und-recherche',
    nextStep: 'wireframing',
  },
  {
    slug: 'wireframing',
    number: 4,
    category: 'Strategy & Design',
    codayRole: 'Erstellung von Low-Fidelity Layouts zur Struktur-Validierung',
    clientRole: 'Freigabe der Inhaltsblöcke & Seitenstruktur',
    tools: ['Figma', 'Balsamiq'],
    deliverables: ['Interaktiver Low-Fi Prototyp', 'Wireframe-Dokumentation'],
    duration: {
      minDays: 3,
      maxDays: 7,
      text: '3-7 Tage',
      isoDuration: 'P7D',
    },
    de: {
      title: 'Wireframing & Layout-Struktur',
      description:
        'Bevor wir über Farben sprechen, definieren wir die Struktur. Wireframes legen das Skelett der Website fest und priorisieren die Anordnung der Content-Blöcke.',
      microSteps: [
        {
          name: 'Grid-System Aufbau',
          text: 'Definition des responsiven Raster-Systems (Mobile-First).',
        },
        {
          name: 'Block-Placement',
          text: 'Strategische Platzierung von Hero-Sections, Features und CTAs.',
        },
        {
          name: 'Click-Dummy Creation',
          text: 'Verknüpfung der Wireframes zu einem testbaren Flow.',
        },
      ],
    },
    en: {
      title: 'Wireframing & Layout Structure',
      description:
        'Before discussing colors, we define the structure. Wireframes set the website skeleton and prioritize the arrangement of content blocks.',
      microSteps: [
        {
          name: 'Grid System Setup',
          text: 'Definition of the responsive grid system (Mobile-First).',
        },
        {
          name: 'Block Placement',
          text: 'Strategic placement of hero sections, features, and CTAs.',
        },
        {
          name: 'Click Dummy Creation',
          text: 'Linking wireframes into a testable flow.',
        },
      ],
    },
    previousStep: 'informationsarchitektur',
    nextStep: 'ui-design-konzept',
  },
  {
    slug: 'ui-design-konzept',
    number: 5,
    category: 'Strategy & Design',
    codayRole: 'Entwicklung der visuellen Identität (Typografie, Farben, Moodboards)',
    clientRole: 'Design-Feedback & Freigabe der Design-Richtung',
    tools: ['Figma', 'Adobe Creative Cloud'],
    deliverables: ['Design-System (V1)', 'High-Fidelity Mockups (Key-Screens)'],
    duration: {
      minDays: 5,
      maxDays: 10,
      text: '5-10 Tage',
      isoDuration: 'P10D',
    },
    de: {
      title: 'UI Design & Visual Concept',
      description:
        'Das Gesicht der Marke: Wir übersetzen die Wireframes in ein atemberaubendes, hochkonvertierendes User-Interface mit Wow-Faktor.',
      microSteps: [
        {
          name: 'Moodboard & Style-Exploration',
          text: 'Präsentation von 2-3 visuellen Richtungen.',
        },
        {
          name: 'Typografie & Farb-Palette',
          text: 'Auswahl konversionsstarker und barrierefreier Colors/Fonts.',
        },
        {
          name: 'High-Fidelity Screens',
          text: 'Ausarbeitung der Startseite und wichtigster Unterseiten.',
        },
      ],
    },
    en: {
      title: 'UI Design & Visual Concept',
      description:
        'The face of the brand: We translate wireframes into a stunning, high-converting user interface with a wow factor.',
      microSteps: [
        {
          name: 'Moodboard & Style Exploration',
          text: 'Presentation of 2-3 visual directions.',
        },
        {
          name: 'Typography & Color Palette',
          text: 'Selection of high-converting and accessible colors/fonts.',
        },
        {
          name: 'High-Fidelity Screens',
          text: 'Design of the homepage and key subpages.',
        },
      ],
    },
    previousStep: 'wireframing',
    nextStep: 'design-system-komponenten',
  },
  {
    slug: 'design-system-komponenten',
    number: 6,
    category: 'Strategy & Design',
    codayRole: 'Erstellung wiederverwendbarer UI-Komponenten',
    clientRole: 'Keine direkte Aktion erforderlich (Warten auf Freigabe)',
    tools: ['Figma (Variants & Auto-Layout)'],
    deliverables: ['Figma Component Library', 'Design Tokens'],
    duration: {
      minDays: 2,
      maxDays: 5,
      text: '2-5 Tage',
      isoDuration: 'P5D',
    },
    de: {
      title: 'Design-System & Komponenten',
      description:
        'Skalierbarkeit beginnt hier. Wir bauen ein atomares Design-System, das Inkonsistenzen eliminiert und die spätere Entwicklung massiv beschleunigt.',
      microSteps: [
        {
          name: 'Atomic Elements',
          text: 'Erstellung von Buttons, Inputs, Badges und Icons.',
        },
        {
          name: 'Molekulare Komponenten',
          text: 'Zusammenbau von Cards, Navigationsleisten und Formularen.',
        },
        {
          name: 'States & Varianten',
          text: 'Definition von Hover, Active, Disabled und Error-States.',
        },
      ],
    },
    en: {
      title: 'Design System & Components',
      description:
        'Scalability starts here. We build an atomic design system that eliminates inconsistencies and massively accelerates later development.',
      microSteps: [
        {
          name: 'Atomic Elements',
          text: 'Creation of buttons, inputs, badges, and icons.',
        },
        {
          name: 'Molecular Components',
          text: 'Assembly of cards, navigation bars, and forms.',
        },
        {
          name: 'States & Variants',
          text: 'Definition of hover, active, disabled, and error states.',
        },
      ],
    },
    previousStep: 'ui-design-konzept',
    nextStep: 'interaktions-design-prototyping',
  },
  {
    slug: 'interaktions-design-prototyping',
    number: 7,
    category: 'Strategy & Design',
    codayRole: 'Animations-Konzeption & Clickable Prototype',
    clientRole: 'Test des interaktiven Prototyps am eigenen Gerät',
    tools: ['Figma (Prototyping)', 'Framer Motion (Konzept)'],
    deliverables: ['Klickbarer High-Fi Prototyp', 'Animations-Guideline'],
    duration: {
      minDays: 2,
      maxDays: 4,
      text: '2-4 Tage',
      isoDuration: 'P4D',
    },
    de: {
      title: 'Interaction Design & Prototyping',
      description:
        'Eine moderne Website muss sich lebendig anfühlen. Wir definieren Scroll-Animationen, Hover-Effekte und Übergänge, bevor eine Zeile Code geschrieben wird.',
      microSteps: [
        {
          name: 'Micro-Interactions',
          text: 'Feinschliff der Button- und Link-Feedbacks.',
        },
        {
          name: 'Scroll-Trigger',
          text: 'Konzeption von Parallax-Effekten und Fade-Ins.',
        },
        {
          name: 'Prototype Linking',
          text: 'Verknüpfung aller Screens zu einer realitätsnahen Simulation.',
        },
      ],
    },
    en: {
      title: 'Interaction Design & Prototyping',
      description:
        'A modern website must feel alive. We define scroll animations, hover effects, and transitions before a single line of code is written.',
      microSteps: [
        {
          name: 'Micro-Interactions',
          text: 'Polishing button and link feedbacks.',
        },
        {
          name: 'Scroll Triggers',
          text: 'Concepting parallax effects and fade-ins.',
        },
        {
          name: 'Prototype Linking',
          text: 'Linking all screens into a realistic simulation.',
        },
      ],
    },
    previousStep: 'design-system-komponenten',
    nextStep: 'copywriting-content-creation',
  },
  {
    slug: 'copywriting-content-creation',
    number: 8,
    category: 'Strategy & Design',
    codayRole: 'Verfassen von SEO-optimiertem, konversionsstarkem Text',
    clientRole: 'Freigabe der Texte & Bereitstellung von Fach-Spezifika',
    tools: ['Notion', 'ChatGPT/Claude (Drafting)', 'Figma'],
    deliverables: ['Finale Text-Dokumente', 'Content in Figma eingebaut'],
    duration: {
      minDays: 4,
      maxDays: 8,
      text: '4-8 Tage',
      isoDuration: 'P8D',
    },
    de: {
      title: 'Copywriting & Content Creation',
      description:
        'Design lenkt die Aufmerksamkeit, Text verkauft. Wir kreieren neuromarketing-optimierte Copy, die Pain-Points trifft und zum Handeln bewegt.',
      microSteps: [
        {
          name: 'Headline-Engineering',
          text: 'Erarbeitung der wichtigsten H1/H2 Hooks.',
        },
        {
          name: 'Body-Copy & Benefit-Fokus',
          text: 'Transformation von technischen Features in Nutzer-Vorteile.',
        },
        {
          name: 'Micro-Copy & CTAs',
          text: 'Optimierung von Button-Texten, Fehlermeldungen und Tooltips.',
        },
      ],
    },
    en: {
      title: 'Copywriting & Content Creation',
      description:
        'Design directs attention, copy sells. We create neuromarketing-optimized copy that hits pain points and drives action.',
      microSteps: [
        {
          name: 'Headline Engineering',
          text: 'Development of the most important H1/H2 hooks.',
        },
        {
          name: 'Body Copy & Benefit Focus',
          text: 'Transforming technical features into user benefits.',
        },
        {
          name: 'Micro-Copy & CTAs',
          text: 'Optimizing button texts, error messages, and tooltips.',
        },
      ],
    },
    previousStep: 'interaktions-design-prototyping',
    nextStep: 'frontend-architektur-setup',
  },
  {
    slug: 'frontend-architektur-setup',
    number: 9,
    category: 'Engineering',
    codayRole: 'Projekt-Initialisierung, Linter & CI/CD Pipelines',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['Vite', 'React', 'TypeScript', 'GitHub', 'Vercel'],
    deliverables: ['GitHub Repository', 'Initiales Vercel Deployment (Staging)'],
    duration: {
      minDays: 1,
      maxDays: 2,
      text: '1-2 Tage',
      isoDuration: 'P2D',
    },
    de: {
      title: 'Frontend-Architektur & Setup',
      description:
        'Der Startschuss für die Entwicklung. Wir setzen das Code-Repository auf, konfigurieren TypeScript, ESLint und binden die CI/CD-Pipeline an Vercel an.',
      microSteps: [
        {
          name: 'Vite & React Setup',
          text: 'Bootstrapping der Anwendung mit optimalen Build-Settings.',
        },
        {
          name: 'Routing & Folder-Structure',
          text: 'Etablierung der Feature-Sliced-Design (FSD) Architektur.',
        },
        {
          name: 'CI/CD Vercel Integration',
          text: 'Automatisierte Deployments für jeden neuen Git-Commit.',
        },
      ],
    },
    en: {
      title: 'Frontend Architecture & Setup',
      description:
        'The starting gun for development. We set up the code repository, configure TypeScript, ESLint, and connect the CI/CD pipeline to Vercel.',
      microSteps: [
        {
          name: 'Vite & React Setup',
          text: 'Bootstrapping the app with optimal build settings.',
        },
        {
          name: 'Routing & Folder Structure',
          text: 'Establishing the Feature-Sliced-Design (FSD) architecture.',
        },
        {
          name: 'CI/CD Vercel Integration',
          text: 'Automated deployments for every new Git commit.',
        },
      ],
    },
    previousStep: 'copywriting-content-creation',
    nextStep: 'css-framework-design-tokens',
  },
  {
    slug: 'css-framework-design-tokens',
    number: 10,
    category: 'Engineering',
    codayRole: 'Übersetzung des Figma Design-Systems in Code',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['Vanilla CSS', 'CSS Modules'],
    deliverables: ['Globale CSS-Architektur', 'CSS-Variablen (Tokens)'],
    duration: {
      minDays: 1,
      maxDays: 3,
      text: '1-3 Tage',
      isoDuration: 'P3D',
    },
    de: {
      title: 'CSS-Framework & Design Tokens',
      description:
        'Wir exportieren die Design-Tokens aus Figma (Farben, Spacings, Typografie) und implementieren sie als performantes, pures Vanilla CSS-System.',
      microSteps: [
        {
          name: 'Token-Extraktion',
          text: 'Mapping von Figma-Styles auf CSS Custom Properties (:root).',
        },
        {
          name: 'Utility Classes',
          text: 'Aufbau eines modularen Grid- und Spacing-Systems.',
        },
        {
          name: 'Dark Mode Vorbereitung',
          text: 'Implementierung von Color-Inversions für nahtlose Theme-Switches.',
        },
      ],
    },
    en: {
      title: 'CSS Framework & Design Tokens',
      description:
        'We export design tokens from Figma (colors, spacings, typography) and implement them as a performant, pure Vanilla CSS system.',
      microSteps: [
        {
          name: 'Token Extraction',
          text: 'Mapping Figma styles to CSS Custom Properties (:root).',
        },
        {
          name: 'Utility Classes',
          text: 'Building a modular grid and spacing system.',
        },
        {
          name: 'Dark Mode Preparation',
          text: 'Implementing color inversions for seamless theme switches.',
        },
      ],
    },
    previousStep: 'frontend-architektur-setup',
    nextStep: 'ui-komponenten-entwicklung',
  },
  {
    slug: 'ui-komponenten-entwicklung',
    number: 11,
    category: 'Engineering',
    codayRole: 'Programmierung isolierter UI-Bausteine (React Components)',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['React', 'TypeScript', 'Storybook (optional)'],
    deliverables: ['Komplette React Component Library', 'Interaktive UI-Elemente'],
    duration: {
      minDays: 4,
      maxDays: 10,
      text: '4-10 Tage',
      isoDuration: 'P10D',
    },
    de: {
      title: 'UI-Komponenten Entwicklung',
      description:
        'Die Bausteine der Website erwachen zum Leben. Wir programmieren wiederverwendbare, stark typisierte React-Komponenten (Buttons, Cards, Forms).',
      microSteps: [
        {
          name: 'Base Components',
          text: 'Implementierung atomarer Elemente (Buttons, Inputs, Icons).',
        },
        {
          name: 'Complex Blocks',
          text: 'Aufbau von Slidern, Akkordeons und komplexen Layoutelementen.',
        },
        {
          name: 'Accessibility (A11y)',
          text: 'Integration von ARIA-Labels und Tastatur-Navigierbarkeit.',
        },
      ],
    },
    en: {
      title: 'UI Component Development',
      description:
        'The building blocks of the website come to life. We program reusable, strongly-typed React components (buttons, cards, forms).',
      microSteps: [
        {
          name: 'Base Components',
          text: 'Implementation of atomic elements (buttons, inputs, icons).',
        },
        {
          name: 'Complex Blocks',
          text: 'Building sliders, accordions, and complex layout elements.',
        },
        {
          name: 'Accessibility (A11y)',
          text: 'Integration of ARIA labels and keyboard navigability.',
        },
      ],
    },
    previousStep: 'css-framework-design-tokens',
    nextStep: 'page-assembly-routing',
  },
  {
    slug: 'page-assembly-routing',
    number: 12,
    category: 'Engineering',
    codayRole: 'Zusammenbau der Komponenten zu finalen Seiten',
    clientRole: 'Zwischen-Feedback auf der Staging-Umgebung',
    tools: ['React Router', 'Vite'],
    deliverables: ['Navigierbare Staging-Website', 'Alle Route-Pfade existent'],
    duration: {
      minDays: 5,
      maxDays: 12,
      text: '5-12 Tage',
      isoDuration: 'P12D',
    },
    de: {
      title: 'Page Assembly & Routing',
      description:
        'Wir setzen die entwickelten Komponenten wie Lego-Steine zusammen. Es entstehen die fertigen Layouts der Startseite und aller Unterseiten.',
      microSteps: [
        {
          name: 'Route Definition',
          text: 'Konfiguration des React Routers für blitzschnelle Navigation.',
        },
        {
          name: 'Layout-Integration',
          text: 'Anwendung von Headern, Footern und globalen Wrappern.',
        },
        {
          name: 'Content Injection',
          text: 'Einpflege der fertigen Copywriting-Texte in die Komponenten.',
        },
      ],
    },
    en: {
      title: 'Page Assembly & Routing',
      description:
        'We assemble the developed components like Lego bricks. The finished layouts of the homepage and all subpages are created.',
      microSteps: [
        {
          name: 'Route Definition',
          text: 'Configuring React Router for lightning-fast navigation.',
        },
        {
          name: 'Layout Integration',
          text: 'Application of headers, footers, and global wrappers.',
        },
        {
          name: 'Content Injection',
          text: 'Inserting the finished copywriting texts into the components.',
        },
      ],
    },
    previousStep: 'ui-komponenten-entwicklung',
    nextStep: 'animationen-framer-motion',
  },
  {
    slug: 'animationen-framer-motion',
    number: 13,
    category: 'Engineering',
    codayRole: 'Programmierung komplexer Animationen und Übergänge',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['Framer Motion', 'Vanilla CSS Transitions'],
    deliverables: ['Flüssige Scroll-Animationen', 'Page-Transitions'],
    duration: {
      minDays: 2,
      maxDays: 5,
      text: '2-5 Tage',
      isoDuration: 'P5D',
    },
    de: {
      title: 'Animationen & Framer Motion',
      description:
        'Das "Wow"-Erlebnis wird einprogrammiert. Mit Framer Motion sorgen wir für butterweiche Scroll-Ereignisse, Fade-Ins und komplexe State-Transitions.',
      microSteps: [
        {
          name: 'Page-Transitions',
          text: 'Nahtlose Übergänge zwischen den einzelnen Routen.',
        },
        {
          name: 'Scroll-Reveal',
          text: 'Elemente faden weich ein, sobald sie in den Viewport scrollen.',
        },
        {
          name: 'Performance Tuning',
          text: 'Sicherstellen von konstanten 60FPS auch auf mobilen Geräten.',
        },
      ],
    },
    en: {
      title: 'Animations & Framer Motion',
      description:
        'The "wow" experience is programmed. With Framer Motion, we ensure buttery smooth scroll events, fade-ins, and complex state transitions.',
      microSteps: [
        {
          name: 'Page Transitions',
          text: 'Seamless transitions between individual routes.',
        },
        {
          name: 'Scroll Reveal',
          text: 'Elements fade in smoothly as they scroll into the viewport.',
        },
        {
          name: 'Performance Tuning',
          text: 'Ensuring a constant 60FPS even on mobile devices.',
        },
      ],
    },
    previousStep: 'page-assembly-routing',
    nextStep: 'backend-api-integrationen',
  },
  {
    slug: 'backend-api-integrationen',
    number: 14,
    category: 'Engineering',
    codayRole: 'Anbindung von Datenbanken, CMS oder Drittsystemen',
    clientRole: 'Bereitstellung von API-Keys (z.B. Stripe, HubSpot)',
    tools: ['Supabase', 'Node.js', 'PostgreSQL'],
    deliverables: ['Funktionierende Formulare', 'Datenbank-Anbindung (falls Scope)'],
    duration: {
      minDays: 3,
      maxDays: 8,
      text: '3-8 Tage',
      isoDuration: 'P8D',
    },
    de: {
      title: 'Backend & API Integrationen',
      description:
        'Wir verbinden das Frontend mit der echten Welt. Kontaktformulare werden an das CRM gesendet, Newsletter-Opt-Ins verarbeitet und externe Datenquellen synchronisiert.',
      microSteps: [
        {
          name: 'Formular-Verarbeitung',
          text: 'Sichere Anbindung von Kontaktformularen inkl. Spam-Schutz (Turnstile).',
        },
        {
          name: 'CRM/Tool Anbindung',
          text: 'API-Integrationen zu HubSpot, Mailchimp oder internen Systemen.',
        },
        {
          name: 'Datenbank-Setup (Optional)',
          text: 'Konfiguration von Supabase für dynamische Web-App-Features.',
        },
      ],
    },
    en: {
      title: 'Backend & API Integrations',
      description:
        'We connect the frontend to the real world. Contact forms are sent to the CRM, newsletter opt-ins are processed, and external data sources are synchronized.',
      microSteps: [
        {
          name: 'Form Processing',
          text: 'Secure integration of contact forms incl. spam protection (Turnstile).',
        },
        {
          name: 'CRM/Tool Integration',
          text: 'API integrations to HubSpot, Mailchimp, or internal systems.',
        },
        {
          name: 'Database Setup (Optional)',
          text: 'Configuring Supabase for dynamic web app features.',
        },
      ],
    },
    previousStep: 'animationen-framer-motion',
    nextStep: 'seo-schema-struktur',
  },
  {
    slug: 'seo-schema-struktur',
    number: 15,
    category: 'Engineering',
    codayRole: 'Einsatz technischer SEO-Maßnahmen & JSON-LD',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['Helmet/Meta Tags', 'Schema.org'],
    deliverables: ['Dynamische Meta-Tags', 'Rich Results Markup (JSON-LD)'],
    duration: {
      minDays: 2,
      maxDays: 4,
      text: '2-4 Tage',
      isoDuration: 'P4D',
    },
    de: {
      title: 'Technische SEO & Schema.org',
      description:
        'Unsichtbar für den User, entscheidend für Google. Wir implementieren dynamische Meta-Tags, Canonical URLs und tiefgreifendes JSON-LD Schema (HowTo, FAQ, Article).',
      microSteps: [
        {
          name: 'Meta-Data Management',
          text: 'Dynamische Generierung von Titles, Descriptions und OpenGraph-Bildern.',
        },
        {
          name: 'JSON-LD Injection',
          text: 'Einbau strukturierter Daten zur Erlangung von Google Rich Results.',
        },
        {
          name: 'Sitemap & Robots.txt',
          text: 'Automatische Generierung der XML-Sitemaps für schnelle Indexierung.',
        },
      ],
    },
    en: {
      title: 'Technical SEO & Schema.org',
      description:
        'Invisible to the user, crucial for Google. We implement dynamic meta tags, canonical URLs, and deep JSON-LD Schema (HowTo, FAQ, Article).',
      microSteps: [
        {
          name: 'Meta-Data Management',
          text: 'Dynamic generation of Titles, Descriptions, and OpenGraph images.',
        },
        {
          name: 'JSON-LD Injection',
          text: 'Incorporation of structured data to achieve Google Rich Results.',
        },
        {
          name: 'Sitemap & Robots.txt',
          text: 'Automatic generation of XML sitemaps for fast indexing.',
        },
      ],
    },
    previousStep: 'backend-api-integrationen',
    nextStep: 'qa-testing-launch',
  },
  {
    slug: 'qa-testing-launch',
    number: 16,
    category: 'Engineering',
    codayRole: 'Umfassende Qualitätskontrolle & Live-Gang',
    clientRole: 'Finale Abnahme (UAT) & DNS-Zonen Zugriff',
    tools: ['Playwright', 'BrowserStack', 'Vercel'],
    deliverables: ['Live-geschaltete Website', 'Performance Audit Report'],
    duration: {
      minDays: 2,
      maxDays: 4,
      text: '2-4 Tage',
      isoDuration: 'P4D',
    },
    de: {
      title: 'QA, Testing & Launch',
      description:
        'Vor dem Go-Live wird alles auf Herz und Nieren geprüft. Cross-Browser-Tests, Performance-Audits und die finale Domain-Umschaltung stehen hier an.',
      microSteps: [
        {
          name: 'Cross-Device Testing',
          text: 'Prüfung auf iOS, Android, Safari, Chrome und Firefox.',
        },
        {
          name: 'Performance Audit',
          text: 'Lighthouse-Checks für 100/100 Scores in Speed und Accessibility.',
        },
        {
          name: 'DNS & Go-Live',
          text: 'Konfiguration der A-Records und CNAMEs für einen reibungslosen Launch.',
        },
      ],
    },
    en: {
      title: 'QA, Testing & Launch',
      description:
        'Before going live, everything is put through its paces. Cross-browser tests, performance audits, and the final domain switch are done here.',
      microSteps: [
        {
          name: 'Cross-Device Testing',
          text: 'Testing on iOS, Android, Safari, Chrome, and Firefox.',
        },
        {
          name: 'Performance Audit',
          text: 'Lighthouse checks for 100/100 scores in Speed and Accessibility.',
        },
        {
          name: 'DNS & Go-Live',
          text: 'Configuration of A-records and CNAMEs for a smooth launch.',
        },
      ],
    },
    previousStep: 'seo-schema-struktur',
    nextStep: 'post-launch-monitoring',
  },
  {
    slug: 'post-launch-monitoring',
    number: 17,
    category: 'Growth & Maintenance',
    codayRole: 'Einrichtung von Analytics & Uptime-Monitoring',
    clientRole: 'Keine Aktion erforderlich',
    tools: ['Google Analytics', 'Search Console', 'Sentry'],
    deliverables: ['Analytics Dashboard', 'Error-Tracking System'],
    duration: {
      minDays: 1,
      maxDays: 2,
      text: '1-2 Tage',
      isoDuration: 'P2D',
    },
    de: {
      title: 'Post-Launch Monitoring',
      description:
        'Nach dem Launch beginnt die Überwachung. Wir richten Error-Tracking ein, um Fehler in Echtzeit zu fangen, bevor User sie überhaupt bemerken.',
      microSteps: [
        {
          name: 'Error Tracking (Sentry)',
          text: 'Automatische Alerts bei JavaScript-Fehlern in der Production.',
        },
        {
          name: 'Google Search Console',
          text: 'Einreichung der Sitemap und Überwachung der Indexierung.',
        },
        {
          name: 'Analytics Setup',
          text: 'Konfiguration der Conversion-Ziele (Events) in GA4 oder Plausible.',
        },
      ],
    },
    en: {
      title: 'Post-Launch Monitoring',
      description:
        'After the launch, monitoring begins. We set up error tracking to catch bugs in real-time before users even notice them.',
      microSteps: [
        {
          name: 'Error Tracking (Sentry)',
          text: 'Automatic alerts for JavaScript errors in production.',
        },
        {
          name: 'Google Search Console',
          text: 'Submitting the sitemap and monitoring indexing.',
        },
        {
          name: 'Analytics Setup',
          text: 'Configuring conversion goals (events) in GA4 or Plausible.',
        },
      ],
    },
    previousStep: 'qa-testing-launch',
    nextStep: 'conversion-rate-optimierung',
  },
  {
    slug: 'conversion-rate-optimierung',
    number: 18,
    category: 'Growth & Maintenance',
    codayRole: 'A/B-Testing & Heatmap-Analysen',
    clientRole: 'Budget-Freigabe für A/B-Testing',
    tools: ['VWO', 'Hotjar', 'PostHog'],
    deliverables: ['CRO Audit Report', 'Iterative UI-Updates'],
    duration: {
      minDays: 7,
      maxDays: 30,
      text: 'Laufend (Monatlich)',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Conversion Rate Optimization (CRO)',
      description:
        'Daten statt Bauchgefühl. Wir analysieren echte User-Sitzungen (Heatmaps, Recordings) und führen A/B-Tests durch, um die Lead-Rate kontinuierlich zu steigern.',
      microSteps: [
        {
          name: 'Heatmap Analyse',
          text: 'Identifikation von Scroll-Abbrüchen und Rage-Clicks.',
        },
        {
          name: 'A/B-Test Konzeption',
          text: 'Entwurf von Variationen für Headlines oder Button-Farben.',
        },
        {
          name: 'Implementierung & Messung',
          text: 'Ausrollen der Winning-Variante nach statistischer Signifikanz.',
        },
      ],
    },
    en: {
      title: 'Conversion Rate Optimization (CRO)',
      description:
        'Data instead of gut feeling. We analyze real user sessions (heatmaps, recordings) and conduct A/B tests to continuously increase the lead rate.',
      microSteps: [
        {
          name: 'Heatmap Analysis',
          text: 'Identification of scroll drop-offs and rage clicks.',
        },
        {
          name: 'A/B Test Conception',
          text: 'Designing variations for headlines or button colors.',
        },
        {
          name: 'Implementation & Measurement',
          text: 'Rolling out the winning variant upon statistical significance.',
        },
      ],
    },
    previousStep: 'post-launch-monitoring',
    nextStep: 'seo-content-expansion',
  },
  {
    slug: 'seo-content-expansion',
    number: 19,
    category: 'Growth & Maintenance',
    codayRole: 'Erstellung von Blog-Posts & programmatic SEO Pages',
    clientRole: 'Freigabe von Redaktionsplänen',
    tools: ['Ahrefs', 'TypeScript (Static Generation)'],
    deliverables: ['Neue organische Landingpages', 'Blog-Artikel'],
    duration: {
      minDays: 7,
      maxDays: 30,
      text: 'Laufend (Monatlich)',
      isoDuration: 'P30D',
    },
    de: {
      title: 'SEO & Content-Expansion',
      description:
        'Eine Website muss wachsen. Wir skalieren den organischen Traffic durch fortlaufenden, hochqualitativen Content und den Aufbau von programmatischen SEO-Pillars.',
      microSteps: [
        {
          name: 'Keyword-Strategie',
          text: 'Identifikation von Long-Tail Suchanfragen mit hoher Kaufabsicht.',
        },
        {
          name: 'Content-Produktion',
          text: 'Verfassen von Experten-Artikeln und Case-Studies.',
        },
        {
          name: 'Programmatic SEO',
          text: 'Skalierung von Landingpages (z.B. "Webdesign für [Branche]").',
        },
      ],
    },
    en: {
      title: 'SEO & Content Expansion',
      description:
        'A website must grow. We scale organic traffic through continuous, high-quality content and building programmatic SEO pillars.',
      microSteps: [
        {
          name: 'Keyword Strategy',
          text: 'Identifying long-tail search queries with high purchase intent.',
        },
        {
          name: 'Content Production',
          text: 'Writing expert articles and case studies.',
        },
        {
          name: 'Programmatic SEO',
          text: 'Scaling landing pages (e.g., "Web design for [Industry]").',
        },
      ],
    },
    previousStep: 'conversion-rate-optimierung',
    nextStep: 'tech-maintenance-updates',
  },
  {
    slug: 'tech-maintenance-updates',
    number: 20,
    category: 'Growth & Maintenance',
    codayRole: 'Sicherheits-Patches, Dependency-Updates & Backups',
    clientRole: 'Keine Aktion erforderlich (Managed Service)',
    tools: ['GitHub Dependabot', 'Vercel'],
    deliverables: ['Security Audits', 'Aktuelle NPM Dependencies'],
    duration: {
      minDays: 1,
      maxDays: 2,
      text: 'Laufend (Monatlich)',
      isoDuration: 'P30D',
    },
    de: {
      title: 'Tech-Maintenance & Security',
      description:
        'Web-Technologie veraltet schnell. Wir garantieren durch proaktives Patching und Dependency-Updates, dass die Website für Jahre performant und sicher bleibt.',
      microSteps: [
        {
          name: 'Dependency Updates',
          text: 'Aktualisierung von React, Vite und Drittanbieter-Bibliotheken.',
        },
        {
          name: 'Security Audits',
          text: 'Prüfung auf bekannte Schwachstellen (CVEs) in Node-Modulen.',
        },
        {
          name: 'Performance Refactoring',
          text: 'Anpassung an neue Web-Standards und Browser-Updates.',
        },
      ],
    },
    en: {
      title: 'Tech Maintenance & Security',
      description:
        'Web technology ages quickly. Through proactive patching and dependency updates, we guarantee the website remains performant and secure for years.',
      microSteps: [
        {
          name: 'Dependency Updates',
          text: 'Updating React, Vite, and third-party libraries.',
        },
        {
          name: 'Security Audits',
          text: 'Checking for known vulnerabilities (CVEs) in Node modules.',
        },
        {
          name: 'Performance Refactoring',
          text: 'Adapting to new web standards and browser updates.',
        },
      ],
    },
    previousStep: 'seo-content-expansion',
    nextStep: null,
  },
];
