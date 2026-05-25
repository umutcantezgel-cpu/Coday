const fs = require('fs');

const files = process.argv.slice(2);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace react-i18next with next-intl
  content = content.replace(/import \{.*?useTranslation.*?\} from 'react-i18next';/, "import { useTranslations } from 'next-intl';");
  
  // Replace LocalizedNavLink
  content = content.replace(/import \{ LocalizedNavLink as NavLink \} from '@\/shared\/ui\/LocalizedLink';/, "import { Link as NavLink } from '@/i18n/navigation';");

  // Replace t function
  content = content.replace(/const \{ t \} = useTranslation\(\[.*?\]\);/, "const t = useTranslations();");
  content = content.replace(/const \{ t \} = useTranslation\('.*?'\);/, "const t = useTranslations();");
  
  // Fix React.lazy and Suspense for components
  content = content.replace(/import React(?:, \{.*?\})? from 'react';/, "import React from 'react';\nimport dynamic from 'next/dynamic';");
  content = content.replace(/const (\w+) = React\.lazy\(\(\) => import\('(.*?)'\)\);/g, "const $1 = dynamic(() => import('$2'));");
  content = content.replace(/const (\w+) = React\.lazy\(\(\) =>\s+import\('(.*?)'\)\.then\(\(m\) => \(\{\s*default: m\.\w+\s*\}\)\)\s*\);/g, "const $1 = dynamic(() => import('$2').then(m => Object.values(m)[0] as any));");

  // Fix component name
  const match = content.match(/const (\w+): React\.FC = \(\) => \{/);
  if (match) {
    const compName = match[1];
    content = content.replace(match[0], `export function ${compName}Client() {`);
    content = content.replace(new RegExp(`export default ${compName};`), '');
  }

  // Next.js Image
  // Actually, wait, they use OptimizedImage which is custom and fine.

  fs.writeFileSync(file, content);
  console.log('Migrated', file);
});
