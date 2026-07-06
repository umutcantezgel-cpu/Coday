const fs = require('fs');
const path = require('path');

function replaceValues(obj, lang) {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      replaceValues(obj[key], lang);
    } else if (typeof obj[key] === 'string') {
      if (lang === 'de') {
        obj[key] = obj[key]
          .replace(/Enterprise-Level/g, 'Premium-Level')
          .replace(/Enterprise-Portal/g, 'Premium-Portal')
          .replace(/Enterprise-Agentur/g, 'Premium-Agentur')
          .replace(/Enterprise-Standard/g, 'Agentur-Standard')
          .replace(/Enterprise-Lösungen/g, 'Premium-Lösungen')
          .replace(/Enterprise/g, 'Premium')
          .replace(/unser Team/gi, 'ich')
          .replace(/Unser Team/gi, 'Ich')
          .replace(/Wir vernetzen/g, 'Ich vernetze')
          .replace(/Wir entwickeln/g, 'Ich entwickle')
          .replace(/Wir fokussieren/g, 'Ich fokussiere');
      } else {
        obj[key] = obj[key]
          .replace(/enterprise corporations/gi, 'ambitious SMEs and local leaders')
          .replace(/enterprise clients/gi, 'ambitious SMEs')
          .replace(/Enterprise-Level/gi, 'Premium-Level')
          .replace(/Enterprise Standard/gi, 'Premium Standard')
          .replace(/enterprise/gi, 'premium')
          .replace(/Enterprise/g, 'Premium')
          .replace(/our team/gi, 'me')
          .replace(/Our team/gi, 'I')
          .replace(/We build/g, 'I build')
          .replace(/We focus/g, 'I focus');
      }
    }
  }
}

['de', 'en'].forEach((lang) => {
  ['services.json', 'about.json', 'home.json', 'impressum.json'].forEach((file) => {
    const p = path.join('public/locales', lang, file);
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      replaceValues(data, lang);
      fs.writeFileSync(p, JSON.stringify(data, null, 2));
      console.log('Fixed', p);
    }
  });
});
