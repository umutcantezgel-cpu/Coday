'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { useFocusTrap } from '@/hooks/use-focus-trap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

const Portal = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return createPortal(
      <div ref={ref} style={{ display: 'contents' }}>
        {children}
      </div>,
      document.body
    );
  }
);
Portal.displayName = 'Portal';

/**
 * A reusable Modal component using Framer Motion and Portal.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  hideCloseButton = false,
}: ModalProps) {
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

  if (!mounted) return null;

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-overlay"
            exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 isolate"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15, ease: 'easeOut' } }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              // @ts-expect-error - Framer Motion generic ref types can be tricky
              ref={trapRef}
              initial={{ opacity: 0, transform: 'scale(0.95)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{
                opacity: 0,
                transform: 'scale(0.95)',
                transition: { duration: 0.15, ease: 'easeOut' },
              }}
              transition={{
                duration: 0.25,
                ease: [0.23, 1, 0.32, 1], // Strong ease-out
              }}
              className={cn(
                'relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 origin-center',
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
            >
              {title && (
                <h2 id="modal-title" className="mb-4 text-xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}

              {!hideCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-[transform,colors] duration-[160ms] ease-out hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <div className="relative">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
