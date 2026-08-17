'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  UserCheck,
  Lightning,
  ChartLineUp,
  ShareNetwork,
  Sparkle,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';

interface Pillar {
  title: string;
  desc: string;
  highlight: string;
}

const TeamGallery: React.FC = () => {
  const t = useTranslations('careers');

  const pillars = (t.raw('culture.craft.pillars') as Pillar[]) || [];
  const icons = [UserCheck, Lightning, ChartLineUp, ShareNetwork];
  const borderColors = [
    'hover:border-blue-500/50',
    'hover:border-purple-500/50',
    'hover:border-emerald-500/50',
    'hover:border-amber-500/50',
  ];
  const badgeStyles = [
    'bg-blue-50 text-blue-800 border-blue-200',
    'bg-purple-50 text-purple-800 border-purple-200',
    'bg-emerald-50 text-emerald-800 border-emerald-200',
    'bg-amber-50 text-amber-800 border-amber-200',
  ];
  const iconStyles = [
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
  ];

  return (
    <div className="space-y-12">
      {/* Founder Spotlight Card */}
      <div className="rounded-3xl p-8 sm:p-10 bg-slate-900 border border-slate-800 text-white shadow-2xl relative overflow-hidden text-left">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <OptimizedIcon icon={Sparkle} className="w-3.5 h-3.5" />
                {t('culture.craft.founder_badge')}
              </span>
              <span className="text-slate-400 text-xs font-medium">Standort Wetzlar / Hessen</span>
            </div>

            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              {t('culture.craft.founder_title')}
            </h3>
            <p className="text-primary-300 font-medium text-sm sm:text-base">
              {t('culture.craft.founder_role')}
            </p>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed pt-2">
              {t('culture.craft.founder_bio')}
            </p>

            <div className="flex flex-wrap gap-4 pt-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <OptimizedIcon
                  icon={CheckCircle}
                  className="text-emerald-400 w-4 h-4 flex-shrink-0"
                />
                Direkte Kommunikation ohne Zwischenhändler
              </span>
              <span className="flex items-center gap-2">
                <OptimizedIcon
                  icon={CheckCircle}
                  className="text-emerald-400 w-4 h-4 flex-shrink-0"
                />
                Full-Stack Next.js 15 & React 19 Expertise
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-600 to-amber-500 flex items-center justify-center text-white font-display font-bold text-3xl mb-4 shadow-lg">
              UT
            </div>
            <p className="text-white font-bold text-base">Umutcan Emre Tezgel</p>
            <p className="text-slate-400 text-xs mt-1">Gründer & Inhaber</p>
            <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-around text-xs text-slate-300">
              <div>
                <span className="block font-bold text-white text-base">100%</span>
                <span>Chefbetreuung</span>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <span className="block font-bold text-white text-base">0%</span>
                <span>Agentur-Fluff</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div>
        <div className="text-left mb-8">
          <span className="inline-block text-primary-700 font-bold uppercase tracking-wider text-xs mb-2 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
            {t('culture.craft.badge')}
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {t('culture.craft.title')}
          </h3>
          <p className="text-slate-600 text-base mt-2 max-w-2xl">{t('culture.craft.desc')}</p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-6" role="list">
          {pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            const borderCls = borderColors[idx % borderColors.length];
            const badgeCls = badgeStyles[idx % badgeStyles.length];
            const iconCls = iconStyles[idx % iconStyles.length];

            return (
              <li
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md ${borderCls} flex flex-col justify-between text-left`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconCls}`}
                    >
                      <OptimizedIcon icon={Icon} className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeCls}`}
                    >
                      {pillar.highlight}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-slate-900 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TeamGallery;
