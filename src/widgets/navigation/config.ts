export interface NavItem {
    label: string;
    bgColor: string;
    textColor: string;
    links: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
    {
        label: 'Services',
        bgColor: '#1A9A9A',
        textColor: '#ffffff',
        links: [
            { label: 'Web Development', href: '/services/web-development' },
            { label: 'Web Design', href: '/services/web-design' },
            { label: 'E-Commerce', href: '/services/web-development/e-commerce' },
            { label: 'SEO & Performance', href: '/services/seo' }
        ]
    },
    {
        label: 'Industries',
        bgColor: '#2D3748',
        textColor: '#ffffff',
        links: [
            { label: 'Real Estate', href: '/services/industries/immobilien' },
            { label: 'Healthcare', href: '/services/industries/gesundheit' },
            { label: 'Craft & Trade', href: '/services/industries/handwerk' },
            { label: 'Retail', href: '/services/industries/e-commerce' }
        ]
    },
    {
        label: 'Company',
        bgColor: '#ffffff',
        textColor: '#1A9A9A',
        links: [
            { label: 'About Us', href: '/process' }, /* Assuming 'About Us' maps to Process or similar, or /work? App.tsx doesn't have /about. Let's use /process or /work explicitly or /career? /process seems best fit for 'Agency' context if no About page. Or maybe Academy? Let's check App.tsx again. No /about. There is /process. */
            { label: 'Careers', href: '/career' },
            { label: 'Blog', href: '/knowledge/blog' },
            { label: 'Contact', href: '/contact' }
        ]
    }
];
