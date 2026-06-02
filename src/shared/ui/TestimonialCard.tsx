'use client';
import React from 'react';
import { Star, Quotes } from '@phosphor-icons/react/dist/ssr';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

export interface TestimonialProps {
  quote: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  authorImageUrl?: string;
  companyLogoUrl?: string;
  rating?: number;
  className?: string;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  authorName,
  authorPosition,
  authorCompany,
  authorImageUrl,
  companyLogoUrl,
  rating = 5,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useIntersectionObserver({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ animationDelay: `${delay}ms` }}
      className={`relative flat-card overflow-hidden h-full flex flex-col p-8 motion-safe:hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent"
        aria-hidden="true"
      />
      {/* Grosse Anführungszeichen */}
      <div className="absolute top-6 right-8 text-surface-light opacity-50">
        <OptimizedIcon icon={Quotes} className="w-16 h-16" weight="fill" />
      </div>

      {/* Star Rating */}
      {rating > 0 && (
        <div className="flex gap-1 mb-6 text-yellow-600">
          {[...Array(5)].map((_, i) => (
            <OptimizedIcon
              key={i}
              icon={Star}
              weight={i < rating ? 'fill' : 'regular'}
              className="w-5 h-5"
            />
          ))}
        </div>
      )}

      {/* Zitat */}
      <blockquote className="text-lg italic text-slate-700 font-light mb-8 flex-grow relative z-10 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Autor Info */}
      <div className="flex items-center gap-4 mt-auto">
        {/* Autor Foto */}
        {authorImageUrl ? (
          <div className="flex-shrink-0 relative w-14 h-14 rounded-full overflow-hidden border-2 border-surface-light">
            <OptimizedImage
              src={authorImageUrl}
              alt={authorName}
              className="object-cover w-full h-full"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-surface flex items-center justify-center text-primary font-bold text-xl border-2 border-surface-light">
            {authorName.charAt(0)}
          </div>
        )}

        <div className="flex-grow">
          <div className="font-bold text-secondary text-base">{authorName}</div>
          {(authorPosition || authorCompany) && (
            <div className="text-sm text-slate-500 font-medium">
              {authorPosition}
              {authorPosition && authorCompany && <span className="mx-1">•</span>}
              {authorCompany && <span className="text-primary">{authorCompany}</span>}
            </div>
          )}
        </div>

        {/* Company Logo */}
        {companyLogoUrl && (
          <div className="flex-shrink-0 ml-4">
            <OptimizedImage
              src={companyLogoUrl}
              alt={authorCompany || 'Company'}
              width={60}
              height={30}
              className="object-contain max-h-8 opacity-70 grayscale hover:grayscale-0 transition motion-reduce:duration-[0.01ms] duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};
