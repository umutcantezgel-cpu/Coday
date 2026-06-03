'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  position?: 'right' | 'left' | 'bottom';
  hideCloseButton?: boolean;
  /** Accessible label for the drawer. Required if no title is provided. */
  'aria-label'?: string;
}


const Portal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

/**
 * A reusable Drawer component.
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className,
  position = 'right',
  hideCloseButton = false,
  'aria-label': ariaLabel,
}: DrawerProps) {
  const drawerId = React.useId();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useScrollLock(isOpen);
  const trapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const slideVariants = {
    right: {
      initial: { transform: 'translateX(100%)' },
      animate: { transform: 'translateX(0%)' },
      exit: { transform: 'translateX(100%)', transition: { duration: 0.15, ease: 'easeOut' as const } },
    },
    left: {
      initial: { transform: 'translateX(-100%)' },
      animate: { transform: 'translateX(0%)' },
      exit: { transform: 'translateX(-100%)', transition: { duration: 0.15, ease: 'easeOut' as const } },
    },
    bottom: {
      initial: { transform: 'translateY(100%)' },
      animate: { transform: 'translateY(0%)' },
      exit: { transform: 'translateY(100%)', transition: { duration: 0.15, ease: 'easeOut' as const } },
    },
  } as const;

  const positionClasses = {
    right: 'inset-y-0 right-0 h-full w-full max-w-md border-l',
    left: 'inset-y-0 left-0 h-full w-full max-w-md border-r',
    bottom: 'bottom-0 left-0 right-0 w-full max-h-[90vh] border-t rounded-t-2xl',
  };

  if (!mounted) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer-overlay"
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
            className="fixed inset-0 z-50 isolate flex"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer Content */}
            <motion.div
              // @ts-expect-error - Framer Motion generic ref types can be tricky
              ref={trapRef}
              initial={slideVariants[position].initial}
              animate={slideVariants[position].animate}
              exit={slideVariants[position].exit}
              transition={{
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1] as const, // iOS-like drawer curve
              }}
              className={cn(
                'absolute bg-white shadow-2xl border-black/5 flex flex-col',
                positionClasses[position],
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? `drawer-title-${drawerId}` : undefined}
              aria-label={!title ? (ariaLabel || 'Drawer') : undefined}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                {title ? (
                  <h2 id={`drawer-title-${drawerId}`} className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                ) : (
                  <div /> // Spacer
                )}

                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 text-gray-400 transition-[transform,colors] duration-[160ms] ease-out hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label="Close drawer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
