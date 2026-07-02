import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { LocalSeoTemplate } from '@/features/local-seo/ui/LocalSeoTemplate';
import fs from 'fs';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'hessen.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    return generatePageMetadata({
      title: content.meta.title,
      description: content.meta.description,
      path: `/${locale}/standorte/hessen`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title: 'Webdesign Agentur Hessen | Premium Webseiten',
      description: 'Webagentur und Next.js Entwickler in Hessen.',
      path: `/${locale}/standorte/hessen`,
      type: 'money',
    });
  }
}

export default async function HessenLocationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'hessen.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated
  }

  if (!content) {
    return (
      <div className="p-20 text-center">Hessen SEO Content is currently being generated...</div>
    );
  }

  return <LocalSeoTemplate content={content} />;
}
