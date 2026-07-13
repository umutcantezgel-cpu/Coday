import type { Metadata } from 'next';
import {
  getLocalBusinessSchema,
  getProfessionalServiceSchema,
  getOrganizationSchema,
  getWebSiteSchema,
} from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TrustBar } from '@/shared/ui/TrustBar';
import { HeroSection } from '@/widgets/home/HeroSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Agency in Wetzlar & Central Hesse',
      description:
        'Your new website from a web designer in Wetzlar. Personal service, fixed price, online in 3 weeks. For craftsmen, doctors and businesses. Inquire now.',
      path: '/en',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Agentur in Wetzlar & Mittelhessen',
    description:
      'Ihre neue Webseite vom Webdesigner in Wetzlar. Persönlich, zum Festpreis, in 3 Wochen online. Für Handwerker, Ärzte und Gastronomen. Jetzt anfragen.',
    path: '/de',
    type: 'money',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const serviceSchema = getProfessionalServiceSchema();
  const localSchema = getLocalBusinessSchema();
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  const _locale = typeof params !== 'undefined' && params ? (await params).locale : 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Agency in Wetzlar & Central Hesse | Coday'
      : 'Webdesign Agentur in Wetzlar & Mittelhessen | Coday';
  return (
    <>
      <span className="sr-only" aria-hidden="true">
        {_seoTitle}
      </span>
      <script
        id="schema-local-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [orgSchema, serviceSchema, localSchema, websiteSchema],
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
