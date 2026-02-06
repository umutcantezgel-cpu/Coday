export interface NavItem {
  label: string; // Now a translation key
  bgColor: string;
  textColor: string;
  links: { label: string; href: string; ariaLabel?: string }[];
}

export const getNavItems = (): NavItem[] => [
  {
    label: 'nav.services.label',
    bgColor: '#1A9A9A', // Teal
    textColor: '#ffffff',
    links: [
      { label: 'nav.services.web_development.label', href: '/services/web-development' },
      { label: 'nav.services.web_design.label', href: '/services/web-design' },
      { label: 'nav.services.ecommerce.label', href: '/services/web-development/e-commerce' },
      { label: 'nav.services.seo.label', href: '/services/seo' },
      { label: 'nav.services.enterprise.label', href: '/services/enterprise-web' },
    ],
  },
  {
    label: 'nav.industries.label',
    bgColor: '#2D3748', // Navy
    textColor: '#ffffff',
    links: [
      { label: 'nav.industries.real_estate', href: '/services/industries/immobilien' },
      { label: 'nav.industries.health', href: '/services/industries/gesundheit' },
      { label: 'nav.industries.craft', href: '/services/industries/handwerk' },
      { label: 'nav.industries.gastronomy', href: '/services/industries/gastronomie' },
      { label: 'nav.industries.ecommerce', href: '/services/industries/e-commerce' },
    ],
  },
  {
    label: 'nav.academy.label',
    bgColor: '#702459', // Warm Purple
    textColor: '#ffffff',
    links: [
      { label: 'nav.academy.audit.label', href: '/analyzer' },
      { label: 'nav.academy.blog.label', href: '/knowledge/blog' },
      { label: 'nav.academy.whitepapers.label', href: '/knowledge/whitepapers' },
      { label: 'nav.academy.courses.label', href: '/knowledge/academy' },
    ],
  },
  {
    label: 'nav.about.label',
    bgColor: '#ffffff',
    textColor: '#1A9A9A',
    links: [
      { label: 'nav.about.process.label', href: '/process' },
      { label: 'nav.career.label', href: '/career' },
      { label: 'buttons.view_work', href: '/work' },
      { label: 'nav.about.contact.label', href: '/contact' },
    ],
  },
];
