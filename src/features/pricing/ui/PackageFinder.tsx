'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, CaretDown, Compass, Sparkle } from '@phosphor-icons/react/dist/ssr';
import { PACKAGE_IDS, type PackageId } from '@/shared/data/packages';
import { trackEvent } from '@/shared/lib/analytics/tracking';

type Goal = 'found' | 'grow' | 'scale' | 'network';
type Size = 's' | 'm' | 'l' | 'xl';

const GOAL_TIER: Record<Goal, number> = { found: 1, grow: 2, scale: 3, network: 4 };
const SIZE_TIER: Record<Size, number> = { s: 1, m: 2, l: 3, xl: 4 };
const GOALS: Goal[] = ['found', 'grow', 'scale', 'network'];
const SIZES: Size[] = ['s', 'm', 'l', 'xl'];

/** Deterministic recommendation: the larger of the two answers wins. */
export function recommendPackage(goal: Goal, size: Size): PackageId {
  const tier = Math.max(GOAL_TIER[goal], SIZE_TIER[size]);
  return PACKAGE_IDS[tier - 1];
}

interface PackageFinderProps {
  packageNames: Record<PackageId, string>;
  onSelect: (id: PackageId) => void;
}

export const PackageFinder: React.FC<PackageFinderProps> = ({ packageNames, onSelect }) => {
  const t = useTranslations('pricing');
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [size, setSize] = useState<Size | null>(null);

  const result = goal && size ? recommendPackage(goal, size) : null;

  const reset = () => {
    setGoal(null);
    setSize(null);
  };

  const optionClass = (active: boolean) =>
    `text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
      active
        ? 'bg-amber-700 border-amber-700 text-white shadow-md'
        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
    }`;

  return (
    <div className="max-w-3xl mx-auto mb-12" id="package-finder">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="package-finder-panel"
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white border border-amber-200 shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        <span className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/70 shrink-0">
            <Compass className="w-5 h-5" weight="bold" />
          </span>
          <span>
            <span className="block text-xs font-bold text-amber-800 uppercase tracking-wider">
              {t('finder.label')}
            </span>
            <span className="block font-display font-bold text-slate-900">{t('finder.title')}</span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-500 shrink-0">
          <span className="hidden sm:inline">
            {open ? t('finder.toggle_close') : t('finder.toggle_open')}
          </span>
          <CaretDown
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            weight="bold"
          />
        </span>
      </button>

      {open && (
        <div
          id="package-finder-panel"
          className="mt-3 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-md"
        >
          <p className="text-sm text-slate-600 mb-5">{t('finder.subtitle')}</p>

          <fieldset className="mb-5">
            <legend className="text-sm font-bold text-slate-900 mb-3">{t('finder.q_goal')}</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={goal === g}
                  onClick={() => setGoal(g)}
                  className={optionClass(goal === g)}
                >
                  {t(`finder.goals.${g}`)}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mb-5">
            <legend className="text-sm font-bold text-slate-900 mb-3">{t('finder.q_size')}</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={optionClass(size === s)}
                >
                  {t(`finder.sizes.${s}`)}
                </button>
              ))}
            </div>
          </fieldset>

          <div aria-live="polite">
            {result && (
              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkle className="w-5 h-5 text-amber-400 shrink-0" weight="fill" />
                  <div>
                    <span className="block text-xs text-slate-300">
                      {t('finder.result_prefix')}
                    </span>
                    <span className="block font-display font-bold text-lg">
                      {packageNames[result]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4"
                  >
                    {t('finder.reset')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('package_finder_result', { package_id: result });
                      onSelect(result);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    {t('finder.result_cta')}
                    <ArrowRight className="w-4 h-4" weight="bold" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
