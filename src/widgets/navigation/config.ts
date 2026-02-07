export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  groups?: NavGroup[];
  links?: NavLink[];
}

export const getNavItems = (): NavItem[] => [
  {
    label: 'nav.services.label',
    bgColor: '#147a7a', // Teal-600 (Primary)
    textColor: '#ffffff',
    groups: [
      {
        title: 'nav.services.development.title',
        links: [
          {
            label: 'nav.services.web_development.label',
            href: '/services/web-development',
            desc: 'nav.services.web_development.desc',
          },
          { label: 'nav.services.web_apps.label', href: '/services/web-development/web-apps' },
          {
            label: 'nav.services.ecommerce.label',
            href: '/services/web-development/e-commerce',
            desc: 'nav.services.ecommerce.desc',
          },
          { label: 'nav.services.cms.label', href: '/services/web-development/cms-headless' },
          { label: 'nav.services.api.label', href: '/services/web-development/api-integrations' },
          { label: 'nav.services.migration.label', href: '/services/web-development/migration' },
          {
            label: 'nav.services.enterprise.label',
            href: '/services/enterprise-web',
            desc: 'nav.services.enterprise.desc',
          },
        ],
      },
      {
        title: 'nav.services.design.title',
        links: [
          {
            label: 'nav.services.web_design.label',
            href: '/services/web-design',
            desc: 'nav.services.web_design.desc',
          },
          { label: 'nav.services.ui_ux.label', href: '/services/web-design/ui-ux' },
          { label: 'nav.services.brand.label', href: '/services/web-design/brand-identity' },
          {
            label: 'nav.services.design_systems.label',
            href: '/services/web-design/design-systems',
          },
          { label: 'nav.services.audit.label', href: '/services/web-design/audit' },
        ],
      },
      {
        title: 'nav.services.growth.title',
        links: [
          { label: 'nav.services.seo.label', href: '/services/seo', desc: 'nav.services.seo.desc' },
          {
            label: 'nav.services.performance.label',
            href: '/services/performance',
            desc: 'nav.services.performance.desc',
          },
          { label: 'nav.services.consulting.label', href: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'nav.industries.label',
    bgColor: '#1E293B', // Slate-800
    textColor: '#ffffff',
    groups: [
      {
        title: 'nav.industries.all',
        links: [
          { label: 'nav.industries.real_estate', href: '/services/industries/immobilien' },
          { label: 'nav.industries.health', href: '/services/industries/gesundheit' },
          { label: 'nav.industries.craft', href: '/services/industries/handwerk' },
          { label: 'nav.industries.gastronomy', href: '/services/industries/gastronomie' },
          { label: 'nav.industries.ecommerce', href: '/services/industries/e-commerce' },
          { label: 'nav.industries.service', href: '/services/industries/dienstleistung' },
        ],
      },
    ],
  },
  {
    label: 'nav.work.label',
    bgColor: '#0F172A', // Slate-900
    textColor: '#ffffff',
    groups: [
      {
        title: 'nav.work.featured.title',
        links: [

          { label: 'nav.work.batherm', href: '/work/batherm' },
        ],
      },
      {
        title: 'nav.work.all.title',
        links: [{ label: 'nav.work.view_all', href: '/work' }],
      },
    ],
  },
  {
    label: 'nav.resources.label',
    bgColor: '#702459', // Aurora Purple
    textColor: '#ffffff',
    groups: [
      {
        title: 'nav.resources.knowledge.title',
        links: [
          {
            label: 'nav.academy.blog.label',
            href: '/knowledge/blog',
            desc: 'nav.academy.blog.desc',
          },
          {
            label: 'nav.academy.whitepapers.label',
            href: '/knowledge/whitepapers',
            desc: 'nav.academy.whitepapers.desc',
          },
          {
            label: 'nav.academy.courses.label',
            href: '/knowledge/academy',
            desc: 'nav.academy.courses.desc',
          },
          {
            label: 'nav.academy.newsletter.label',
            href: '/knowledge/newsletter',
            desc: 'nav.academy.newsletter.desc',
          },
        ],
      },
      {
        title: 'nav.resources.tools.title',
        links: [
          { label: 'nav.academy.audit.label', href: '/analyzer', desc: 'nav.academy.audit.desc' },
          { label: 'nav.resources.calculator', href: '/calculator' },
          { label: 'nav.resources.dashboard', href: '/dashboard' },
        ],
      },
    ],
  },
  {
    label: 'nav.company.label',
    bgColor: '#ffffff',
    textColor: '#1A9A9A', // Primary Teal
    groups: [
      {
        title: 'nav.company.agency',
        links: [
          { label: 'nav.company.about', href: '/contact', desc: 'nav.about.desc' },
          { label: 'nav.about.process.label', href: '/process', desc: 'nav.about.process.desc' },
        ],
      },
      {
        title: 'nav.company.career',
        links: [
          { label: 'nav.career.label', href: '/career', desc: 'nav.career.desc' },
          { label: 'nav.career.jobs.label', href: '/career/jobs', desc: 'nav.career.jobs.desc' },
          {
            label: 'nav.career.culture.label',
            href: '/career/culture',
            desc: 'nav.career.culture.desc',
          },
          {
            label: 'nav.career.benefits.label',
            href: '/career/benefits',
            desc: 'nav.career.benefits.desc',
          },
        ],
      },
      {
        title: 'nav.company.legal',
        links: [
          { label: 'nav.legal.imprint', href: '/legal/impressum' },
          { label: 'nav.legal.privacy', href: '/legal/datenschutz' },
          { label: 'nav.legal.agb', href: '/legal/agb' },
        ],
      },
      {
        title: 'nav.company.action',
        links: [
          { label: 'nav.about.contact.label', href: '/contact', desc: 'nav.about.contact.desc' },
          { label: 'nav.booking.label', href: '/booking' },
          { label: 'nav.packages.label', href: '/packages' },
        ],
      },
    ],
  },
];
