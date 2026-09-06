'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Info } from '@phosphor-icons/react/dist/ssr';

/** The Radix tooltip module, fetched as its own chunk on the first hover/focus. */
type TooltipModule = typeof import('@radix-ui/react-tooltip');

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
 *
 * The Radix tooltip (@radix-ui/react-tooltip + floating-ui, ~19 KB gzip) is not
 * part of the pricing page bundle: the trigger button is rendered statically and
 * the tooltip chunk is only fetched, client-side, after the first pointerenter
 * or focus on the trigger ("armed"). Until then the hint text is still exposed
 * to assistive technology through a visually hidden description.
 */
export const FeatureHint: React.FC<FeatureHintProps> = ({
  label,
  hint,
  triggerLabel,
  tone = 'light',
}) => {
  const [open, setOpen] = useState(false);
  // 'mouse' | 'touch' | 'focus': what armed the tooltip; decides whether it
  // should open right away once the chunk has arrived.
  const [armedBy, setArmedBy] = useState<'mouse' | 'touch' | 'focus' | null>(null);
  const [tooltip, setTooltip] = useState<{ mod: TooltipModule; defaultOpen: boolean } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hintId = useId();
  const isDark = tone === 'dark';

  // Fetch the tooltip chunk once armed. When it lands, the button re-mounts
  // inside Radix's Trigger, so we open the tooltip ourselves if the pointer is
  // still over the button (or it was armed by keyboard focus) and hand focus
  // back to the re-mounted button so keyboard users lose nothing.
  useEffect(() => {
    if (!armedBy || tooltip) return;
    let cancelled = false;
    import('@radix-ui/react-tooltip').then((mod) => {
      if (cancelled) return;
      const hovered =
        armedBy === 'mouse' && buttonRef.current ? buttonRef.current.matches(':hover') : false;
      setTooltip({ mod, defaultOpen: armedBy === 'focus' || hovered });
    });
    return () => {
      cancelled = true;
    };
  }, [armedBy, tooltip]);

  useEffect(() => {
    if (!tooltip || armedBy !== 'focus') return;
    const button = buttonRef.current;
    if (button && document.activeElement !== button) button.focus();
  }, [tooltip, armedBy]);

  const trigger = (
    <button
      ref={buttonRef}
      type="button"
      aria-label={`${triggerLabel} ${label}`}
      aria-describedby={hintId}
      aria-expanded={open}
      onPointerEnter={(e) => {
        if (armedBy) return;
        setArmedBy(e.pointerType === 'touch' ? 'touch' : 'mouse');
      }}
      onFocus={() => {
        if (armedBy) return;
        setArmedBy('focus');
      }}
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
  );

  const Tooltip = tooltip?.mod;

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start gap-1.5">
        <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>{label}</span>
        {Tooltip ? (
          <Tooltip.Provider delayDuration={150}>
            <Tooltip.Root defaultOpen={tooltip?.defaultOpen}>
              <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
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
        ) : (
          trigger
        )}
        {/* Always-present description so screen readers get the hint even before
            the tooltip chunk exists (and on touch, where there is no hover). */}
        <span id={hintId} className="sr-only">
          {hint}
        </span>
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
