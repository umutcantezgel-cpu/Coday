'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { createPortal } from 'react-dom';
import {
  X,
  Play,
  BookBookmark,
  EnvelopeSimple,
  VideoCamera,
  FilePdf,
  Question,
  Clock,
  Sparkle,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import { academyData, Course } from '@/shared/data/academy';

const Academy: React.FC = () => {
  const t = useTranslations('knowledge');
  const locale = useLocale();
  const isEn = locale === 'en';
  const [selectedVideo, setSelectedVideo] = useState<Course | null>(null);
  const currentLang = locale as 'de' | 'en';

  const knowledgeNav = [
    { label: isEn ? 'Tech Wiki' : 'Tech-Wiki', href: '/knowledge/wiki', icon: BookBookmark },
    {
      label: isEn ? 'Newsletter' : 'Newsletter',
      href: '/knowledge/newsletter',
      icon: EnvelopeSimple,
    },
    { label: isEn ? 'Academy' : 'Academy & Videos', href: '/knowledge/academy', icon: VideoCamera },
    { label: isEn ? 'Whitepapers' : 'Whitepapers', href: '/knowledge/whitepapers', icon: FilePdf },
    { label: isEn ? 'FAQ' : 'FAQ & Support', href: '/knowledge/faq', icon: Question },
  ];

  return (
    <main className="bg-background-light min-h-dvh pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs />
        </div>

        {/* Knowledge Subnavigation */}
        <nav aria-label="Knowledge Navigation" className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs gap-1 sm:gap-2 overflow-x-auto max-w-full">
            {knowledgeNav.map((tab) => {
              const isActive = tab.href === '/knowledge/academy';
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
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
            {isEn ? 'Video Masterclasses & Tutorials' : 'Video-Masterclasses & Tutorials'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-secondary tracking-tight">
            <span>{isEn ? 'Coday ' : 'Coday '}</span>
            <GradientText
              colors={['#147a7a', '#2563eb', '#147a7a']}
              animationSpeed={8}
              className="inline-block"
            >
              Academy
            </GradientText>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {t('academy.subtitle')}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyData.map((course) => (
            <button
              key={course.id}
              className="group cursor-pointer text-left bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              onClick={() => setSelectedVideo(course)}
              aria-label={`${course.content[currentLang].title} – ${course.content[currentLang].tag}`}
            >
              <div>
                <div className="relative aspect-video rounded-2xl bg-slate-900 mb-5 overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                  <OptimizedImage
                    src={course.image}
                    alt={course.content[currentLang].alt}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all ring-1 ring-white/50 shadow-lg">
                      <OptimizedIcon
                        icon={Play}
                        className="text-white text-2xl ml-0.5"
                        weight="fill"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold text-white">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs">
                      Masterclass
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
                    {course.content[currentLang].tag}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {course.content[currentLang].title}
                  </h2>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                <span>{isEn ? 'Watch session' : 'Video ansehen'}</span>
                <OptimizedIcon icon={Play} className="w-3.5 h-3.5" weight="fill" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.content[currentLang].title}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSelectedVideo(null);
            }}
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all shadow-md"
                aria-label={t('academy.close_video')}
              >
                <X size={20} />
              </button>
              <video
                src={selectedVideo.videoSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </main>
  );
};

export default Academy;
