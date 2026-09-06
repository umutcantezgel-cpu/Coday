'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

interface PackageStickyBarProps {
  packageName: string;
  addonCount: number;
  /** Element after which the bar appears (the package cards). */
  startAfterId: string;
  /** Element while which the bar is hidden (the summary banner with the real CTA). */
  hideWhileVisibleId: string;
  onRequest: () => void;
}

/**
 * Mobile-only sticky bar that keeps the selected package and the inquiry CTA
 * reachable while the visitor scrolls through extras and the comparison table.
 */
export const PackageStickyBar: React.FC<PackageStickyBarProps> = ({
  packageName,
  addonCount,
  startAfterId,
  hideWhileVisibleId,
  onRequest,
}) => {
  const t = useTranslations('pricing');
  const [pastStart, setPastStart] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);

  useEffect(() => {
    const start = document.getElementById(startAfterId);
    const summary = document.getElementById(hideWhileVisibleId);
    if (!start || typeof IntersectionObserver === 'undefined') return;

    const startObserver = new IntersectionObserver(
      ([entry]) => setPastStart(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    startObserver.observe(start);

    let summaryObserver: IntersectionObserver | null = null;
    if (summary) {
      summaryObserver = new IntersectionObserver(
        ([entry]) => setSummaryVisible(entry.isIntersecting),
        {
          threshold: 0.2,
        }
      );
      summaryObserver.observe(summary);
    }

    return () => {
      startObserver.disconnect();
      summaryObserver?.disconnect();
    };
  }, [startAfterId, hideWhileVisibleId]);

  const visible = pastStart && !summaryVisible;

  const addonsLabel =
    addonCount === 0
      ? t('summary.addons_none')
      : addonCount === 1
        ? t('summary.addons_one')
        : t('summary.addons_many', { count: addonCount });

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-40 p-3 lg:hidden transition-transform duration-300 motion-reduce:transition-none ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            {t('sticky.label')}
          </span>
          <span className="block text-sm font-bold text-slate-900 truncate">
            {packageName} <span className="font-normal text-slate-500">· {addonsLabel}</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onRequest}
          tabIndex={visible ? 0 : -1}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-amber-700 text-white text-sm font-bold hover:bg-amber-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {t('sticky.cta')}
          <ArrowRight className="w-4 h-4" weight="bold" />
        </button>
      </div>
    </div>
  );
};
