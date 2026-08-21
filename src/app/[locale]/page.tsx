import type { Metadata } from 'next';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TrustBar } from '@/shared/ui/TrustBar';
import { HeroSection } from '@/widgets/home/HeroSection';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';
import { SeoContentSection } from '@/widgets/home/SeoContentSection';
import { StatsSection } from '@/widgets/home/StatsSection';
import { PhilosophySection } from '@/widgets/home/PhilosophySection';
import { ServicesSection } from '@/widgets/home/ServicesSection';
import { IndustriesGrid } from '@/widgets/home/IndustriesGrid';
import { TestimonialsSection } from '@/widgets/home/TestimonialsSection';
import { PortfolioTeaserSection } from '@/widgets/home/PortfolioTeaserSection';
import AgencyComparisonTable from '@/features/analyzer/ui/AgencyComparisonTable';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Wetzlar | Web Agency & Web Development | Coday Web',
      description:
        'Coday is your web design agency in Wetzlar: High-performance & high-conversion websites for measurable customer acquisition. Fixed prices and personal support.',
      keywords: [
        'Web Design Wetzlar',
        'Web Design Agency Wetzlar',
        'Web Design Coday',
        'Web Development Wetzlar',
        'Coday Web',
        'Web Agency Hesse',
        'High Performance Web Design',
        'High Conversion Web Design',
        'Local SEO Central Hesse',
      ],
      path: '/en',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Wetzlar | Webdesign Agentur & Webentwicklung | Coday Web',
    description:
      'Coday ist Ihre Webdesign Agentur in Wetzlar: High-Performance & High-Conversion Websites für messbar mehr Kundenanfragen. Feste Preise & persönliche Betreuung.',
    keywords: [
      'Webdesign Wetzlar',
      'Webdesign Agentur Wetzlar',
      'Webdesign Coday',
      'Webentwicklung Wetzlar',
      'Coday Web',
      'Webagentur Wetzlar',
      'High Performance Webdesign',
      'High Conversion Webdesign',
      'Website erstellen lassen Wetzlar',
      'Lokale SEO Mittelhessen',
    ],
    path: '/de',
    type: 'money',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const t = await getTranslations('home');
  const _locale = locale || 'de';
  const orgSchema = getOrganizationSchema(_locale);
  const websiteSchema = getWebSiteSchema(_locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        id="schema-local-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [orgSchema, websiteSchema],
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
    </NextIntlClientProvider>
  );
}
