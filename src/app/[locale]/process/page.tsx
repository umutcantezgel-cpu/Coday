import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  BASE_URL,
  getOrganizationSchema,
  getBreadcrumbSchema,
  getProcessSchema,
} from '@/lib/schema';
import ClientComponent from '@/features/process/ui/ProcessClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Web Design Process | Coday Web Agency',
      description:
        'From initial audit to 100/100 PageSpeed launch in 14 days: Discover the transparent, agile web development workflow of Coday Web Agency.',
      keywords: [
        'Web Design Process',
        'Website Creation Workflow',
        'Next.js Development Steps',
        'Coday Web Process',
      ],
      path: '/en/process',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unser Webdesign-Prozess in 5 Schritten | Coday Webagentur',
    description:
      'Vom kostenlosen Audit bis zum 100/100 PageSpeed Launch in 14 Tagen: Entdecken Sie den transparenten, agilen Entwicklungsprozess der Coday Webagentur.',
    keywords: [
      'Webdesign Ablauf',
      'Website Relaunch Schritte',
      'Webentwicklung Prozess',
      'Next.js Launch Phasen',
      'Coday Web Prozess',
    ],
    path: '/de/process',
    type: 'money',
  });
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  const breadcrumbs = getBreadcrumbSchema([
    { name: _locale === 'en' ? 'Home' : 'Startseite', url: `/${_locale}` },
    { name: _locale === 'en' ? 'Process' : 'Ablauf', url: `/${_locale}/process` },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [getOrganizationSchema(_locale), breadcrumbs, getProcessSchema(_locale)],
  };

  return (
    <>
      <script
        id="schema-process"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientComponent />
    </>
  );
}
