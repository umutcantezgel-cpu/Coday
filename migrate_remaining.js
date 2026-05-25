const fs = require('fs');
const path = require('path');

const filesToMigrate = [
  '.legacy_pages_backup/services/design/BrandIdentity.tsx',
  '.legacy_pages_backup/services/design/DesignSystems.tsx',
  '.legacy_pages_backup/services/design/UiUx.tsx',
  '.legacy_pages_backup/services/design/UxAudit.tsx',
  '.legacy_pages_backup/services/development/ApiIntegration.tsx',
  '.legacy_pages_backup/services/development/HeadlessCms.tsx',
  '.legacy_pages_backup/services/development/Migration.tsx',
  '.legacy_pages_backup/services/development/WebApps.tsx'
];

filesToMigrate.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  const basename = path.basename(file, '.tsx');
  const targetFile = `src/features/services/ui/${basename}Client.tsx`;
  
  let content = fs.readFileSync(file, 'utf8');

  // Add "use client"; at the top
  content = '"use client";\n' + content;

  // Replace react-i18next with next-intl
  content = content.replace(/import \{.*?useTranslation.*?\} from 'react-i18next';/g, "import { useTranslations } from 'next-intl';");
  
  // Replace LocalizedNavLink and Link
  content = content.replace(/import \{ LocalizedNavLink as NavLink \} from '@\/shared\/ui\/LocalizedLink';/g, "import { Link as NavLink } from '@/i18n/navigation';");
  content = content.replace(/import \{ Link \} from 'react-router-dom';/g, "import { Link } from '@/i18n/navigation';");

  // Replace t function
  content = content.replace(/const \{ t \} = useTranslation\(\[.*?\]\);/g, "const t = useTranslations();");
  content = content.replace(/const \{ t \} = useTranslation\('.*?'\);/g, "const t = useTranslations();");
  
  // Replace react-helmet-async
  content = content.replace(/import \{ Helmet \} from 'react-helmet-async';/g, "");
  content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, "");
  
  // Remove SeoHead
  content = content.replace(/import \{ SeoHead \} from '@\/shared\/ui\/SeoHead';/g, "");
  content = content.replace(/<SeoHead[\s\S]*?\/>/g, "");

  // Fix React.lazy and Suspense for components
  content = content.replace(/import React(?:, \{.*?\})? from 'react';/g, "import React from 'react';\nimport dynamic from 'next/dynamic';");
  content = content.replace(/const (\w+) = React\.lazy\(\(\) => import\('(.*?)'\)\);/g, "const $1 = dynamic(() => import('$2'));");
  content = content.replace(/const (\w+) = React\.lazy\(\(\) =>\s+import\('(.*?)'\)\.then\(\(m\) => \(\{\s*default: m\.\w+\s*\}\)\)\s*\);/g, "const $1 = dynamic(() => import('$2').then(m => Object.values(m)[0] as any));");

  // Fix component name and export
  const match = content.match(/const (\w+) = \(\) => \{/);
  if (match) {
    const compName = match[1];
    content = content.replace(match[0], `export function ${compName}Client() {`);
    content = content.replace(new RegExp(`export default ${compName};`), '');
  }

  // Same for React.FC
  const matchFc = content.match(/const (\w+): React\.FC = \(\) => \{/);
  if (matchFc) {
    const compName = matchFc[1];
    content = content.replace(matchFc[0], `export function ${compName}Client() {`);
    content = content.replace(new RegExp(`export default ${compName};`), '');
  }

  fs.writeFileSync(targetFile, content);
  console.log(`Migrated ${basename} to ${targetFile}`);
});
