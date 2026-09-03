import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutClient } from '@/features/about/ui/AboutClient';
import { BASE_URL, FOUNDER_ID, getBreadcrumbSchema, getWebPageSchema } from '@/lib/schema';

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
      title: 'About Coday | Web Design & Next.js Agency Wetzlar',
      description:
        'Coday & founder Umutcan Emre Tezgel: High-end web development, Next.js architecture and 100/100 Core Web Vitals directly from Wetzlar.',
      keywords: [
        'About Coday',
        'Umutcan Emre Tezgel',
        'Web Design Agency Wetzlar',
        'Solo Web Developer Wetzlar',
        'Next.js Web Design',
      ],
      path: '/en/about',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Über Coday | Webdesign & Next.js Agentur Wetzlar',
    description:
      'Coday & Inhaber Umutcan Emre Tezgel: High-End Webentwicklung, Next.js Architektur und 100/100 Core Web Vitals direkt aus Wetzlar.',
    keywords: [
      'Über Coday',
      'Umutcan Emre Tezgel',
      'Webdesign Agentur Wetzlar',
      'Solo Webentwickler Wetzlar',
      'Next.js Agentur Mittelhessen',
    ],
    path: '/de/about',
    type: 'money',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'de';
  setRequestLocale(locale);

  const pageUrl = `${BASE_URL}/${locale}/about`;
  const breadcrumbs = getBreadcrumbSchema(
    [
      { name: locale === 'en' ? 'Home' : 'Startseite', url: `/${locale}` },
      { name: locale === 'en' ? 'About' : 'Über uns', url: `/${locale}/about` },
    ],
    pageUrl
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    // The Organization node is already emitted site-wide by the root layout.
    '@graph': [
      breadcrumbs,
      getWebPageSchema({
        url: pageUrl,
        name:
          locale === 'en'
            ? 'About Coday | High-End Web Design & Next.js Architecture Wetzlar'
            : 'Über Coday | High-End Webdesign & Next.js Architektur Wetzlar',
        description:
          locale === 'en'
            ? 'Meet Coday and founder Umutcan Emre Tezgel. Bespoke web development, high-end UI/UX design & 100/100 Core Web Vitals without middlemen.'
            : 'Lernen Sie Coday und Gründer Umutcan Emre Tezgel kennen. Maßgeschneiderte Webentwicklung, High-End UI/UX Design & 100/100 Core Web Vitals ohne Zwischenhändler.',
        locale,
        type: 'AboutPage',
        mainEntityId: FOUNDER_ID,
      }),
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
