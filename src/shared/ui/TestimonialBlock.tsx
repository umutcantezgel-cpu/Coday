'use client';
import React from 'react';
import { Star, Quotes, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

export interface TestimonialBlockProps {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  authorImageUrl?: string;
  companyLogoUrl?: string;
  linkedInUrl?: string;
  rating?: number;
  className?: string;
  delay?: number;
  featured?: boolean;
  source?: 'Google' | 'ProvenExpert';
  sourceUrl?: string;
  badge?: string;
  relativeTime?: string;
  verified?: boolean;
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  quote,
  authorName,
  authorPosition,
  authorCompany,
  authorImageUrl,
  companyLogoUrl,
  linkedInUrl,
  rating = 5,
  className = '',
  delay = 0,
  featured = false,
  source = 'Google',
  sourceUrl,
  badge,
  relativeTime,
  verified = true,
}) => {
  const { ref, isVisible } = useIntersectionObserver({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ animationDelay: `${delay}ms` }}
      className={`relative bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-flat-md overflow-hidden h-full flex flex-col transition motion-reduce:duration-[0.01ms] duration-700 ease-out border border-slate-100 hover:border-slate-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${featured ? 'ring-2 ring-primary/20 shadow-xl' : ''} ${className}`}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${
          source === 'ProvenExpert'
            ? 'from-emerald-500 via-emerald-400 to-transparent'
            : 'from-blue-600 via-amber-500 to-transparent'
        }`}
        aria-hidden="true"
      />

      {/* Große Anführungszeichen */}
      <div className="absolute top-6 right-6 text-slate-100 pointer-events-none transition-transform motion-reduce:duration-[0.01ms] duration-500 hover:scale-110">
        <OptimizedIcon icon={Quotes} className="w-16 h-16 sm:w-20 sm:h-20" weight="fill" />
      </div>

      {/* Header with Star Rating & Platform Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        {rating > 0 && (
          <div
            className="flex items-center gap-1 text-amber-400"
            role="img"
            aria-label={`Bewertung: ${rating} von 5 Sternen`}
          >
            {[...Array(5)].map((_, i) => (
              <OptimizedIcon
                key={i}
                icon={Star}
                weight={i < rating ? 'fill' : 'regular'}
                className="w-5 h-5"
              />
            ))}
            <span className="ml-1.5 text-xs font-bold text-slate-700">5.0</span>
          </div>
        )}

        {/* Source Badge */}
        <div className="flex items-center gap-2">
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                source === 'ProvenExpert'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                  : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
              }`}
              title={`${source} Profil öffnen`}
            >
              {source === 'ProvenExpert' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>{source === 'ProvenExpert' ? 'ProvenExpert' : 'Google Maps'}</span>
              <span className="text-[10px] opacity-60">↗</span>
            </a>
          ) : (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                source === 'ProvenExpert'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}
            >
              {source === 'ProvenExpert' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
              <span>{source === 'ProvenExpert' ? 'ProvenExpert' : 'Google'}</span>
            </span>
          )}

          {badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Zitat */}
      <blockquote
        className={`italic text-slate-700 font-light mb-8 flex-grow relative z-10 leading-relaxed ${
          featured ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'
        }`}
      >
        <p>"{quote}"</p>
      </blockquote>

      {/* Autor Info Wrapper */}
      <div className="flex items-center justify-between gap-4 mt-auto pt-5 border-t border-slate-100 relative z-10">
        <div className="flex items-center gap-4">
          {/* Autor Foto oder Initial */}
          {authorImageUrl ? (
            <div className="flex-shrink-0 relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm">
              <OptimizedImage
                src={authorImageUrl}
                alt={authorName}
                width={56}
                height={56}
                className="object-cover w-full h-full"
                sizes="56px"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 text-primary flex items-center justify-center font-bold text-lg border-2 border-primary/20 shadow-sm">
              {authorName.charAt(0)}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-secondary text-base">{authorName}</span>
              {verified && (
                <span
                  className="inline-flex items-center text-emerald-600 text-xs font-semibold"
                  title="Verifizierte Bewertung"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-[#0A66C2] transition-colors"
                  aria-label={`${authorName} auf LinkedIn`}
                >
                  <OptimizedIcon icon={LinkedinLogo} className="w-4 h-4" weight="fill" />
                </a>
              )}
            </div>

            {(authorPosition || authorCompany) && (
              <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {authorPosition}
                {authorPosition && authorCompany && <span className="mx-1.5">•</span>}
                {authorCompany && (
                  <span className="text-primary font-semibold">{authorCompany}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {relativeTime && (
          <div className="text-right flex-shrink-0 hidden sm:block">
            <span className="text-xs font-medium text-slate-400">{relativeTime}</span>
          </div>
        )}

        {/* Company Logo */}
        {companyLogoUrl && (
          <div className="flex-shrink-0 ml-4 hidden sm:block">
            <OptimizedImage
              src={companyLogoUrl}
              alt={authorCompany || 'Company'}
              width={80}
              height={40}
              className="object-contain max-h-10 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};
