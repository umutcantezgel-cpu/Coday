const fs = require('fs');

const updateJson = (path, lang) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));

  // Update Services
  data.nav.services.react_nextjs = {
    label: lang === 'de' ? 'React & Next.js Agentur' : 'React & Next.js Agency',
  };
  data.nav.services.cloud_infrastructure = {
    label: lang === 'de' ? 'Cloud Infrastruktur' : 'Cloud Infrastructure',
  };
  data.nav.services.website_relaunch = {
    label: lang === 'de' ? 'Website Relaunch' : 'Website Relaunch',
  };

  // Update Industries (Other)
  data.nav.industries.other.consulting = lang === 'de' ? 'Unternehmensberatung' : 'Consulting';
  data.nav.industries.other.lawyers = lang === 'de' ? 'Anwälte & Kanzleien' : 'Law Firms';
  data.nav.industries.other.startups = lang === 'de' ? 'Startups & Tech' : 'Startups & Tech';
  data.nav.industries.other.gastronomy_hotel =
    lang === 'de' ? 'Gastronomie & Hotellerie' : 'Gastronomy & Hotels';
  data.nav.industries.other.real_estate_agent =
    lang === 'de' ? 'Immobilienmakler' : 'Real Estate Agents';

  // Update Industries (Crafts)
  data.nav.industries.crafts.bau = lang === 'de' ? 'Handwerk & Bau' : 'Crafts & Construction';

  // Update Industries (Healthcare)
  data.nav.industries.healthcare.aerzte =
    lang === 'de' ? 'Ärzte & Gesundheit' : 'Doctors & Healthcare';

  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated ' + path);
};

updateJson('public/locales/de/common.json', 'de');
updateJson('public/locales/en/common.json', 'en');
