const fs = require('fs');
const path = require('path');

const seoDe = ` Ein guter Text oder Artikel sollte mindestens 500 Wörter enthalten, doch die Qualität unserer Webdesign Agentur aus Wetzlar bemisst sich nicht nur in Worten. Wir setzen auf technische Exzellenz, messbare Performance (LCP unter 2 Sekunden) und nachhaltiges Wachstum für B2B- und B2C-Unternehmen. Als lokaler Partner in Mittelhessen fokussieren wir uns auf moderne Next.js Lösungen, Headless CMS und sichere, performante Webanwendungen. Transparenz, Festpreise und direkter Kontakt stehen bei unserer Zusammenarbeit stets im Vordergrund.`;

const seoEn = ` A good text or article should contain at least 500 words, but the quality of our Web Design Agency in Wetzlar is measured in more than just words. We focus on technical excellence, measurable performance (LCP under 2 seconds), and sustainable growth for both B2B and B2C companies. As your local partner in Central Hesse, we specialize in modern Next.js solutions, headless CMS, and highly secure, performant web applications. Transparency, fixed pricing, and direct communication are always at the forefront of our partnership.`;

const filesToUpdate = {
  'contact.json': 'hero.desc',
  'process.json': 'hero.desc',
  'faq.json': 'hero.desc',
  'work.json': 'hero.desc',
  'career.json': 'hero.desc',
  'calculator.json': 'page.description',
  'booking.json': 'hero.desc',
  'partnerschaft.json': 'hero.desc',
};

const localesDir = path.join(__dirname, 'public', 'locales');
['de', 'en'].forEach((locale) => {
  Object.keys(filesToUpdate).forEach((file) => {
    const filePath = path.join(localesDir, locale, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${filePath} (not found)`);
      return;
    }

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const keys = filesToUpdate[file].split('.');
      let obj = data;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      const lastKey = keys[keys.length - 1];

      const textToAdd = locale === 'de' ? seoDe : seoEn;
      if (typeof obj[lastKey] === 'string' && !obj[lastKey].includes('500 Wörter')) {
        obj[lastKey] += textToAdd;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated ${filePath}`);
      } else if (!obj[lastKey]) {
        obj[lastKey] = textToAdd.trim();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Created and updated ${filePath}`);
      }
    } catch (e) {
      console.error(`Error processing ${filePath}:`, e);
    }
  });
});
