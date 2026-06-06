'use client';
import React, { useState } from 'react';
import { m } from 'motion/react';
import { ChartBar, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { EASING, STAGGER } from '@/shared/lib/motion';

import { useTranslations } from 'next-intl';

export const SEOTrafficGraph: React.FC = () => {
  const t = useTranslations('blog');
  const [view, setView] = useState<'standard' | 'coday'>('standard');

  const dataStandard = [10, 12, 11, 13, 14, 15, 14, 16, 17, 18, 19, 20];
  const dataCoday = [10, 15, 25, 40, 65, 85, 120, 145, 180, 220, 260, 310];

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 my-10 overflow-hidden relative">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <ChartBar className="text-green-600" />
        {t('seoTraffic.title')}
      </h3>

      <div className="flex gap-4 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setView('standard')}
          className={`active:scale-[0.97] px-4 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${view === 'standard' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('seoTraffic.standard')}
        </button>
        <button
          onClick={() => setView('coday')}
          className={`active:scale-[0.97] px-4 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${view === 'coday' ? 'bg-green-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {t('seoTraffic.coday')}
        </button>
      </div>

      <div className="h-64 flex items-end gap-2 md:gap-4 relative z-10 pl-10">
        {/* Y-Axis Labels & Grid */}
        <div className="absolute inset-0 left-0 flex flex-col-reverse justify-between pointer-events-none z-0 text-xs text-gray-400 font-mono">
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
            <div key={tick} className="relative w-full flex items-center">
              <span className="absolute -left-10 w-8 text-right">
                {Math.round(tick * (view === 'coday' ? 320 : 20))}k
              </span>
              <div className="w-full h-px bg-gray-100 border-dashed" />
            </div>
          ))}
        </div>

        {(view === 'coday' ? dataCoday : dataStandard).map((value, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end group relative h-full">
            <m.div
              initial={{ scaleY: 0 }}
              style={{ transformOrigin: 'bottom' }}
              animate={{ scaleY: (value / (view === 'coday' ? 320 : 22)) * 100 }}
              transition={{ ...EASING.spring, delay: index * STAGGER.default }}
              className={`w-full rounded-t-sm relative transition motion-reduce:duration-[0.01ms] duration-300 ${
                view === 'coday'
                  ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-t from-gray-400 to-gray-300 group-hover:from-gray-300 group-hover:to-gray-200'
              }`}
            >
              {/* Value Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] whitespace-nowrap shadow-xl z-20">
                {value}k
              </div>
            </m.div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 text-center mt-3 font-medium h-4">
              {months[index]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-green-50 rounded-xl p-4 border border-green-100 flex items-start gap-4">
        <div className="bg-green-100 p-2 rounded-full text-green-700">
          <ArrowUpRight size={24} />
        </div>
        <div>
          <h4 className="font-bold text-green-800 mb-1">
            {view === 'coday' ? t('seoTraffic.exponential') : t('seoTraffic.linear')}
          </h4>
          <p className="text-sm text-green-700">
            {view === 'coday' ? t('seoTraffic.descCoday') : t('seoTraffic.descStandard')}
          </p>
        </div>
      </div>
    </div>
  );
};
