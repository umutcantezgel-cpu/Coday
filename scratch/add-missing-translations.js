const fs = require('fs');

function updateFile(path, isDe) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));

  // Ensure common.calculator exists
  if (!data.common) data.common = {};
  data.common.calculator = isDe ? 'Preis-Rechner' : 'Pricing Calculator';

  // Ensure calculator.summary.package exists
  if (!data.calculator) data.calculator = {};
  if (!data.calculator.summary) data.calculator.summary = {};
  data.calculator.summary.package = isDe ? 'Gewähltes Paket' : 'Selected Package';

  // Ensure calculator.meta.title / description exists (just in case)
  if (!data.calculator.meta) data.calculator.meta = {};
  if (!data.calculator.meta.title) {
    data.calculator.meta.title = isDe
      ? 'Projektkosten-Rechner | Coday Web-Agentur'
      : 'Project Cost Calculator | Coday Web Agency';
  }
  if (!data.calculator.meta.description) {
    data.calculator.meta.description = isDe
      ? 'Berechnen Sie in Echtzeit die Kosten für Ihre nächste Website, Web-App oder E-Commerce Lösung.'
      : 'Calculate the costs for your next website, web app or e-commerce solution in real time.';
  }

  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

updateFile('messages/de.json', true);
updateFile('messages/en.json', false);
console.log('Translations updated.');
