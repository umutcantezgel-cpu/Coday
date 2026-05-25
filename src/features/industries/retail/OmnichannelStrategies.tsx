"use client";
import React, { useState } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Storefront, Devices } from '@phosphor-icons/react/dist/ssr';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

const OmnichannelStrategies: React.FC = () => {
  const t = useTranslations('industries');
  // Visualizing the connection between Online and Offline world
  const [activeStrategy, setActiveStrategy] = useState<string>('click-collect');

  const strategies: Record<string, { title: string; desc: string; icon: string }> = {
    'click-collect': {
      title: t('ecommerce-retail.features.omnichannel.strategies.click-collect.title'),
      desc: t('ecommerce-retail.features.omnichannel.strategies.click-collect.desc'),
      icon: 'shopping_bag',
    },
    'ship-from-store': {
      title: t('ecommerce-retail.features.omnichannel.strategies.ship-from-store.title'),
      desc: t('ecommerce-retail.features.omnichannel.strategies.ship-from-store.desc'),
      icon: 'local_shipping',
    },
    'endless-aisle': {
      title: t('ecommerce-retail.features.omnichannel.strategies.endless-aisle.title'),
      desc: t('ecommerce-retail.features.omnichannel.strategies.endless-aisle.desc'),
      icon: 'tablet_mac',
    },
  };

  return (
    <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 lg:p-12">
      <h3 className="font-display font-bold text-2xl text-secondary mb-8 text-center">
        {t('ecommerce-retail.features.omnichannel.title')}
      </h3>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.entries(strategies).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveStrategy(key)}
            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${activeStrategy === key ? 'bg-primary border-primary text-white scale-105 shadow-md' : 'bg-white border-gray-200 text-slate-500 hover:bg-gray-50 hover:text-secondary'}`}
          >
            {data.title}
          </button>
        ))}
      </div>

      <div className="relative h-[300px] flex items-center justify-center">
        {/* Background Connection Lines */}
        <div className="absolute inset-x-20 h-1 bg-gradient-to-r from-blue-500/20 via-gray-200 to-purple-500/20 top-1/2 -translate-y-1/2"></div>

        <div className="flex justify-between w-full max-w-lg relative z-10">
          {/* Store Node */}
          <div className="w-24 h-24 bg-white rounded-2xl border border-blue-100 shadow-lg flex flex-col items-center justify-center">
            <OptimizedIcon icon={Storefront} className="text-4xl text-blue-600 mb-1" />
            <span className="text-[10px] text-blue-900 uppercase font-bold">
              {t('ecommerce-retail.features.omnichannel.nodes.store')}
            </span>
          </div>

          {/* Animation Container */}
          <div className="flex-1 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStrategy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-xl text-xs text-slate-600 text-center w-48 z-20"
              >
                {strategies[activeStrategy]?.desc}
              </motion.div>
            </AnimatePresence>

            {/* Moving Particle */}
            <motion.div
              key={activeStrategy + '-particle'}
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 bg-primary rounded-full shadow-lg absolute top-1/2 -translate-y-1/2 z-0"
            />
          </div>

          {/* Online Node */}
          <div className="w-24 h-24 bg-white rounded-2xl border border-purple-100 shadow-lg flex flex-col items-center justify-center">
            <OptimizedIcon icon={Devices} className="text-4xl text-purple-600 mb-1" />
            <span className="text-[10px] text-purple-900 uppercase font-bold">
              {t('ecommerce-retail.features.omnichannel.nodes.online')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmnichannelStrategies;
