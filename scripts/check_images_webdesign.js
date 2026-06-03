const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, '../src/features/web-design');
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

let missing = false;

for (const file of files) {
  const filePath = path.join(uiDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Simple regex to find <Image ... />
  const imageTags = content.match(/<Image[^>]+>/g) || [];
  for (const tag of imageTags) {
    if (!tag.includes('width={') && !tag.includes('fill') && !tag.includes('layout=')) {
      console.log(`Missing dimensions in ${file}: ${tag}`);
      missing = true;
    }
  }
}
if (!missing) console.log('All images have explicit dimensions.');
