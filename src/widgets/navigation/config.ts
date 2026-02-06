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
            { label: 'Web Development', href: '/services/development/web-apps' },
            { label: 'Web Design', href: '/services/design/web-design' },
            { label: 'E-Commerce', href: '/services/development/ecommerce' },
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
            { label: 'Retail', href: '/services/industries/retail' }
        ]
    },
    {
        label: 'Company',
        bgColor: '#ffffff',
        textColor: '#1A9A9A',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' }
        ]
    }
];
