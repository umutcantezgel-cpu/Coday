import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gear } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { useTranslation } from 'react-i18next';
import { SeoHead } from '@/shared/ui/SeoHead';

export function loader() {
  throw new Response('Not Found', { status: 404 });
}

export function ErrorBoundary() {
  const { t } = useTranslation('common');
  return (
    <>
      <SeoHead title="404 Seite nicht gefunden | Coday" noIndex />
      <div className="relative min-h-dvh w-full bg-background-light overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Blobs */}
        <div
          className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-teal-200 via-cyan-100 to-transparent rounded-full blur-[100px] opacity-60 animate-pulse"
          style={{ animationDuration: '10s' }}
        ></div>
        <div
          className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-indigo-200 via-purple-100 to-transparent rounded-full blur-[100px] opacity-60 animate-pulse"
          style={{ animationDuration: '15s' }}
        ></div>

        {/* Giant 404 Text Background with Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <span className="text-[30vw] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-600 opacity-5 select-none leading-none tracking-tighter transform scale-110 absolute">
            404
          </span>
          {/* Visual Metaphor: Broken Machine */}
          <div className="absolute opacity-20 contrast-125 saturate-0 mix-blend-overlay">
            <OptimizedImage
              src="/images/industries/waschmaschine.webp"
              alt="Reparatur"
              className="w-[80vw] max-w-4xl object-cover rounded-full blur-sm"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-2xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-slate-600 drop-shadow-sm">
            {t('404.title')}
          </h1>
          <p className="text-lg md:text-xl text-text-slate leading-relaxed max-w-lg mx-auto font-medium">
            {t('404.desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-ocean hover:bg-opacity-90 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
            >
              <OptimizedIcon
                icon={ArrowLeft}
                className="mr-2 transition-transform group-hover:-translate-x-1"
              />
              {t('404.home_button')}
            </Link>
            <Link
              to="/project-config"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border-2 border-slate-200 text-base font-bold rounded-xl text-slate-600 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-primary/30 hover:text-primary transition-all shadow-sm hover:shadow-md"
            >
              {t('404.config_button')}
              <OptimizedIcon icon={Gear} className="ml-2 opacity-50" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-sm font-medium text-slate-400">{t('404.help')}</span>
        </div>
      </div>
    </>
  );
}

export default function NotFound() {
  return <ErrorBoundary />;
}
