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
        title: 'Batherm',
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
            'Eine Next.js Applikation, die sich so flüssig anfühlt wie eine native App. Mit integriertem Terminkalender, Bad-Rechner und automatisierten Email-Flows.',
          images: [
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive-640w.webp',
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
      },
      en: {
        title: 'Batherm',
        subtitle: 'Craftsmanship Digitalization',
        category: 'Web Development & Lead Gen',
        stats: [
          { label: 'Industry', value: 'HVAC & Sanitary' },
          { label: 'Tech Stack', value: 'Next.js, Tailwind' },
          { label: 'Duration', value: '6 Weeks' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'A traditional company with an excellent reputation, but invisible to the digital generation. The old website was a business card without function. No leads, no pre-qualification.',
          list: [
            'Outdated image repelling young talent',
            'High manual effort for appointments',
            'No automatic filtering of "cheap clients"',
          ],
          quote: {
            text: 'We were top league in craftsmanship, but district league digitally. Coday changed that.',
            author: 'CEO, Batherm GmbH',
          },
        },
        approach: {
          title: 'Our Playbook',
          description:
            'Not just a "redesign", but a repositioning. We staged Batherm not as craftsmen, but as a premium service provider.',
          steps: [
            {
              title: 'Brand Audit',
              description:
                'Identifying the "Unfair Advantage": Decades of experience & premium materials.',
            },
            {
              title: 'Funnel Architecture',
              description: 'Building an interactive bath configurator flow for lead qualification.',
            },
            {
              title: 'High-Speed Development',
              description: 'Developing a headless solution loading in <1 second (Core Web Vitals).',
            },
          ],
        },
        solution: {
          title: 'The Platform',
          description:
            'A Next.js application that feels as smooth as a native app. With integrated scheduling, bath calculator, and automated email flows.',
          images: [
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive-640w.webp',
          ],
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
      },
    },
  },
  'prestige-estates': {
    slug: 'prestige-estates',
    category: 'design',
    type: 'case_study',
    status: 'live',
    thumbnail: 'house',
    liveUrl: '#',
    heroImage: 'bg-[#1a1a2e]',
    content: {
      de: {
        title: 'Prestige Estates',
        subtitle: 'Luxury Real Estate',
        category: 'UI/UX Design Strategy',
        stats: [
          { label: 'Branche', value: 'Immobilien' },
          { label: 'Fokus', value: 'Lead Gen' },
          { label: 'Dauer', value: '8 Wochen' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'Immobilienmakler Websites sehen alle gleich aus. Langweilig, statisch, uninspiriert. Prestige Estates verkauft Villen im 7-stelligen Bereich, aber die Website wirkte wie ein Discounter.',
          list: ['Keine emotionale Bindung', 'Veraltete Listings', 'Schlechte Mobile Experience'],
          quote: {
            text: 'Wir verkaufen Träume, keine Ziegelsteine. Die Website musste das widerspiegeln.',
            author: 'Gründer, Prestige Estates',
          },
        },
        approach: {
          title: 'Unser Spielplan',
          description: 'Cinema-First Ansatz. Wir behandeln jedes Exposé wie einen Hollywood-Film.',
          steps: [
            {
              title: 'Cinematic UI',
              description: 'Einsatz von großflächigen Video-Hintergründen und sanften Übergängen.',
            },
            {
              title: 'Interactive Maps',
              description: 'Integration von Google Maps mit Custom-Styling für Lage-Checks.',
            },
            {
              title: 'Exposé-Generator',
              description: 'Automatisierte Erstellung von PDF-Exposés aus Web-Daten.',
            },
          ],
        },
        solution: {
          title: 'Das Design System',
          description:
            'Ein Design, das Vertrauen und Exklusivität ausstrahlt. Dunkle Töne, Gold-Akzente und viel Whitespace.',
          images: [
            '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.webp',
            '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin-640w.webp',
          ],
        },
        results: {
          title: 'Der Impact',
          description: 'Exklusivität verkauft.',
          metrics: [
            { label: 'Verweildauer', value: '4:20m', change: '+150%' },
            { label: 'Leads', value: '8/Woche', change: 'Qualifiziert' },
            { label: 'Verkauf', value: '€4.5M', change: 'In Q1' },
          ],
        },
      },
      en: {
        title: 'Prestige Estates',
        subtitle: 'Luxury Real Estate',
        category: 'UI/UX Design Strategy',
        stats: [
          { label: 'Industry', value: 'Real Estate' },
          { label: 'Focus', value: 'Lead Gen' },
          { label: 'Duration', value: '8 Weeks' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'Real estate agent websites all look the same. Boring, static, uninspired. Prestige Estates sells 7-figure villas, but the website looked like a discounter.',
          list: ['No emotional connection', 'Outdated listings', 'Bad Mobile Experience'],
          quote: {
            text: 'We sell dreams, not bricks. The website had to reflect that.',
            author: 'Founder, Prestige Estates',
          },
        },
        approach: {
          title: 'Our Playbook',
          description: 'Cinema-First Approach. We treat every exposé like a Hollywood movie.',
          steps: [
            {
              title: 'Cinematic UI',
              description: 'Using large video backgrounds and smooth transitions.',
            },
            {
              title: 'Interactive Maps',
              description: 'Integration of Google Maps with Custom Styling for location checks.',
            },
            {
              title: 'Exposé Generator',
              description: 'Automated creation of PDF exposés from web data.',
            },
          ],
        },
        solution: {
          title: 'The Design System',
          description:
            'A design that radiates trust and exclusivity. Dark tones, gold accents, and lots of whitespace.',
          images: [
            '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.webp',
            '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin-640w.webp',
          ],
        },
        results: {
          title: 'The Impact',
          description: 'Exclusivity sells.',
          metrics: [
            { label: 'Session Time', value: '4:20m', change: '+150%' },
            { label: 'Leads', value: '8/Week', change: 'Qualified' },
            { label: 'Sales', value: '€4.5M', change: 'In Q1' },
          ],
        },
      },
    },
  },
  fitflow: {
    slug: 'fitflow',
    category: 'marketing',
    type: 'case_study',
    status: 'live',
    thumbnail: 'heartbeat',
    liveUrl: '#',
    heroImage: 'bg-emerald-900',
    content: {
      de: {
        title: 'FitFlow',
        subtitle: 'Fitness Studio SaaS',
        category: 'Growth Marketing',
        stats: [
          { label: 'Branche', value: 'Health Tech' },
          { label: 'Markt', value: 'DACH' },
          { label: 'Dauer', value: 'Running' },
        ],
        challenge: {
          title: 'Das Problem',
          description:
            'Ein SaaS-Tool für Fitnessstudios, das niemand kannte. Die Challenge: Wie verkauft man Software an Gym-Owner, die wenig Zeit am PC verbringen?',
          list: ['Schwierige Zielgruppe', 'Komplexes Produkt', 'Wenig Brand Awareness'],
          quote: {
            text: 'Unser Tool war gut, unser Marketing war nicht existent.',
            author: 'CEO, FitFlow',
          },
        },
        approach: {
          title: 'Unser Spielplan',
          description:
            'Mobile First & High Energy. Wir haben das Marketing so dynamisch gemacht wie die Zielgruppe.',
          steps: [
            { title: 'Social Ads', description: 'High-Paced Video Ads auf Instagram & TikTok.' },
            { title: 'Direct Sales', description: 'Automatisierte LinkedIn-Outreach Kampagne.' },
            {
              title: 'Website Relaunch',
              description: 'Eine Landingpage, die sofort Nutzen kommuniziert.',
            },
          ],
        },
        solution: {
          title: 'Growth Engine',
          description:
            'Eine High-Conversion Landingpage gepaart mit einem CRM-System, das Leads automatisch nachfasst.',
          images: [
            '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.webp',
            '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive-640w.webp',
          ],
        },
        results: {
          title: 'Growth Zahlen',
          description: 'Fit für die Zukunft.',
          metrics: [
            { label: 'MRR', value: '€50k', change: '+400%' },
            { label: 'Testphasen', value: '120/Mo', change: '+250%' },
            { label: 'Churn', value: '<2%', change: 'Stabil' },
          ],
        },
      },
      en: {
        title: 'FitFlow',
        subtitle: 'Fitness Studio SaaS',
        category: 'Growth Marketing',
        stats: [
          { label: 'Industry', value: 'Health Tech' },
          { label: 'Market', value: 'DACH' },
          { label: 'Duration', value: 'Running' },
        ],
        challenge: {
          title: 'The Problem',
          description:
            'A SaaS tool for gyms that no one knew. The challenge: How to sell software to gym owners who spend little time at the PC?',
          list: ['Difficult Target Group', 'Complex Product', 'Low Brand Awareness'],
          quote: {
            text: 'Our tool was good, our marketing was non-existent.',
            author: 'CEO, FitFlow',
          },
        },
        approach: {
          title: 'Our Playbook',
          description:
            'Mobile First & High Energy. We made the marketing as dynamic as the target audience.',
          steps: [
            { title: 'Social Ads', description: 'High-Paced Video Ads on Instagram & TikTok.' },
            { title: 'Direct Sales', description: 'Automated LinkedIn Outreach Campaign.' },
            {
              title: 'Website Relaunch',
              description: 'A landing page that communicates value immediately.',
            },
          ],
        },
        solution: {
          title: 'Growth Engine',
          description:
            'A high-conversion landing page paired with a CRM system that automatically follows up on leads.',
          images: [
            '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive.webp',
            '/images/portfolio/mockup-website-fitnessstudio-kursplan-yoga-preise-einzelstunde-abo-responsive-640w.webp',
          ],
        },
        results: {
          title: 'Growth Numbers',
          description: 'Fit for the future.',
          metrics: [
            { label: 'MRR', value: '€50k', change: '+400%' },
            { label: 'Trials', value: '120/Mo', change: '+250%' },
            { label: 'Churn', value: '<2%', change: 'Stabil' },
          ],
        },
      },
    },
  },

  // --- IN PROGRESS (The Lab) ---
  'hotel-zur-post': {
    slug: 'hotel-zur-post',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 85,
    thumbnail: 'chart-line-up',
    heroImage: 'bg-amber-900',
    liveUrl: 'https://www.hotel-zur-post-buechlberg.de/',
    content: {
      de: {
        title: 'Hotel zur Post',
        subtitle: 'Büchlberg Gastfreundschaft',
        category: 'Hospitality Web',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Modernisierung der Webpräsenz für ein Traditions-Hotel.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Hotel zur Post',
        subtitle: 'Büchlberg Hospitality',
        category: 'Hospitality Web',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Web presence modernization for a traditional hotel.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'red-chillies': {
    slug: 'red-chillies',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 90,
    thumbnail: 'heartbeat',
    heroImage: 'bg-red-900',
    liveUrl: 'https://redchillies-web.netlify.app/',
    content: {
      de: {
        title: 'Red Chillies',
        subtitle: 'Taste of India',
        category: 'Gastronomie',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Online-Ordering System & Restaurant Showcase.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Red Chillies',
        subtitle: 'Taste of India',
        category: 'Gastronomy',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Online-Ordering System & Restaurant Showcase.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'red-flames': {
    slug: 'red-flames',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 75,
    thumbnail: 'rocket-launch',
    heroImage: 'bg-orange-800',
    liveUrl: 'https://redflames-web.netlify.app/',
    content: {
      de: {
        title: 'Red Flames',
        subtitle: 'Steakhouse & Grill',
        category: 'Gastronomie',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Branding & Web Design für High-End Grill Restaurant.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Red Flames',
        subtitle: 'Steakhouse & Grill',
        category: 'Gastronomy',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Branding & Web Design for High-End Grill Restaurant.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'memo-baut': {
    slug: 'memo-baut',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 60,
    thumbnail: 'handyman',
    heroImage: 'bg-yellow-800',
    liveUrl: 'https://memo-baut.netlify.app/',
    content: {
      de: {
        title: 'Memo Baut',
        subtitle: 'Bauunternehmen',
        category: 'Handwerk & Bau',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Corporate Website für Bauunternehmer.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Memo Baut',
        subtitle: 'Construction Company',
        category: 'Construction',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'Corporate Website for Construction Company.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'akan-dienstleistungen': {
    slug: 'akan-dienstleistungen',
    category: 'development',
    type: 'in_progress',
    status: 'building',
    completion: 40,
    thumbnail: 'shield-check',
    heroImage: 'bg-blue-800',
    liveUrl: 'https://akan-dienstleistungen.netlify.app/',
    content: {
      de: {
        title: 'Akan Dienstleistungen',
        subtitle: 'Facility Management',
        category: 'Dienstleistung',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Service-Portal für Gebäudemanagement.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Akan Services',
        subtitle: 'Facility Management',
        category: 'Services',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Service Portal for Facility Management.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },

  // --- TEMPLATES (The Vault) ---
  'roof-template-1': {
    slug: 'roof-template-1',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-1.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V1',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'High-Performance Template für Dachdeckerbetriebe.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V1',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: {
          title: '',
          description: 'High-Performance Template for Roofing Compnaies.',
          images: [],
        },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-2': {
    slug: 'roof-template-2',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-2.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V2',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 2: Fokus auf Visuals.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V2',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 2: Focus on Visuals.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-3': {
    slug: 'roof-template-3',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-3.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V3',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 3: Fokus auf Conversion.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V3',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 3: Focus on Conversion.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-4': {
    slug: 'roof-template-4',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-4.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V4',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 4: Modern & Minimalistisch.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V4',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 4: Modern & Minimalist.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-5': {
    slug: 'roof-template-5',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-5.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V5',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 5: Dark Mode.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V5',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 5: Dark Mode.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-6': {
    slug: 'roof-template-6',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-6.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V6',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 6: Bold Typography.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V6',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 6: Bold Typography.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
  'roof-template-7': {
    slug: 'roof-template-7',
    category: 'design',
    type: 'template',
    status: 'live',
    thumbnail: 'house',
    heroImage: 'bg-slate-700',
    liveUrl: 'https://dachdecker-template-7.netlify.app/',
    content: {
      de: {
        title: 'Dachdecker Pro V7',
        subtitle: 'Handwerk Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variante 7: Enterprise Style.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
      en: {
        title: 'Roofer Pro V7',
        subtitle: 'Craftsman Template',
        category: 'Template Ecosystem',
        stats: [],
        challenge: { title: '', description: '', list: [] },
        approach: { title: '', description: '', steps: [] },
        solution: { title: '', description: 'Variant 7: Enterprise Style.', images: [] },
        results: { title: '', description: '', metrics: [] },
      },
    },
  },
};
