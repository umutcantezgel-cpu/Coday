'use client';

import React from 'react';
import { AnimatePresence, m } from 'motion/react';
import { X, CheckCircle, WarningCircle, Info } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const icons = {
  success: <CheckCircle className="h-5 w-5 text-green-500" weight="fill" />,
  error: <WarningCircle className="h-5 w-5 text-red-500" weight="fill" />,
  info: <Info className="h-5 w-5 text-blue-500" weight="fill" />,
};

/**
 * A Toaster component that displays toast notifications.
 */
export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <m.div
            key={t.id}
            initial={{ opacity: 0, transform: 'translateY(100%) scale(0.95)' }}
            animate={{ opacity: 1, transform: 'translateY(0%) scale(1)' }}
            exit={{
              opacity: 0,
              transform: 'translateY(20px) scale(0.95)',
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            transition={{
              opacity: { duration: 0.2 },
              transform: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
            }}
            className={cn(
              'pointer-events-auto relative mt-2 flex w-full items-center justify-between overflow-hidden rounded-xl border border-subtle bg-surface-elevated p-4 shadow-lg ring-1 ring-black/5'
            )}
            role={t.role}
            aria-live={t.ariaLive}
            aria-atomic="true"
          >
            <div className="flex w-full items-start gap-3">
              {t.type && <div className="mt-0.5 shrink-0">{icons[t.type]}</div>}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-gray-900">{t.title}</p>
                {t.description && <p className="text-sm text-content-muted">{t.description}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="inline-flex shrink-0 rounded-md text-content-muted transition-[transform,colors] duration-[160ms] ease-out hover:bg-black/5 hover:text-gray-900 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label="Close toast"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
