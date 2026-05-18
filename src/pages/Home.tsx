import { type MetaFunction } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/shared/ui/SeoHead';
import LogoLoop from '@/shared/ui/LogoLoop';
import { HeroSection } from '@/widgets/home/HeroSection';
import { TrustBar } from '@/shared/ui/TrustBar';
import { TrustBadges } from '@/shared/ui/TrustBadges';
import { Skeleton } from '@/shared/ui';

// Lazy load below-the-fold sections to drastically reduce initial JS and TBT
const StatsSection = React.lazy(() =>
  import('@/widgets/home/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const PhilosophySection = React.lazy(() =>
  import('@/widgets/home/PhilosophySection').then((m) => ({ default: m.PhilosophySection }))
);
const ServicesSection = React.lazy(() =>
  import('@/widgets/home/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const IndustriesGrid = React.lazy(() =>
  import('@/widgets/home/IndustriesGrid').then((m) => ({ default: m.IndustriesGrid }))
);
const TestimonialsSection = React.lazy(() =>
  import('@/widgets/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const PortfolioTeaserSection = React.lazy(() =>
  import('@/widgets/home/PortfolioTeaserSection').then((m) => ({
    default: m.PortfolioTeaserSection,
  }))
);
const LogoBarSection = React.lazy(() =>
  import('@/widgets/home/LogoBarSection').then((m) => ({ default: m.LogoBarSection }))
);

// Only truly heavy non-critical component stays lazy
const AgencyComparisonTable = React.lazy(
  () => import('@/features/analyzer/ui/AgencyComparisonTable')
);

export const meta: MetaFunction = ({ params }) => {
  const lang = params.lng || 'de';
  const isEn = lang === 'en';

  const title = isEn
    ? 'Web Design Agency in Wetzlar | High-End Web Development & SEO - Coday'
    : 'Webdesign Agentur in Wetzlar | High-End Webentwicklung & SEO - Coday';
  const description = isEn
    ? 'Your web design agency from Wetzlar, Hessen for digital dominance. We build high-performance React websites, award-winning UX/UI, and data-driven SEO strategies.'
    : 'Ihre Webdesign Agentur aus Wetzlar, Hessen für digitale Dominanz. Wir bauen High-Performance Websites, prämierte UX/UI und skalierbare SEO-Strategien.';

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
  ];
};

const Home: React.FC = () => {
  const { t } = useTranslation(['home', 'common', 'services']);

  return (
    <>
      <SeoHead
        title={t('meta.title', {
          defaultValue: 'Webdesign Agentur in Wetzlar | High-End Webentwicklung & SEO - Coday',
        })}
        description={t('meta.description', {
          defaultValue:
            'Ihre Webdesign Agentur aus Wetzlar, Hessen für digitale Dominanz. Wir bauen High-Performance Websites, prämierte UX/UI und skalierbare SEO-Strategien.',
        })}
        pageType="home"
      />

      <HeroSection />

      <TrustBar />

      <React.Suspense fallback={<div className="min-h-[200px]" />}>
        <LogoBarSection />
      </React.Suspense>

      <div className="content-auto">
        <React.Suspense fallback={<div className="min-h-[400px]" />}>
          <StatsSection />
        </React.Suspense>
      </div>

      {/* Comparison Section */}
      <div className="content-auto">
        <React.Suspense
          fallback={<Skeleton className="h-96 w-full max-w-7xl mx-auto rounded-3xl" />}
        >
          <AgencyComparisonTable />
        </React.Suspense>
      </div>

      <div className="content-auto">
        <React.Suspense fallback={<div className="min-h-[400px]" />}>
          <PhilosophySection />
        </React.Suspense>
      </div>

      <div className="content-auto">
        <React.Suspense fallback={<div className="min-h-[400px]" />}>
          <ServicesSection />
        </React.Suspense>
      </div>

      <div className="content-auto">
        <React.Suspense fallback={<div className="min-h-[400px]" />}>
          <PortfolioTeaserSection />
        </React.Suspense>
      </div>

      <div className="content-auto">
        <React.Suspense fallback={<div className="min-h-[400px]" />}>
          <IndustriesGrid />
        </React.Suspense>
      </div>

      {/* Tech Stack Section */}
      <section className="content-auto py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sapphire font-bold tracking-wider uppercase text-xs mb-2 block">
              {t('tech_stack.label')}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-secondary">
              {t('tech_stack.title_prefix')}{' '}
              <span className="text-sapphire">{t('tech_stack.title_suffix')}</span>
            </h2>
          </div>
          <LogoLoop
            logos={[
              { node: <span className="font-bold text-secondary/60 text-xl">React</span> },
              {
                node: <span className="font-bold text-secondary/60 text-xl">React Router v7</span>,
              },
              { node: <span className="font-bold text-secondary/60 text-xl">Next.js</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">TypeScript</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Tailwind</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Node.js</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Supabase</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Framer Motion</span> },
              { node: <span className="font-bold text-secondary/60 text-xl">Vercel</span> },
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

      <React.Suspense fallback={<div className="min-h-[400px]" />}>
        <TestimonialsSection />
      </React.Suspense>

      <section className="content-auto py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges align="center" />
        </div>
      </section>
    </>
  );
};

export default Home;
