import { type MetaFunction } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '../shared/ui/SeoHead';
import LogoLoop from '../shared/ui/LogoLoop';
import { TrustBar } from '../shared/ui/TrustBar';

// All sections eagerly imported for SSR — server renders complete page HTML
// Vite code-splits per route automatically, eager import ≠ same JS bundle
import { HeroSection } from '../widgets/home/HeroSection';
import { StatsSection } from '../widgets/home/StatsSection';
import { PhilosophySection } from '../widgets/home/PhilosophySection';
import { IndustriesGrid } from '../widgets/home/IndustriesGrid';
import { TestimonialsSection } from '../widgets/home/TestimonialsSection';

// Only truly heavy non-critical component stays lazy
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
        pageType="home"
      />

      <HeroSection />

      <TrustBar />

      <div className="content-auto">
        <StatsSection />
      </div>

      {/* Comparison Section */}
      <div className="content-auto">
        <React.Suspense fallback={<div className="h-96" />}>
          <AgencyComparisonTable />
        </React.Suspense>
      </div>

      <div className="content-auto">
        <PhilosophySection />
      </div>

      <div className="content-auto">
        <IndustriesGrid />
      </div>

      {/* Tech Stack Section */}
      <section className="content-auto py-16 bg-gray-50 overflow-hidden">
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

      <TestimonialsSection />
    </>
  );
};

export default Home;
