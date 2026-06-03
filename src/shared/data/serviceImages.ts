/**
 * Service category images mapping.
 * Maps service keys to illustration paths and alt-texts.
 */
export const serviceImages: Record<string, { src: string; alt: string }> = {
  hero: {
    src: '/images/services/dienstleistung-service-illustration-01.webp',
    alt: 'images.overview.hero.alt',
  },
  development: {
    src: '/images/services/dienstleistung-service-illustration-02.webp',
    alt: 'images.overview.development.alt',
  },
  webdesign: {
    src: '/images/services/dienstleistung-service-illustration-03.webp',
    alt: 'images.overview.webdesign.alt',
  },
  seo: {
    src: '/images/services/dienstleistung-service-illustration-04.webp',
    alt: 'images.overview.seo.alt',
  },
  marketing: {
    src: '/images/services/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'images.overview.marketing.alt',
  },
  gmb: {
    src: '/images/services/mann-bewertungskarte-smartphone-location-pin-4-5-sterne-haekchen-verifiziert.webp',
    alt: 'images.overview.gmb.alt',
  },
  terminbuchung: {
    src: '/images/services/tablet-kalender-monatsansicht-tag-12-zeitslots-book-now-button-drei-personen.webp',
    alt: 'images.overview.terminbuchung.alt',
  },
  bewertungen: {
    src: '/images/services/drei-kunden-reviews.webp',
    alt: 'images.overview.bewertungen.alt',
  },
};

/**
 * Web Development page images.
 */
export const webDevImages: Record<string, { src: string; alt: string }> = {
  hero: {
    src: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
    alt: 'images.web_dev.hero.alt',
  },
  solutions: {
    src: '/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp',
    alt: 'images.web_dev.solutions.alt',
  },
};

/**
 * App Development page images.
 */
export const appDevImages: Record<string, { src: string; alt: string }> = {
  hero: {
    src: '/images/app-dev/mockup-app-kalenderansicht-datum-auswaehlen-smartphone-oktober.webp',
    alt: 'images.app_dev.hero.alt',
  },
  consulting: {
    src: '/images/app-dev/consulting.webp',
    alt: 'images.app_dev.consulting.alt',
  },
  workflow: {
    src: '/images/app-dev/branche-app-design-wireframe-ui-tablet-stylus-kreativ.webp',
    alt: 'images.app_dev.workflow.alt',
  },
  webdesign: {
    src: '/images/services/dienstleistung-service-illustration-03.webp',
    alt: 'images.app_dev.webdesign.alt',
  },
};

export const appDevFeatureMapping: Record<string, keyof typeof appDevImages> = {
  'react-nextjs-agentur': 'hero',
  'modern-ui-ux-implementation': 'webdesign',
  'e-commerce-shops': 'workflow',
  'full-stack-entwicklung': 'hero',
  'app-wartung-scaling': 'consulting',
  'cloud-infrastructure': 'workflow',
  'enterprise-security': 'workflow',
};

/**
 * Branding page images.
 */
export const brandingImages: Record<string, { src: string; alt: string }> = {
  hero: {
    src: '/images/branding/hero.webp',
    alt: 'images.branding.hero.alt',
  },
  visuals: {
    src: '/images/branding/visuals.webp',
    alt: 'images.branding.visuals.alt',
  },
  strategy: {
    src: '/images/branding/strategy.webp',
    alt: 'images.branding.strategy.alt',
  },
};

export const brandingFeatureMapping: Record<string, keyof typeof brandingImages> = {
  branding: 'hero',
  markenstrategie: 'strategy',
  'corporate-design': 'visuals',
  'employer-branding': 'strategy',
  'ux-ui-design': 'visuals',
  'brand-messaging': 'strategy',
  'design-systems': 'visuals',
  'website-relaunch': 'hero',
};

/**
 * Marketing & SEO page images.
 */
export const marketingImages: Record<string, { src: string; alt: string }> = {
  hero: {
    src: '/images/marketing/marketing-strategie-planung-konzept-01.webp',
    alt: 'images.marketing.hero.alt',
  },
  omnichannel: {
    src: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
    alt: 'images.marketing.omnichannel.alt',
  },
};
