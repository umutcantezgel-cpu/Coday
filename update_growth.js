const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'widgets', 'navigation', 'config.ts');
let content = fs.readFileSync(filePath, 'utf8');

const oldGrowth = `        title: 'nav.services.growth.title',
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
        ],`;

const newGrowth = `        title: 'nav.services.growth.title',
        links: [
          { label: 'nav.services.seo.label', href: '/services/seo', desc: 'nav.services.seo.desc' },
          { label: 'nav.services.seo_opt.label', href: '/services/growth/seo-optimization' },
          {
            label: 'nav.services.performance.label',
            href: '/services/performance',
            desc: 'nav.services.performance.desc',
          },
          { label: 'nav.services.perf_opt.label', href: '/services/growth/performance-optimization' },
          {
            label: 'nav.services.consulting.label',
            href: '/services/consulting',
            desc: 'nav.services.consulting.desc',
          },
          { label: 'nav.services.dig_consulting.label', href: '/services/growth/digital-consulting' },
        ],`;

content = content.replace(oldGrowth, newGrowth);
fs.writeFileSync(filePath, content);
console.log('Updated growth links in config.ts');
