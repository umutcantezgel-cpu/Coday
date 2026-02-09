import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OptimizedImage } from '../../shared/ui/OptimizedImage';
import { createPortal } from 'react-dom';
import { X } from '@phosphor-icons/react';
import { Icon } from '../../shared/ui/Icon';
import { academyData, Course } from '../../data/academy';

const Academy: React.FC = () => {
  const { t, i18n } = useTranslation('knowledge');
  const [selectedVideo, setSelectedVideo] = useState<Course | null>(null);
  const currentLang = i18n.language as 'de' | 'en';

  return (
    <div className="bg-background-light min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            {t('academy.title')}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">{t('academy.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyData.map((course) => (
            <div
              key={course.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(course)}
            >
              <div className="relative aspect-video rounded-xl bg-slate-900 mb-4 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <OptimizedImage
                  src={course.image}
                  alt={course.content[currentLang].alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/60 to-purple-900/40 opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-white/50">
                    <Icon name="play" className="text-white text-3xl" />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-2">
                <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-1">
                  {course.content[currentLang].tag}
                </span>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {course.content[currentLang].title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
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
    </div>
  );
};

export default Academy;
