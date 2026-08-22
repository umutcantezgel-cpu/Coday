export interface Course {
  id: number;
  videoSrc: string;
  image: string;
  slug: string;
  uploadDate: string;
  isoDuration: string;
  durationInSeconds: number;
  tags: string[];
  content: {
    de: {
      title: string;
      description: string;
      duration: string;
      tag: string;
      alt: string;
    };
    en: {
      title: string;
      description: string;
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
    uploadDate: '2025-01-15T09:00:00+01:00',
    isoDuration: 'PT12M45S',
    durationInSeconds: 765,
    tags: [
      'Webdesign Wetzlar',
      'Web-Agentur Auswahl',
      'ROI Webdesign',
      'Mittelhessen Digital',
      'Next.js Agentur',
    ],
    content: {
      de: {
        title: '5 Fragen an Ihre Web-Agentur – Der Praxis-Leitfaden für Unternehmer',
        description:
          'Worauf müssen Unternehmer aus Wetzlar und Mittelhessen achten, bevor sie eine Webagentur beauftragen? In dieser Video-Masterclass erfahren Sie die 5 kritischen Fragen zu Quellcode-Eigentum, Next.js Performance, No-Lock-in und messbarem ROI.',
        duration: '12:45',
        tag: 'STRATEGIE',
        alt: '5 Fragen an Ihre Web-Agentur Masterclass Video Thumbnail',
      },
      en: {
        title: '5 Questions to Ask Your Web Agency – Practical Guide for Founders',
        description:
          'What should business owners look out for before hiring a web agency? Learn the 5 critical questions covering source code ownership, Next.js performance, contract terms, and measurable digital ROI.',
        duration: '12:45',
        tag: 'STRATEGY',
        alt: '5 Questions to Ask Your Web Agency Masterclass Video Thumbnail',
      },
    },
  },
  {
    id: 2,
    slug: 'visitors-customers',
    videoSrc: '/videos/academy/Aus_Besuchern_werden_Kunden.mp4',
    image: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    uploadDate: '2025-01-20T10:00:00+01:00',
    isoDuration: 'PT18M20S',
    durationInSeconds: 1100,
    tags: [
      'Conversion Optimierung',
      'Webdesign Wetzlar',
      'Kundenakquise',
      'UX Design Mittelhessen',
      'Lead Generierung',
    ],
    content: {
      de: {
        title: 'Aus Besuchern werden Kunden – Psychologische Conversion-Optimierung',
        description:
          'Traffic alleine reicht nicht: Erfahren Sie, wie Sie Ihre Website durch psychologische Nutzerführung, klare Call-to-Actions und optimierte Ladezeiten in eine planbare Neukundenmaschine für Ihr Unternehmen verwandeln.',
        duration: '18:20',
        tag: 'CONVERSION',
        alt: 'Aus Besuchern werden Kunden Conversion Optimierung Video',
      },
      en: {
        title: 'Turning Visitors into Customers – High-Impact Conversion Optimization',
        description:
          'Traffic is only half the battle: Discover how to transform your website into a predictable customer generation engine using psychological UX, clear CTAs, and instant load speeds.',
        duration: '18:20',
        tag: 'CONVERSION',
        alt: 'Turning Visitors into Customers Conversion Optimization Video',
      },
    },
  },
  {
    id: 3,
    slug: 'seo-strategy',
    videoSrc: '/videos/academy/Die_Ultimative_SEO_Strategie.mp4',
    image: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    uploadDate: '2025-01-25T11:00:00+01:00',
    isoDuration: 'PT14M10S',
    durationInSeconds: 850,
    tags: [
      'SEO Strategie',
      'Google Ranking Wetzlar',
      'Technisches SEO',
      'Suchmaschinenoptimierung Hessen',
      'Core Web Vitals',
    ],
    content: {
      de: {
        title: 'Die Ultimative SEO-Strategie – Google-Dominanz für Mittelhessen & B2B',
        description:
          'Schritt-für-Schritt Anleitung für Top-Rankings bei Google: Technisches SEO, Core Web Vitals 100/100, semantische Topic-Silos und lokale SEO-Dominanz in Wetzlar, Gießen und ganz Hessen.',
        duration: '14:10',
        tag: 'SEO',
        alt: 'Die Ultimative SEO-Strategie Video Masterclass',
      },
      en: {
        title: 'The Ultimate SEO Strategy – Dominate Google Rankings for B2B',
        description:
          'Step-by-step masterclass for top Google search rankings: Technical SEO, Core Web Vitals 100/100, semantic topic silos, and local SEO dominance across Germany and Europe.',
        duration: '14:10',
        tag: 'SEO',
        alt: 'The Ultimate SEO Strategy Video Masterclass',
      },
    },
  },
  {
    id: 4,
    slug: 'google-reviews',
    videoSrc: '/videos/academy/GOOGLE-BEWERTUNGEN_MEISTERN.mp4',
    image: '/images/industries/handwerker-tablet.webp',
    uploadDate: '2025-02-01T09:30:00+01:00',
    isoDuration: 'PT9M30S',
    durationInSeconds: 570,
    tags: [
      'Google Bewertungen',
      'Lokale SEO Wetzlar',
      'Reputation Management',
      'Social Proof Handwerk',
      'Google Business Profile',
    ],
    content: {
      de: {
        title: 'Google Bewertungen Meistern – Vertrauen & Lokale Sichtbarkeit aufbauen',
        description:
          'Wie lokale Dienstleister, Handwerker und Praxen aus Wetzlar und Umgebung kontinuierlich echte 5-Sterne-Bewertungen auf Google aufbauen, professionell auf Feedback reagieren und ihren Trust-Score maximieren.',
        duration: '09:30',
        tag: 'REPUTATION',
        alt: 'Google Bewertungen Meistern Tutorial Video',
      },
      en: {
        title: 'Mastering Google Reviews – Build Trust & Dominate Local Search',
        description:
          'How local businesses and service providers build authentic 5-star reviews on Google, handle feedback professionally, and maximize local search visibility and trust.',
        duration: '09:30',
        tag: 'REPUTATION',
        alt: 'Mastering Google Reviews Tutorial Video',
      },
    },
  },
  {
    id: 5,
    slug: 'traffic-generation',
    videoSrc: '/videos/academy/SO_KOMMEN_BESUCHER_AUF_DEINE_SEITE.mp4',
    image: '/images/marketing/social-media-marketing-influencer-likes-shares-viral.webp',
    uploadDate: '2025-02-05T14:00:00+01:00',
    isoDuration: 'PT16M15S',
    durationInSeconds: 975,
    tags: [
      'Traffic Generierung',
      'Online Marketing Wetzlar',
      'GEO Optimierung',
      'B2B Leadgenerierung',
      'Besucherströme',
    ],
    content: {
      de: {
        title: 'So kommen Besucher auf deine Seite – Nachhaltige Traffic-Kanäle 2026',
        description:
          'Organischer Suchtraffic, Social Media Synergien und GEO (Generative Engine Optimization): Die effektivsten Strategien, um qualifizierte Interessenten und Neukunden auf Ihre Unternehmenswebsite zu lenken.',
        duration: '16:15',
        tag: 'TRAFFIC',
        alt: 'So kommen Besucher auf deine Seite Video Tutorial',
      },
      en: {
        title: 'How to Drive Quality Traffic to Your Website – Growth Channels 2026',
        description:
          'Organic search traffic, social media synergy, and Generative Engine Optimization (GEO): The most effective playbooks for attracting qualified B2B leads to your website.',
        duration: '16:15',
        tag: 'TRAFFIC',
        alt: 'How to Drive Quality Traffic to Your Website Video Tutorial',
      },
    },
  },
  {
    id: 6,
    slug: 'website-cost',
    videoSrc: '/videos/academy/WAS_KOSTET_EINE_WEBSITE_WIRKLICH_.mp4',
    image: '/images/marketing/email-marketing-kampagne-newsletter-zielgruppe-versand.webp',
    uploadDate: '2025-02-10T11:00:00+01:00',
    isoDuration: 'PT11M00S',
    durationInSeconds: 660,
    tags: [
      'Website Kosten',
      'Webdesign Preise Wetzlar',
      'Webentwicklung Budget',
      'Festpreis Webagentur',
      'Next.js Investition',
    ],
    content: {
      de: {
        title: 'Was kostet eine Website wirklich? – Preisfallen & Budget-Kalkulation',
        description:
          'Transparente Aufschlüsselung moderner Webentwicklung: Von der Basis-Website bis zur Enterprise-Plattform. Vermeiden Sie versteckte Abo-Fallen, WordPress-Wartungskosten und Fehlinvestitionen.',
        duration: '11:00',
        tag: 'BUDGET',
        alt: 'Was kostet eine Website wirklich Video Analyse',
      },
      en: {
        title: 'What Does a Website Really Cost? – Budgeting & Hidden Cost Traps',
        description:
          'Transparent breakdown of modern web engineering costs: From compact business sites to enterprise platforms. Avoid hidden subscription traps, plugin bloat, and wrong investments.',
        duration: '11:00',
        tag: 'BUDGET',
        alt: 'What Does a Website Really Cost Video Analysis',
      },
    },
  },
  {
    id: 7,
    slug: 'website-check',
    videoSrc: '/videos/academy/Website__Magnet_oder_Schreck_.mp4',
    image: '/images/hero/business-meeting-besprechung-team-konferenz.webp',
    uploadDate: '2025-02-15T15:00:00+01:00',
    isoDuration: 'PT8M45S',
    durationInSeconds: 525,
    tags: [
      'Website Audit',
      'Webdesign Analyse Wetzlar',
      'Performance Test',
      'PageSpeed Wetzlar',
      'DSGVO Sicherheit',
    ],
    content: {
      de: {
        title: 'Website: Magnet oder Schreck? – Der 7-Punkte-Audit für Ihren Auftritt',
        description:
          'Schreckt Ihre aktuelle Internetseite Kunden ab oder zieht sie Anfragen magnetisch an? Der praxisnahe 7-Punkte-Check für Ladezeiten unter 0,3s, Mobile-UX, Design-Wirkung und DSGVO-Sicherheit.',
        duration: '08:45',
        tag: 'DESIGN',
        alt: 'Website: Magnet oder Schreck Audit Video',
      },
      en: {
        title: 'Website: Magnet or Repellent? – The 7-Point Web Audit Checklist',
        description:
          'Is your current website repelling potential clients or attracting high-value leads? The definitive 7-point audit for page speed, mobile UX, design authority, and legal compliance.',
        duration: '08:45',
        tag: 'DESIGN',
        alt: 'Website: Magnet or Repellent Audit Video',
      },
    },
  },
];
