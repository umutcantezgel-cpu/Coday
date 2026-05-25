const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '.legacy_pages_backup');
const appDir = path.join(__dirname, 'src', 'app', '[locale]');
const featuresDir = path.join(__dirname, 'src', 'features');

// Map of legacy files to their new routes
const pageMap = {
  'Booking.tsx': { route: 'booking', feature: 'booking', name: 'BookingClient' },
  'Calculator.tsx': { route: 'calculator', feature: 'calculator', name: 'CalculatorClient' },
  'Garantie.tsx': { route: 'garantie', feature: 'legal', name: 'GarantieClient' },
  'Partnerschaft.tsx': { route: 'partnerschaft', feature: 'company', name: 'PartnerschaftClient' },
  'Presse.tsx': { route: 'presse', feature: 'company', name: 'PresseClient' },
  'AngebotHandwerker.tsx': { route: 'angebot-handwerker', feature: 'landing', name: 'AngebotHandwerkerClient' },
  'Process.tsx': { route: 'process', feature: 'process', name: 'ProcessClient' },
  'Services.tsx': { route: 'services', feature: 'services', name: 'ServicesOverviewClient' },
  'Packages.tsx': { route: 'packages', feature: 'pricing', name: 'PackagesClient' },
};

function processPage(file) {
  const config = pageMap[file];
  if (!config) return;

  const legacyPath = path.join(backupDir, file);
  if (!fs.existsSync(legacyPath)) return;

  const routePath = path.join(appDir, config.route);
  const featurePath = path.join(featuresDir, config.feature, 'ui');

  // Create dirs
  fs.mkdirSync(routePath, { recursive: true });
  fs.mkdirSync(featurePath, { recursive: true });

  // 1. Move & rename legacy file to feature dir
  let content = fs.readFileSync(legacyPath, 'utf-8');
  
  // Add use client if not present
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = `"use client";\n\n` + content;
  }
  
  // Replace import.meta.env
  content = content.replace(/import\.meta\.env\?\.VITE_/g, 'process.env.NEXT_PUBLIC_');
  content = content.replace(/import\.meta\.env\.VITE_/g, 'process.env.NEXT_PUBLIC_');
  
  const clientComponentPath = path.join(featurePath, `${config.name}.tsx`);
  fs.writeFileSync(clientComponentPath, content);
  console.log(`Created ${clientComponentPath}`);

  // 2. Create page.tsx
  const pageContent = `import { setRequestLocale } from 'next-intl/server';
import SeoHead from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/${config.feature}/ui/${config.name}';

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return (
    <>
      <SeoHead
        title="Coday | ${config.route}"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
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

for (const file of Object.keys(pageMap)) {
  processPage(file);
}

console.log('Migration of root level pages completed.');
