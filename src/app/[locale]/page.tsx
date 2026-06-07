import type { Metadata } from 'next';
import { getLocalBusinessSchema, getProfessionalServiceSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { TrustBar } from '@/shared/ui/TrustBar';
import { HeroSection } from '@/widgets/home/HeroSection';
import { headers } from 'next/headers';
import Script from 'next/script';
import React from 'react';
import { getTranslations } from 'next-intl/server';

import LogoLoop from '@/shared/ui/LogoLoop';
import { StatsSection } from '@/widgets/home/StatsSection';
import { PhilosophySection } from '@/widgets/home/PhilosophySection';
import { ServicesSection } from '@/widgets/home/ServicesSection';
import { IndustriesGrid } from '@/widgets/home/IndustriesGrid';
import { TestimonialsSection } from '@/widgets/home/TestimonialsSection';
import { PortfolioTeaserSection } from '@/widgets/home/PortfolioTeaserSection';
import AgencyComparisonTable from '@/features/analyzer/ui/AgencyComparisonTable';
import { ScrollReveal } from '@/shared/ui/animations/ScrollReveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Leading Web Design & Development Agency in Wetzlar & Hessen',
      description:
        'The #1 web agency in Wetzlar & Hessen. High-performance Next.js, React, TypeScript, Tailwind CSS & Framer Motion websites. Incomparable modern web solutions.',
      path: '/en',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'High-Performance Webentwicklung & Digitalagentur in Wetzlar',
    description:
      'Die führende Webdesign & Entwicklungsagentur in Hessen. Wir bauen unvergleichbar schnelle Websites mit Next.js, React, Tailwind & Framer Motion. Herausragende Ergebnisse garantiert.',
    path: '/de',
    type: 'money',
  });
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const nonce = (await headers()).get('x-nonce') ?? '';
  const serviceSchema = getProfessionalServiceSchema();
  const localSchema = getLocalBusinessSchema();

  return (
    <>
      <Script
        id="schema-local-service"
        type="application/ld+json"
        nonce={nonce}
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

      <ScrollReveal index={0}>
        <section
          aria-labelledby="tech-stack-heading"
          className="py-[var(--space-section)] bg-gray-50 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-sapphire font-bold tracking-wider uppercase text-xs mb-2 block">
                {t('techStack.eyebrow', { defaultValue: 'Core Tech Stack' })}
              </span>
              <h2
                id="tech-stack-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-secondary"
              >
                {t('techStack.headingPrefix', { defaultValue: 'High-End Architektur' })}{' '}
                <span className="text-sapphire">
                  {t('techStack.headingSuffix', { defaultValue: 'für kompromisslose Performance' })}
                </span>
              </h2>
            </div>
            <LogoLoop
              logos={[
                { node: <span className="font-bold text-secondary/80 text-xl">React 19</span> },
                { node: <span className="font-bold text-secondary/80 text-xl">Next.js 15</span> },
                { node: <span className="font-bold text-secondary/80 text-xl">TypeScript</span> },
                { node: <span className="font-bold text-secondary/80 text-xl">Tailwind v4</span> },
                {
                  node: <span className="font-bold text-secondary/80 text-xl">Framer Motion</span>,
                },
                { node: <span className="font-bold text-secondary/80 text-xl">Supabase</span> },
                { node: <span className="font-bold text-secondary/80 text-xl">Vercel</span> },
              ]}
              speed={60}
              direction="left"
              logoHeight={32}
              gap={80}
              fadeOut={true}
              pauseOnHover={true}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal index={1}>
        <React.Suspense fallback={<div className="min-h-96" />}>
          <TestimonialsSection />
        </React.Suspense>
      </ScrollReveal>
    </>
  );
}
