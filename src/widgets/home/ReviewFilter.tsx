'use client';
import React, { useState } from 'react';

export type ReviewPlatformFilter = 'all' | 'google' | 'provenexpert';

export interface ReviewFilterLabels {
  all: string;
  google: string;
  provenexpert: string;
}

interface ReviewFilterProps {
  labels: ReviewFilterLabels;
  /** The server-rendered reviews grid. Cards hide themselves via CSS based on data-review-filter. */
  children: React.ReactNode;
}

/**
 * Tiny client island for the home testimonials: owns the platform filter state,
 * renders the three filter buttons and exposes the active filter as a
 * data-review-filter attribute on the wrapper around the server-rendered grid.
 */
export const ReviewFilter: React.FC<ReviewFilterProps> = ({ labels, children }) => {
  const [activeFilter, setActiveFilter] = useState<ReviewPlatformFilter>('all');

  return (
    <>
      <div className="mt-8 mb-12 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          aria-pressed={activeFilter === 'all'}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          {labels.all}
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('google')}
          aria-pressed={activeFilter === 'google'}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeFilter === 'google'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>{labels.google}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('provenexpert')}
          aria-pressed={activeFilter === 'provenexpert'}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeFilter === 'provenexpert'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{labels.provenexpert}</span>
        </button>
      </div>

      <div data-review-filter={activeFilter}>{children}</div>
    </>
  );
};
