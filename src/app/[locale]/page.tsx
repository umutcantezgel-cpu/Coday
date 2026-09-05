import type { Metadata } from 'next';
import { BASE_URL, ORG_ID, getMainProductOfferSchema, getWebPageSchema } from '@/lib/schema';
import { RouteMessages } from '@/i18n/RouteMessages';
import { generatePageMetadata } from '@/lib/metadata';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TrustBar } from '@/shared/ui/TrustBar';
import { HeroSection } from '@/widgets/home/HeroSection';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';

import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';
import { SeoContentSection } from '@/widgets/home/SeoContentSection';
import AgencyComparisonTable from '@/features/analyzer/ui/AgencyComparisonTable';
import nextDynamic from 'next/dynamic';

const StatsSection = nextDynamic(
  () => import('@/widgets/home/StatsSection').then((mod) => mod.StatsSection),
  { ssr: true }
);
const PhilosophySection = nextDynamic(
  () => import('@/widgets/home/PhilosophySection').then((mod) => mod.PhilosophySection),
  { ssr: true }
);
const ServicesSection = nextDynamic(
  () => import('@/widgets/home/ServicesSection').then((mod) => mod.ServicesSection),
  { ssr: true }
);
const PortfolioTeaserSection = nextDynamic(
  () => import('@/widgets/home/PortfolioTeaserSection').then((mod) => mod.PortfolioTeaserSection),
  { ssr: true }
);
const IndustriesGrid = nextDynamic(
  () => import('@/widgets/home/IndustriesGrid').then((mod) => mod.IndustriesGrid),
  { ssr: true }
);
const TestimonialsSection = nextDynamic(
  () => import('@/widgets/home/TestimonialsSection').then((mod) => mod.TestimonialsSection),
  { ssr: true }
);

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Wetzlar & Next.js Agency · Coday',
      description:
        'Web design agency in Wetzlar: Fast Next.js websites at a fixed price with personal founder support. Free consultation for modern businesses.',
      keywords: [
        'Web Design Wetzlar',
        'Web Development Wetzlar',
        'Web Agency Hesse',
        'Website Creation Wetzlar',
        'Coday Web',
        'Next.js Web Development',
        'Local SEO Central Hesse',
      ],
      path: '/en',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wetzlar & Next.js Agentur · Coday',
    description:
      'Webdesign Agentur in Wetzlar & Mittelhessen: Schnelle Next.js Webseiten zum verbindlichen Festpreis. Persönliche Betreuung durch Inhaber.',
    keywords: [
      'Webdesign Wetzlar',
      'Webentwicklung Wetzlar',
      'Webagentur Wetzlar',
      'Website erstellen Wetzlar',
      'Coday Web',
      'Next.js Webdesign',
      'Lokale SEO Mittelhessen',
    ],
    path: '/de',
    type: 'money',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = locale || 'de';
  const isEn = _locale === 'en';
  // Organization and WebSite are emitted globally by the locale layout; the page
  // graph only adds what is specific to the homepage.
  const mainProductSchema = getMainProductOfferSchema(_locale);
  const pageUrl = `${BASE_URL}/${_locale}`;

  return (
    <RouteMessages family="home" locale={locale}>
      <script
        id="schema-local-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              // The apex of the pyramid: the home page is the one URL answerable
              // for the organisation itself. Every other page names a narrower
              // entity, which is what keeps them out of each other's way.
              getWebPageSchema({
                url: pageUrl,
                name: isEn
                  ? 'Coday — Web Design & Web Development Agency in Wetzlar'
                  : 'Coday — Webdesign & Webentwicklung Agentur in Wetzlar',
                description: isEn
                  ? 'High-performance websites from Wetzlar: 100/100 PageSpeed, Next.js architecture, fixed price after a free call.'
                  : 'High-Performance Websites aus Wetzlar: 100/100 PageSpeed, Next.js-Architektur, Festpreis nach kostenlosem Gespräch.',
                locale: _locale,
                // The home page carries no BreadcrumbList, so it must not claim one.
                hasBreadcrumb: false,
                mainEntityId: ORG_ID,
              }),
              mainProductSchema,
            ],
          }),
        }}
      />

      <HeroSection />

      <ScrollReveal index={0}>
        <TrustBar />
      </ScrollReveal>

      <ScrollReveal index={1} className="section-defer">
        <StatsSection />
      </ScrollReveal>

      <div className="section-defer">
        <AgencyComparisonTable />
      </div>

      <ScrollReveal index={0} className="section-defer">
        <PhilosophySection />
      </ScrollReveal>

      <ScrollReveal index={1} className="section-defer">
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal index={0} className="section-defer">
        <PortfolioTeaserSection />
      </ScrollReveal>

      <ScrollReveal index={1} className="section-defer">
        <IndustriesGrid />
      </ScrollReveal>

      <ScrollReveal index={1} className="section-defer">
        <TestimonialsSection />
      </ScrollReveal>

      <div className="section-defer">
        <SeoContentSection />
      </div>
    </RouteMessages>
  );
}
