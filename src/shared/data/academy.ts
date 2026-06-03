export interface Course {
  id: number;
  videoSrc: string;
  image: string;
  slug: string; // for potential routing or keys
  content: {
    de: {
      title: string;
      duration: string;
      tag: string;
      alt: string;
    };
    en: {
      title: string;
      duration: string;
      tag: string;
      alt: string;
    };
  };
}

export const academyData: Course[] = [
  {
    id: 1,
    slug: '5-questions',
    videoSrc: '/videos/academy/5_Fragen_an_Ihre_Web-Agentur.mp4',
    image: '/images/marketing/seo-audit-analyse-optimierung-google-ranking.webp',
    content: {
      de: {
        title: '5 Fragen an Ihre Web-Agentur',
        duration: '12:45',
        tag: 'STRATEGIE',
        alt: '5 Fragen Agentur',
      },
      en: {
        title: '5 Questions to Ask Your Web Agency',
        duration: '12:45',
        tag: 'STRATEGY',
        alt: '5 Questions Agency',
      },
    },
  },
  {
    id: 2,
    slug: 'visitors-customers',
    videoSrc: '/videos/academy/Aus_Besuchern_werden_Kunden.mp4',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    content: {
      de: {
        title: 'Aus Besuchern werden Kunden',
        duration: '18:20',
        tag: 'CONVERSION',
        alt: 'Conversion Optimierung',
      },
      en: {
        title: 'Turning Visitors into Customers',
        duration: '18:20',
        tag: 'CONVERSION',
        alt: 'Conversion Optimization',
      },
    },
  },
  {
    id: 3,
    slug: 'seo-strategy',
    videoSrc: '/videos/academy/Die_Ultimative_SEO_Strategie.mp4',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    content: {
      de: {
        title: 'Die Ultimative SEO Strategie',
        duration: '14:10',
        tag: 'SEO',
        alt: 'SEO Strategie',
      },
      en: {
        title: 'The Ultimate SEO Strategy',
        duration: '14:10',
        tag: 'SEO',
        alt: 'SEO Strategy',
      },
    },
  },
  {
    id: 4,
    slug: 'google-reviews',
    videoSrc: '/videos/academy/GOOGLE-BEWERTUNGEN_MEISTERN.mp4',
    image: '/images/industries/handwerker-tablet.webp',
    content: {
      de: {
        title: 'Google Bewertungen Meistern',
        duration: '09:30',
        tag: 'REPUTATION',
        alt: 'Google Bewertungen',
      },
      en: {
        title: 'Mastering Google Reviews',
        duration: '09:30',
        tag: 'REPUTATION',
        alt: 'Google Reviews',
      },
    },
  },
  {
    id: 5,
    slug: 'traffic-generation',
    videoSrc: '/videos/academy/SO_KOMMEN_BESUCHER_AUF_DEINE_SEITE.mp4',
    image: '/images/marketing/social-media-marketing-influencer-likes-shares-viral.webp',
    content: {
      de: {
        title: 'So kommen Besucher auf deine Seite',
        duration: '16:15',
        tag: 'TRAFFIC',
        alt: 'Traffic Generierung',
      },
      en: {
        title: 'How to Get Visitors to Your Site',
        duration: '16:15',
        tag: 'TRAFFIC',
        alt: 'Traffic Generation',
      },
    },
  },
  {
    id: 6,
    slug: 'website-cost',
    videoSrc: '/videos/academy/WAS_KOSTET_EINE_WEBSITE_WIRKLICH_.mp4',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    content: {
      de: {
        title: 'Was kostet eine Website wirklich?',
        duration: '11:00',
        tag: 'BUDGET',
        alt: 'Website Kosten',
      },
      en: {
        title: 'What Does a Website Really Cost?',
        duration: '11:00',
        tag: 'BUDGET',
        alt: 'Website Costs',
      },
    },
  },
  {
    id: 7,
    slug: 'website-check',
    videoSrc: '/videos/academy/Website__Magnet_oder_Schreck_.mp4',
    image:
      '/images/hero/business-meeting-besprechung-team-konferenz.webp',
    content: {
      de: {
        title: 'Website: Magnet oder Schreck?',
        duration: '08:45',
        tag: 'DESIGN',
        alt: 'Website Design Check',
      },
      en: {
        title: 'Website: Magnet or Repellent?',
        duration: '08:45',
        tag: 'DESIGN',
        alt: 'Website Design Check',
      },
    },
  },
];
