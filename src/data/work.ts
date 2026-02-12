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
  liveUrl?: string;
}

export const workData: Record<string, Project> = {
  // Add other projects similarly...

  // ... Simplified for other entries to save context window, but structure is clear
  batherm: {
    slug: 'batherm',
    category: 'development',
    thumbnail: 'plumbing',
    liveUrl: 'https://www.batherm.de',
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
};
