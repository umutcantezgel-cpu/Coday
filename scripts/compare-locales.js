import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const deDir = path.join(__dirname, '../public/locales/de');
const enDir = path.join(__dirname, '../public/locales/en');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getKeys(obj[key], prefix + key + '.'));
    } else {
      keys.push(prefix + key);
    }
  }
  return keys;
}

function compareFiles(filename) {
  const dePath = path.join(deDir, filename);
  const enPath = path.join(enDir, filename);

  if (!fs.existsSync(dePath) || !fs.existsSync(enPath)) {
    console.log(`Skipping ${filename}: one of the files does not exist.`);
    return;
  }

  const deContent = JSON.parse(fs.readFileSync(dePath, 'utf8'));
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

  const deKeys = getKeys(deContent);
  const enKeys = new Set(getKeys(enContent));

  const missingInEn = deKeys.filter((key) => !enKeys.has(key));

  if (missingInEn.length > 0) {
    console.log(`\nMissing keys in en/${filename}:`);
    missingInEn.forEach((key) => console.log(`  - ${key}`));
  } else {
    // console.log(`\nNo missing keys in en/${filename}`);
  }
}

const files = fs.readdirSync(deDir).filter((f) => f.endsWith('.json'));

console.log('--- Comparison Results ---');
files.forEach((file) => {
  compareFiles(file);
});
console.log('--- End Results ---');
