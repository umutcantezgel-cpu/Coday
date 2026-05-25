const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '.legacy_pages_backup');
const appDir = path.join(__dirname, 'src', 'app', '[locale]');
const featuresDir = path.join(__dirname, 'src', 'features');

function migrateDirectory(dirName, featureName) {
  const sourceDir = path.join(backupDir, dirName);
  if (!fs.existsSync(sourceDir)) return;

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.tsx') && !f.startsWith('[') && f !== 'index.tsx');

  for (const file of files) {
    const routeName = file.replace('.tsx', '').toLowerCase();
    const componentName = file.replace('.tsx', 'Client');
    
    const routePath = path.join(appDir, dirName, routeName);
    const featurePath = path.join(featuresDir, featureName, 'ui');

    fs.mkdirSync(routePath, { recursive: true });
    fs.mkdirSync(featurePath, { recursive: true });

    let content = fs.readFileSync(path.join(sourceDir, file), 'utf-8');
    
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
      content = `"use client";\n\n` + content;
    }
    
    content = content.replace(/import\.meta\.env\?\.VITE_/g, 'process.env.NEXT_PUBLIC_');
    content = content.replace(/import\.meta\.env\.VITE_/g, 'process.env.NEXT_PUBLIC_');
    
    const clientComponentPath = path.join(featurePath, `${componentName}.tsx`);
    fs.writeFileSync(clientComponentPath, content);
    console.log(`Created ${clientComponentPath}`);

    const pageContent = `import { setRequestLocale } from 'next-intl/server';
import SeoHead from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/${featureName}/ui/${componentName}';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | ${routeName}"
        description="Erfahren Sie mehr über ${routeName}"
        pageType="website"
      />
      <ClientComponent />
    </>
  );
}
`;

    fs.writeFileSync(path.join(routePath, 'page.tsx'), pageContent);
    console.log(`Created ${path.join(routePath, 'page.tsx')}`);
  }
}

migrateDirectory('ai', 'ai');
migrateDirectory('career', 'career');
migrateDirectory('community', 'community');
migrateDirectory('industries', 'industries');
migrateDirectory('knowledge', 'knowledge');
migrateDirectory('landingpages', 'landing');
migrateDirectory('work', 'work');

console.log('Migration of subdirectories completed.');
