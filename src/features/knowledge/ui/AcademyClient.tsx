'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { createPortal } from 'react-dom';
import { X, Play } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { academyData, Course } from '@/shared/data/academy';

const Academy: React.FC = () => {
  const t = useTranslations('knowledge');
  const locale = useLocale();
  const [selectedVideo, setSelectedVideo] = useState<Course | null>(null);
  const currentLang = locale as 'de' | 'en';

  return (
    <main className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            {t('academy.title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t('academy.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyData.map((course) => (
            <button
              key={course.id}
              className="group cursor-pointer text-left"
              onClick={() => setSelectedVideo(course)}
              aria-label={`${course.content[currentLang].title} – ${course.content[currentLang].tag}`}
            >
              <div className="relative aspect-video rounded-xl bg-slate-900 mb-4 overflow-hidden shadow-lg group-hover:shadow-2xl transition motion-reduce:duration-[0.01ms] duration-300">
                <OptimizedImage
                  src={course.image}
                  alt={course.content[currentLang].alt}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition motion-reduce:duration-[0.01ms] duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-purple-900/40 opacity-60 group-hover:opacity-40 transition-opacity motion-reduce:duration-[0.01ms]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform motion-reduce:duration-[0.01ms] ring-1 ring-white/50">
                    <OptimizedIcon icon={Play} className="text-white text-3xl" weight="fill" />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-2">
                <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-1">
                  {course.content[currentLang].tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors motion-reduce:duration-[0.01ms] line-clamp-1">
                  {course.content[currentLang].title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300 motion-reduce:animate-none"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.content[currentLang].title}
            onKeyDown={(e) => { if (e.key === 'Escape') setSelectedVideo(null); }}
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <button
                onClick={() => setSelectedVideo(null)}
                className="active:scale-[0.97] absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors motion-reduce:duration-[0.01ms]"
                aria-label={t('academy.close_video')}
              >
                <X size={24} />
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
