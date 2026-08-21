'use client';

import React, { useEffect } from 'react';
import { Link as NavLink } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

import { useTranslations, useLocale } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  Wrench,
  House,
  Heartbeat,
  Warning,
  ArrowLeft,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { workData } from '@/shared/data/work';
import { SeoHead } from '@/shared/ui/SeoHead';
import { AnimatedCounter } from '@/shared/ui/AnimatedCounter';

import { m, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

const iconMap: Record<string, React.ElementType> = {
  handyman: Wrench,
  house: House,
  heartbeat: Heartbeat,
  warning: Warning,
};

const ProjectDetail: React.FC = () => {
  const t = useTranslations('work');
  const locale = useLocale();
  const params = useParams();
  const slug = params?.slug as string;

  const currentLang = locale as 'de' | 'en';
  const projectData = workData[slug || ''];
  const project = projectData ? projectData.content[currentLang] : null;

  const projectKeys = Object.keys(workData);
  const currentIndex = projectKeys.indexOf(slug || '');
  const prevSlug = currentIndex > 0 ? projectKeys[currentIndex - 1] : null;
  const nextSlug = currentIndex < projectKeys.length - 1 ? projectKeys[currentIndex + 1] : null;
  const prevProject = prevSlug ? workData[prevSlug] : null;
  const nextProject = nextSlug ? workData[nextSlug] : null;

  // Determine hero image: solution images first, then fallback
  const heroImage = project?.solution?.images?.[0] || null;

  const [activeLightboxImage, setActiveLightboxImage] = React.useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = React.useState<string>('');

  const openLightbox = (src: string, alt: string) => {
    setActiveLightboxImage(src);
    setLightboxAlt(alt);
  };

  const closeLightbox = () => {
    setActiveLightboxImage(null);
    setLightboxAlt('');
  };

  useEffect(() => {
    if (activeLightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeLightboxImage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !projectData) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background-light">
        <SeoHead title="Projekt nicht gefunden | Coday" noIndex />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('project_detail.not_found')}</h2>
          <NavLink href="/work" className="text-primary hover:underline">
            {t('project_detail.back_to_overview')}
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light">
      <SeoHead
        title={`${project.title} – ${project.subtitle} | Case Study | Coday`}
        description={`${project.title}: ${project.subtitle}. ${project.challenge.description}`}
        schemaData={{
          service: {
            name: `${project.title} - ${project.category}`,
            description: project.challenge.description,
            serviceType: project.category,
          },
        }}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO — Fullwidth with Project Image or Gradient */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative pt-4 pb-0 md:pt-6 overflow-hidden">
        {/* Breadcrumb (above hero) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <nav aria-label="Breadcrumb" className="flex items-center text-sm text-gray-500">
            <NavLink
              href="/work"
              className="hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              {t('project_detail.breadcrumb_projects')}
            </NavLink>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-primary font-medium" aria-current="page">
              {project.title}
            </span>
          </nav>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          {/* Title Block */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              {project.category}
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-gray-900 mb-4 leading-tight">
              Case Study: {project.title} &ndash; {project.category}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              {project.subtitle}
            </p>
          </m.div>

          {/* Hero Image / Gradient Fallback */}
          <m.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden aspect-video bg-surface-dark shadow-2xl group"
          >
            {heroImage ? (
              <OptimizedImage
                src={heroImage}
                alt={project.solution.imageAlts?.[0] || `${project.title} Hero`}
                className="absolute inset-0 w-full h-full object-cover transition-transform motion-reduce:duration-[0.01ms] duration-1000 group-hover:scale-105"
                priority={true}
                width={1920}
                height={1080}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-8 text-center">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="relative z-10 max-w-xl">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-bold mb-3 block">
                    {project.category}
                  </span>
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight block mb-2">
                    {project.title}
                  </span>
                </div>
              </div>
            )}

            {/* Gradient overlay on bottom for stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 sm:gap-4">
              {project.stats.map((stat, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-center"
                >
                  <div className="text-white/60 text-xs sm:text-sm font-medium uppercase mb-1 tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-white font-bold text-base sm:text-xl lg:text-2xl">
                    {stat.value}
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* ═══════════════════════════════ */}
      {/* CONTENT GRID — Sidebar + Main */}
      {/* ═══════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* ─────────────── Sidebar (Sticky) ─────────────── */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-aurora sticky top-24">
              <h2 className="font-display font-bold text-xl mb-6">
                {t('project_detail.sidebar.details')}
              </h2>
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

              {/* Related Services */}
              {project.relatedServices && project.relatedServices.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-display font-bold text-lg mb-4">
                    {t('project_detail.sidebar.related', { defaultValue: 'Verwandte Services' })}
                  </h3>
                  <ul className="space-y-2">
                    {project.relatedServices.map((service, idx) => (
                      <li key={idx}>
                        <NavLink
                          href={service.path}
                          className="text-primary hover:underline text-sm font-medium flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {service.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <p className="mb-4 text-gray-900 font-bold">
                    {t('project_detail.sidebar.interested_title')}
                  </p>
                  <NavLink
                    href="/contact"
                    className="block w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors motion-reduce:duration-[0.01ms]"
                  >
                    {t('project_detail.sidebar.request_project')}
                  </NavLink>
                </div>
              </div>

              {/* Verified Trust & Reviews Card */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="font-display font-bold text-xs text-gray-900 mb-3 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Verified Client Ratings' : 'Verifizierte Bewertungen'}
                </h3>
                <div className="space-y-2.5">
                  <a
                    href="https://maps.app.goo.gl/9SagecgXw7Vf5csH7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-500/50 hover:bg-blue-50/30 transition-all group"
                    title="Google Maps Rezensionen für Coday"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 transition-colors">
                        Google Maps (4 Rezensionen)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500 text-xs">★★★★★</span>
                      <span className="text-xs font-bold text-slate-800">5.0</span>
                    </div>
                  </a>
                  <a
                    href="https://www.provenexpert.com/de-de/coday-webagentur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all group"
                    title="ProvenExpert Profil von Coday"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                        ProvenExpert (4 Bewertungen)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500 text-xs">★★★★★</span>
                      <span className="text-xs font-bold text-slate-800">5.0</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────── Main Content ─────────────── */}
          <div className="lg:col-span-8 space-y-20">
            {/* ── Challenge ── */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none"
            >
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
                      <OptimizedIcon
                        icon={Warning}
                        className="mr-3 text-red-500 flex-shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {project.challenge.quote && (
                <blockquote className="border-l-4 border-primary pl-6 italic text-gray-800 text-xl font-medium">
                  &ldquo;{project.challenge.quote.text}&rdquo;
                  <footer className="text-base text-gray-500 mt-2 not-italic font-normal">
                    — {project.challenge.quote.author}
                  </footer>
                </blockquote>
              )}
            </m.div>

            {/* ── Approach ── */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
                {t('project_detail.approach')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {project.approach.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {project.approach.steps.map((step, i) => (
                  <m.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition motion-reduce:duration-[0.01ms] duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* ── Solution ── */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">
                {project.solution.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {project.solution.description}
              </p>
              {project.solution.images && project.solution.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.solution.images.map((img, i) => {
                    // Make every third image span full width to create layout variation
                    const isFullWidth = i % 3 === 2;
                    return (
                      <div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={
                          project.solution.imageAlts?.[i] ||
                          `${project.title} Solution ${i + 1} – Zum Vergrößern klicken`
                        }
                        className={`rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white group cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                          isFullWidth ? 'md:col-span-2' : ''
                        }`}
                        onClick={() =>
                          openLightbox(
                            img,
                            project.solution.imageAlts?.[i] || `${project.title} Solution ${i + 1}`
                          )
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLightbox(
                              img,
                              project.solution.imageAlts?.[i] ||
                                `${project.title} Solution ${i + 1}`
                            );
                          }
                        }}
                      >
                        {/* Browser Mockup Header */}
                        <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                          </div>
                          <div className="ml-2 w-full max-w-[200px] h-4 bg-white rounded-sm border border-gray-200/50"></div>
                        </div>
                        <div className="relative overflow-hidden">
                          <OptimizedImage
                            src={img}
                            alt={
                              project.solution.imageAlts?.[i] ||
                              `${project.title} Solution ${i + 1}`
                            }
                            className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform motion-reduce:duration-[0.01ms] duration-700"
                            width={1200}
                            height={800}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 group-focus-visible:bg-black/5 transition-colors motion-reduce:duration-[0.01ms] duration-300 flex items-center justify-center">
                            {/* Invisible overlay for click area */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 shadow-md overflow-hidden bg-white">
                  <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                    </div>
                    <div className="ml-2 w-full max-w-[200px] h-4 bg-white rounded-sm border border-slate-200/60"></div>
                  </div>
                  <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block relative z-10">
                      {project.category}
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight relative z-10">
                      {project.title}
                    </span>
                  </div>
                </div>
              )}
            </m.div>

            {/* ── Results (Dark Premium Card) ── */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                  ✦ {t('project_detail.impact')}
                </div>
                <h2 className="font-display font-bold text-3xl mb-4">
                  {t('project_detail.results')}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-10 text-lg max-w-2xl">
                  {project.results.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {project.results.metrics.map((metric, i) => (
                    <div key={i}>
                      <AnimatedCounter
                        value={metric.value}
                        valueClassName="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-2"
                      />
                      <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                        {metric.label}
                      </div>
                      <div className="text-emerald-400 text-sm font-bold bg-emerald-400/10 inline-block px-2 py-0.5 rounded">
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </m.div>
          </div>
        </div>

        {/* ── Inline CTA ── */}
        <div className="mt-20 pt-16 border-t border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <OptimizedIcon icon={Heartbeat} weight="duotone" className="text-3xl text-primary" />
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-4">
            {t('project_detail.cta_title', { defaultValue: 'Überzeugt von diesen Ergebnissen?' })}
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            {t('project_detail.cta_desc', {
              defaultValue:
                'Lassen Sie uns darüber sprechen, wie wir ähnliche Resultate für Ihr Projekt erzielen können.',
            })}
          </p>
          <NavLink
            href={`/contact?service=${project.category}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-primary hover:text-primary transition motion-reduce:duration-[0.01ms] duration-300"
          >
            {t('project_detail.cta_button', { defaultValue: 'Projekt anfragen' })}
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </NavLink>
        </div>
      </section>

      {/* ═══════════════════════════ */}
      {/* NEXT / PREVIOUS Navigation */}
      {/* ═══════════════════════════ */}
      <nav
        aria-label="Projekt-Navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {prevSlug && prevProject ? (
            <NavLink
              href={`/work/${prevSlug}`}
              className="flex items-center gap-4 group text-left w-full sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg"
            >
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 group-focus-visible:border-primary group-focus-visible:text-primary group-focus-visible:bg-primary/5 transition motion-reduce:duration-[0.01ms] duration-300">
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  {t('project_detail.nav.prev')}
                </div>
                <div className="font-display font-bold text-xl group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                  {prevProject.content[currentLang].title}
                </div>
              </div>
            </NavLink>
          ) : (
            <div />
          )}

          {nextSlug && nextProject ? (
            <NavLink
              href={`/work/${nextSlug}`}
              className="flex items-center gap-4 group text-right w-full sm:w-auto justify-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  {t('project_detail.nav.next')}
                </div>
                <div className="font-display font-bold text-xl group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                  {nextProject.content[currentLang].title}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 group-focus-visible:border-primary group-focus-visible:text-primary group-focus-visible:bg-primary/5 transition motion-reduce:duration-[0.01ms] duration-300">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </NavLink>
          ) : (
            <div />
          )}
        </div>
      </nav>

      {/* ═══════════════════════════ */}
      {/* Lightbox Overlay */}
      {/* ═══════════════════════════ */}
      <AnimatePresence>
        {activeLightboxImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxAlt || 'Bildvorschau'}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeLightbox();
            }}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeLightboxImage}
                alt={lightboxAlt || 'Lightbox Image'}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                priority={false}
              />
              <button
                onClick={closeLightbox}
                autoFocus
                className="active:scale-[0.97] absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-full p-2 transition motion-reduce:duration-[0.01ms] cursor-pointer z-50"
                aria-label="Bildvorschau schließen"
              >
                <X className="w-6 h-6" />
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
