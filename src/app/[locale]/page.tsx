import type { Metadata } from 'next';
import { getLocalBusinessSchema, getProfessionalServiceSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TrustBar } from '@/shared/ui/TrustBar';
import { HeroSection } from '@/widgets/home/HeroSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Script from 'next/script';
import React from 'react';

import LogoLoop from '@/shared/ui/LogoLoop';
import { StatsSection } from '@/widgets/home/StatsSection';
import { PhilosophySection } from '@/widgets/home/PhilosophySection';
import { ServicesSection } from '@/widgets/home/ServicesSection';
import { IndustriesGrid } from '@/widgets/home/IndustriesGrid';
import { TestimonialsSection } from '@/widgets/home/TestimonialsSection';
import { PortfolioTeaserSection } from '@/widgets/home/PortfolioTeaserSection';
import AgencyComparisonTable from '@/features/analyzer/ui/AgencyComparisonTable';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';
import { SeoContentSection } from '@/widgets/home/SeoContentSection';

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

  return (
    <>
      <Script
        id="schema-local-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [serviceSchema, localSchema],
          }),
        }}
      />

      <HeroSection />

      <ScrollReveal index={0}>
        <TrustBar />
      </ScrollReveal>

      <ScrollReveal index={1}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <StatsSection />
        </React.Suspense>
      </ScrollReveal>

      <div>
        <React.Suspense
          fallback={<Skeleton className="h-96 w-full max-w-7xl mx-auto rounded-3xl" />}
        >
          <AgencyComparisonTable />
        </React.Suspense>
      </div>

      <ScrollReveal index={0}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <PhilosophySection />
        </React.Suspense>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <ServicesSection />
        </React.Suspense>
      </ScrollReveal>

      <ScrollReveal index={0}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <PortfolioTeaserSection />
        </React.Suspense>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <IndustriesGrid />
        </React.Suspense>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <TestimonialsSection />
        </React.Suspense>
      </ScrollReveal>

      <SeoContentSection />
    </>
  );
}
