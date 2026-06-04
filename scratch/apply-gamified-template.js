const fs = require('fs');
const path = require('path');

const files = [
  'automobil/kfz-werkstatt/page.tsx',
  'automobil/kfz-mechatroniker/page.tsx',
  'automobil/autohaendler/page.tsx',
  'gesundheitswesen/arzt-wetzlar/page.tsx',
  'gesundheitswesen/arzt-giessen/page.tsx',
  'handwerker/wetzlar/page.tsx',
];

const basePath = path.join(__dirname, '../src/app/[locale]/branchen');

files.forEach((file) => {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace imports
  content = content.replace(
    "import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';",
    "import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';"
  );

  // Replace component usage
  content = content.replace(
    /<LocalSeoTemplate content={content} cityData={cityData} \/>/g,
    '<GamifiedIndustryTemplate content={content} cityData={cityData} />'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
