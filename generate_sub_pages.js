const fs = require('fs');
const path = require('path');

const pages = [
  { folder: 'design/brand-identity', comp: 'BrandIdentityClient', title: 'Brand Identity', desc: 'Brand Identity Design Services.' },
  { folder: 'design/design-systems', comp: 'DesignSystemsClient', title: 'Design Systems', desc: 'Comprehensive Design Systems.' },
  { folder: 'design/ui-ux', comp: 'UiUxClient', title: 'UI/UX Design', desc: 'User Interface and User Experience Design.' },
  { folder: 'design/ux-audit', comp: 'UxAuditClient', title: 'UX Audit', desc: 'Professional UX Auditing Services.' },
  { folder: 'development/api-integration', comp: 'ApiIntegrationClient', title: 'API Integration', desc: 'Seamless API Integrations.' },
  { folder: 'development/headless-cms', comp: 'HeadlessCmsClient', title: 'Headless CMS', desc: 'Modern Headless CMS Solutions.' },
  { folder: 'development/migration', comp: 'MigrationClient', title: 'Website Migration', desc: 'Smooth Website and Data Migrations.' },
  { folder: 'development/web-apps', comp: 'WebAppsClient', title: 'Web Applications', desc: 'Custom Web Application Development.' }
];

pages.forEach(page => {
  const dirPath = `src/app/[locale]/services/${page.folder}`;
  fs.mkdirSync(dirPath, { recursive: true });
  
  const content = `import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { ${page.comp} } from '@/features/services/ui/${page.comp}';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: '${page.title}',
    description: '${page.desc}',
    path: \`/\${locale}/services/${page.folder}\`,
    type: 'website',
  });
}

export default async function ${page.comp.replace('Client', 'Page')}({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <${page.comp} />;
}
`;
  
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
  console.log(`Generated page for ${page.folder}`);
});
