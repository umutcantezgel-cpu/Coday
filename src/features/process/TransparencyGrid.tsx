import React from 'react';

import { useTranslation } from 'react-i18next';
import { Kanban, CheckCircle, Chat } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const TransparencyGrid: React.FC = () => {
  const { t } = useTranslation('process');
  return (
    <div className="bg-surface-dark rounded-3xl p-8 lg:p-16 relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white mb-6">
          {t('transparency.title')}
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('transparency.desc')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        {/* Card 1: Kanban */}
        <div className="bg-gray-800/50 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-gray-800 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <OptimizedIcon icon={Kanban} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">{t('transparency.kanban.title')}</h4>
              <p className="text-sm text-gray-400">{t('transparency.kanban.desc')}</p>
            </div>
          </div>
          {/* Fake Kanban Items */}
          <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="w-1/3 h-24 bg-white/5 rounded-lg p-2 space-y-2">
              <div className="w-full h-8 bg-white/10 rounded"></div>
              <div className="w-full h-8 bg-white/10 rounded"></div>
            </div>
            <div className="w-1/3 h-24 bg-white/5 rounded-lg p-2 space-y-2">
              <div className="w-full h-16 bg-blue-500/20 rounded border border-blue-500/30"></div>
            </div>
            <div className="w-1/3 h-24 bg-white/5 rounded-lg p-2 flex items-center justify-center">
              <OptimizedIcon icon={CheckCircle} className="text-green-500" />
            </div>
          </div>
        </div>

        {/* Card 2: Slack */}
        <div className="bg-gray-800/50 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-gray-800 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
              <OptimizedIcon icon={Chat} />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">{t('transparency.chat.title')}</h4>
              <p className="text-sm text-gray-400">{t('transparency.chat.desc')}</p>
            </div>
          </div>
          {/* Fake Chat */}
          <div className="space-y-3 opacity-50 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-primary"></div>
              <div className="bg-white/10 rounded-lg rounded-tl-none p-2 text-xs text-gray-300">
                {t('transparency.chat.msg1')}
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-green-500"></div>
              <div className="bg-green-500/20 rounded-lg rounded-tr-none p-2 text-xs text-green-200">
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
