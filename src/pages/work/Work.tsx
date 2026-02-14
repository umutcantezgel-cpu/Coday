import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { workData, Project } from '@/shared/data/work';
import { SeoHead } from '../../shared/ui/SeoHead';
import { WorkHero } from '@/features/work/components/WorkHero';
import { InProgressSection } from '@/features/work/components/InProgressSection';
import { TemplateVault } from '@/features/work/components/TemplateVault';
import { CaseStudyCard } from '../../features/case-studies/ui/CaseStudyCard';

const Work: React.FC = () => {
  const { t, i18n } = useTranslation('work');
  const [filter, setFilter] = useState('all');

  const handleFilterChange = useCallback((index: number) => {
    const filters = ['all', 'design', 'development', 'marketing'];
    setFilter(filters[index]);
  }, []);

  const currentLang = i18n.language as 'de' | 'en';

  // Categorize projects
  const allProjects = Object.values(workData);
  const inProgressProjects = allProjects.filter((p) => p.type === 'in_progress');
  const templateProjects = allProjects.filter((p) => p.type === 'template');

  // Case Studies (Filtered)
  const caseStudies = allProjects.filter((p) => p.type !== 'in_progress' && p.type !== 'template');

  // Map for display
  const mapProjectToCard = (p: Project) => ({
    id: p.slug,
    slug: p.slug,
    title: p.content[currentLang].title,
    client: p.content[currentLang].subtitle,
    industry: p.content[currentLang].category,
    image:
      p.slug === 'batherm'
        ? '/images/portfolio/batherm-illustration.webp'
        : `/images/portfolio/${p.thumbnail}.webp`,
    excerpt:
      p.content[currentLang].challenge.description || p.content[currentLang].solution.description,
    tags: p.content[currentLang].stats.map((s) => s.value),
    category: p.category,
    externalLink: p.liveUrl || `/work/${p.slug}`,
    type: p.type,
    completion: p.completion,
  });

  const filteredCaseStudies =
    filter === 'all'
      ? caseStudies.map(mapProjectToCard)
      : caseStudies.filter((p) => p.category === filter).map(mapProjectToCard);

  const categories = [
    { label: t('filter.all'), id: 'all' },
    { label: t('filter.design'), id: 'design' },
    { label: t('filter.development'), id: 'development' },
    { label: t('filter.marketing'), id: 'marketing' },
  ];

  return (
    <div className="bg-background-light min-h-screen">
      <SeoHead title={`${t('hero.title')} | Coday`} description={t('hero.description')} />

      {/* 1. Hero */}
      <WorkHero />

      {/* 2. In Progress (The Lab) */}
      <InProgressSection projects={inProgressProjects} />

      {/* 3. Featured Case Studies */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {t('sections.case_studies.title', 'Selected Works')}
            </h2>

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleFilterChange(index)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    item.id === filter
                      ? 'bg-slate-900 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((project) => (
              <div key={project.id} className="h-full">
                <CaseStudyCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Templates (The Vault) */}
      <TemplateVault projects={templateProjects} />

      {/* 5. Booking CTA (Deep Trust) */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            {t('sections.booking.title', 'Want results like these?')}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            {t(
              'sections.booking.subtitle',
              'Stop guessing. Start dominating. Book a strategy call today.'
            )}
          </p>
          <a
            href="/beratung"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            {t('sections.booking.cta', 'Book Strategy Session')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Work;
