'use client';
import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

const ValuesDeck: React.FC = () => {
  const [index, setIndex] = useState(0);
  const t = useTranslations('careers');

  const values = [
    {
      id: 'ownership',
      title: t('culture.values_deck.ownership.title'),
      desc: t('culture.values_deck.ownership.desc'),
      badge: '01 / Eigentum',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      gradient: 'from-blue-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/40',
    },
    {
      id: 'truth',
      title: t('culture.values_deck.truth.title'),
      desc: t('culture.values_deck.truth.desc'),
      badge: '02 / Klarheit',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      gradient: 'from-purple-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-purple-500/40',
    },
    {
      id: 'deep_work',
      title: t('culture.values_deck.deep_work.title'),
      desc: t('culture.values_deck.deep_work.desc'),
      badge: '03 / Fokus',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      gradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40',
    },
    {
      id: 'speed',
      title: t('culture.values_deck.speed.title'),
      desc: t('culture.values_deck.speed.desc'),
      badge: '04 / Tempo',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      gradient: 'from-amber-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40',
    },
  ];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % values.length);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + values.length) % values.length);
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto flex flex-col items-center"
      role="region"
      aria-roledescription="Karussell"
      aria-label="Agentur-Werte von Coday"
    >
      <div className="relative h-[420px] w-full perspective-1000">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full bg-primary-600/10 rounded-3xl blur-3xl transform scale-110" />
        </div>

        <div
          className="relative w-full h-full cursor-pointer select-none"
          onClick={nextCard}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              nextCard();
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              nextCard();
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              prevCard();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Werte-Karte: ${values[index].title}. Klicken oder Leertaste für nächste Karte.`}
        >
          <AnimatePresence initial={false}>
            {values.map((val, idx) => {
              const diff = (idx - index + values.length) % values.length;
              if (diff > 2) return null;

              return (
                <m.div
                  key={val.id}
                  initial={{ scale: 0.8, y: 50, opacity: 0 }}
                  animate={{
                    scale: 1 - diff * 0.05,
                    y: diff * 18,
                    zIndex: 10 - diff,
                    opacity: 1 - diff * 0.25,
                  }}
                  exit={{ x: -320, opacity: 0, rotate: -15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className={`absolute inset-0 rounded-3xl p-8 flex flex-col justify-between text-left shadow-2xl border ${val.borderColor} bg-gradient-to-b ${val.gradient} backdrop-blur-xl`}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${val.badgeColor}`}
                      >
                        {val.badge}
                      </span>
                      <span className="text-slate-400 text-xs font-semibold">
                        {idx + 1} / {values.length}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4 tracking-tight leading-tight">
                      {val.title}
                    </h3>
                    <p className="text-slate-200 font-normal leading-relaxed text-sm sm:text-base">
                      {val.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-slate-400 text-xs">
                    <span className="font-medium">Tippen für nächste Karte</span>
                    <span className="font-mono text-[11px] text-slate-300">Space / Click ↵</span>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Accessible Navigation Controls */}
      <div className="flex items-center justify-between w-full mt-6 px-2">
        <div className="flex items-center gap-2">
          {values.map((val, idx) => (
            <button
              key={val.id}
              onClick={() => setIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === idx ? 'w-8 bg-primary-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Gehe zu Karte ${idx + 1}: ${val.title}`}
              aria-current={index === idx ? 'true' : 'false'}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevCard}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none transition-colors"
            aria-label="Vorherige Werte-Karte"
          >
            <OptimizedIcon icon={CaretLeft} className="w-4 h-4" />
          </button>
          <button
            onClick={nextCard}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none transition-colors"
            aria-label="Nächste Werte-Karte"
          >
            <OptimizedIcon icon={CaretRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValuesDeck;
