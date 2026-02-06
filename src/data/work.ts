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
  content: {
    de: ProjectContent;
    en: ProjectContent;
  };
}

export const workData: Record<string, Project> = {
  'fintech-platform': {
    slug: 'fintech-platform',
    category: 'development',
    thumbnail: 'account_balance',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'FinTech Platform',
        subtitle: 'Next.js Banking Dashboard',
        category: 'Web Development',
        stats: [
          { label: 'Branche', value: 'FinTech' },
          { label: 'Tech Stack', value: 'Next.js / Node' },
          { label: 'Dauer', value: '3 Monate' },
        ],
        challenge: {
          title: 'Die Herausforderung',
          description:
            'Ein Legacy-Bankensystem musste in eine moderne, schnelle Web-Applikation transformiert werden. Sicherheit, Performance und Echtzeit-Daten waren kritisch.',
          list: [
            'Veraltete Java-Architektur ablösen',
            'Echtzeit-Updates für Transaktionen',
            'Höchste Sicherheitsstandards (Banken-Level)',
          ],
          quote: {
            text: 'Wir brauchten eine Banken-Software, die sich anfühlt wie Spotify.',
            author: 'CTO, FinTech AG',
          },
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Entwicklung einer Headless-Architektur mit Next.js im Frontend und Microservices im Backend.',
          steps: [
            {
              title: 'Architecture',
              description: 'Design einer skalierbaren Microservices-Architektur.',
            },
            { title: 'Development', description: 'Frontend-Entwicklung mit React & TypeScript.' },
            { title: 'Security', description: 'Implementierung von OAuth2 und Verschlüsselung.' },
          ],
        },
        solution: {
          title: 'Die Lösung',
          description:
            'Ein hochperformantes Dashboard, das Bankgeschäfte in Echtzeit ermöglicht. Vollständig responsive und barrierefrei.',
          images: [],
        },
        results: {
          title: 'Die Ergebnisse',
          description:
            'Drastisch reduzierte Ladezeiten und eine moderne User Experience führten zu höherer Kundenzufriedenheit.',
          metrics: [
            { label: 'Ladezeit', value: '< 500ms', change: '-90%' },
            { label: 'User Engagement', value: 'High', change: '+150%' },
            { label: 'Dev Velocity', value: '2x', change: '+100%' },
          ],
        },
      },
      en: {
        title: 'FinTech Platform',
        subtitle: 'Next.js Banking Dashboard',
        category: 'Web Development',
        stats: [
          { label: 'Industry', value: 'FinTech' },
          { label: 'Tech Stack', value: 'Next.js / Node' },
          { label: 'Duration', value: '3 Months' },
        ],
        challenge: {
          title: 'The Challenge',
          description:
            'A legacy banking system needed to be transformed into a modern, fast web application. Security, performance, and real-time data were critical.',
          list: [
            'Replace outdated Java architecture',
            'Real-time updates for transactions',
            'Highest security standards (Bank Level)',
          ],
          quote: {
            text: 'We needed banking software that feels like Spotify.',
            author: 'CTO, FinTech AG',
          },
        },
        approach: {
          title: 'Our Approach',
          description:
            'Development of a headless architecture with Next.js on the frontend and microservices on the backend.',
          steps: [
            {
              title: 'Architecture',
              description: 'Design of a scalable microservices architecture.',
            },
            { title: 'Development', description: 'Frontend development with React & TypeScript.' },
            { title: 'Security', description: 'Implementation of OAuth2 and encryption.' },
          ],
        },
        solution: {
          title: 'The Solution',
          description:
            'A high-performance dashboard that enables banking transactions in real-time. Fully responsive and accessible.',
          images: [],
        },
        results: {
          title: 'The Results',
          description:
            'Drastically reduced load times and a modern user experience led to higher customer satisfaction.',
          metrics: [
            { label: 'Load Time', value: '< 500ms', change: '-90%' },
            { label: 'User Engagement', value: 'High', change: '+150%' },
            { label: 'Dev Velocity', value: '2x', change: '+100%' },
          ],
        },
      },
    },
  },
  // Add other projects similarly...
  'fashion-commerce': {
    slug: 'fashion-commerce',
    category: 'development',
    thumbnail: 'shopping_bag',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Fashion Commerce',
        subtitle: 'Headless Shopify Store',
        category: 'Web Development',
        stats: [
          { label: 'Branche', value: 'Fashion' },
          { label: 'Tech Stack', value: 'Shopify Hydrogen' },
          { label: 'Dauer', value: '8 Wochen' },
        ],
        challenge: {
          title: 'Die Herausforderung',
          description:
            'Ein Standard-Shopify-Theme reichte nicht für die brand-driven Experience der Marke. Es wurde maximale Design-Freiheit benötigt.',
          list: [
            'Custom Animations & Transitions',
            'Keine Kompromisse bei Performance',
            'Nahtloser Checkout',
          ],
        },
        approach: {
          title: 'Unser Ansatz',
          description:
            'Einsatz von Shopify Hydrogen (React-basiert) für ein komplett maßgeschneidertes Frontend bei voller Shopify-Backend-Funktionalität.',
          steps: [
            { title: 'UX/UI Design', description: 'Design einer immersiven Shopping Experience.' },
            {
              title: 'Component Dev',
              description: 'Entwicklung wiederverwendbarer Shop-Komponenten.',
            },
            { title: 'Integration', description: 'Anbindung an Shopify Storefront API.' },
          ],
        },
        solution: {
          title: 'Die Lösung',
          description:
            'Ein Online-Store, der sich anfühlt wie eine native App. Flüssige Übergänge und sofortiges Laden der Produktseiten.',
          images: [],
        },
        results: {
          title: 'Die Ergebnisse',
          description: 'Erhöhte Conversion-Rate durch besseres UX und Performance.',
          metrics: [
            { label: 'Conversion', value: '3.2%', change: '+45%' },
            { label: 'Mobile Speed', value: '98/100', change: 'Top' },
            { label: 'Avg Order Value', value: '120€', change: '+20%' },
          ],
        },
      },
      en: {
        title: 'Fashion Commerce',
        subtitle: 'Headless Shopify Store',
        category: 'Web Development',
        stats: [
          { label: 'Industry', value: 'Fashion' },
          { label: 'Tech Stack', value: 'Shopify Hydrogen' },
          { label: 'Duration', value: '8 Weeks' },
        ],
        challenge: {
          title: 'The Challenge',
          description:
            "A standard Shopify theme wasn't enough for the brand-driven experience. Maximum design freedom was required.",
          list: [
            'Custom Animations & Transitions',
            'No compromises on performance',
            'Seamless Checkout',
          ],
        },
        approach: {
          title: 'Our Approach',
          description:
            'Using Shopify Hydrogen (React-based) for a completely custom frontend with full Shopify backend functionality.',
          steps: [
            { title: 'UX/UI Design', description: 'Design of an immersive shopping experience.' },
            { title: 'Component Dev', description: 'Development of reusable shop components.' },
            { title: 'Integration', description: 'Connection to Shopify Storefront API.' },
          ],
        },
        solution: {
          title: 'The Solution',
          description:
            'An online store that feels like a native app. Smooth transitions and instant loading of product pages.',
          images: [],
        },
        results: {
          title: 'The Results',
          description: 'Increased conversion rate through better UX and performance.',
          metrics: [
            { label: 'Conversion', value: '3.2%', change: '+45%' },
            { label: 'Mobile Speed', value: '98/100', change: 'Top' },
            { label: 'Avg Order Value', value: '120€', change: '+20%' },
          ],
        },
      },
    },
  },
  // ... Simplified for other entries to save context window, but structure is clear
  batherm: {
    slug: 'batherm',
    category: 'development',
    thumbnail: 'plumbing',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Batherm',
        subtitle: 'Handwerk Digitalisierung',
        category: 'Web Development',
        stats: [
          { label: 'Branche', value: 'Handwerk' },
          { label: 'Tech Stack', value: 'Next.js' },
          { label: 'Dauer', value: '6 Wochen' },
        ],
        challenge: {
          title: 'Die Herausforderung',
          description: 'Digitalisierung eines Traditionsbetriebs.',
          list: ['Sichtbarkeit erhöhen', 'Prozesse digitalisieren'],
          quote: { text: 'Endlich digital.', author: 'Geschäftsführer' },
        },
        approach: {
          title: 'Unser Ansatz',
          description: 'Ganzheitliche Strategie.',
          steps: [{ title: 'Analyse', description: 'Bestandsaufnahme' }],
        },
        solution: { title: 'Die Lösung', description: 'Moderne Webpräsenz.', images: [] },
        results: {
          title: 'Die Ergebnisse',
          description: 'Mehr Kunden.',
          metrics: [{ label: 'Leads', value: '+200%', change: '+++ ' }],
        },
      },
      en: {
        title: 'Batherm',
        subtitle: 'Craftsmanship Digitalization',
        category: 'Web Development',
        stats: [
          { label: 'Industry', value: 'Craft' },
          { label: 'Tech Stack', value: 'Next.js' },
          { label: 'Duration', value: '6 Weeks' },
        ],
        challenge: {
          title: 'The Challenge',
          description: 'Digitalization of a traditional business.',
          list: ['Increase visibility', 'Digitalize processes'],
          quote: { text: 'Finally digital.', author: 'CEO' },
        },
        approach: {
          title: 'Our Approach',
          description: 'Holistic strategy.',
          steps: [{ title: 'Analysis', description: 'Status quo' }],
        },
        solution: { title: 'The Solution', description: 'Modern web presence.', images: [] },
        results: {
          title: 'The Results',
          description: 'More clients.',
          metrics: [{ label: 'Leads', value: '+200%', change: '+++ ' }],
        },
      },
    },
  },
  'creative-impact': {
    slug: 'creative-impact',
    category: 'design',
    thumbnail: 'palette',
    heroImage: 'bg-surface-dark',
    content: {
      de: {
        title: 'Creative Impact',
        subtitle: 'Art Studio Portfolio',
        category: 'Web Design',
        stats: [
          { label: 'Branche', value: 'Kunst' },
          { label: 'Tech Stack', value: 'WebGL' },
          { label: 'Dauer', value: '4 Wochen' },
        ],
        challenge: {
          title: 'Die Herausforderung',
          description: 'Portfolio für Künstler.',
          list: ['Immersives Design', 'Hohe Performance'],
          quote: { text: 'Kunst im Web.', author: 'Artist' },
        },
        approach: {
          title: 'Unser Ansatz',
          description: 'WebGL Experience.',
          steps: [{ title: 'Concept', description: 'Ideation' }],
        },
        solution: { title: 'Die Lösung', description: 'Immersive Galerie.', images: [] },
        results: {
          title: 'Die Ergebnisse',
          description: 'Begeisterte Besucher.',
          metrics: [{ label: 'Views', value: '10k+', change: 'Top' }],
        },
      },
      en: {
        title: 'Creative Impact',
        subtitle: 'Art Studio Portfolio',
        category: 'Web Design',
        stats: [
          { label: 'Industry', value: 'Art' },
          { label: 'Tech Stack', value: 'WebGL' },
          { label: 'Duration', value: '4 Weeks' },
        ],
        challenge: {
          title: 'The Challenge',
          description: 'Portfolio for artists.',
          list: ['Immersive Design', 'High Performance'],
          quote: { text: 'Art on the web.', author: 'Artist' },
        },
        approach: {
          title: 'Our Approach',
          description: 'WebGL Experience.',
          steps: [{ title: 'Concept', description: 'Ideation' }],
        },
        solution: { title: 'The Solution', description: 'Immersive Gallery.', images: [] },
        results: {
          title: 'The Results',
          description: 'Excited visitors.',
          metrics: [{ label: 'Views', value: '10k+', change: 'Top' }],
        },
      },
    },
  },
};
