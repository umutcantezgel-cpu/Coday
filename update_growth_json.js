const fs = require('fs');

const updateJson = (path, lang) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));

  data.nav.services.seo_opt = { label: lang === 'de' ? 'SEO Optimierung' : 'SEO Optimization' };
  data.nav.services.perf_opt = { label: lang === 'de' ? 'Performance Opt.' : 'Performance Opt.' };
  data.nav.services.dig_consulting = {
    label: lang === 'de' ? 'Digitale Beratung' : 'Digital Consulting',
  };

  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated ' + path);
};

updateJson('public/locales/de/common.json', 'de');
updateJson('public/locales/en/common.json', 'en');
