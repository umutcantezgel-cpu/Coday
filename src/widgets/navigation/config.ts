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
            label: 'nav.services.ecommerce.label',
            href: '/services/ecommerce-development',
            desc: 'nav.services.ecommerce.desc',
          },
          { label: 'nav.services.cms.label', href: '/services/development/headless-cms' },
          { label: 'nav.services.api.label', href: '/services/development/api-integration' },
          { label: 'nav.services.migration.label', href: '/services/development/migration' },
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
          {
            label: 'nav.services.consulting.label',
            href: '/services/consulting',
            desc: 'nav.services.consulting.desc',
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
          { label: 'nav.industries.crafts.wetzlar', href: '/branchen/handwerker/wetzlar' },
        ],
      },
      {
        title: 'nav.industries.other.title',
        links: [
          { label: 'nav.industries.other.overview', href: '/branchen' },
          { label: 'nav.industries.other.real_estate', href: '/branchen/immobilien' },
          { label: 'nav.industries.other.gastronomy', href: '/branchen/gastronomie' },
          { label: 'nav.industries.other.services', href: '/branchen/dienstleistung' },
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
          { label: 'nav.legal.hub', href: '/legal/impressum' },
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
          { label: 'nav.packages.label', href: '/pricing' },
        ],
      },
    ],
  },
];
