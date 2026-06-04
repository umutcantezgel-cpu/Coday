const fs = require('fs');
const path = require('path');

const generateHubCode = (industryId, industryName, englishName) => `import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: '${englishName} IT Solutions',
      description: 'Custom software and IT solutions for the ${englishName} industry.',
      path: \`/en/branchen/${industryId}\`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: '${industryName} IT-Lösungen',
    description: 'Maßgeschneiderte Software- und IT-Lösungen für die Branche ${industryName}.',
    path: \`/de/branchen/${industryId}\`,
    type: 'money',
  });
}

export default async function ${industryName.replace(/[^a-zA-Z0-9]/g, '')}HubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <IndustryDetailClient />
      {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
    </>
  );
}
`;

const generateSubPageCode = (
  industryId,
  subPath,
  jsonFilename,
  citySlug
) => `import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content', '${jsonFilename}');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);
    
    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: \`/\${locale}/branchen/${industryId}/${subPath}\`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'IT-Lösungen | Next.js & Webdesign',
      description: 'Digitale Dominanz für Ihre Branche.',
      path: \`/\${locale}/branchen/${industryId}/${subPath}\`,
      type: 'money',
    });
  }
}

export default async function SubIndustryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content', '${jsonFilename}');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h1 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h1>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
        {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
      </div>
    );
  }

  const cityData = ${citySlug ? `getCityBySlug('${citySlug}')` : 'undefined'};

  return (
    <>
      <LocalSeoTemplate content={content} cityData={cityData} />
      {/* TODO: Integrate the 'spezielles Tool' here once the user provides it */}
    </>
  );
}
`;

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const appDir = path.join(__dirname, '../src/app/[locale]/branchen');

// 1. Automobil
ensureDir(path.join(appDir, 'automobil'));
fs.writeFileSync(
  path.join(appDir, 'automobil/page.tsx'),
  generateHubCode('automobil', 'Automobil', 'Automotive'),
  'utf8'
);

const autoSubpages = ['kfz-werkstatt', 'kfz-mechatroniker', 'autohaendler'];
autoSubpages.forEach((sub) => {
  ensureDir(path.join(appDir, 'automobil/' + sub));
  fs.writeFileSync(
    path.join(appDir, 'automobil/' + sub + '/page.tsx'),
    generateSubPageCode('automobil', sub, sub + '.json', null),
    'utf8'
  );
});

// 2. Gesundheitswesen
ensureDir(path.join(appDir, 'gesundheitswesen'));
fs.writeFileSync(
  path.join(appDir, 'gesundheitswesen/page.tsx'),
  generateHubCode('gesundheitswesen', 'Gesundheitswesen', 'Healthcare'),
  'utf8'
);

ensureDir(path.join(appDir, 'gesundheitswesen/arzt-wetzlar'));
fs.writeFileSync(
  path.join(appDir, 'gesundheitswesen/arzt-wetzlar/page.tsx'),
  generateSubPageCode(
    'gesundheitswesen',
    'arzt-wetzlar',
    'aerzte-gesundheit-wetzlar.json',
    'wetzlar'
  ),
  'utf8'
);

ensureDir(path.join(appDir, 'gesundheitswesen/arzt-giessen'));
fs.writeFileSync(
  path.join(appDir, 'gesundheitswesen/arzt-giessen/page.tsx'),
  generateSubPageCode(
    'gesundheitswesen',
    'arzt-giessen',
    'aerzte-gesundheit-giessen.json',
    'giessen'
  ),
  'utf8'
);

// 3. Handwerker
ensureDir(path.join(appDir, 'handwerker'));
fs.writeFileSync(
  path.join(appDir, 'handwerker/page.tsx'),
  generateHubCode('handwerker', 'Handwerker', 'Crafts'),
  'utf8'
);

ensureDir(path.join(appDir, 'handwerker/wetzlar'));
fs.writeFileSync(
  path.join(appDir, 'handwerker/wetzlar/page.tsx'),
  generateSubPageCode('handwerker', 'wetzlar', 'handwerk-bau-wetzlar.json', 'wetzlar'),
  'utf8'
);

console.log('Industry pages successfully generated!');
