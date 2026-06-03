const fs = require('fs');

const filesToFix = [
  'src/app/sitemap.ts',
  'src/lib/metadata.ts',
  'src/lib/schema.ts',
  'src/app/llms.txt/route.ts',
  'src/shared/lib/badge-generator.ts'
];

filesToFix.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/'https:\/\/codayweb\.de'/g, "'https://www.codayweb.de'");
  fs.writeFileSync(file, code);
  console.log('Fixed ' + file);
});
