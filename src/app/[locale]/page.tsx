import type { Metadata } from 'next';
import { getOrganizationSchema, getWebSiteSchema, getMainProductOfferSchema } from '@/lib/schema';
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
      title: 'Web Design Wetzlar | Web Development Wetzlar | Coday Web',
      description:
        'Coday is your web design agency in Wetzlar and Central Hesse. Fast, modern websites at a fixed price with personal support. Get your free consultation.',
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
    title: 'Webdesign Wetzlar | Webentwicklung Wetzlar | Coday Web',
    description:
      'Coday ist Ihre Webdesign Agentur in Wetzlar und Mittelhessen. Schnelle, moderne Webseiten zum Festpreis mit persönlicher Betreuung. Jetzt beraten lassen.',
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
  const orgSchema = getOrganizationSchema(_locale);
  const websiteSchema = getWebSiteSchema(_locale);
  const mainProductSchema = getMainProductOfferSchema(_locale);

  return (
    <>
      <script
        id="schema-local-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [orgSchema, websiteSchema, mainProductSchema],
          }),
        }}
      />

      <HeroSection />

      <ScrollReveal index={0}>
        <TrustBar />
      </ScrollReveal>

      <ScrollReveal index={1}>
        <StatsSection />
      </ScrollReveal>

      <div>
        <AgencyComparisonTable />
      </div>

      <ScrollReveal index={0}>
        <PhilosophySection />
      </ScrollReveal>

      <ScrollReveal index={1}>
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal index={0}>
        <PortfolioTeaserSection />
      </ScrollReveal>

      <ScrollReveal index={1}>
        <IndustriesGrid />
      </ScrollReveal>

      <ScrollReveal index={1}>
        <TestimonialsSection />
      </ScrollReveal>

      <SeoContentSection />
    </>
  );
}
