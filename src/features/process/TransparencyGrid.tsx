import React from 'react';

import { useTranslations } from 'next-intl';
import { Kanban, CheckCircle, Chat } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const TransparencyGrid: React.FC = () => {
  const t = useTranslations('process');
  return (
    <div className="bg-surface-elevated border border-primary/10 rounded-3xl p-8 lg:p-16 relative overflow-hidden shadow-sm">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-primary-900) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-900) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-secondary-900 mb-6">
          {t('transparency.title')}
        </h2>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">{t('transparency.desc')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        {/* Card 1: Kanban */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-200 transition-all motion-reduce:duration-[0.01ms] group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
              <OptimizedIcon icon={Kanban} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-secondary-900 text-lg">{t('transparency.kanban.title')}</h3>
              <p className="text-sm text-secondary-600">{t('transparency.kanban.desc')}</p>
            </div>
          </div>
          {/* Fake Kanban Items */}
          <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]" aria-hidden="true">
            <div className="w-1/3 h-24 bg-neutral-50 border border-neutral-100 rounded-lg p-2 space-y-2">
              <div className="w-full h-8 bg-neutral-200 rounded"></div>
              <div className="w-full h-8 bg-neutral-200 rounded"></div>
            </div>
            <div className="w-1/3 h-24 bg-neutral-50 border border-neutral-100 rounded-lg p-2 space-y-2">
              <div className="w-full h-16 bg-blue-50 rounded border border-blue-200"></div>
            </div>
            <div className="w-1/3 h-24 bg-neutral-50 border border-neutral-100 rounded-lg p-2 flex items-center justify-center">
              <OptimizedIcon icon={CheckCircle} className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Card 2: Slack */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-md hover:border-primary-200 transition-all motion-reduce:duration-[0.01ms] group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
              <OptimizedIcon icon={Chat} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-secondary-900 text-lg">{t('transparency.chat.title')}</h3>
              <p className="text-sm text-secondary-600">{t('transparency.chat.desc')}</p>
            </div>
          </div>
          {/* Fake Chat */}
          <div className="space-y-3 opacity-60 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]" aria-hidden="true">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex-shrink-0"></div>
              <div className="bg-neutral-100 rounded-lg rounded-tl-none p-2.5 text-xs text-secondary-800 font-medium border border-neutral-200/50">
                {t('transparency.chat.msg1')}
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="bg-green-50 rounded-lg rounded-tr-none p-2.5 text-xs text-green-800 font-medium border border-green-100">
                {t('transparency.chat.msg2')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyGrid;
