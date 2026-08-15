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
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { pick } from '@/shared/lib/pick';
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
      title: 'Coday Web Agency | High-End Web Design & Next.js Development',
      description:
        'Tailored web design, ultra-fast Next.js web development & SEO for mid-market leaders. 100/100 PageSpeed, measurable B2B leads & fixed pricing.',
      path: '/en',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Coday Webagentur | High-End Webdesign & Next.js Entwicklung',
    description:
      'Maßgeschneidertes Webdesign, ultraschnelle Next.js Webentwicklung & SEO für den Mittelstand. 100/100 PageSpeed, messbare B2B-Leads & Festpreise.',
    path: '/de',
    type: 'money',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const pageMessages = pick(messages as any, [
    'home',
    'analyzer',
    'common',
    'faq',
    'form',
    'cookie',
    'blog',
    'industries',
    'career',
  ]);

  const t = await getTranslations('home');
  const _locale = locale || 'de';
  const serviceSchema = getProfessionalServiceSchema(_locale);
  const localSchema = getLocalBusinessSchema(_locale);
  const orgSchema = getOrganizationSchema(_locale);
  const websiteSchema = getWebSiteSchema(_locale);

  return (
    <NextIntlClientProvider messages={pageMessages}>
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
    </NextIntlClientProvider>
  );
}
