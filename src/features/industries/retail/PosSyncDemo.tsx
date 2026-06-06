'use client';
import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/shared/ui/Icon';

const PosSyncDemo: React.FC = () => {
  const t = useTranslations('industries');
  const [stock, setStock] = useState(12);
  const [justSold, setJustSold] = useState(false);

  // Simulate sales every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (stock > 2) {
        setJustSold(true);
        setTimeout(() => {
          setStock((prev) => prev - 1);
          setJustSold(false);
        }, 1500); // Delay to show the "sold" state
      } else {
        setStock(12); // Reset
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [stock]);

  return (
    <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 border border-white/5 h-full flex flex-col">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 text-secondary mb-4">
          <Icon name="refresh-cw" className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-2">
          {t('ecommerce-retail.features.pos_sync.title')}
        </h3>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div
            className={`w-12 h-12 rounded-full bg-surface-dark border-2 ${justSold ? 'border-green-500 animate-pulse motion-reduce:animate-none' : 'border-gray-700'} flex items-center justify-center transition-colors motion-reduce:duration-[0.01ms] duration-300`}
          >
            <Icon
              name="arrow-right"
              aria-hidden="true"
              className={`${justSold ? 'text-green-500' : 'text-gray-500'} w-5 h-5`}
            />
          </div>
        </div>

        {/* Left: POS Terminal (Store) */}
        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-50">
            <Icon name="map-pin" className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-4 text-center">
            {t('ecommerce-retail.features.pos_sync.labels.store')}
          </div>

          <div className="bg-white rounded-lg p-3 h-32 flex flex-col items-center justify-center shadow-inner relative">
            <div className="text-slate-900 font-bold mb-2">Sneaker X</div>
            <AnimatePresence mode="wait">
              <m.div
                key={stock}
                initial={{ scale: 1.5, color: '#22c55e' }}
                animate={{ scale: 1, color: '#0f172a' }}
                className="text-3xl font-black"
              >
                {stock}
              </m.div>
            </AnimatePresence>
            <div className="text-[10px] text-slate-500 uppercase">
              {t('ecommerce-retail.features.pos_sync.labels.stock')}
            </div>

            {justSold && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-0 bg-green-500 text-white text-[10px] font-bold text-center py-1"
              >
                {t('ecommerce-retail.features.pos_sync.actions.sold')}
              </m.div>
            )}
          </div>

          {/* POS UI Mockup */}
          <div className="grid grid-cols-3 gap-1 mt-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-700 h-6 rounded"></div>
            ))}
          </div>
        </div>

        {/* Right: Online Store (Mobile) */}
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-50">
            <Icon name="globe" className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div className="text-xs text-primary/70 uppercase tracking-wider mb-4 text-center">
            {t('ecommerce-retail.features.pos_sync.labels.online')}
          </div>

          {/* Browser Mockup */}
          <div className="bg-white rounded-lg p-3 h-32 border border-gray-200 relative">
            <div className="w-full h-2 bg-gray-100 mb-2 rounded-full"></div>
            <div className="flex gap-2">
              <div className="w-1/3 bg-gray-200 rounded aspect-square"></div>
              <div className="w-2/3">
                <div className="w-3/4 h-2 bg-slate-800 rounded mb-1"></div>
                <div className="w-1/2 h-2 bg-slate-300 rounded mb-2"></div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-[10px] text-gray-400">
                    {t('ecommerce-retail.features.pos_sync.labels.stock')}:
                  </div>
                  <AnimatePresence mode="wait">
                    <m.div
                      key={stock} // Syncs with left side
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-bold text-primary"
                    >
                      {stock}
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* Sync Indicator */}
            {justSold && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center rounded-lg"
              >
                <div className="bg-black text-white text-[10px] px-2 py-1 rounded-full flex gap-1 items-center">
                  <Icon
                    name="refresh-cw"
                    className="w-3 h-3 animate-spin motion-reduce:animate-none"
                  />
                  {t('ecommerce-retail.features.pos_sync.actions.update')}
                </div>
              </m.div>
            )}
          </div>

          <button className="active:scale-[0.97] w-full bg-primary text-white text-xs font-bold py-2 rounded mt-3 opacity-50 cursor-not-allowed">
            {t('ecommerce-retail.features.pos_sync.actions.add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PosSyncDemo;
