import { Zap, Layout, BarChart, Code, Search, PenTool, Smartphone, Globe, Share2, Shield, Users, Trophy, Briefcase, Heart, Gift, MessageCircle, Flag, Workflow, Mail, CalendarCheck, Cpu } from 'lucide-react';

export interface NavItem {
    label?: string; // Legacy support or direct string
    labelKey?: string; // i18n key
    href?: string;
    description?: string;
    descriptionKey?: string; // i18n key
    links?: NavLinkItem[];
    columns?: number;
}

export interface NavLinkItem {
    label?: string;
    labelKey?: string;
    href: string;
    description?: string;
    descriptionKey?: string;
    icon?: any;
    isFeatured?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        labelKey: "nav.services.label",
        columns: 2,
        links: [
            {
                labelKey: "nav.services.web_development.label",
                href: "/services/web-development",
                descriptionKey: "nav.services.web_development.desc",
                icon: Code,
                isFeatured: true
            },
            {
                labelKey: "nav.services.web_design.label",
                href: "/services/web-design",
                descriptionKey: "nav.services.web_design.desc",
                icon: PenTool,
                isFeatured: true
            },
            {
                labelKey: "nav.services.seo.label",
                href: "/services/seo",
                descriptionKey: "nav.services.seo.desc",
                icon: Search
            },
            {
                labelKey: "nav.services.performance.label",
                href: "/services/performance",
                descriptionKey: "nav.services.performance.desc",
                icon: Zap
            },
            {
                labelKey: "nav.services.enterprise.label",
                href: "/services/enterprise-web",
                descriptionKey: "nav.services.enterprise.desc",
                icon: Cpu
            },
            {
                labelKey: "nav.services.ecommerce.label",
                href: "/services/web-development/e-commerce",
                descriptionKey: "nav.services.ecommerce.desc",
                icon: Globe
            }
        ]
    },
    {
        labelKey: "nav.industries.label",
        columns: 1,
        links: [
            { labelKey: "nav.industries.craft", href: "/services/industries/handwerk", icon: Trophy },
            { labelKey: "nav.industries.real_estate", href: "/services/industries/immobilien", icon: Layout },
            { labelKey: "nav.industries.gastronomy", href: "/services/industries/gastronomie", icon: Users },
            { labelKey: "nav.industries.health", href: "/services/industries/gesundheit", icon: Shield },
            { labelKey: "nav.industries.service", href: "/services/industries/dienstleistung", icon: BarChart },
            { labelKey: "nav.industries.ecommerce", href: "/services/industries/e-commerce", icon: Globe }
        ]
    },
    {
        labelKey: "nav.projects.label",
        href: "/work",
        descriptionKey: "nav.projects.desc"
    },
    {
        labelKey: "nav.academy.label",
        descriptionKey: "nav.academy.desc",
        links: [
            { labelKey: "nav.academy.audit.label", href: "/analyzer", icon: BarChart, descriptionKey: "nav.academy.audit.desc", isFeatured: true },
            { labelKey: "nav.academy.courses.label", href: "/knowledge/academy", icon: Zap, descriptionKey: "nav.academy.courses.desc" },
            { labelKey: "nav.academy.blog.label", href: "/knowledge/blog", icon: PenTool, descriptionKey: "nav.academy.blog.desc" },
            { labelKey: "nav.academy.newsletter.label", href: "/knowledge/newsletter", icon: Mail, descriptionKey: "nav.academy.newsletter.desc" },
            { labelKey: "nav.academy.whitepapers.label", href: "/knowledge/whitepapers", icon: Share2, descriptionKey: "nav.academy.whitepapers.desc" }
        ]
    },
    {
        labelKey: "nav.about.label",
        descriptionKey: "nav.about.desc",
        links: [
            { labelKey: "nav.about.process.label", href: "/process", icon: Workflow, descriptionKey: "nav.about.process.desc" },

            { labelKey: "nav.about.contact.label", href: "/contact", icon: MessageCircle, descriptionKey: "nav.about.contact.desc" }
        ]
    },
    {
        labelKey: "nav.career.label",
        descriptionKey: "nav.career.desc",
        links: [
            { labelKey: "nav.career.overview.label", href: "/careers", icon: Trophy, descriptionKey: "nav.career.overview.desc" },
            { labelKey: "nav.career.jobs.label", href: "/career/jobs", icon: Briefcase, descriptionKey: "nav.career.jobs.desc" },
            { labelKey: "nav.career.culture.label", href: "/career/culture", icon: Heart, descriptionKey: "nav.career.culture.desc" },
            { labelKey: "nav.career.benefits.label", href: "/career/benefits", icon: Gift, descriptionKey: "nav.career.benefits.desc" }
        ]
    }
];

// CTA configuration for the "Starten" button
export const NAV_CTA = {
    label: "Starten",
    href: "/packages",
    icon: CalendarCheck
};

export const navItems = NAV_ITEMS;

