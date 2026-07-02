import fs from 'fs';
import path from 'path';

const cities = ['wetzlar', 'giessen', 'marburg', 'herborn', 'dillenburg', 'weilburg'];

// Capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const generatePages = () => {
  const sitemapPath = path.join(process.cwd(), 'src', 'app', 'sitemap.ts');
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

  cities.forEach((city) => {
    const dirPath = path.join(process.cwd(), 'src', 'app', '[locale]', 'landingpages', city);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const displayName = capitalize(city === 'giessen' ? 'Gießen' : city);

    const pageContent = `import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import { getCityBySlug } from '@/features/local-seo/model/cities';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Webdesign Agentur in ${displayName} | Coday',
    description: 'Ihre Webagentur für ${displayName}. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.',
    path: \`/\${locale}/landingpages/${city}\`,
    type: 'money',
  });
}

export default async function ${capitalize(city)}LandingPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);

  let content = null;
  try {
    const filePath = path.join(process.cwd(), 'src', 'features', 'local-seo', 'model', 'content', '${city}.json');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      content = JSON.parse(fileContents);
    }
  } catch (e) {
    // Content is being generated
  }

  const cityData = getCityBySlug('${city}');

  return (
    <>
      <SeoHead
        title={\`Webdesign Agentur in ${displayName} | Coday\`}
        description={\`Ihre Webagentur für ${displayName}. Hochperformante Webseiten, die messbar neue Kunden bringen. Regional, persönlich und zum Festpreis.\`}
        pageType="default"
      />
      {content && cityData ? (
        <LocalSeoTemplate content={content} cityData={cityData} />
      ) : (
        <div className="min-h-screen pt-32 text-center text-white bg-secondary flex flex-col items-center justify-center">
           <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Ihr Webdesigner in ${displayName}</h1>
           <p className="text-gray-400 max-w-2xl text-lg">
             Wir bauen in ${displayName} und Umgebung hochperformante Webseiten für Handwerker, Ärzte, und Dienstleister.
           </p>
           
           {/* Geo/LocalBusiness Schema injection */}
           <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "name": "Coday Webdesign ${displayName}",
                  "areaServed": "${displayName}",
                  "description": "Lokale Webdesign-Agentur für ${displayName} und Umgebung."
                })
              }}
            />
        </div>
      )}
    </>
  );
}
`;
    fs.writeFileSync(path.join(dirPath, 'page.tsx'), pageContent);
    console.log(`Generated page for ${city}`);

    // Update sitemap
    const sitemapEntryStr = `sitemapEntry('/landingpages/${city}', { changeFrequency: 'monthly', priority: 0.8 }),`;
    if (!sitemapContent.includes(sitemapEntryStr)) {
      // Find the last sitemapEntry in staticRoutes and insert after it
      const insertPoint = sitemapContent.lastIndexOf('sitemapEntry(');
      const insertEnd = sitemapContent.indexOf('),', insertPoint) + 2;
      sitemapContent =
        sitemapContent.slice(0, insertEnd) +
        '\n    ' +
        sitemapEntryStr +
        sitemapContent.slice(insertEnd);
    }
  });

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('Sitemap updated.');
};

generatePages();
