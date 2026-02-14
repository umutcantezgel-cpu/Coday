import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Wrench, House, Heartbeat, Warning } from '@phosphor-icons/react';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { workData } from '@/shared/data/work';
import { SeoHead } from '../../shared/ui/SeoHead';

const iconMap: Record<string, React.ElementType> = {
  handyman: Wrench,
  house: House,
  heartbeat: Heartbeat,
  warning: Warning,
};

const ProjectDetail: React.FC = () => {
  const { t, i18n } = useTranslation('work');
  const { slug } = useParams<{ slug: string }>();

  const currentLang = i18n.language as 'de' | 'en';
  const projectData = workData[slug || ''];
  const project = projectData ? projectData.content[currentLang] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <SeoHead title="Projekt nicht gefunden | Coday" noIndex />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('project_detail.not_found')}</h1>
          <NavLink to="/work" className="text-primary hover:underline">
            {t('project_detail.back_to_overview')}
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light pt-24 pb-16">
      <SeoHead title={`${project.title} | Coday`} description={project.subtitle} />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <NavLink to="/work" className="hover:text-primary transition-colors">
            {t('project_detail.breadcrumb_projects')}
          </NavLink>
          <span className="mx-2">/</span>
          <span className="text-primary font-medium">{project.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4">
            {project.category}
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-gray-900 mb-6">
            {project.title}
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">{project.subtitle}</p>
        </div>

        {/* Hero Visual */}
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-surface-dark shadow-2xl mb-12 group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
            <OptimizedIcon
              icon={iconMap[projectData.thumbnail] || Wrench}
              className="text-9xl text-white/10 group-hover:scale-110 transition-transform duration-1000"
            />
          </div>
          {/* Overlay Content */}
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
            {project.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center"
              >
                <div className="text-white/60 text-sm font-medium uppercase mb-1">{stat.label}</div>
                <div className="text-white font-bold text-xl sm:text-2xl">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar / Sticky */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-aurora sticky top-24">
              <h3 className="font-display font-bold text-xl mb-6">
                {t('project_detail.sidebar.details')}
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>{t('project_detail.sidebar.service')}</span>
                  <span className="font-bold text-gray-900 text-right">{project.category}</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span>{t('project_detail.sidebar.period')}</span>
                  <span className="font-bold text-gray-900 text-right">2025</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>{t('project_detail.sidebar.result')}</span>
                  <span className="font-bold text-primary text-right">High Impact</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="mb-4 text-gray-900 font-bold">
                    {t('project_detail.sidebar.interested_title')}
                  </p>
                  <NavLink
                    to="/contact"
                    className="block w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
                  >
                    {t('project_detail.sidebar.request_project')}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Challenge */}
            <div className="prose prose-lg max-w-none">
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
                {t('project_detail.challenge')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {project.challenge.title}: {project.challenge.description}
              </p>
              <div className="bg-red-50 p-8 rounded-2xl border-l-4 border-red-500 mb-8">
                <ul className="space-y-3 mb-0">
                  {project.challenge.list.map((item, i) => (
                    <li key={i} className="flex items-start text-red-900 font-medium">
                      <OptimizedIcon icon={Warning} className="mr-3 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {project.challenge.quote && (
                <blockquote className="border-l-4 border-primary pl-6 italic text-gray-800 text-xl font-medium">
                  "{project.challenge.quote.text}"
                  <footer className="text-base text-gray-500 mt-2 not-italic font-normal">
                    — {project.challenge.quote.author}
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Approach */}
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
                {t('project_detail.approach')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {project.approach.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {project.approach.steps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4">
                      {i + 1}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
                {project.solution.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {project.solution.description}
              </p>
              {project.solution.images && project.solution.images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {project.solution.images.map((img, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${project.title} Solution ${i + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-gray-900 to-black text-white p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-40 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl mb-6">
                  {t('project_detail.results')}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-10 text-lg">
                  {project.results.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {project.results.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-2">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                        {metric.label}
                      </div>
                      <div className="text-green-400 text-sm font-bold bg-green-400/10 inline-block px-2 py-0.5 rounded">
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
