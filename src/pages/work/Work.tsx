import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BlurText from '../../shared/ui/BlurText';
import { CaseStudyCard } from '../../features/case-studies/ui/CaseStudyCard';
import { workData } from '../../data/work';

const Work: React.FC = () => {
  const { t, i18n } = useTranslation('work');
  const [filter, setFilter] = useState('all');

  const handleFilterChange = useCallback((index: number) => {
    const filters = ['all', 'design', 'development', 'marketing'];
    setFilter(filters[index]);
  }, []);

  const currentLang = i18n.language as 'de' | 'en';

  // Map workData to project array
  const projects = Object.values(workData).map((project) => ({
    id: project.slug,
    slug: project.slug,
    title: project.content[currentLang].title,
    client: project.content[currentLang].subtitle, // Mapping subtitle to client for card display
    industry: project.content[currentLang].category,
    image:
      project.slug === 'batherm'
        ? '/images/portfolio/batherm-illustration.jpg'
        : project.slug === 'creative-impact'
          ? '/images/portfolio/mockup-website-fotograf-portfolio-hochzeit-portrait-business-event-galerie.webp'
          : `/images/portfolio/${project.thumbnail}.jpg`,
    excerpt: project.content[currentLang].challenge.description,
    tags: project.content[currentLang].stats.map((s) => s.value),
    category: project.category, // internal category
    externalLink: `/work/${project.slug}`,
  }));

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const categories = [
    { label: t('filter.all'), id: 'all' },
    { label: t('filter.design'), id: 'design' },
    { label: t('filter.development'), id: 'development' },
    { label: t('filter.marketing'), id: 'marketing' },
  ];

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {t('hero.label')}
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-secondary leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-text-slate font-light leading-relaxed">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Static Filter Nav */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex flex-wrap gap-4">
          {categories.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleFilterChange(index)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                item.id === filter
                  ? 'bg-primary text-white'
                  : 'bg-white text-secondary hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <section className="container mx-auto px-4 pb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="h-full">
                <div className="h-full bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CaseStudyCard {...project} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 pb-32 text-center">
          <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <p className="text-xl text-gray-500 font-medium mb-4">
              {t('empty_state.title', 'Keine Projekte gefunden')}
            </p>
            <p className="text-gray-400">
              {t(
                'empty_state.desc',
                'Versuchen Sie einen anderen Filter oder schauen Sie später wieder vorbei.'
              )}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Work;
