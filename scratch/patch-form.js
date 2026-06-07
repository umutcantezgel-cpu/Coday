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

// Form DE
patch(
  'public/locales/de/form.json',
  'wizard.success.booking_title',
  'Ihre Anfrage wurde erfolgreich gesendet! 🎉'
);
patch(
  'public/locales/de/form.json',
  'wizard.success.booking_desc',
  'Wir prüfen Ihre Angaben und melden uns zeitnah. Optional: Überspringen Sie die E-Mail-Abstimmung und buchen Sie direkt einen Wunschtermin.'
);
// Form EN
patch(
  'public/locales/en/form.json',
  'wizard.success.booking_title',
  'Your request has been successfully sent! 🎉'
);
patch(
  'public/locales/en/form.json',
  'wizard.success.booking_desc',
  'We will review your details and get back to you shortly. Optional: Skip the email back-and-forth and book a meeting directly.'
);

console.log('Form Locales patched');
