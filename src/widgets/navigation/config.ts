export interface NavLink {
  label: string;
  href: string;
  desc?: string;
  locale?: string;
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
        title: 'nav.services.overview.title',
        links: [
          {
            label: 'nav.services.all.label',
            href: '/services',
            desc: 'nav.services.all.desc',
          },
        ],
      },
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
            label: 'nav.services.geo.label',
            href: '/services/generative-engine-optimization',
            desc: 'nav.services.geo.desc',
          },
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
    bgColor: 'var(--color-primary-800)', // Sapphire / Emerald regional tone
    textColor: 'var(--color-text-inverse)',
    // The 38 location pages (city and Kreis hubs) left this menu for the
    // footer's collapsed "Alle Standorte" block and llms.txt. Their list lives
    // in src/features/local-seo/model/locationLinks.ts now.
    groups: [
      {
        title: 'nav.industries.label',
        links: [
          { label: 'nav.industries.other.overview', href: '/branchen' },
          { label: 'nav.industries.automotive.overview', href: '/branchen/automobil' },
          { label: 'nav.industries.healthcare.overview', href: '/branchen/aerzte-gesundheit' },
          { label: 'nav.industries.crafts.overview', href: '/branchen/handwerk-bau' },
          { label: 'nav.industries.other.real_estate_agent', href: '/branchen/immobilien' },
          { label: 'nav.industries.other.gastronomy_hotel', href: '/branchen/gastronomie' },
          { label: 'nav.industries.other.consulting', href: '/branchen/unternehmensberatung' },
          { label: 'nav.industries.other.lawyers', href: '/branchen/anwaelte-kanzleien' },
          { label: 'nav.industries.other.startups', href: '/branchen/startups-tech' },
          { label: 'nav.industries.other.retail', href: '/branchen/retail' },
          { label: 'nav.industries.other.public_sector', href: '/branchen/public-sector' },
          { label: 'nav.industries.other.dienstleistung', href: '/branchen/dienstleistung' },
          { label: 'nav.industries.crafts.offer', href: '/angebot-handwerker' },
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
          // Point at our own case studies, not the clients' live sites: those
          // were the only external hrefs in the nav, and the desktop menu pushes
          // every href through next-intl's Link with no rel="noopener".
          { label: 'nav.work.batherm', href: '/work/batherm' },
          { label: 'nav.work.schluesseldienst', href: '/work/schluesseldienst-wetzlar' },
          { label: 'nav.work.ratsstuben', href: '/work/lindener-ratsstuben' },
          { label: 'nav.work.talia', href: '/work/talia-boutique' },
          { label: 'nav.work.hey_fede', href: '/work/hey-fede' },
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
          // The Academy shipped without a single header link: this group was
          // named after it while pointing at the blog and the calculator.
          { label: 'nav.academy.label', href: '/knowledge/academy', desc: 'nav.academy.desc' },
          {
            label: 'nav.resources.knowledge.wiki.label',
            href: '/knowledge/wikihub',
            desc: 'nav.resources.knowledge.wiki.desc',
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
            label: 'nav.academy.newsletter.label',
            href: '/knowledge/newsletter',
            desc: 'nav.academy.newsletter.desc',
          },
        ],
      },
      {
        title: 'nav.resources.tools.title',
        links: [
          // Was listed twice here, once as the audit and once as the calculator.
          {
            label: 'nav.academy.audit.label',
            href: '/website-check',
            desc: 'nav.academy.audit.desc',
          },
          { label: 'nav.booking.label', href: '/booking' },
          {
            label: 'nav.resources.tools.strobi.label',
            href: '/strobi',
            desc: 'nav.resources.tools.strobi.desc',
          },
          // The complete page index: the catch-all that puts every remaining
          // page, legal included, two clicks from the header.
          {
            label: 'nav.resources.tools.sitemap.label',
            href: '/uebersicht',
            desc: 'nav.resources.tools.sitemap.desc',
          },
        ],
      },
      {
        title: 'nav.resources.community.title',
        links: [
          {
            label: 'nav.resources.community.marketplace.label',
            href: '/community/marketplace',
            desc: 'nav.resources.community.marketplace.desc',
          },
          {
            label: 'nav.resources.community.calendar.label',
            href: '/community/calendar',
            desc: 'nav.resources.community.calendar.desc',
          },
          {
            label: 'nav.resources.community.events.label',
            href: '/community/events',
            desc: 'nav.resources.community.events.desc',
          },
          {
            label: 'nav.resources.community.members.label',
            href: '/community/members',
            desc: 'nav.resources.community.members.desc',
          },
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
          { label: 'nav.main.garantie', href: '/garantie' },
          { label: 'nav.main.presse', href: '/presse' },
          { label: 'nav.main.partnerschaft', href: '/partnerschaft' },
        ],
      },
      {
        title: 'nav.career.label',
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
