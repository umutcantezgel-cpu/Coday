'use client';
import React from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { m, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '@/hooks/use-scroll-lock';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = 'Vielen Dank!',
  message = 'Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.',
}) => {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        return;
      }
      // Focus trap
      if (e.key === 'Tab' && isOpen && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus close button on open
  React.useEffect(() => {
    if (isOpen) {
      // Small delay to allow AnimatePresence to render
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <m.div
            ref={dialogRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
            aria-describedby="success-modal-desc"
          >
            {/* Background Decoration */}
            <div
              className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"
              aria-hidden="true"
            />

            <div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <OptimizedIcon icon={CheckCircle} className="text-4xl text-green-600" />
            </div>

            <h3
              id="success-modal-title"
              className="text-2xl font-bold text-gray-900 mb-4 font-display"
            >
              {title}
            </h3>
            <p id="success-modal-desc" className="text-gray-600 mb-8 leading-relaxed">
              {message}
            </p>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors motion-reduce:duration-[0.01ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
            >
              Verstanden
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
