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
}) => {
  const { ref, isVisible } = useIntersectionObserver({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ animationDelay: `${delay}ms` }}
      className={`relative bg-white rounded-2xl p-8 md:p-12 shadow-flat-md overflow-hidden h-full flex flex-col transition motion-reduce:duration-[0.01ms] duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${featured ? 'border-2 border-primary/20 shadow-xl' : ''} ${className}`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-primary/60 to-transparent"
        aria-hidden="true"
      />

      {/* Große Anführungszeichen */}
      <div className="absolute top-8 right-8 text-surface-light opacity-50 transition-transform motion-reduce:duration-[0.01ms] duration-500 hover:scale-110">
        <OptimizedIcon icon={Quotes} className="w-20 h-20" weight="fill" />
      </div>

      {/* Star Rating */}
      {rating > 0 && (
        <div
          className="flex gap-1 mb-8 text-yellow-500"
          role="img"
          aria-label={`Bewertung: ${rating} von 5 Sternen`}
        >
          {[...Array(5)].map((_, i) => (
            <OptimizedIcon
              key={i}
              icon={Star}
              weight={i < rating ? 'fill' : 'regular'}
              className="w-6 h-6"
            />
          ))}
        </div>
      )}

      {/* Zitat */}
      <blockquote
        className={`italic text-slate-700 font-light mb-10 flex-grow relative z-10 leading-relaxed ${featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}
      >
        <p>"{quote}"</p>
        <footer className="mt-4 not-italic text-sm text-slate-500">
          <cite className="not-italic font-bold text-secondary">{authorName}</cite>
          {authorCompany && <>, {authorCompany}</>}
        </footer>
      </blockquote>

      {/* Autor Info Wrapper */}
      <div className="flex items-center gap-5 mt-auto pt-6 border-t border-slate-100">
        {/* Autor Foto */}
        {authorImageUrl ? (
          <div className="flex-shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-surface-light shadow-sm">
            <OptimizedImage
              src={authorImageUrl}
              alt={authorName}
              width={80}
              height={80}
              className="object-cover w-full h-full transition-transform motion-reduce:duration-[0.01ms] duration-500 hover:scale-110"
              sizes="(max-width: 768px) 64px, 80px"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface flex items-center justify-center text-primary font-bold text-2xl border-4 border-surface-light shadow-sm">
            {authorName.charAt(0)}
          </div>
        )}

        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <div className="font-bold text-secondary text-lg">{authorName}</div>
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-[#0A66C2] transition-colors motion-reduce:duration-[0.01ms]"
                aria-label={`${authorName} auf LinkedIn`}
              >
                <OptimizedIcon icon={LinkedinLogo} className="w-5 h-5" weight="fill" />
              </a>
            )}
          </div>

          {(authorPosition || authorCompany) && (
            <div className="text-sm md:text-base text-slate-500 font-medium mt-1">
              {authorPosition}
              {authorPosition && authorCompany && <span className="mx-2">•</span>}
              {authorCompany && <span className="text-primary font-semibold">{authorCompany}</span>}
            </div>
          )}
        </div>

        {/* Company Logo */}
        {companyLogoUrl && (
          <div className="flex-shrink-0 ml-4 hidden sm:block">
            <OptimizedImage
              src={companyLogoUrl}
              alt={authorCompany || 'Company'}
              width={80}
              height={40}
              className="object-contain max-h-10 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition motion-reduce:duration-[0.01ms] duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};
