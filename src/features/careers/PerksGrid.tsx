'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Globe,
  Laptop,
  RocketLaunch,
  Compass,
  Heart,
  ChartLineUp,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

interface PerkItem {
  title: string;
  desc: string;
}

const PerksGrid: React.FC = () => {
  const t = useTranslations('careers.perks');
  const items = (t.raw('items') as PerkItem[]) || [];

  const icons = [Globe, Laptop, RocketLaunch, Compass, Heart, ChartLineUp];
  const iconColors = [
    'bg-blue-50 text-blue-700 border-blue-200',
    'bg-teal-50 text-teal-700 border-teal-200',
    'bg-purple-50 text-purple-700 border-purple-200',
    'bg-amber-50 text-amber-700 border-amber-200',
    'bg-rose-50 text-rose-700 border-rose-200',
    'bg-emerald-50 text-emerald-700 border-emerald-200',
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((perk, idx) => {
        const Icon = icons[idx % icons.length];
        const iconStyle = iconColors[idx % iconColors.length];

        return (
          <div
            key={idx}
            className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between text-left group"
          >
            <div>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 ${iconStyle} group-hover:scale-110 transition-transform shadow-xs`}
              >
                <OptimizedIcon icon={Icon} className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-primary transition-colors">
                {perk.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{perk.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PerksGrid;
