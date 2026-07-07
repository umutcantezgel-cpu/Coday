'use client';

import dynamic from 'next/dynamic';

export const StatsSectionLazy = dynamic(() =>
  import('./StatsSection').then((mod) => mod.StatsSection)
);
export const IndustriesGridLazy = dynamic(() =>
  import('./IndustriesGrid').then((mod) => mod.IndustriesGrid)
);
export const TestimonialsSectionLazy = dynamic(() =>
  import('./TestimonialsSection').then((mod) => mod.TestimonialsSection)
);
export const PortfolioTeaserSectionLazy = dynamic(() =>
  import('./PortfolioTeaserSection').then((mod) => mod.PortfolioTeaserSection)
);
export const AgencyComparisonTableLazy = dynamic(
  () => import('@/features/analyzer/ui/AgencyComparisonTable')
);
export const PhilosophySectionLazy = dynamic(() =>
  import('./PhilosophySection').then((mod) => mod.PhilosophySection)
);
export const ServicesSectionLazy = dynamic(() =>
  import('./ServicesSection').then((mod) => mod.ServicesSection)
);
