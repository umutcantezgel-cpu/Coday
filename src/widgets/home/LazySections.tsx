'use client';

import dynamic from 'next/dynamic';

export const StatsSectionLazy = dynamic(
  () => import('./StatsSection').then((mod) => mod.StatsSection),
  { ssr: false }
);
export const IndustriesGridLazy = dynamic(
  () => import('./IndustriesGrid').then((mod) => mod.IndustriesGrid),
  { ssr: false }
);
export const TestimonialsSectionLazy = dynamic(
  () => import('./TestimonialsSection').then((mod) => mod.TestimonialsSection),
  { ssr: false }
);
export const PortfolioTeaserSectionLazy = dynamic(
  () => import('./PortfolioTeaserSection').then((mod) => mod.PortfolioTeaserSection),
  { ssr: false }
);
export const AgencyComparisonTableLazy = dynamic(
  () => import('@/features/analyzer/ui/AgencyComparisonTable'),
  { ssr: false }
);
export const PhilosophySectionLazy = dynamic(
  () => import('./PhilosophySection').then((mod) => mod.PhilosophySection),
  { ssr: false }
);
export const ServicesSectionLazy = dynamic(
  () => import('./ServicesSection').then((mod) => mod.ServicesSection),
  { ssr: false }
);
