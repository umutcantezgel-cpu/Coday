const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'widgets', 'navigation', 'config.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update Development Services
content = content.replace(
  /{ label: 'nav\.services\.web_apps\.label', href: '\/services\/development\/web-apps' },/g,
  `{ label: 'nav.services.web_apps.label', href: '/services/development/web-apps' },
          { label: 'nav.services.react_nextjs.label', href: '/services/web-development/react-nextjs-agentur' },`
);

content = content.replace(
  /{ label: 'nav\.services\.migration\.label', href: '\/services\/development\/migration' },/g,
  `{ label: 'nav.services.migration.label', href: '/services/development/migration' },
          { label: 'nav.services.fullstack.label', href: '/services/web-development/full-stack-entwicklung' },
          { label: 'nav.services.cloud_infrastructure.label', href: '/services/web-development/cloud-infrastructure' },`
);

// Update Design Services
content = content.replace(
  /{ label: 'nav\.services\.audit\.label', href: '\/services\/design\/ux-audit' },/g,
  `{ label: 'nav.services.audit.label', href: '/services/design/ux-audit' },
          { label: 'nav.services.website_relaunch.label', href: '/services/web-design/website-relaunch' },`
);

// Update Healthcare Industries
content = content.replace(
  /{[\s]*label: 'nav\.industries\.healthcare\.wetzlar',[\s]*href: '\/branchen\/gesundheitswesen\/arzt-wetzlar',[\s]*},/g,
  `{ label: 'nav.industries.healthcare.aerzte', href: '/branchen/aerzte-gesundheit' },
          {
            label: 'nav.industries.healthcare.wetzlar',
            href: '/branchen/gesundheitswesen/arzt-wetzlar',
          },`
);

// Update Crafts Industries
content = content.replace(
  /{ label: 'nav\.industries\.crafts\.wetzlar', href: '\/branchen\/handwerker\/wetzlar' },/g,
  `{ label: 'nav.industries.crafts.bau', href: '/branchen/handwerk-bau' },
          { label: 'nav.industries.crafts.wetzlar', href: '/branchen/handwerker/wetzlar' },`
);

// Update Other Industries
const otherIndustriesOld = `{ label: 'nav.industries.other.real_estate', href: '/branchen/immobilien' },
          { label: 'nav.industries.other.gastronomy', href: '/branchen/gastronomie' },
          { label: 'nav.industries.other.services', href: '/branchen/dienstleistung' },
          { label: 'nav.industries.other.retail', href: '/branchen/retail' },`;

const otherIndustriesNew = `{ label: 'nav.industries.other.real_estate_agent', href: '/branchen/immobilien-makler' },
          { label: 'nav.industries.other.gastronomy_hotel', href: '/branchen/gastronomie-hotellerie' },
          { label: 'nav.industries.other.consulting', href: '/branchen/unternehmensberatung' },
          { label: 'nav.industries.other.lawyers', href: '/branchen/anwaelte-kanzleien' },
          { label: 'nav.industries.other.startups', href: '/branchen/startups-tech' },
          { label: 'nav.industries.other.retail', href: '/branchen/retail' },`;

content = content.replace(otherIndustriesOld, otherIndustriesNew);

fs.writeFileSync(filePath, content);
console.log('Updated config.ts successfully.');
