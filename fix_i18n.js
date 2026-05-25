const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src', 'features'), (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    if (content.includes("from 'react-i18next'")) {
      content = content.replace(/import\s+\{\s*useTranslation\s*\}\s+from\s+['"]react-i18next['"];?/g, "import { useTranslations } from 'next-intl';");
      modified = true;
    }

    if (content.includes("const { t } = useTranslation")) {
      content = content.replace(/const\s+\{\s*t\s*\}\s*=\s*useTranslation\(([^)]*)\);?/g, "const t = useTranslations($1);");
      modified = true;
    }

    if (content.includes("const { t, i18n } = useTranslation")) {
      content = content.replace(/const\s+\{\s*t\s*,\s*i18n\s*\}\s*=\s*useTranslation\(([^)]*)\);?/g, "const t = useTranslations($1);\n  // Note: i18n is not supported by next-intl directly in components like this.");
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated i18n in ${filePath}`);
    }
  }
});
