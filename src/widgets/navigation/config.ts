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
    bgColor: 'var(--color-primary-700)', // Teal-600 (Primary)
    textColor: 'var(--color-text-inverse)',
    groups: [
      {
        title: 'nav.services.development.title',
        links: [
          {
            label: 'nav.services.web_development.label',
            href: '/services/web-development',
            desc: 'nav.services.web_development.desc',
          },
          { label: 'nav.services.web_apps.label', href: '/services/development/web-apps' },
          {
            label: 'nav.services.react_nextjs.label',
            href: '/services/web-development/react-nextjs-agentur',
          },
          {
            label: 'nav.services.ecommerce.label',
            href: '/services/ecommerce-development',
            desc: 'nav.services.ecommerce.desc',
          },
          { label: 'nav.services.cms.label', href: '/services/development/headless-cms' },
          { label: 'nav.services.api.label', href: '/services/development/api-integration' },
          { label: 'nav.services.migration.label', href: '/services/development/migration' },
          {
            label: 'nav.services.fullstack.label',
            href: '/services/web-development/full-stack-entwicklung',
          },
          {
            label: 'nav.services.cloud_infrastructure.label',
            href: '/services/web-development/cloud-infrastructure',
          },
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
          { label: 'nav.services.ui_ux.label', href: '/services/design/ui-ux' },
          { label: 'nav.services.brand.label', href: '/services/design/brand-identity' },
          {
            label: 'nav.services.design_systems.label',
            href: '/services/design/design-systems',
          },
          { label: 'nav.services.audit.label', href: '/services/design/ux-audit' },
          {
            label: 'nav.services.website_relaunch.label',
            href: '/services/web-design/website-relaunch',
          },
        ],
      },
      {
        title: 'nav.services.growth.title',
        links: [
          { label: 'nav.services.seo.label', href: '/services/seo', desc: 'nav.services.seo.desc' },
          { label: 'nav.services.seo_opt.label', href: '/services/growth/seo-optimization' },
          {
            label: 'nav.services.performance.label',
            href: '/services/performance',
            desc: 'nav.services.performance.desc',
          },
          {
            label: 'nav.services.perf_opt.label',
            href: '/services/growth/performance-optimization',
          },
          {
            label: 'nav.services.consulting.label',
            href: '/services/consulting',
            desc: 'nav.services.consulting.desc',
          },
          {
            label: 'nav.services.dig_consulting.label',
            href: '/services/growth/digital-consulting',
          },
        ],
      },
    ],
  },
  {
    label: 'nav.industries.label',
    bgColor: 'var(--color-primary-900)',
    textColor: 'var(--color-text-inverse)',
    groups: [
      {
        title: 'nav.industries.automotive.title',
        links: [
          {
            label: 'nav.industries.automotive.overview',
            href: '/branchen/automobil',
            desc: 'nav.industries.automotive.desc',
          },
          {
            label: 'nav.industries.automotive.werkstatt',
            href: '/branchen/automobil/kfz-werkstatt',
          },
          {
            label: 'nav.industries.automotive.mechatroniker',
            href: '/branchen/automobil/kfz-mechatroniker',
          },
          { label: 'nav.industries.automotive.haendler', href: '/branchen/automobil/autohaendler' },
        ],
      },
      {
        title: 'nav.industries.healthcare.title',
        links: [
          {
            label: 'nav.industries.healthcare.overview',
            href: '/branchen/gesundheitswesen',
            desc: 'nav.industries.healthcare.desc',
          },
          { label: 'nav.industries.healthcare.aerzte', href: '/branchen/aerzte-gesundheit' },
          {
            label: 'nav.industries.healthcare.wetzlar',
            href: '/branchen/gesundheitswesen/arzt-wetzlar',
          },
          {
            label: 'nav.industries.healthcare.giessen',
            href: '/branchen/gesundheitswesen/arzt-giessen',
          },
        ],
      },
      {
        title: 'nav.industries.crafts.title',
        links: [
          {
            label: 'nav.industries.crafts.overview',
            href: '/branchen/handwerker',
            desc: 'nav.industries.crafts.desc',
          },
          { label: 'nav.industries.crafts.bau', href: '/branchen/handwerk-bau' },
          { label: 'nav.industries.crafts.wetzlar', href: '/branchen/handwerker/wetzlar' },
        ],
      },
      {
        title: 'nav.industries.other.title',
        links: [
          { label: 'nav.industries.other.overview', href: '/branchen' },
          { label: 'nav.industries.other.real_estate_agent', href: '/branchen/immobilien-makler' },
          {
            label: 'nav.industries.other.gastronomy_hotel',
            href: '/branchen/gastronomie-hotellerie',
          },
          { label: 'nav.industries.other.consulting', href: '/branchen/unternehmensberatung' },
          { label: 'nav.industries.other.lawyers', href: '/branchen/anwaelte-kanzleien' },
          { label: 'nav.industries.other.startups', href: '/branchen/startups-tech' },
          { label: 'nav.industries.other.retail', href: '/branchen/retail' },
          { label: 'nav.industries.other.public_sector', href: '/branchen/public-sector' },
        ],
      },
    ],
  },
  {
    label: 'nav.work.label',
    bgColor: 'var(--color-secondary-900)', // Slate-900
    textColor: 'var(--color-text-inverse)',
    groups: [
      {
        title: 'nav.work.featured.title',
        links: [
          { label: 'nav.work.batherm', href: 'https://www.batherm.de' },
          { label: 'nav.work.schluesseldienst', href: 'https://wetzlar-schlüsseldienst.de' },
          { label: 'nav.work.ratsstuben', href: 'https://lindener-ratsstuben.de' },
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
            label: 'nav.resources.knowledge.faq.label',
            href: '/knowledge/faq',
            desc: 'nav.resources.knowledge.faq.desc',
          },
        ],
      },
      {
        title: 'nav.resources.tools.title',
        links: [
          { label: 'nav.academy.audit.label', href: '/analyzer', desc: 'nav.academy.audit.desc' },
          { label: 'nav.resources.calculator', href: '/calculator' },
        ],
      },
    ],
  },
  {
    label: 'nav.company.label',
    bgColor: 'var(--color-bg-primary)',
    textColor: 'var(--color-primary-600)', // Primary Teal
    groups: [
      {
        title: 'nav.company.agency',
        links: [
          { label: 'nav.company.about', href: '/about', desc: 'nav.about.desc' },
          { label: 'nav.about.process.label', href: '/process', desc: 'nav.about.process.desc' },
        ],
      },
      {
        title: 'nav.company.action',
        links: [
          { label: 'nav.about.contact.label', href: '/contact', desc: 'nav.about.contact.desc' },
          { label: 'nav.booking.label', href: '/booking' },
          { label: 'nav.packages.label', href: '/pricing' },
        ],
      },
    ],
  },
];
