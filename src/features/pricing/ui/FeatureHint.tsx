'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from '@phosphor-icons/react/dist/ssr';

interface FeatureHintProps {
  /** Plain-language feature label. */
  label: string;
  /** "What does that mean?" explanation for laypeople. */
  hint: string;
  /** Accessible label for the info trigger. */
  triggerLabel: string;
  tone?: 'light' | 'dark';
}

/**
 * Feature line with a "What does that mean?" explanation.
 * Hover shows a tooltip; tap/click toggles an inline explanation so it also
 * works on touch screens and for keyboard users.
 */
export const FeatureHint: React.FC<FeatureHintProps> = ({
  label,
  hint,
  triggerLabel,
  tone = 'light',
}) => {
  const [open, setOpen] = useState(false);
  const isDark = tone === 'dark';

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start gap-1.5">
        <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{label}</span>
        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                aria-label={`${triggerLabel} ${label}`}
                aria-expanded={open}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((v) => !v);
                }}
                className={`shrink-0 mt-0.5 w-5 h-5 rounded-full inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isDark
                    ? 'text-slate-400 hover:text-amber-300 hover:bg-white/10'
                    : 'text-slate-400 hover:text-amber-700 hover:bg-amber-50'
                }`}
              >
                <Info className="w-4 h-4" weight="bold" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                sideOffset={6}
                className="z-50 max-w-xs bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 text-xs leading-relaxed"
              >
                {hint}
                <Tooltip.Arrow className="fill-slate-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      {open && (
        <p
          className={`mt-1.5 text-xs leading-relaxed rounded-lg px-3 py-2 ${
            isDark
              ? 'bg-white/10 text-slate-200 border border-white/10'
              : 'bg-amber-50 text-amber-950 border border-amber-200/70'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};
