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
    label: 'nav.locations.label',
    bgColor: 'var(--color-primary-800)', // Sapphire / Emerald regional tone
    textColor: 'var(--color-text-inverse)',
    groups: [
      {
        title: 'nav.locations.hessen_mittelhessen.title',
        links: [
          {
            label: 'nav.locations.hessen_mittelhessen.hessen_hub',
            href: '/standorte/hessen',
            desc: 'nav.locations.hessen_mittelhessen.hessen_hub_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.wetzlar',
            href: '/webdesign-agentur-wetzlar',
            desc: 'nav.locations.hessen_mittelhessen.wetzlar_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.giessen',
            href: '/webdesign-giessen',
            desc: 'nav.locations.hessen_mittelhessen.giessen_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.marburg',
            href: '/webdesign-marburg',
            desc: 'nav.locations.hessen_mittelhessen.marburg_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.herborn',
            href: '/webdesign-herborn',
            desc: 'nav.locations.hessen_mittelhessen.herborn_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.dillenburg',
            href: '/webdesign-dillenburg',
            desc: 'nav.locations.hessen_mittelhessen.dillenburg_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.limburg',
            href: '/webdesign-limburg',
            desc: 'nav.locations.hessen_mittelhessen.limburg_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.weilburg',
            href: '/webdesign-weilburg',
            desc: 'nav.locations.hessen_mittelhessen.weilburg_desc',
          },
          {
            label: 'nav.locations.hessen_mittelhessen.loehnberg',
            href: '/webdesign-loehnberg',
            desc: 'nav.locations.hessen_mittelhessen.loehnberg_desc',
          },
        ],
      },
      {
        title: 'nav.locations.rhein_main.title',
        links: [
          {
            label: 'nav.locations.rhein_main.frankfurt',
            href: '/webdesign-frankfurt',
            desc: 'nav.locations.rhein_main.frankfurt_desc',
          },
          {
            label: 'nav.locations.rhein_main.wiesbaden',
            href: '/webdesign-wiesbaden',
            desc: 'nav.locations.rhein_main.wiesbaden_desc',
          },
          {
            label: 'nav.locations.rhein_main.bad_homburg',
            href: '/webdesign-bad-homburg',
            desc: 'nav.locations.rhein_main.bad_homburg_desc',
          },
          {
            label: 'nav.locations.rhein_main.oberursel',
            href: '/webdesign-oberursel',
          },
          {
            label: 'nav.locations.rhein_main.bad_vilbel',
            href: '/webdesign-bad-vilbel',
          },
          {
            label: 'nav.locations.rhein_main.offenbach',
            href: '/webdesign-offenbach',
          },
          {
            label: 'nav.locations.rhein_main.hanau',
            href: '/webdesign-hanau',
          },
          {
            label: 'nav.locations.rhein_main.hofheim',
            href: '/webdesign-hofheim',
          },
          {
            label: 'nav.locations.rhein_main.ruesselsheim',
            href: '/webdesign-ruesselsheim',
          },
          {
            label: 'nav.locations.rhein_main.rodgau',
            href: '/webdesign-rodgau',
          },
          {
            label: 'nav.locations.rhein_main.dietzenbach',
            href: '/webdesign-dietzenbach',
          },
          {
            label: 'nav.locations.rhein_main.friedberg',
            href: '/webdesign-friedberg',
          },
        ],
      },
      {
        title: 'nav.locations.sued_nord_ost.title',
        links: [
          {
            label: 'nav.locations.sued_nord_ost.darmstadt',
            href: '/webdesign-darmstadt',
            desc: 'nav.locations.sued_nord_ost.darmstadt_desc',
          },
          {
            label: 'nav.locations.sued_nord_ost.bensheim',
            href: '/webdesign-bensheim',
            desc: 'nav.locations.sued_nord_ost.bensheim_desc',
          },
          {
            label: 'nav.locations.sued_nord_ost.kassel',
            href: '/webdesign-kassel',
            desc: 'nav.locations.sued_nord_ost.kassel_desc',
          },
          {
            label: 'nav.locations.sued_nord_ost.fulda',
            href: '/webdesign-fulda',
            desc: 'nav.locations.sued_nord_ost.fulda_desc',
          },
        ],
      },
      {
        title: 'nav.locations.districts.title',
        links: [
          {
            label: 'nav.locations.districts.lahn_dill',
            href: '/regionen/landkreis-lahn-dill',
          },
          {
            label: 'nav.locations.districts.giessen_lk',
            href: '/regionen/landkreis-giessen',
          },
          {
            label: 'nav.locations.districts.wetterau',
            href: '/regionen/wetteraukreis',
          },
          {
            label: 'nav.locations.districts.hochtaunus',
            href: '/regionen/hochtaunuskreis',
          },
          {
            label: 'nav.locations.districts.main_taunus',
            href: '/regionen/main-taunus-kreis',
          },
          {
            label: 'nav.locations.districts.kreis_offenbach',
            href: '/regionen/kreis-offenbach',
          },
          {
            label: 'nav.locations.districts.main_kinzig',
            href: '/regionen/main-kinzig-kreis',
          },
          {
            label: 'nav.locations.districts.marburg_biedenkopf',
            href: '/regionen/landkreis-marburg-biedenkopf',
          },
          {
            label: 'nav.locations.districts.limburg_weilburg',
            href: '/regionen/landkreis-limburg-weilburg',
          },
          {
            label: 'nav.locations.districts.rheingau_taunus',
            href: '/regionen/rheingau-taunus-kreis',
          },
          {
            label: 'nav.locations.districts.darmstadt_dieburg',
            href: '/regionen/landkreis-darmstadt-dieburg',
          },
          {
            label: 'nav.locations.districts.fulda_lk',
            href: '/regionen/landkreis-fulda',
          },
          {
            label: 'nav.locations.districts.kassel_lk',
            href: '/regionen/landkreis-kassel',
          },
        ],
      },
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
          { label: 'nav.academy.audit.label', href: '/calculator', desc: 'nav.academy.audit.desc' },
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
