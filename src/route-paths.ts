export const ROUTES = {
    HOME: '/',
    SERVICES: {
        ROOT: '/services',
        INDUSTRIES: '/services/industries',
        WEB_DEVELOPMENT: '/services/web-development',
        WEB_DESIGN: '/services/web-design',
        SEO: '/services/seo',
        PERFORMANCE: '/services/performance',
        ENTERPRISE: '/services/enterprise-web',
        ECOMMERCE: '/services/web-development/e-commerce',
        WEB_APPS: '/services/web-development/web-apps',
        CMS_HEADLESS: '/services/web-development/cms-headless',
        API_INTEGRATION: '/services/web-development/api-integrations',
        MIGRATION: '/services/web-development/migration',
        UI_UX: '/services/web-design/ui-ux',
        BRAND_IDENTITY: '/services/web-design/brand-identity',
        DESIGN_SYSTEMS: '/services/web-design/design-systems',
        AUDIT: '/services/web-design/audit',
    },
    WORK: {
        ROOT: '/work',

        BATHERM: '/work/batherm',
    },
    PROCESS: '/process',
    PACKAGES: '/packages',
    CONTACT: '/contact',
    CALCULATOR: '/calculator',
    BOOKING: '/booking',
    LEGAL: {
        IMPRESSUM: '/legal/impressum',
        DATENSCHUTZ: '/legal/datenschutz',
        AGB: '/legal/agb',
    },
    KNOWLEDGE: {
        ACADEMY: '/academy',
        BLOG: '/knowledge/blog',
        NEWSLETTER: '/knowledge/newsletter',
        WHITEPAPERS: '/knowledge/whitepapers',
    },
    CAREER: {
        ROOT: '/career',
        JOBS: '/career/jobs',
        CULTURE: '/career/culture',
        BENEFITS: '/career/benefits',
    },
    ANALYZER: '/analyzer',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
