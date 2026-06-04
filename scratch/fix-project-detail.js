const fs = require('fs');
const path = require('path');

const locales = ['de', 'en'];

locales.forEach((locale) => {
  const file = path.join(__dirname, `../messages/${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  let changed = false;

  if (data.project_detail) {
    if (!data.work) data.work = {};
    data.work.project_detail = data.project_detail;
    delete data.project_detail;
    changed = true;
  }

  if (data.work && data.work.project_detail && data.work.project_detail.sidebar) {
    if (!data.work.project_detail.sidebar.related) {
      data.work.project_detail.sidebar.related =
        locale === 'de' ? 'Verwandte Services' : 'Related Services';
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Updated ${locale}.json`);
  }
});
