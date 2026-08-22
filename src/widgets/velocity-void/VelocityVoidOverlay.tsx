'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { m, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react/dist/ssr';

// Lazy load the game engine so it doesn't affect main bundle size (FCP/LCP)
const VelocityVoidGame = dynamic(() => import('./VelocityVoidGame'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center text-slate-900 font-mono animate-pulse text-sm font-bold">
      INITIALISIERE VELOCITY VOID...
    </div>
  ),
});

interface Props {
  isActive: boolean;
  onClose: () => void;
}

export const VelocityVoidOverlay: React.FC<Props> = ({ isActive, onClose }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] bg-white/95 backdrop-blur-2xl flex flex-col pointer-events-auto w-[100dvw] h-[100dvh] overflow-hidden select-none touch-none overscroll-none"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[100000] bg-white/90 hover:bg-slate-100 text-slate-800 rounded-xl p-2.5 px-4 font-mono text-xs font-bold tracking-wider border border-slate-200 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            aria-label="Spiel beenden"
          >
            <X className="w-4 h-4 text-slate-600" />
            <span>BEENDEN</span>
          </button>
          <div className="flex-1 w-full h-full relative">
            <VelocityVoidGame />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default VelocityVoidOverlay;
