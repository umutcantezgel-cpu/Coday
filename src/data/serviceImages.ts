/**
 * Service category images mapping.
 * Maps service keys to illustration paths and alt-texts.
 */
export const serviceImages: Record<string, { src: string; alt: string }> = {
    'hero': {
        src: '/images/services/dienstleistung-service-illustration-01.webp',
        alt: 'Digitale Dienstleistungen und Service Excellence'
    },
    'development': {
        src: '/images/services/dienstleistung-service-illustration-02.webp',
        alt: 'Professionelle Webentwicklung und Software Engineering'
    },
    'webdesign': {
        src: '/images/services/dienstleistung-service-illustration-03.webp',
        alt: 'Kreatives Webdesign und User Experience'
    },
    'seo': {
        src: '/images/services/dienstleistung-service-illustration-04.webp',
        alt: 'Suchmaschinenoptimierung und Sichtbarkeit'
    },
    'marketing': {
        src: '/images/services/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
        alt: 'Omnichannel Marketing Hub mit vernetzter SEO und Social Media Strategie'
    },
    'gmb': {
        src: '/images/services/mann-bewertungskarte-smartphone-location-pin-4-5-sterne-haekchen-verifiziert.webp',
        alt: 'Google My Business Optimierung mit 5-Sterne Bewertung auf Smartphone'
    },
    'terminbuchung': {
        src: '/images/services/tablet-kalender-monatsansicht-tag-12-zeitslots-book-now-button-drei-personen.webp',
        alt: 'Online-Terminbuchung System mit Kalender und verfügbaren Zeitslots'
    },
    'bewertungen': {
        src: '/images/services/drei-kunden-reviews.webp',
        alt: 'Zufriedene Kunden geben positive 5-Sterne Bewertungen mit Daumen hoch'
    }
};

/**
 * Web Development page images.
 */
export const webDevImages: Record<string, { src: string; alt: string }> = {
    'hero': {
        src: '/images/services/website-builder-drag-drop-baukasten-elemente-webdesign.webp',
        alt: 'Moderner Website Builder und Entwicklungsumgebung'
    },
    'solutions': {
        src: '/images/services/mockup-website-b2b-loesungen-responsive-laptop-smartphone-prozessoptimierung.webp',
        alt: 'Responsive B2B Web-Lösungen auf verschiedenen Endgeräten'
    }
};

/**
 * App Development page images.
 */
export const appDevImages: Record<string, { src: string; alt: string }> = {
    'hero': {
        src: '/images/app-dev/mockup-app-kalenderansicht-datum-auswaehlen-smartphone-oktober.webp',
        alt: 'Mobile App Kalender Dashboard und Benutzeroberfläche'
    },
    'consulting': {
        src: '/images/app-dev/consulting.webp',
        alt: 'IT Beratung und Support'
    },
    'workflow': {
        src: '/images/app-dev/branche-app-design-wireframe-ui-tablet-stylus-kreativ.webp',
        alt: 'App Design Wireframes und User Flow Konzepte'
    },
    'webdesign': {
        src: '/images/services/dienstleistung-service-illustration-03.webp',
        alt: 'Interface Design und Entwicklung'
    }
};

export const appDevFeatureMapping: Record<string, keyof typeof appDevImages> = {
    'react-nextjs-agentur': 'hero',
    'modern-ui-ux-implementation': 'webdesign',
    'e-commerce-shops': 'workflow',
    'full-stack-entwicklung': 'hero',
    'app-wartung-scaling': 'consulting',
    'cloud-infrastructure': 'workflow',
    'enterprise-security': 'workflow'
};

/**
 * Branding page images.
 */
export const brandingImages: Record<string, { src: string; alt: string }> = {
    'hero': {
        src: '/images/branding/hero.webp',
        alt: 'Architekturbüro als Metapher für Markenaufbau'
    },
    'visuals': {
        src: '/images/branding/visuals.webp',
        alt: 'Professionelle Fotografie und Visualisierung'
    },
    'strategy': {
        src: '/images/branding/strategy.webp',
        alt: 'Strategische Markenplanung'
    }
};

export const brandingFeatureMapping: Record<string, keyof typeof brandingImages> = {
    'branding': 'hero',
    'markenstrategie': 'strategy',
    'corporate-design': 'visuals',
    'employer-branding': 'strategy',
    'ux-ui-design': 'visuals',
    'brand-messaging': 'strategy',
    'design-systems': 'visuals',
    'website-relaunch': 'hero'
};

/**
 * Marketing & SEO page images.
 */
export const marketingImages: Record<string, { src: string; alt: string }> = {
    'hero': {
        src: '/images/marketing/marketing-strategie-planung-konzept-01.webp',
        alt: 'Strategische Marketingplanung und SEO Analyse'
    },
    'omnichannel': {
        src: '/images/marketing/omnichannel-marketing-hub-seo-social-content-strategie-vernetzt.webp',
        alt: 'Omnichannel Marketing Hub'
    }
};
