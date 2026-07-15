'use client';
import React, { useRef, useCallback } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { Link } from '@/i18n/navigation';
import { m, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface BookingUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingUpsellModal: React.FC<BookingUpsellModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Keyboard handling: Escape to close + focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        return;
      }
      if (e.key === 'Tab' && isOpen && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [isOpen, onClose]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus management + body scroll lock
  React.useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus first focusable element after animation
      const timer = setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <m.div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <m.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upsell-modal-title"
            aria-describedby="upsell-modal-desc"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="check" className="text-3xl" />
              </div>

              <p
                id="upsell-modal-title"
                className="font-display font-bold text-2xl text-gray-900 mb-2"
              >
                Anfrage erfolgreich gesendet!
              </p>
              <p id="upsell-modal-desc" className="text-gray-600 mb-8">
                Vielen Dank für Ihr Interesse. Wir haben Ihre Konfiguration erhalten.
                <br />
                <br />
                <strong>Möchten Sie tiefer ins Detail gehen?</strong>
                <br />
                Buchen Sie jetzt direkt einen Termin für ein unverbindliches Erstgespräch.
              </p>

              <div className="space-y-3">
                <Link
                  href="/booking"
                  className="block w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl uppercase tracking-wide focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Termin jetzt buchen
                </Link>

                <button
                  onClick={onClose}
                  className="active:scale-[0.97] block w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors motion-reduce:duration-[0.01ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Nein, zurück zur Startseite
                </button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
