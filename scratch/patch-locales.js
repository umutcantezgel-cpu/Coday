const fs = require('fs');

function patch(path, key, value) {
  if (!fs.existsSync(path)) return;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const keys = key.split('.');
  let current = data;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// Analyzer DE
patch('public/locales/de/analyzer.json', 'meta.title', 'Website Analyzer Audit | Coday');
patch(
  'public/locales/de/analyzer.json',
  'meta.description',
  'Testen Sie Ihre Website auf Performance, SEO, Accessibility und Best Practices. Kostenloses Audit.'
);
// Analyzer EN
patch('public/locales/en/analyzer.json', 'meta.title', 'Website Analyzer Audit | Coday');
patch(
  'public/locales/en/analyzer.json',
  'meta.description',
  'Test your website for performance, SEO, accessibility, and best practices. Free audit.'
);

// Calculator DE
patch(
  'public/locales/de/calculator.json',
  'meta.title',
  'Projektkosten-Rechner | Coday Web-Agentur'
);
patch(
  'public/locales/de/calculator.json',
  'meta.description',
  'Berechnen Sie in Echtzeit die Kosten für Ihre nächste Website, Web-App oder E-Commerce Lösung.'
);
patch('public/locales/de/calculator.json', 'summary.package', 'Gewähltes Paket');
// Calculator EN
patch(
  'public/locales/en/calculator.json',
  'meta.title',
  'Project Cost Calculator | Coday Web Agency'
);
patch(
  'public/locales/en/calculator.json',
  'meta.description',
  'Calculate the costs for your next website, web app or e-commerce solution in real time.'
);
patch('public/locales/en/calculator.json', 'summary.package', 'Selected Package');

// Form DE
patch('public/locales/de/form.json', 'wizard.success.booking_title', 'Fast geschafft!');
patch(
  'public/locales/de/form.json',
  'wizard.success.booking_desc',
  'Wählen Sie jetzt einen Termin für ein kurzes Kennenlerngespräch.'
);
// Form EN
patch('public/locales/en/form.json', 'wizard.success.booking_title', 'Almost done!');
patch(
  'public/locales/en/form.json',
  'wizard.success.booking_desc',
  'Please select a time for a short discovery call.'
);

console.log('Locales patched');
