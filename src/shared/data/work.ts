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
          images: [
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive-640w.webp',
          ],
          imageAlts: [
            'Webdesign für Sanitär & Heizung Batherm: Desktop und Mobile Responsive Mockup der neuen Handwerker-Website',
            'Mobile-First Webdesign für Handwerker Batherm: Lead-Generierung und Terminbuchung auf dem Smartphone',
          ],
        },
        beforeAfter: {
          beforeImage: '/images/brand/coday-full.webp',
          afterImage:
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
          beforeAlt: 'Alte, veraltete Website des Sanitärbetriebs Batherm ohne Conversion-Fokus',
          afterAlt: 'Neues, performantes Webdesign für Batherm mit Fokus auf Lead-Generierung',
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
          { name: 'Webdesign & UI/UX', path: '/services/webdesign' },
          { name: 'Performance & Speed', path: '/services/performance' },
          { name: 'Enterprise Web', path: '/services/enterprise-web' },
        ],
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
          imageAlts: [
            'Web Design for HVAC Batherm: Desktop and Mobile Responsive Mockup of the new craftsmen website',
            'Mobile-First Web Design for Craftsmen Batherm: Lead generation and appointment scheduling on smartphone',
          ],
        },
        beforeAfter: {
          beforeImage: '/images/brand/coday-full.webp',
          afterImage:
            '/images/portfolio/mockup-website-sanitaer-heizung-mueller-handwerker-24h-notdienst-responsive.webp',
          beforeAlt:
            'Old, outdated website of the sanitary company Batherm without conversion focus',
          afterAlt: 'New, performant web design for Batherm with focus on lead generation',
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
          { name: 'Web Design & UI/UX', path: '/services/webdesign' },
          { name: 'Performance & Speed', path: '/services/performance' },
          { name: 'Enterprise Web', path: '/services/enterprise-web' },
        ],
      },
    },
  },
};
