'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { PaperPlaneRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Loaded on the first tap, never before.
 *
 * The sheet pulls in the server action, four Phosphor icons and the focus-trap
 * and scroll-lock hooks. None of that belongs in the mobile critical path for a
 * form the visitor has not asked for yet, so the import is gated behind
 * `hasOpened` — the same pattern the mobile navigation uses.
 */
const MobileQuickContactSheet = dynamic(
  () => import('./MobileQuickContactSheet').then((mod) => mod.MobileQuickContactSheet),
  { ssr: false }
);

/**
 * The mobile entry point into the quick contact flow.
 *
 * Below 1024px the hero has no form — the desktop card is 480px tall and would
 * push the headline, the value proposition and every CTA off the first screen.
 * A trigger costs one row and opens the form over the page instead, so the
 * shortest path from "interested" to "sent" is a single tap.
 */
export const MobileQuickContact: React.FC = () => {
  const isEn = useLocale() === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  /**
   * Mount the sheet on touch-down, open it on the tap itself.
   *
   * Two reasons for the split. It buys the chunk a head start of one pointer
   * event, and it means the panel is already in the DOM in its closed position
   * when `isOpen` flips — which is what gives the very first open a slide
   * instead of an appearance, since a panel that mounts already open has no
   * previous state to transition from. `onFocus` covers keyboard users, who
   * never fire a pointer event.
   */
  const prepare = () => setHasOpened(true);

  const open = () => {
    setHasOpened(true);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onPointerDown={prepare}
        onFocus={prepare}
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group relative flex w-full min-h-[64px] items-center gap-3.5 overflow-hidden rounded-2xl bg-primary-700 px-5 py-4 text-left text-white shadow-lg shadow-primary-700/25 transition-transform active:scale-[0.98]"
      >
        <span
          className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
          <OptimizedIcon icon={PaperPlaneRight} className="h-5 w-5" />
        </span>
        <span className="relative z-10 flex-1">
          <span className="block text-base font-bold leading-tight">
            {isEn ? 'Send a quick message' : 'Schnellnachricht senden'}
          </span>
          <span className="mt-0.5 block text-[13px] font-medium leading-tight text-white/90">
            {isEn ? 'Two fields · reply in 24 hours' : 'Zwei Felder · Antwort in 24 Stunden'}
          </span>
        </span>
      </button>

      {hasOpened && <MobileQuickContactSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};
