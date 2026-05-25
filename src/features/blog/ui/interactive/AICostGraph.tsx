"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendDown, User, Robot, CurrencyEur } from '@phosphor-icons/react/dist/ssr';
import { EASING, STAGGER } from '@/shared/lib/motion';

import { useTranslations } from 'next-intl';

export const AICostGraph: React.FC = () => {
  const t = useTranslations('blog');
  const [view, setView] = useState<'staff' | 'ai'>('staff');

  // Cost accumulation over 12 months (in k€)
  const dataStaff = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]; // Linear growth (Salaries)
  const dataAI = [15, 16, 17, 18, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5]; // High setup, low maintenance

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
        <CurrencyEur className="text-blue-600" />
        {t('aiCostGraph.title')}
      </h3>

      <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 p-2 rounded-xl w-fit border border-gray-100">
        <button
          onClick={() => setView('staff')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'staff' ? 'bg-white shadow text-gray-800 border-gray-200 border' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <User size={16} />
          {t('aiCostGraph.staff')}
        </button>
        <button
          onClick={() => setView('ai')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'ai' ? 'bg-indigo-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Robot size={16} />
          {t('aiCostGraph.ai')}
        </button>
      </div>

      <div className="h-64 flex items-end gap-2 md:gap-4 relative z-10 w-full">
        {/* Y-Axis Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full h-px bg-gray-400 border-dashed" />
          ))}
        </div>

        {(view === 'ai' ? dataAI : dataStaff).map((value, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end group relative items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(value / 70) * 100}%` }}
              transition={{ ...EASING.spring, delay: index * STAGGER.default }}
              className={`w-full max-w-[40px] rounded-t-lg relative ${view === 'ai' ? 'bg-gradient-to-t from-indigo-500 to-indigo-300' : 'bg-red-300'}`}
            >
              {/* Value Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {value}k €
              </div>
            </motion.div>
            <span className="text-[10px] md:text-xs text-gray-400 text-center mt-2 font-mono h-4">
              {months[index]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex items-start gap-4">
        <div className="bg-indigo-100 p-2 rounded-full text-indigo-700">
          <TrendDown size={24} />
        </div>
        <div>
          <h4 className="font-bold text-indigo-800 mb-1">
            {view === 'ai' ? t('aiCostGraph.scaleTitle') : t('aiCostGraph.trapTitle')}
          </h4>
          <p className="text-sm text-indigo-700">
            {view === 'ai' ? t('aiCostGraph.scaleDesc') : t('aiCostGraph.trapDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};
