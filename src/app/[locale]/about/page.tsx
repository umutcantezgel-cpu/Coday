import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutClient } from '@/features/about/ui/AboutClient';
import { BASE_URL, getOrganizationSchema } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'About Coday | High-End Web Design & Next.js Architecture Wetzlar',
      description:
        'Meet Coday and founder Umutcan Emre Tezgel. Bespoke web development, high-end UI/UX design & 100/100 Core Web Vitals without middlemen.',
      path: '/en/about',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Über Coday | High-End Webdesign & Next.js Architektur Wetzlar',
    description:
      'Lernen Sie Coday und Gründer Umutcan Emre Tezgel kennen. Individuelle Webentwicklung, High-End UI/UX Design & 100/100 Core Web Vitals ohne Umwege.',
    path: '/de/about',
    type: 'money',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'de';
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(locale),
      {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/${locale}/about#webpage`,
        url: `${BASE_URL}/${locale}/about`,
        name:
          locale === 'en'
            ? 'About Coday | High-End Web Design & Next.js Architecture Wetzlar'
            : 'Über Coday | High-End Webdesign & Next.js Architektur Wetzlar',
        description:
          locale === 'en'
            ? 'Meet Coday and founder Umutcan Emre Tezgel. Bespoke web development, high-end UI/UX design & 100/100 Core Web Vitals without middlemen.'
            : 'Lernen Sie Coday und Gründer Umutcan Emre Tezgel kennen. Maßgeschneiderte Webentwicklung, High-End UI/UX Design & 100/100 Core Web Vitals ohne Zwischenhändler.',
        inLanguage: locale,
        mainEntity: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#founder`,
          name: 'Umutcan Emre Tezgel',
          jobTitle: 'Inhaber, Lead Architect & Fullstack Engineer',
          worksFor: {
            '@id': `${BASE_URL}/#organization`,
          },
          url: `${BASE_URL}/${locale}/about`,
          sameAs: ['https://codayweb.de'],
          knowsAbout: [
            'Next.js 15',
            'React 19',
            'TypeScript',
            'Tailwind CSS 4',
            'Headless CMS Architecture',
            'Core Web Vitals & Web Performance',
            'Technical SEO & GEO',
          ],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
