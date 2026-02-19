import { type MetaFunction } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '../shared/ui/SeoHead';
import LogoLoop from '../shared/ui/LogoLoop';
import { TrustBar } from '../shared/ui/TrustBar';

// FSD Widgets — only HeroSection eagerly loaded (above-the-fold)
import { HeroSection } from '../widgets/home/HeroSection';

// Lazy load below-the-fold sections for performance
const StatsSection = React.lazy(() =>
  import('../widgets/home/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const PhilosophySection = React.lazy(() =>
  import('../widgets/home/PhilosophySection').then((m) => ({ default: m.PhilosophySection }))
);
const IndustriesGrid = React.lazy(() =>
  import('../widgets/home/IndustriesGrid').then((m) => ({ default: m.IndustriesGrid }))
);
const TestimonialsSection = React.lazy(() =>
  import('../widgets/home/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);

// Lazy load heavy components
const AgencyComparisonTable = React.lazy(
  () => import('../features/analyzer/ui/AgencyComparisonTable')
);

export const meta: MetaFunction = ({ params }) => {
  const lang = params.lng || 'de';
  const isEn = lang === 'en';

  const title = isEn ? 'Coday | The Agency Killer' : 'Coday | Der Agentur-Killer';
  const description = isEn
    ? 'We end inefficiency. High-End Web Development & Design for Agencies and Enterprises.'
    : 'Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen.';

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
        title={t('meta.title', { defaultValue: 'Coday | Der Agentur-Killer' })}
        description={t('meta.description', {
          defaultValue:
            'Wir beenden Ineffizienz. High-End Webentwicklung & Design für Agenturen und Unternehmen.',
        })}
        preloadImage="/images/hero/business-handshake-partnerschaft-tuer-offen-zusammenarbeit-vertrauen.webp"
        pageType="home"
      />

      <HeroSection />

      <TrustBar />

      <React.Suspense fallback={<div className="h-48" />}>
        <StatsSection />
      </React.Suspense>

      {/* Comparison Section */}
      <React.Suspense fallback={<div className="h-96" />}>
        <AgencyComparisonTable />
      </React.Suspense>

      <React.Suspense fallback={<div className="h-48" />}>
        <PhilosophySection />
      </React.Suspense>

      <React.Suspense fallback={<div className="h-48" />}>
        <IndustriesGrid />
      </React.Suspense>

      {/* Tech Stack Section */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">
              {t('tech_stack.label')}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-secondary">
              {t('tech_stack.title_prefix')}{' '}
              <span className="text-primary">{t('tech_stack.title_suffix')}</span>
            </h2>
          </div>
          <LogoLoop
            logos={[
              { node: <span className="font-bold text-secondary/60 text-xl">React</span> },
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

      <React.Suspense fallback={<div className="h-48" />}>
        <TestimonialsSection />
      </React.Suspense>
    </>
  );
};

export default Home;
