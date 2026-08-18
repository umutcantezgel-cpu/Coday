export type ProjectType = 'case_study' | 'in_progress' | 'template';

export interface ProjectContent {
  title: string;
  subtitle: string;
  category: string;
  stats: {
    label: string;
    value: string;
  }[];
  challenge: {
    title: string;
    description: string;
    list: string[];
    quote?: {
      text: string;
      author: string;
    };
  };
  approach: {
    title: string;
    description: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
  solution: {
    title: string;
    description: string;
    images: string[];
    imageAlts?: string[];
  };
  beforeAfter?: {
    beforeImage: string;
    afterImage: string;
    beforeAlt?: string;
    afterAlt?: string;
  };
  results: {
    title: string;
    description: string;
    metrics: {
      label: string;
      value: string;
      change: string;
    }[];
  };
  relatedServices?: {
    name: string;
    path: string;
  }[];
}

export interface Project {
  slug: string;
  thumbnail: string;
  heroImage: string;
  category: string; // Internal category for filtering
  type: ProjectType;
  status?: 'live' | 'building' | 'concept';
  completion?: number; // 0-100 for in progress
  content: {
    de: ProjectContent;
    en: ProjectContent;
  };
  liveUrl?: string;
}

export const workData: Record<string, Project> = {
  // --- CASE STUDIES (High Fidelity) ---
  batherm: {
    slug: 'batherm',
    category: 'development',
    type: 'case_study',
    status: 'live',
    thumbnail: 'handyman',
    liveUrl: 'https://www.batherm.de',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Batherm - Handwerker Website Agentur',
        subtitle: 'Digitalisierung im Handwerk',
        category: 'Web Development & Lead Gen',
        stats: [
          { label: 'Branche', value: 'Sanitär & Heizung' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind' },
          { label: 'Dauer', value: '6 Wochen' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'Ein Traditionsbetrieb mit exzellentem Ruf, aber unsichtbar für die digitale Generation. Die alte Website war eine Visitenkarte ohne Funktion. Keine Leads, keine Vorqualifizierung.',
          list: [
            'Veraltetes Image, das junge Fachkräfte abschreckte',
            'Hoher manueller Aufwand bei der Terminvereinbarung',
            'Keine automatische Filterung von "Billig-Kunden"',
          ],
          quote: {
            text: 'Wir waren handwerklich Top-Liga, aber digital Kreisklasse. Coday hat das geändert.',
            author: 'Geschäftsführer, Batherm GmbH',
          },
        },
        approach: {
          title: 'Unser Spielplan',
          description:
            'Kein "Redesign", sondern eine Neupositionierung. Wir haben Batherm nicht als Handwerker, sondern als Premium-Dienstleister inszeniert.',
          steps: [
            {
              title: 'Brand Audit',
              description:
                'Identifikation der "Unfair Advantage": Jahrzehntelange Erfahrung & Premium-Materialien.',
            },
            {
              title: 'Funnel-Architektur',
              description:
                'Bau einer interaktiven Bad-Konfigurator-Strecke zur Lead-Qualifizierung.',
            },
            {
              title: 'High-Speed Development',
              description:
                'Entwicklung einer Headless-Lösung, die in <1 Sekunde lädt (Core Web Vitals).',
            },
          ],
        },
        solution: {
          title: 'Die Plattform',
          description:
            'Eine Next.js Applikation, die sich so flüssig anfühlt wie eine native App. Mit integriertem Terminkalender, Bad-Rechner und automatisierten Email-Flows. Wir haben ein hochmodernes, ansprechendes Webdesign entwickelt, das nicht nur ästhetisch überzeugt, sondern auch auf Conversion-Optimierung ausgelegt ist. Die Performance-Optimierung durch Headless-Architektur garantiert dabei blitzschnelle Ladezeiten, was sich signifikant auf das SEO-Ranking auswirkt.',
          images: ['/images/portfolio/mockup-batherm.png'],
          imageAlts: [
            'Webdesign Wetzlar – Premium Handwerker Website für Sanitär & Heizung Batherm',
          ],
        },
        results: {
          title: 'Hard Facts',
          description: 'Schöne Websites sind nett. Umsatz ist besser.',
          metrics: [
            { label: 'Lead Qualität', value: '+45%', change: 'Seit Launch' },
            { label: 'Bewerber', value: '12', change: 'In Q1' },
            { label: 'Ladezeit', value: '0.4s', change: 'Top 1%' },
          ],
        },
        relatedServices: [
          { name: 'Webdesign & UI/UX', path: '/services/web-design' },
          { name: 'Performance & Speed', path: '/services/performance' },
          { name: 'Enterprise Web', path: '/services/enterprise-web' },
        ],
      },
      en: {
        title: 'Batherm - Craftsmen Website Agency',
        subtitle: 'Digitization in the Crafts Sector',
        category: 'Web Development & Lead Gen',
        stats: [
          { label: 'Industry', value: 'Plumbing & Heating' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind' },
          { label: 'Duration', value: '6 Weeks' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'A traditional business with an excellent reputation, but invisible to the digital generation. The old website was a digital card without function. No leads, no pre-qualification.',
          list: [
            'Outdated image deterring young skilled workers',
            'High manual effort in appointment booking',
            'No automated qualification of incoming requests',
          ],
          quote: {
            text: 'We were top tier craftspeople, but digitally invisible. Coday changed that completely.',
            author: 'Managing Director, Batherm GmbH',
          },
        },
        approach: {
          title: 'Our Gameplan',
          description:
            'Not just a "redesign", but a strategic repositioning. We presented Batherm as a premium service provider.',
          steps: [
            {
              title: 'Brand Audit',
              description:
                'Identification of unfair advantages: Decades of experience & premium materials.',
            },
            {
              title: 'Funnel Architecture',
              description:
                'Building an interactive bathroom configurator flow for lead qualification.',
            },
            {
              title: 'High-Speed Development',
              description: 'Development of a headless solution loading in <1 second.',
            },
          ],
        },
        solution: {
          title: 'The Platform',
          description:
            'A modern Next.js application that feels as smooth as a native app. With integrated calendar, bathroom calculator, and automated email flows.',
          images: ['/images/portfolio/mockup-batherm.png'],
          imageAlts: ['Web Design Wetzlar – Premium Craftsmen Website for HVAC Batherm'],
        },
        results: {
          title: 'The Results',
          description: 'Beautiful websites are nice. Revenue is better.',
          metrics: [
            { label: 'Lead Quality', value: '+45%', change: 'Since Launch' },
            { label: 'Applicants', value: '12', change: 'In Q1' },
            { label: 'Load Time', value: '0.4s', change: 'Top 1%' },
          ],
        },
        relatedServices: [
          { name: 'Web Design & UI/UX', path: '/services/web-design' },
          { name: 'Performance & Speed', path: '/services/performance' },
          { name: 'Enterprise Web', path: '/services/enterprise-web' },
        ],
      },
    },
  },

  // --- MemoBau (Garten- & Landschaftsbau Wetzlar) ---
  memobaut: {
    slug: 'memobaut',
    category: 'development',
    type: 'case_study',
    status: 'live',
    thumbnail: 'tree',
    liveUrl: 'https://memobaut.de',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'MemoBau — Exklusive Gartenarchitektur',
        subtitle: 'Premium Garten- & Landschaftsbau Wetzlar',
        category: 'Web Development & UI/UX Design',
        stats: [
          { label: 'Branche', value: 'Garten- & Landschaftsbau' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Performance', value: '100/100 PageSpeed' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'MemoBau realisiert meisterhafte Garten- und Außenanlagen im gehobenen Segment, war digital jedoch für anspruchsvolle Eigenheimbesitzer und B2B-Bauträger unsichtbar.',
          list: [
            'Keine repräsentative Präsentation der exklusiven Naturstein- & Terrassenprojekte',
            'Hoher telefonischer Beratungsaufwand ohne Vorqualifizierung des Projektbudgets',
            'Fehlende lokale Sichtbarkeit bei margenstarken Suchanfragen in Mittelhessen',
          ],
          quote: {
            text: 'Unsere Baustellen waren Premium-Handwerk, aber unsere alte Website wirkte wie von 2010. Coday hat unsere digitale Präsenz auf Meister-Niveau gehoben.',
            author: 'Geschäftsführung, MemoBau Wetzlar',
          },
        },
        approach: {
          title: 'Unser Spielplan',
          description:
            'Entwicklung einer immersiven Plattform im Cinematic-Dark/Earth-Design, die handwerkliche Perfektion spürbar macht und Kunden vorqualifiziert.',
          steps: [
            {
              title: 'Emotionales Visual Storytelling',
              description:
                'Integration von hochauflösenden Vorher/Nachher-Projektgalerien und Video-Hero-Sequenzen.',
            },
            {
              title: 'Interaktiver Garten-Konfigurator',
              description:
                'Lead-Funnel zur präzisen Abfrage von Grundstücksgröße, gewünschten Gewerken und Budgetrahmen.',
            },
            {
              title: '100/100 Core Web Vitals & Local SEO',
              description:
                'Next.js 15 Server Components für 0,3s Ladezeit und Top-Rankings für Gartenbau in Wetzlar & Gießen.',
            },
          ],
        },
        solution: {
          title: 'Die Plattform',
          description:
            'Eine maßgeschneiderte Next.js 15 Web-Applikation mit interaktiver Materialauswahl, Projektgalerien mit flüssigen 60fps-Animationen und vollautomatisierter Lead-Zuweisung.',
          images: ['/images/portfolio/memobaut/terrace.jpg'],
          imageAlts: [
            'Webdesign Wetzlar – Exklusive Garten- und Terrassenarchitektur für MemoBau Wetzlar',
          ],
        },
        results: {
          title: 'Messbare Ergebnisse',
          description: 'Maximale Conversion-Power durch Vertrauen und Geschwindigkeit.',
          metrics: [
            { label: 'Qualifizierte Leads', value: '+380%', change: 'Seit Launch' },
            { label: 'Ladezeit Mobile', value: '0.3s', change: '100/100 Score' },
            { label: 'Projektvolumen', value: 'Ø 28.500 €', change: 'Premium-Fokus' },
          ],
        },
        relatedServices: [
          { name: 'Webdesign & UI/UX', path: '/services/web-design' },
          { name: 'Webentwicklung', path: '/services/web-development' },
          { name: 'Performance & Speed', path: '/services/performance' },
        ],
      },
      en: {
        title: 'MemoBau — Landscape Architecture',
        subtitle: 'Premium Landscape Architecture Wetzlar',
        category: 'Web Development & UI/UX Design',
        stats: [
          { label: 'Industry', value: 'Landscaping & Architecture' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Performance', value: '100/100 PageSpeed' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'MemoBau creates master-grade outdoor living spaces and gardens, but was digitally invisible to high-net-worth homeowners and property developers.',
          list: [
            'No visual showcase for exclusive stone, patio and pool landscaping projects',
            'High manual consulting time with unqualified budget inquiries',
            'Lack of local search dominance for high-ticket landscaping in the region',
          ],
          quote: {
            text: 'Our craftsmanship was top tier, but our old website felt stuck in 2010. Coday elevated our entire digital appearance to master craftsman level.',
            author: 'Management, MemoBau Wetzlar',
          },
        },
        approach: {
          title: 'Our Playbook',
          description:
            'Development of an immersive digital experience reflecting true craftsmanship and qualifying high-ticket leads automatically.',
          steps: [
            {
              title: 'Cinematic Visuals',
              description: 'Staging projects with high-resolution galleries and fluid animations.',
            },
            {
              title: 'Interactive Project Configurator',
              description:
                'Multi-step qualification for plot size, services and investment budget.',
            },
            {
              title: '100/100 Core Web Vitals & Local SEO',
              description:
                'Next.js 15 Server Components delivering sub-0.3s load times and regional search rankings.',
            },
          ],
        },
        solution: {
          title: 'The Platform',
          description:
            'A bespoke Next.js 15 web application with interactive material selections, smooth 60fps galleries, and automated lead capture.',
          images: ['/images/portfolio/memobaut/terrace.jpg'],
          imageAlts: [
            'Web Design Wetzlar – Exclusive patio and garden architecture for MemoBau Wetzlar',
          ],
        },
        results: {
          title: 'Measurable Results',
          description: 'Maximum conversion through speed, elegance and trust.',
          metrics: [
            { label: 'Qualified Leads', value: '+380%', change: 'Post launch' },
            { label: 'Mobile Load Time', value: '0.3s', change: '100/100 Score' },
            { label: 'Avg. Project Size', value: '28,500 €', change: 'High-Ticket' },
          ],
        },
        relatedServices: [
          { name: 'Web Design & UI/UX', path: '/services/web-design' },
          { name: 'Web Development', path: '/services/web-development' },
          { name: 'Performance & Speed', path: '/services/performance' },
        ],
      },
    },
  },

  // --- Talia Boutique ---
  'talia-boutique': {
    slug: 'talia-boutique',
    category: 'ecommerce',
    type: 'case_study',
    status: 'live',
    thumbnail: 'shopping-bag',
    liveUrl: 'https://talia-boutique.de/',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Talia Boutique',
        subtitle: 'Moderne E-Commerce Plattform',
        category: 'E-Commerce & Web Design',
        stats: [
          { label: 'Branche', value: 'Fashion & Retail' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind, Shopify' },
          { label: 'Status', value: 'Live' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'Eine Premium-Boutique brauchte eine digitale Präsenz, die den exklusiven Charakter der Marke widerspiegelt.',
          list: [
            'Kein Online-Verkaufskanal',
            'Veraltetes Markenimage online',
            'Schlechte mobile Nutzererfahrung',
          ],
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Entwicklung eines Headless E-Commerce Setups für maximale Geschwindigkeit und Designfreiheit.',
          steps: [
            {
              title: 'Premium Design',
              description: 'Fokus auf große Bilder und minimalistische Typografie.',
            },
            {
              title: 'Headless Commerce',
              description: 'Next.js Frontend mit Shopify Backend für schnelle Ladezeiten.',
            },
            {
              title: 'Mobile First',
              description: 'Optimierter Checkout-Prozess für Smartphone-Nutzer.',
            },
          ],
        },
        solution: {
          title: 'Die Lösung',
          description:
            'Ein blitzschneller Online-Shop, der das Premium-Gefühl der Boutique perfekt in die digitale Welt überträgt.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Impact',
          description:
            'Der neue Headless-Store kombiniert kompromisslose Premium-Ästhetik mit maximaler Performance. Das Ergebnis: Deutlich längere Verweildauer, höhere Conversion-Raten und ein starker neuer digitaler Vertriebskanal.',
          metrics: [
            { label: 'Conversion Rate', value: '+140%', change: 'durch UX-Optimierung' },
            { label: 'Performance', value: '< 1.2s', change: 'Ladezeit (LCP)' },
            { label: 'Mobile Sales', value: '+85%', change: 'Umsatz über Smartphones' },
          ],
        },
      },
      en: {
        title: 'Talia Boutique',
        subtitle: 'Modern E-Commerce Platform',
        category: 'E-Commerce & Web Design',
        stats: [
          { label: 'Industry', value: 'Fashion & Retail' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind, Shopify' },
          { label: 'Status', value: 'Live' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'A premium boutique needed a digital presence reflecting the exclusive character of the brand.',
          list: [
            'No online sales channel',
            'Outdated brand image online',
            'Poor mobile user experience',
          ],
        },
        approach: {
          title: 'Our Approach',
          description:
            'Development of a Headless E-Commerce setup for maximum speed and design freedom.',
          steps: [
            {
              title: 'Premium Design',
              description: 'Focus on large images and minimalist typography.',
            },
            {
              title: 'Headless Commerce',
              description: 'Next.js frontend with Shopify backend for fast load times.',
            },
            {
              title: 'Mobile First',
              description: 'Optimized checkout process for smartphone users.',
            },
          ],
        },
        solution: {
          title: 'The Solution',
          description:
            'A blazing-fast online shop that perfectly translates the premium feel of the boutique into the digital world.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Impact',
          description:
            'The new headless store combines uncompromising premium aesthetics with maximum performance. The result: significantly longer session durations, higher conversion rates, and a powerful new digital sales channel.',
          metrics: [
            { label: 'Conversion Rate', value: '+140%', change: 'due to UX optimization' },
            { label: 'Performance', value: '< 1.2s', change: 'Load time (LCP)' },
            { label: 'Mobile Sales', value: '+85%', change: 'Revenue from smartphones' },
          ],
        },
      },
    },
  },

  // --- MS Schlüsseldienst Wetzlar ---
  'schluesseldienst-wetzlar': {
    slug: 'schluesseldienst-wetzlar',
    category: 'development',
    type: 'case_study',
    status: 'live',
    thumbnail: 'house',
    liveUrl: undefined,
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Schlüssel Schmiede Wetzlar',
        subtitle: '24h Schlüsselnotdienst — Digital neu gedacht',
        category: 'Web Development & Local SEO',
        stats: [
          { label: 'Branche', value: 'Schlüsseldienst' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Ladezeit', value: '< 1 Sekunde' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'Lokaler Fachbetrieb brauchte digitale Präsenz, die sofort Vertrauen aufbaut.',
          list: [
            'Branchenimage durch unseriöse Mitbewerber schwer beschädigt',
            'Keine digitale Sichtbarkeit trotz physischem Ladengeschäft',
            'Kunden konnten seriöse von unseriösen Anbietern nicht unterscheiden',
          ],
          quote: {
            text: 'Die Leute hatten Angst vor Schlüsseldiensten wegen der ganzen Abzocker. Unsere neue Website zeigt sofort: Wir sind anders.',
            author: 'Mina Saad, Inhaber',
          },
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Vertrauen durch Transparenz. Jedes Element der Website wurde so gestaltet, dass es die Seriosität und Kompetenz des Betriebs auf den ersten Blick vermittelt.',
          steps: [
            {
              title: 'Trust-First Design',
              description:
                'Festpreise ab 99€ prominent platziert, echte Fotos vom Ladengeschäft und Einsatzfahrzeug, Google-Bewertungen (5.0 Sterne) direkt integriert.',
            },
            {
              title: 'Local SEO Architektur',
              description:
                'Stadtteil-Landingpages für jeden Wetzlarer Bezirk, umfangreiche Schema.org-Auszeichnung (LocalBusiness, Locksmith, EmergencyService).',
            },
            {
              title: 'Performance-Engineering',
              description:
                'Next.js 15 mit SSR, AVIF/WebP-Bildoptimierung, Font-Preloading. Ziel: Unter 1 Sekunde LCP auf Mobilgeräten.',
            },
          ],
        },
        solution: {
          title: 'Die Lösung',
          description:
            'Eine blitzschnelle Next.js-Applikation mit Fokus auf mobile Notfallkunden. Click-to-Call-Buttons, Echtzeit-Verfügbarkeitsanzeige und ein Trust-Marquee mit Zertifizierungen. Jede Unterseite ist für einen spezifischen Stadtteil optimiert.',
          images: ['/images/portfolio/mockup-schluesseldienst.png'],
          imageAlts: [
            'Webdesign Wetzlar – 24h Schlüsselnotdienst responsive Desktop & Mobile Website für Schlüssel Schmiede Wetzlar',
          ],
        },
        results: {
          title: 'Ergebnisse',
          description: 'Vom unsichtbaren Handwerker zur lokalen Marke — in 4 Wochen.',
          metrics: [
            { label: 'Google Ranking', value: '#1', change: '"Schlüsseldienst Wetzlar"' },
            { label: 'Google Sterne', value: '5.0', change: '58 Bewertungen' },
            { label: 'Ladezeit', value: '0.8s', change: 'Mobile LCP' },
          ],
        },
        relatedServices: [
          { name: 'Local SEO', path: '/services/seo' },
          { name: 'Webdesign & UI/UX', path: '/services/web-design' },
          { name: 'Performance', path: '/services/performance' },
        ],
      },
      en: {
        title: 'Schlüssel Schmiede Wetzlar',
        subtitle: '24h Locksmith Service — Digitally Reimagined',
        category: 'Web Development & Local SEO',
        stats: [
          { label: 'Industry', value: 'Locksmith' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Load Time', value: '< 1 Second' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'A local specialist needed a digital presence that immediately builds trust.',
          list: [
            'Industry reputation severely damaged by dishonest competitors',
            'No digital visibility despite having a physical shop',
            'Customers could not distinguish legitimate from illegitimate providers',
          ],
          quote: {
            text: 'People were afraid of locksmiths because of all the scammers. Our new website immediately shows: We are different.',
            author: 'Mina Saad, Owner',
          },
        },
        approach: {
          title: 'Our Approach',
          description:
            'Trust through transparency. Every element of the website was designed to convey the seriousness and competence of the business at first glance.',
          steps: [
            {
              title: 'Trust-First Design',
              description:
                'Fixed prices from €99 prominently placed, real photos of the shop and service vehicle, Google reviews (5.0 stars) directly integrated.',
            },
            {
              title: 'Local SEO Architecture',
              description:
                'District landing pages for every Wetzlar neighborhood, extensive Schema.org markup (LocalBusiness, Locksmith, EmergencyService).',
            },
            {
              title: 'Performance Engineering',
              description:
                'Next.js 15 with SSR, AVIF/WebP image optimization, font preloading. Target: Under 1 second LCP on mobile devices.',
            },
          ],
        },
        solution: {
          title: 'The Solution',
          description:
            'A blazing-fast Next.js application focused on mobile emergency customers. Click-to-Call buttons, real-time availability indicators, and a trust marquee with certifications. Every subpage is optimized for a specific district.',
          images: ['/images/portfolio/mockup-schluesseldienst.png'],
          imageAlts: [
            'Web Design Wetzlar – 24h Locksmith responsive Desktop and Mobile Website for Schlüssel Schmiede Wetzlar',
          ],
        },
        results: {
          title: 'Results',
          description: 'From invisible craftsman to local brand — in 4 weeks.',
          metrics: [
            { label: 'Google Ranking', value: '#1', change: '"Locksmith Wetzlar"' },
            { label: 'Google Rating', value: '5.0', change: '58 Reviews' },
            { label: 'Load Time', value: '0.8s', change: 'Mobile LCP' },
          ],
        },
        relatedServices: [
          { name: 'Local SEO', path: '/services/seo' },
          { name: 'Web Design & UI/UX', path: '/services/web-design' },
          { name: 'Performance', path: '/services/performance' },
        ],
      },
    },
  },

  // --- Lindener Ratsstuben ---
  'lindener-ratsstuben': {
    slug: 'lindener-ratsstuben',
    category: 'development',
    type: 'case_study',
    status: 'live',
    thumbnail: 'heartbeat',
    liveUrl: 'https://lindener-ratsstuben.de',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Lindener Ratsstuben',
        subtitle: 'Tradition trifft Digitalität — Restaurant-Website neu definiert',
        category: 'Web Development & Gastronomie',
        stats: [
          { label: 'Branche', value: 'Gastronomie' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind' },
          { label: 'Typ', value: 'Restaurant & Gasthaus' },
        ],
        challenge: {
          title: 'Die Herausforderung',
          description:
            'Ein traditionsreiches Restaurant und Gasthaus, das seit Generationen in der Region verwurzelt ist — aber online praktisch nicht existierte. Gäste konnten weder die Speisekarte einsehen noch einen Tisch reservieren.',
          list: [
            'Keine professionelle Online-Präsenz vorhanden',
            'Speisekarte nur als PDF oder gar nicht verfügbar',
            'Reservierungen nur telefonisch — viele Anfragen gingen verloren',
          ],
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Wir haben die Wärme und Tradition des Hauses digital übersetzt — ohne den authentischen Charakter zu verlieren.',
          steps: [
            {
              title: 'Atmosphäre einfangen',
              description:
                'Warme Farbpalette, hochwertige Bilder und ein Design, das die Gemütlichkeit des Gasthauses widerspiegelt.',
            },
            {
              title: 'Digitale Speisekarte',
              description:
                'Eine responsive, immer aktuelle Speisekarte mit Kategorien, Preisen und Allergeninformationen.',
            },
            {
              title: 'Lokale Sichtbarkeit',
              description:
                'Google Business Profil-Optimierung, Schema.org-Auszeichnung für Restaurants und lokale SEO.',
            },
          ],
        },
        solution: {
          title: 'Das Ergebnis',
          description:
            'Eine einladende, blitzschnelle Website, die die Persönlichkeit des Gasthauses perfekt widerspiegelt. Mit integrierter Speisekarte, Google Maps-Anbindung und direkter Kontaktmöglichkeit.',
          images: ['/images/portfolio/mockup-ratsstuben.png'],
          imageAlts: [
            'Webdesign Wetzlar – Moderne Restaurant & Gasthaus Website für Lindener Ratsstuben',
          ],
        },
        results: {
          title: 'Ergebnisse',
          description: 'Mehr Gäste, weniger verpasste Reservierungen.',
          metrics: [
            { label: 'Online-Präsenz', value: '100%', change: 'Von 0 auf Live' },
            { label: 'Anfragen', value: '+60%', change: 'Über Website' },
            { label: 'Ladezeit', value: '0.9s', change: 'Mobile LCP' },
          ],
        },
        relatedServices: [
          { name: 'Webdesign & UI/UX', path: '/services/web-design' },
          { name: 'Local SEO', path: '/services/seo' },
        ],
      },
      en: {
        title: 'Lindener Ratsstuben',
        subtitle: 'Tradition Meets Digital — Restaurant Website Redefined',
        category: 'Web Development & Gastronomy',
        stats: [
          { label: 'Industry', value: 'Gastronomy' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind' },
          { label: 'Type', value: 'Restaurant & Inn' },
        ],
        challenge: {
          title: 'The Challenge',
          description:
            'A traditional restaurant and inn rooted in the region for generations — but practically non-existent online. Guests could neither view the menu nor make a reservation.',
          list: [
            'No professional online presence available',
            'Menu only as PDF or not available at all',
            'Reservations only by phone — many inquiries were lost',
          ],
        },
        approach: {
          title: 'Our Approach',
          description:
            'We digitally translated the warmth and tradition of the house — without losing its authentic character.',
          steps: [
            {
              title: 'Capturing Atmosphere',
              description:
                'Warm color palette, high-quality images, and a design reflecting the coziness of the inn.',
            },
            {
              title: 'Digital Menu',
              description:
                'A responsive, always up-to-date menu with categories, prices, and allergen information.',
            },
            {
              title: 'Local Visibility',
              description:
                'Google Business Profile optimization, Schema.org markup for restaurants, and local SEO.',
            },
          ],
        },
        solution: {
          title: 'The Result',
          description:
            'An inviting, blazing-fast website that perfectly reflects the personality of the inn. With integrated menu, Google Maps integration, and direct contact options.',
          images: ['/images/portfolio/mockup-ratsstuben.png'],
          imageAlts: [
            'Web Design Wetzlar – Modern Restaurant and Inn Website for Lindener Ratsstuben',
          ],
        },
        results: {
          title: 'Results',
          description: 'More guests, fewer missed reservations.',
          metrics: [
            { label: 'Online Presence', value: '100%', change: 'From 0 to Live' },
            { label: 'Inquiries', value: '+60%', change: 'Via Website' },
            { label: 'Load Time', value: '0.9s', change: 'Mobile LCP' },
          ],
        },
        relatedServices: [
          { name: 'Web Design & UI/UX', path: '/services/web-design' },
          { name: 'Local SEO', path: '/services/seo' },
        ],
      },
    },
  },

  // --- Memo Baut (In Development) ---
  'memo-baut': {
    slug: 'memo-baut',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 80,
    thumbnail: 'hammer',
    liveUrl: 'https://memo-baut-test.vercel.app/',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Memo Baut',
        subtitle: 'In Entwicklung — Fast fertig',
        category: 'Web Development',
        stats: [
          { label: 'Status', value: 'In Entwicklung' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind' },
          { label: 'Fortschritt', value: '80%' },
        ],
        challenge: {
          title: 'Das Projekt',
          description:
            'Ein neues digitales Erlebnis für ein Bauunternehmen, das aktuell in der finalen Entwicklungsphase ist.',
          list: ['Konzeptphase abgeschlossen', 'Design implementiert', 'Launch steht bevor'],
        },
        approach: {
          title: 'Unser Ansatz',
          description: 'Fokus auf schnelle Ladezeiten und klare Strukturierung der Bauprojekte.',
          steps: [
            { title: 'Konzeption', description: 'Strukturierung der Dienstleistungen.' },
            { title: 'Entwicklung', description: 'Umsetzung mit Next.js.' },
            { title: 'Launch', description: 'Go-Live in Kürze.' },
          ],
        },
        solution: {
          title: 'Coming Soon',
          description: 'Dieses Projekt befindet sich im finalen Feinschliff.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Ergebnisse',
          description: 'Ergebnisse nach Launch.',
          metrics: [
            { label: 'Status', value: 'In Dev', change: 'Aktiv' },
            { label: 'Fortschritt', value: '80%', change: 'Bald fertig' },
            { label: 'Launch', value: 'Bald', change: '2026' },
          ],
        },
      },
      en: {
        title: 'Memo Baut',
        subtitle: 'In Development — Almost complete',
        category: 'Web Development',
        stats: [
          { label: 'Status', value: 'In Development' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind' },
          { label: 'Progress', value: '80%' },
        ],
        challenge: {
          title: 'The Project',
          description:
            'A new digital experience for a construction company, currently in final development.',
          list: ['Concept phase completed', 'Design implemented', 'Launch imminent'],
        },
        approach: {
          title: 'Our Approach',
          description: 'Focus on fast load times and clear structuring of construction projects.',
          steps: [
            { title: 'Conception', description: 'Structuring of services.' },
            { title: 'Development', description: 'Implementation with Next.js.' },
            { title: 'Launch', description: 'Go-Live shortly.' },
          ],
        },
        solution: {
          title: 'Coming Soon',
          description: 'This project is in final polish.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Results',
          description: 'Results after launch.',
          metrics: [
            { label: 'Status', value: 'In Dev', change: 'Active' },
            { label: 'Progress', value: '80%', change: 'Almost done' },
            { label: 'Launch', value: 'Soon', change: '2026' },
          ],
        },
      },
    },
  },

  // --- hey-fede (In Development) ---
  'hey-fede': {
    slug: 'hey-fede',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 90,
    thumbnail: 'heartbeat',
    liveUrl: 'https://hey-fede.de',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'hey fede',
        subtitle: 'In Entwicklung — Fast fertig',
        category: 'Web Development',
        stats: [
          { label: 'Status', value: 'In Entwicklung' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Fortschritt', value: '90%' },
        ],
        challenge: {
          title: 'Das Projekt',
          description:
            'Ein neues digitales Erlebnis, das aktuell in enger Zusammenarbeit mit dem Kunden entwickelt wird. Details folgen nach dem Launch.',
          list: ['Konzeptphase abgeschlossen', 'Design in Umsetzung', 'Launch geplant für 2026'],
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Modernste Technologien und ein iterativer Entwicklungsprozess für ein optimales Endergebnis.',
          steps: [
            {
              title: 'Konzeption',
              description: 'Gemeinsame Vision und Anforderungsanalyse.',
            },
            {
              title: 'Design & Entwicklung',
              description: 'Iterative Umsetzung mit regelmäßigem Feedback.',
            },
            {
              title: 'Launch & Optimierung',
              description: 'Go-Live mit Performance-Monitoring und kontinuierlicher Verbesserung.',
            },
          ],
        },
        solution: {
          title: 'Coming Soon',
          description:
            'Dieses Projekt befindet sich aktuell in der aktiven Entwicklung. Sobald es live geht, werden hier die vollständigen Details veröffentlicht.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Ergebnisse',
          description: 'Die Ergebnisse werden nach dem Launch veröffentlicht.',
          metrics: [
            { label: 'Status', value: 'In Dev', change: 'Aktiv' },
            { label: 'Fortschritt', value: '40%', change: 'Q2 2026' },
            { label: 'Launch', value: 'Bald', change: '2026' },
          ],
        },
      },
      en: {
        title: 'hey fede',
        subtitle: 'In Development — Almost complete',
        category: 'Web Development',
        stats: [
          { label: 'Status', value: 'In Development' },
          { label: 'Tech Stack', value: 'Next.js 15, Tailwind v4' },
          { label: 'Progress', value: '90%' },
        ],
        challenge: {
          title: 'The Project',
          description:
            'A new digital experience currently being developed in close collaboration with the client. Details to follow after launch.',
          list: ['Concept phase completed', 'Design in implementation', 'Launch planned for 2026'],
        },
        approach: {
          title: 'Our Approach',
          description:
            'Cutting-edge technologies and an iterative development process for optimal results.',
          steps: [
            {
              title: 'Conception',
              description: 'Shared vision and requirements analysis.',
            },
            {
              title: 'Design & Development',
              description: 'Iterative implementation with regular feedback.',
            },
            {
              title: 'Launch & Optimization',
              description: 'Go-live with performance monitoring and continuous improvement.',
            },
          ],
        },
        solution: {
          title: 'Coming Soon',
          description:
            'This project is currently in active development. Full details will be published once it goes live.',
          images: [],
          imageAlts: [],
        },
        results: {
          title: 'Results',
          description: 'Results will be published after launch.',
          metrics: [
            { label: 'Status', value: 'In Dev', change: 'Active' },
            { label: 'Progress', value: '40%', change: 'Q2 2026' },
            { label: 'Launch', value: 'Soon', change: '2026' },
          ],
        },
      },
    },
  },
};
