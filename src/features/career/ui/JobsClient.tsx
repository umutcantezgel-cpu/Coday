'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import {
  Sparkle,
  Briefcase,
  Users,
  Heart,
  EnvelopeSimple,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
} from '@phosphor-icons/react/dist/ssr';

interface JobItem {
  id: string;
  type: string;
  location: string;
  title: string;
  desc: string;
  mailtoSubject: string;
  tags?: string[];
}

const Jobs: React.FC = () => {
  const t = useTranslations('careers');
  const locale = useLocale();
  const isEn = locale === 'en';

  const careerNav = [
    { label: isEn ? 'Overview' : 'Übersicht', href: '/career', icon: Sparkle },
    { label: isEn ? 'Open Jobs' : 'Offene Stellen', href: '/career/jobs', icon: Briefcase },
    { label: isEn ? 'Culture & Values' : 'Kultur & Werte', href: '/career/culture', icon: Users },
    { label: isEn ? 'Perks & Benefits' : 'Benefits', href: '/career/benefits', icon: Heart },
  ];

  const jobsList: JobItem[] = [
    {
      id: '1',
      type: t('jobs.details.fulltime'),
      location: 'Wetzlar / Remote (DE)',
      title: isEn
        ? 'Senior Frontend Engineer (Next.js 15 & React 19)'
        : 'Senior Frontend Engineer (Next.js 15 & React 19)',
      desc: isEn
        ? 'Lead the development of cutting-edge headless web platforms with Next.js App Router, strict TypeScript, Tailwind CSS 4, and sub-second performance.'
        : 'Verantworte die Entwicklung modernster Headless-Webplattformen mit Next.js App Router, striktem TypeScript, Tailwind CSS 4 und Sub-Sekunden Ladezeiten.',
      mailtoSubject: isEn
        ? 'Application: Senior Frontend Engineer'
        : 'Bewerbung als Senior Frontend Engineer',
      tags: ['Next.js 15', 'React 19', 'TypeScript', 'TailwindCSS 4', 'Sanity CMS'],
    },
    {
      id: '2',
      type: t('jobs.details.fulltime'),
      location: 'Remote (DE) / Hybrid',
      title: isEn ? 'UI/UX & Design Systems Specialist' : 'UI/UX & Design Systems Specialist',
      desc: isEn
        ? 'Architect conversion-focused, accessible user interfaces and high-end design systems in Figma and code for Mittelstand & B2B brands.'
        : 'Konzipiere konversionsstarke, barrierefreie User Interfaces und High-End Design Systems in Figma & Code für Mittelstand und B2B-Kunden.',
      mailtoSubject: isEn
        ? 'Application: UI/UX & Design Systems Specialist'
        : 'Bewerbung als UI/UX & Design Systems Specialist',
      tags: ['Figma Pro', 'Design Tokens', 'Design Systems', 'Micro-Interactions'],
    },
    {
      id: '3',
      type: t('jobs.details.parttime'),
      location: 'Remote (DE)',
      title: isEn
        ? 'Technical SEO & Performance Growth Manager'
        : 'Technical SEO & Performance Growth Manager',
      desc: isEn
        ? 'Drive organic Google search dominance with Schema.org graph architectures, Core Web Vitals optimization, and data-driven inbound funnels.'
        : 'Etabliere organische Google-Spitzenplatzierungen durch strukturierte Schema.org Graphen, Core Web Vitals Optimierung und Inbound-Funnels.',
      mailtoSubject: isEn
        ? 'Application: Technical SEO Growth Manager'
        : 'Bewerbung als Technical SEO Growth Manager',
      tags: ['Technical SEO', 'Schema.org', 'Core Web Vitals', 'Geo-Targeting'],
    },
  ];

  const createMailtoLink = (jobTitle: string) => {
    const subject = isEn ? `Application: ${jobTitle}` : `Bewerbung: ${jobTitle}`;
    const body = isEn
      ? `Hello Umutcan & Coday Team,%0D%0A%0D%0AI would like to apply for the position: ${jobTitle}.%0D%0A%0D%0AAttached:%0D%0A- Resume / CV%0D%0A- Portfolio / GitHub link: [Insert URL]%0D%0A%0D%0ABest regards`
      : `Hallo Umutcan & Coday-Team,%0D%0A%0D%0Aich bewerbe mich für die Position: ${jobTitle}.%0D%0A%0D%0AMeine Unterlagen:%0D%0A- Lebenslauf (im Anhang)%0D%0A- Portfolio / GitHub-Link: [Link einfügen]%0D%0A%0D%0AMit freundlichen Grüßen`;

    return `mailto:umut@codayweb.de?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const createSpeculativeMailto = () => {
    const subject = isEn ? 'Speculative Application @ Coday' : 'Initiativbewerbung bei Coday';
    const body = isEn
      ? `Hello Umutcan & Coday Team,%0D%0A%0D%0AI would like to submit a speculative application.%0D%0A%0D%0AMy Core Focus & Skills:%0D%0A- [Your specialization]%0D%0A- Portfolio / GitHub: [Insert URL]%0D%0A%0D%0ABest regards`
      : `Hallo Umutcan & Coday-Team,%0D%0A%0D%0Aich bewerbe mich initiativ bei euch.%0D%0A%0D%0AMeine Schwerpunkte:%0D%0A- [Deine Spezialisierung]%0D%0A- Portfolio / GitHub: [Link einfügen]%0D%0A%0D%0AMit freundlichen Grüßen`;

    return `mailto:umut@codayweb.de?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Career Subnavigation */}
        <nav aria-label="Career Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2">
            {careerNav.map((tab) => {
              const isActive = tab.href === '/career/jobs';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <OptimizedIcon
                    icon={Icon}
                    className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header Section */}
        <div className="text-left space-y-4 mb-12">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            {t('jobs.culture_badge')}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Open ' : 'Offene '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              {isEn ? 'Positions & Careers' : 'Positionen & Jobs'}
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'Explore our open positions and career opportunities at Coday Web Agency. Direct founder mentorship, M4 Max hardware, and 100% remote freedom for senior engineers and growth specialists.'
              : 'Entdecke offene Positionen & Jobs bei der Coday Webagentur in Wetzlar & Remote. Direkte Zusammenarbeit mit dem Gründer, M4 Max Hardware und 100% Remote-Freiheit für Senior Entwickler und SEO-Experten.'}
          </p>
        </div>

        {/* Job Cards List */}
        <div className="space-y-6 max-w-5xl mx-auto mb-16">
          {jobsList.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                    {job.type}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1 font-medium">
                    <OptimizedIcon icon={MapPin} className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-snug">
                  {job.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
                  {job.desc}
                </p>

                {job.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-slate-50 text-slate-600 px-3 py-1 rounded-lg border border-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <OptimizedIcon icon={CheckCircle} className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isEn
                      ? 'Direct Founder Contact · Fast 48h Response'
                      : 'Direkter Gründerkontakt · Feedback binnen 48h'}
                  </span>
                </div>

                <a
                  href={createMailtoLink(job.title)}
                  aria-label={`${t('jobs.button')}: ${job.title}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <OptimizedIcon icon={EnvelopeSimple} className="w-4 h-4" />
                  <span>{t('jobs.button')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Speculative Application Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-5xl mx-auto shadow-md space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block">
            {isEn ? 'Open Role Inquiry' : 'Initiativbewerbung'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            {t('jobs.no_jobs.title')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t('jobs.no_jobs.desc')}
          </p>
          <div className="pt-2">
            <a
              href={createSpeculativeMailto()}
              className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-md inline-flex items-center gap-2 transition-all"
            >
              <OptimizedIcon icon={EnvelopeSimple} className="w-4 h-4" />
              <span>{t('jobs.no_jobs.button')}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jobs;
