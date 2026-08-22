export type ModuleCategory =
  | 'basis'
  | 'design'
  | 'function'
  | 'commerce'
  | 'tech'
  | 'seo'
  | 'support';
export type PriceType = 'one-time' | 'monthly';

export interface Module {
  id: string;
  category: ModuleCategory;
  name: string;
  description: string;
  priceInCents: number;
  priceType: PriceType;
  icon: string;
  dependencies?: string[];
  incompatible?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export const modules: Module[] = [
  // Basis-Pakete (4 Tiers)
  {
    id: 'basis-starter',
    category: 'basis',
    name: 'Starter (Klein)',
    description: 'Kompakte Webpräsenz (1–5 Seiten), Sub-0,3s Ladezeit & DSGVO-Funnel',
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'rocket_launch',
  },
  {
    id: 'basis-business',
    category: 'basis',
    name: 'Business (Mittel)',
    description: 'B2B-Website (bis 12 Seiten), SEO-Silos, Recruiting-Funnel & Bento-UI',
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'business',
    isPopular: true,
  },
  {
    id: 'basis-corporate',
    category: 'basis',
    name: 'Pro Corporate (Groß)',
    description:
      'Umfangreiche Corporate-Plattform (bis 30 Seiten), Multi-Language (i18n) & Lead-Architektur',
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'domain',
  },
  {
    id: 'basis-enterprise',
    category: 'basis',
    name: 'Enterprise Platform (Extrem groß)',
    description:
      'Für Großkunden & riesige Plattformen mit landesweitem oder internationalem Rollout',
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'workspace_premium',
  },

  // E-Commerce
  {
    id: 'commerce-starter',
    category: 'commerce',
    name: 'Shopify Setup',
    description: 'Professioneller Shopify Store',
    priceInCents: 74900,
    priceType: 'one-time',
    icon: 'storefront',
  },
  {
    id: 'commerce-headless',
    category: 'commerce',
    name: 'Headless Commerce',
    description: 'Custom Frontend für Shopify/WooCommerce',
    priceInCents: 111900,
    priceType: 'one-time',
    icon: 'shopping_bag',
  },

  // Design
  {
    id: 'design-ui',
    category: 'design',
    name: 'Premium UI Design',
    description: 'Individuelles Screen-Design (Figma)',
    priceInCents: 29900,
    priceType: 'one-time',
    icon: 'palette',
  },
  {
    id: 'design-system',
    category: 'design',
    name: 'Design System',
    description: 'Wiederverwendbare Komponenten-Bibliothek',
    priceInCents: 36900,
    priceType: 'one-time',
    icon: 'widgets',
  },
  {
    id: 'design-motion',
    category: 'design',
    name: 'Motion Experience',
    description: 'Advanced Animations & Transitions',
    priceInCents: 21900,
    priceType: 'one-time',
    icon: 'animation',
  },

  // Function
  {
    id: 'func-cms',
    category: 'function',
    name: 'Headless CMS',
    description: 'Content Management (Sanity/Strapi)',
    priceInCents: 36900,
    priceType: 'one-time',
    icon: 'article',
  },
  {
    id: 'func-auth',
    category: 'function',
    name: 'User Auth & Profil',
    description: 'Login, Registrierung, User-Dashboard',
    priceInCents: 44900,
    priceType: 'one-time',
    icon: 'person',
  },
  {
    id: 'func-api',
    category: 'function',
    name: 'API Integration',
    description: 'Anbindung externer Dienste (CRM, ERP)',
    priceInCents: 51900,
    priceType: 'one-time',
    icon: 'api',
  },

  // Tech
  {
    id: 'tech-pwa',
    category: 'tech',
    name: 'PWA Features',
    description: 'Offline-Support & Installability',
    priceInCents: 21900,
    priceType: 'one-time',
    icon: 'install_mobile',
  },
  {
    id: 'tech-i18n',
    category: 'tech',
    name: 'Internationalization',
    description: 'Mehrsprachigkeit (i18n Setup)',
    priceInCents: 26900,
    priceType: 'one-time',
    icon: 'language',
  },

  // SEO (Technical only)
  {
    id: 'seo-tech',
    category: 'seo',
    name: 'Technical SEO Audit',
    description: 'Struktur, Schema.org, Core Web Vitals',
    priceInCents: 21900,
    priceType: 'one-time',
    icon: 'manage_search',
    isRecommended: true,
  },
  {
    id: 'seo-speed',
    category: 'seo',
    name: 'Performance Max',
    description: 'Ladezeit-Optimierung auf <1s',
    priceInCents: 26900,
    priceType: 'one-time',
    icon: 'speed',
  },

  // Support
  {
    id: 'support-basic',
    category: 'support',
    name: 'Hosting & Wartung',
    description: 'Server Updates & Backups',
    priceInCents: 1900,
    priceType: 'monthly',
    icon: 'dns',
  },
  {
    id: 'support-pro',
    category: 'support',
    name: 'SLA Support',
    description: '24/7 Notfall-Support & Weiterentwicklung',
    priceInCents: 9900,
    priceType: 'monthly',
    icon: 'support_agent',
  },
];

export const categoryLabels: Record<ModuleCategory, string> = {
  basis: 'Projekt Basis',
  commerce: 'E-Commerce',
  design: 'Web Design',
  function: 'Funktionalität',
  tech: 'Advanced Tech',
  seo: 'Technical SEO',
  support: 'Betrieb & Wartung',
};
