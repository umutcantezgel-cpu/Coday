import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';
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
      title: 'Our 4-Stage Web Design Process | Coday Web Agency',
      description:
        'From initial audit to 100/100 PageSpeed launch in 14 days: Discover the transparent, agile web development workflow of Coday Web Agency.',
      path: '/en/process',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Unser Webdesign-Prozess in 4 Schritten | Coday Webagentur',
    description:
      'Vom kostenlosen Audit bis zum 100/100 PageSpeed Launch in 14 Tagen: Entdecken Sie den transparenten, agilen Entwicklungsprozess der Coday Webagentur.',
    path: '/de/process',
    type: 'money',
  });
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  setRequestLocale(_locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      {
        '@type': 'HowTo',
        '@id': `${BASE_URL}/${_locale}/process#howto`,
        name: 'In 4 Stufen zur High-Performance Next.js Website',
        description:
          'Der bewährte Entwicklungs- und Relaunch-Prozess der Coday Webagentur für planbaren Projekterfolg in 14 bis 28 Werktagen.',
        totalTime: 'P21D',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Phase 1: Deep Audit & Strategie-Workshop',
            text: 'Zielgruppenanalyse, Konkurrenz-Benchmarking und Definition der Informationsarchitektur.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Phase 2: High-End UI/UX Prototyping',
            text: 'Wireframing und individuelles Design-System in Figma mit Design-Freigabe vor Entwicklungsstart.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Phase 3: Next.js Enterprise Engineering',
            text: 'Handgeschriebener TypeScript-Code, Headless CMS Anbindung und Optimierung auf 100/100 Core Web Vitals.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Phase 4: Launch, QA Gates & Wachstums-Monitoring',
            text: 'Zero-Downtime Migration, Google Search Console Indexierung und nachhaltiges Conversion-Tracking.',
          },
        ],
      },
    ],
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
