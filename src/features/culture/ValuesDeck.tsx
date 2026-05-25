"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';

const ValuesDeck: React.FC = () => {
  const [index, setIndex] = useState(0);

  const t = useTranslations('careers');

  // We need to reconstruct the array because the translation file just has the string list for items,
  // but the component expects objects with title, desc, color.
  // However, I previously defined `culture.values.items` as a string array in `careers.json` for `Culture.tsx`.
  // But `ValuesDeck` has more content (title + desc + color).
  // I should probably update `careers.json` to have structured value objects, or mapped them here.
  // Let's assume I will update `careers.json` to match this structure in a subsequent step if needed,
  // OR best approach: Update `ValuesDeck` to use a new key `culture.values_deck` which I will match to existing `careers.json` if possible,
  // or better: I'll overwrite the `values` array in `careers.json` (which I just wrote as simple strings) with structured data.
  // ACTUALLY, `Culture.tsx` uses `culture.values.items` as a string array.
  // `ValuesDeck.tsx` uses a richer structure.
  // I should likely separate them or make `Culture.tsx` usage compatible.
  // Let's create `culture.deck` in JSON.

  const values = [
    {
      title: t('culture.values_deck.ownership.title'),
      desc: t('culture.values_deck.ownership.desc'),
      color: 'bg-blue-600',
    },
    {
      title: t('culture.values_deck.truth.title'),
      desc: t('culture.values_deck.truth.desc'),
      color: 'bg-purple-600',
    },
    {
      title: t('culture.values_deck.deep_work.title'),
      desc: t('culture.values_deck.deep_work.desc'),
      color: 'bg-emerald-600',
    },
    {
      title: t('culture.values_deck.speed.title'),
      desc: t('culture.values_deck.speed.desc'),
      color: 'bg-orange-600',
    },
  ];

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % values.length);
  };

  return (
    <div className="relative h-[400px] w-full max-w-md mx-auto perspective-1000">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-white/5 rounded-3xl blur-3xl transform scale-110"></div>
      </div>

      <div className="relative w-full h-full cursor-pointer" onClick={nextCard}>
        <AnimatePresence initial={false}>
          {values.map((val, idx) => {
            // Only render current and next couple of cards
            const diff = (idx - index + values.length) % values.length;
            if (diff > 2) return null;

            return (
              <motion.div
                key={val.title}
                initial={{ scale: 0.8, y: 50, opacity: 0 }}
                animate={{
                  scale: 1 - diff * 0.05,
                  y: diff * 20,
                  zIndex: 10 - diff,
                  opacity: 1 - diff * 0.2,
                }}
                exit={{ x: -300, opacity: 0, rotate: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`absolute inset-0 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-2xl border border-white/10 ${val.color}`}
                style={{ transformOrigin: 'bottom center' }}
              >
                <h3 className="font-display font-black text-3xl text-white mb-4 uppercase tracking-tighter">
                  {val.title}
                </h3>
                <p className="text-white/80 font-medium leading-relaxed">{val.desc}</p>

                <div className="absolute bottom-8 text-white/40 text-xs font-bold uppercase tracking-widest">
                  Tap for next
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ValuesDeck;
