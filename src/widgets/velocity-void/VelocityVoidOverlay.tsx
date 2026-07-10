'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { m, AnimatePresence } from 'motion/react';

// Lazy load the game engine so it doesn't affect main bundle size (FCP/LCP)
const VelocityVoidGame = dynamic(() => import('./VelocityVoidGame'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center text-white font-mono animate-pulse">
      BOOTING VELOCITY VOID...
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
          initial={{ opacity: 0, filter: 'brightness(2)' }}
          animate={{ opacity: 1, filter: 'brightness(1)' }}
          exit={{ opacity: 0, filter: 'brightness(0)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex flex-col pointer-events-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[100000] bg-white/5 hover:bg-white/15 text-white rounded-lg p-2 px-6 font-mono text-xs tracking-widest border border-white/20 transition-all shadow-lg hover:shadow-white/10"
          >
            [ ABORT MISSION ]
          </button>
          <div className="flex-1 w-full h-full relative">
            <VelocityVoidGame />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
