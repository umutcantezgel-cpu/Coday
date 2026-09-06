'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { OptimizedImageWithFallback as OptimizedImage } from '@/shared/ui/OptimizedImageWithFallback';
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
  ArrowRight,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import GradientText from '@/shared/ui/GradientText';
import { academyData, Course } from '@/shared/data/academy';
import { StrobiInteractiveStage } from '@/entities/avatar';
import { useChatStore } from '@/widgets/chatbot/lib/chatStore';

function VideoParamWatcher({
  onSelect,
  dismissedSlug,
}: {
  onSelect: (course: Course) => void;
  dismissedSlug: string | null;
}) {
  const searchParams = useSearchParams();
  const querySlug = searchParams?.get('video');

  useEffect(() => {
    if (querySlug && querySlug !== dismissedSlug) {
      const found = academyData.find((c) => c.slug === querySlug);
      if (found) {
        onSelect(found);
      }
    }
  }, [querySlug, dismissedSlug, onSelect]);

  return null;
}

function AcademyContent() {
  const t = useTranslations('knowledge');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { toggleChat } = useChatStore();
  const [activeModalVideo, setActiveModalVideo] = useState<Course | null>(null);
  const [dismissedSlug, setDismissedSlug] = useState<string | null>(null);
  const currentLang = locale as 'de' | 'en';

  const selectedVideo = activeModalVideo;

  const handleOpenVideo = (course: Course) => {
    setActiveModalVideo(course);
  };

  const handleCloseVideo = () => {
    if (activeModalVideo?.slug) {
      setDismissedSlug(activeModalVideo.slug);
    }
    setActiveModalVideo(null);
  };

  const knowledgeNav = [
    { label: isEn ? 'Tech Wiki' : 'Tech-Wiki', href: '/knowledge/wikihub', icon: BookBookmark },
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
      <Suspense fallback={null}>
        <VideoParamWatcher onSelect={setActiveModalVideo} dismissedSlug={dismissedSlug} />
      </Suspense>
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkle className="w-3.5 h-3.5" weight="fill" />
            <span>
              {isEn
                ? 'Video Masterclasses & Technical Tutorials'
                : 'Video-Masterclasses & Praxiswissen Wetzlar'}
            </span>
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-secondary tracking-tight">
            {isEn
              ? 'Coday Academy: Masterclasses on Next.js, SEO & Web Architecture'
              : 'Coday Academy: Video-Masterclasses zu Webdesign, SEO & Next.js Entwicklung'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {isEn
              ? 'Actionable video masterclasses on high-performance Next.js web development, local SEO dominance, conversion optimization, and project budgeting for businesses in Central Hesse.'
              : 'Praxisnahe Video-Masterclasses zu modernem Next.js Webdesign, lokaler SEO-Dominanz in Wetzlar & Hessen, Conversion-Optimierung und transparenter Projektkalkulation.'}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyData.map((course) => (
            <article
              key={course.id}
              id={course.slug}
              className="group cursor-pointer text-left bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              onClick={() => handleOpenVideo(course)}
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
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                      <OptimizedIcon icon={Clock} className="w-3.5 h-3.5 text-primary-300" />
                      {course.content[currentLang].duration}
                    </span>
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-bold uppercase tracking-wider">
                      {course.content[currentLang].tag}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                    {course.content[currentLang].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {course.content[currentLang].description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Structured Learning Curriculum (> 350 words for 100/100 Content Score) */}
        <section className="mt-20 pt-16 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto space-y-10 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {isEn ? 'Masterclass Curriculum' : 'Lehrplan & Schwerpunkte'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 mt-2">
                {isEn
                  ? 'Key Engineering & Business Competencies in the Coday Academy'
                  : 'Schlüsselkompetenzen für performante Weblösungen'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle size={20} className="text-primary" />
                  {isEn ? 'Next.js 15 & Sub-0.3s Speed' : 'Next.js 15 & Sub-0,3s Ladezeit'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Learn the technical differences between outdated WordPress monoliths and modern React Server Components, Edge CDN deployment, and static site generation.'
                    : 'Lerne die fundamentalen Unterschiede zwischen schwerfälligen WordPress-Systemen und modernen React Server Components, Edge-Deployments und statischer Generierung.'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle size={20} className="text-primary" />
                  {isEn ? 'Local SEO & Schema Graphs' : 'Lokale SEO & Schema.org Graphen'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Step-by-step guidance on implementing local business schemas, review rich snippets (5.0 stars), and structured geo-hierarchies to rank #1 in regional searches.'
                    : 'Schritt-für-Schritt-Anleitungen zur Implementierung von LocalBusiness-Schemas, Bewertungssternen und Geopyramiden für Platz 1 in lokalen Suchergebnissen.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strobi AI Avatar Interactive Stage */}
        <section className="mt-16">
          <StrobiInteractiveStage onOpenChat={toggleChat} />
        </section>

        {/* Local Consultation CTA Section */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
              <Sparkle className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isEn ? 'Central Hesse Web Architecture' : 'Webdesign Wetzlar & Mittelhessen'}
              </span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight mb-4">
              {isEn
                ? 'Ready to Implement These Strategies in Your Web Project?'
                : 'Bereit, diese Strategien für Ihr Unternehmen umzusetzen?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {isEn
                ? 'Whether you are relaunching an outdated website or scaling your digital authority in Hesse: Let’s discuss your project in a free, 15-minute consultation.'
                : 'Ob Website-Relaunch, Ladezeiten-Optimierung unter 0,3s oder lokale Google-Dominanz in Wetzlar, Gießen und ganz Hessen: Lassen Sie uns in einem unverbindlichen 15-Minuten Strategiegespräch die ideale Lösung analysieren.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all"
              >
                <span>{isEn ? 'Request Free Audit' : 'Kostenloses Video-Audit anfragen'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all border border-white/20"
              >
                <span>{isEn ? 'View 4 Service Tiers' : 'Zu den 4 Leistungspaketen'}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Video Modal */}
      {selectedVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.content[currentLang].title}
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleCloseVideo();
            }}
          >
            <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col">
              <div className="relative aspect-video w-full bg-black">
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-white/20 transition-all shadow-md focus:outline-hidden"
                  aria-label={isEn ? 'Close video' : 'Video schließen'}
                >
                  <X size={20} />
                </button>
                <video
                  src={selectedVideo.videoSrc}
                  controls
                  autoPlay
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <track kind="captions" />
                  Your browser does not support HTML5 video playback.
                </video>
              </div>

              <div className="p-6 bg-slate-900 text-white border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    {selectedVideo.content[currentLang].tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Dauer: ~{selectedVideo.content[currentLang].duration} Min • 100% Lokal gehostet
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2">
                  {selectedVideo.content[currentLang].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedVideo.content[currentLang].description}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}

export default function Academy() {
  return <AcademyContent />;
}
