export interface Whitepaper {
  id: number;
  fileUrl: string;
  image: string;
  slug: string;
  content: {
    de: {
      title: string;
      description: string;
      tag: string;
      alt: string;
    };
    en: {
      title: string;
      description: string;
      tag: string;
      alt: string;
    };
  };
}

export const whitepaperData: Whitepaper[] = [
  {
    id: 1,
    slug: 'web-relaunch-guide',
    image: '/images/marketing/marketing-strategie-planung-konzept-01.webp',
    fileUrl: '/documents/web-relaunch-guide-2026.pdf',
    content: {
      de: {
        title: 'Der ultimative Web-Relaunch Guide 2026',
        description:
          'Alles was du wissen musst, bevor du deine neue Website planst. Inklusive Checkliste und Budget-Planer.',
        tag: 'Guide',
        alt: 'Strategie Planung Konzept',
      },
      en: {
        title: 'The Ultimate Web Relaunch Guide 2026',
        description:
          'Everything you need to know before planning your new website. Includes checklist and budget planner.',
        tag: 'Guide',
        alt: 'Strategy Planning Concept',
      },
    },
  },
  {
    id: 2,
    slug: 'seo-ranking-factors',
    image:
      '/images/marketing/datenanalyse-business-intelligence-reporting-statistiken-auswertung.webp',
    fileUrl: '/documents/seo-domination-guide-2026_1.pdf',
    content: {
      de: {
        title: 'SEO Domination: Ranking Faktoren',
        description:
          'Die 200 wichtigsten Google Ranking Faktoren analysiert und priorisiert für lokales Business.',
        tag: 'Checkliste',
        alt: 'SEO Datenanalyse Report',
      },
      en: {
        title: 'SEO Domination: Ranking Factors',
        description:
          'The 200 most important Google ranking factors analyzed and prioritized for local businesses.',
        tag: 'Checklist',
        alt: 'SEO Data Analysis Report',
      },
    },
  },
  {
    id: 3,
    slug: 'cro-guide',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    fileUrl: '/documents/cro-guide-2026.pdf',
    content: {
      de: {
        title: 'Conversion Rate Optimierung (CRO)',
        description:
          'Wie du Besucher in zahlende Kunden verwandelst. Psychologische Trigger und Layout-Hacks.',
        tag: 'Template',
        alt: 'Conversion Optimierung',
      },
      en: {
        title: 'Conversion Rate Optimization (CRO)',
        description:
          'How to turn visitors into paying customers. Psychological triggers and layout hacks.',
        tag: 'Template',
        alt: 'Conversion Optimization',
      },
    },
  },
];
