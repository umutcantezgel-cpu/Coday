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
        ECOMMERCE: '/services/ecommerce-development',
        WEB_APPS: '/services/development/web-apps',
        CMS_HEADLESS: '/services/development/headless-cms',
        API_INTEGRATION: '/services/development/api-integration',
        MIGRATION: '/services/development/migration',
        UI_UX: '/services/design/ui-ux',
        BRAND_IDENTITY: '/services/design/brand-identity',
        DESIGN_SYSTEMS: '/services/design/design-systems',
        AUDIT: '/services/design/ux-audit',
    },
    WORK: {
        ROOT: '/work',

        BATHERM: '/work/batherm',
    },
    PROCESS: '/process',
    PACKAGES: '/pricing',
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
