'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Code, PaintBrush, TrendUp, Sparkle, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

type TrackKey = 'dev' | 'design' | 'growth';

interface LevelItem {
  title: string;
  desc: string;
}

const CareerPathBuilder: React.FC = () => {
  const t = useTranslations('careers.path');
  const [activeTrack, setActiveTrack] = useState<TrackKey>('dev');

  const tracks: { key: TrackKey; label: string; icon: React.ElementType }[] = [
    { key: 'dev', label: t('tracks.dev'), icon: Code },
    { key: 'design', label: t('tracks.design'), icon: PaintBrush },
    { key: 'growth', label: t('tracks.growth'), icon: TrendUp },
  ];

  const levels = (t.raw(`levels.${activeTrack}`) as LevelItem[]) || [];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
      {/* Header Inside Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
            {t('selector_title')}
          </span>
          <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">{t('title')}</h3>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-2" role="tablist">
        {tracks.map((track) => {
          const isActive = activeTrack === track.key;
          const Icon = track.icon;
          return (
            <button
              key={track.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTrack(track.key)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <OptimizedIcon
                icon={Icon}
                className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`}
              />
              <span>{track.label}</span>
            </button>
          );
        })}
      </div>

      {/* Levels Timeline Progression */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary/50 hover:bg-white transition-all shadow-xs flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  Stage 0{idx + 1}
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {idx === 0 ? 'Foundation' : idx === 1 ? 'Ownership' : 'Leadership'}
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">
                {level.title}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{level.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-primary text-xs font-bold">
              <span>{idx === 2 ? 'Mastery Level' : 'Promotion Track'}</span>
              <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5" weight="fill" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPathBuilder;
