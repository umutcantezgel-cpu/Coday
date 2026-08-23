'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { m, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';

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
  const containerRef = useFocusTrap(isActive, onClose);

  return (
    <AnimatePresence>
      {isActive && (
        <m.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Velocity Void Arcade Mini-Game"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col pointer-events-auto w-[100dvw] h-[100dvh] overflow-hidden select-none touch-none overscroll-none"
        >
          <div className="flex-1 w-full h-full relative flex flex-col overflow-hidden">
            <VelocityVoidGame onClose={onClose} />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default VelocityVoidOverlay;
