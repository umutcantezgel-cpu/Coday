import { PACKAGES } from './packages';

export type ModuleCategory =
  | 'basis'
  | 'design'
  | 'function'
  | 'commerce'
  | 'tech'
  | 'seo'
  | 'support';
export type PriceType = 'one-time' | 'monthly';

type Localized = { de: string; en: string };

export interface Module {
  id: string;
  category: ModuleCategory;
  /** Internal / technical name (kept for logs and the agency notification). */
  name: string;
  description: string;
  /** Plain-language name shown to visitors (pricing page, calculator, wizard, customer e-mail). */
  plainName: Localized;
  /** One-sentence benefit in plain language. */
  benefit: Localized;
  priceInCents: number;
  priceType: PriceType;
  icon: string;
  dependencies?: string[];
  incompatible?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export const modules: Module[] = [
  // Basis-Pakete (4 Tiers) – names mirror src/shared/data/packages.ts
  {
    id: 'basis-starter',
    category: 'basis',
    name: PACKAGES.starter.legacyName.de,
    description: 'Kompakte Website mit 1–5 Seiten, schnell geladen, mit Kontaktformular',
    plainName: PACKAGES.starter.name,
    benefit: {
      de: 'Kompakte Website mit bis zu 5 Seiten, die in unter einer halben Sekunde lädt.',
      en: 'Compact website with up to 5 pages that loads in under half a second.',
    },
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'rocket_launch',
  },
  {
    id: 'basis-business',
    category: 'basis',
    name: PACKAGES.business.legacyName.de,
    description: 'Website mit bis zu 12 Seiten, Anfrage- und Bewerberformular, Google-Optimierung',
    plainName: PACKAGES.business.name,
    benefit: {
      de: 'Bis zu 12 Seiten mit Anfrage- und Bewerberformular, damit Kunden und Mitarbeiter Sie finden.',
      en: 'Up to 12 pages with inquiry and applicant forms so customers and staff can find you.',
    },
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'business',
    isPopular: true,
  },
  {
    id: 'basis-corporate',
    category: 'basis',
    name: PACKAGES.corporate.legacyName.de,
    description: 'Unternehmensplattform mit bis zu 30 Seiten, zweiter Sprache und Rechnern',
    plainName: PACKAGES.corporate.name,
    benefit: {
      de: 'Bis zu 30 Seiten, zweite Sprache und interaktive Rechner für größere Unternehmen.',
      en: 'Up to 30 pages, a second language and interactive calculators for larger companies.',
    },
    priceInCents: 0,
    priceType: 'one-time',
    icon: 'domain',
  },
  {
    id: 'basis-enterprise',
    category: 'basis',
    name: PACKAGES.enterprise.legacyName.de,
    description: 'Für Konzerne, Filialnetze und sehr viele Besucher',
    plainName: PACKAGES.enterprise.name,
    benefit: {
      de: 'Für Konzerne, Filialnetze und Plattformen mit sehr vielen Besuchern.',
      en: 'For corporations, branch networks and platforms with very high traffic.',
    },
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
    plainName: { de: 'Fertiger Online-Shop (Shopify)', en: 'Ready-made online shop (Shopify)' },
    benefit: {
      de: 'Ein fertig eingerichteter Shop, in dem Sie sofort verkaufen können.',
      en: 'A fully set-up shop where you can start selling right away.',
    },
    priceInCents: 74900,
    priceType: 'one-time',
    icon: 'storefront',
  },
  {
    id: 'commerce-headless',
    category: 'commerce',
    name: 'Headless Commerce',
    description: 'Custom Frontend für Shopify/WooCommerce',
    plainName: { de: 'Online-Shop', en: 'Online shop' },
    benefit: {
      de: 'Verkaufen Sie Produkte direkt über Ihre Website, mit sicherem Bezahlvorgang und schnellem Warenkorb.',
      en: 'Sell products directly on your website with secure checkout and a fast cart.',
    },
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
    plainName: { de: 'Individuelles Design', en: 'Custom design' },
    benefit: {
      de: 'Sie sehen und genehmigen jedes Layout als Entwurf, bevor wir mit dem Bau beginnen.',
      en: 'You see and approve every layout as a draft before we start building.',
    },
    priceInCents: 29900,
    priceType: 'one-time',
    icon: 'palette',
  },
  {
    id: 'design-system',
    category: 'design',
    name: 'Design System',
    description: 'Wiederverwendbare Komponenten-Bibliothek',
    plainName: { de: 'Design-Baukasten', en: 'Design toolkit' },
    benefit: {
      de: 'Einheitliche Bausteine, damit neue Seiten später schnell und im gleichen Stil entstehen.',
      en: 'Consistent building blocks so new pages can be added quickly in the same style.',
    },
    priceInCents: 36900,
    priceType: 'one-time',
    icon: 'widgets',
  },
  {
    id: 'design-motion',
    category: 'design',
    name: 'Motion Experience',
    description: 'Advanced Animations & Transitions',
    plainName: { de: 'Animationen & Effekte', en: 'Animations & effects' },
    benefit: {
      de: 'Sanfte Bewegungen, die Besucher durch die Seite führen und Wertigkeit vermitteln.',
      en: 'Smooth motion that guides visitors through the page and signals quality.',
    },
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
    plainName: { de: 'Texte & Bilder selbst ändern', en: 'Edit texts & images yourself' },
    benefit: {
      de: 'Sie pflegen Texte, Bilder und Neuigkeiten selbst, ohne Programmierkenntnisse und ohne Wartezeit.',
      en: 'You update texts, images and news yourself, no coding and no waiting.',
    },
    priceInCents: 36900,
    priceType: 'one-time',
    icon: 'article',
  },
  {
    id: 'func-auth',
    category: 'function',
    name: 'User Auth & Profil',
    description: 'Login, Registrierung, User-Dashboard',
    plainName: { de: 'Kundenbereich mit Login', en: 'Client area with login' },
    benefit: {
      de: 'Ein geschützter Bereich, in dem sich Kunden oder Mitarbeiter anmelden, etwa für Dokumente oder Bestellungen.',
      en: 'A protected area where customers or staff sign in, for example for documents or orders.',
    },
    priceInCents: 44900,
    priceType: 'one-time',
    icon: 'person',
  },
  {
    id: 'func-api',
    category: 'function',
    name: 'API Integration',
    description: 'Anbindung externer Dienste (CRM, ERP)',
    plainName: { de: 'Anbindung Ihrer Programme', en: 'Connect your business software' },
    benefit: {
      de: 'Anfragen und Daten landen automatisch in Ihrer Kundenverwaltung oder Warenwirtschaft.',
      en: 'Inquiries and data flow automatically into your CRM or inventory system.',
    },
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
    plainName: { de: 'Als App aufs Handy', en: 'Installable as a phone app' },
    benefit: {
      de: 'Ihre Website lässt sich wie eine App auf dem Handy installieren, mit Startsymbol und Offline-Ansicht.',
      en: 'Your website can be installed on phones like an app, with a home-screen icon and offline view.',
    },
    priceInCents: 21900,
    priceType: 'one-time',
    icon: 'install_mobile',
  },
  {
    id: 'tech-i18n',
    category: 'tech',
    name: 'Internationalization',
    description: 'Mehrsprachigkeit (i18n Setup)',
    plainName: { de: 'Zweite Sprache', en: 'Second language' },
    benefit: {
      de: 'Ihre Website in einer weiteren Sprache, jeweils mit eigener Adresse für Google.',
      en: 'Your website in an additional language, each with its own address for Google.',
    },
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
    plainName: { de: 'Besser bei Google gefunden werden', en: 'Get found on Google' },
    benefit: {
      de: 'Wir bereiten Ihre Seite so auf, dass Google jede Leistung versteht und Zusatzinfos wie Bewertungen im Suchergebnis zeigt.',
      en: 'We prepare your site so Google understands every service and shows extras like reviews in the results.',
    },
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
    plainName: { de: 'Extra-Tuning für Ladezeit', en: 'Extra speed tuning' },
    benefit: {
      de: 'Für bestehende Seiten: Wir holen die letzten Zehntelsekunden aus der Ladezeit heraus.',
      en: 'For existing sites: we squeeze the last tenths of a second out of the load time.',
    },
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
    plainName: { de: 'Rundum-sorglos-Betreuung', en: 'Worry-free care' },
    benefit: {
      de: 'Hosting, Sicherheits-Updates und tägliche Sicherungen. Sie müssen sich um nichts kümmern.',
      en: 'Hosting, security updates and daily backups. Nothing for you to worry about.',
    },
    priceInCents: 1900,
    priceType: 'monthly',
    icon: 'dns',
  },
  {
    id: 'support-pro',
    category: 'support',
    name: 'SLA Support',
    description: '24/7 Notfall-Support & Weiterentwicklung',
    plainName: { de: 'Bevorzugter Support', en: 'Priority support' },
    benefit: {
      de: 'Garantierte Reaktionszeiten und ein direkter Draht zum Entwickler, wenn es schnell gehen muss.',
      en: 'Guaranteed response times and a direct line to the developer when it has to be fast.',
    },
    priceInCents: 9900,
    priceType: 'monthly',
    icon: 'support_agent',
  },
];

export const categoryLabels: Record<ModuleCategory, string> = {
  basis: 'Ihr Paket',
  commerce: 'Online-Shop',
  design: 'Design',
  function: 'Funktionen',
  tech: 'Technik-Extras',
  seo: 'Bei Google gefunden werden',
  support: 'Betreuung nach dem Start',
};

/** Add-on ids offered in the pricing configurator, in display order. */
export const CONFIGURATOR_ADDON_IDS = [
  'func-cms',
  'commerce-headless',
  'func-auth',
  'seo-tech',
  'design-ui',
  'tech-i18n',
  'tech-pwa',
  'support-basic',
  'support-pro',
] as const;

export const ADDON_MODULES: Module[] = modules.filter((m) => m.category !== 'basis');

export function getModule(id: string): Module | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulePlainName(id: string, locale: 'de' | 'en' = 'de'): string | null {
  const mod = getModule(id);
  return mod ? mod.plainName[locale] : null;
}
