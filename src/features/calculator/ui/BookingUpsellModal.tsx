"use client";
import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import Link from 'next/link';

interface BookingUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingUpsellModal: React.FC<BookingUpsellModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-modal-title"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="check" className="text-3xl" />
          </div>

          <h3
            id="upsell-modal-title"
            className="font-display font-bold text-2xl text-gray-900 mb-2"
          >
            Anfrage erfolgreich gesendet!
          </h3>
          <p className="text-gray-600 mb-8">
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
              className="block w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl uppercase tracking-wide"
            >
              Termin jetzt buchen
            </Link>

            <button
              onClick={onClose}
              className="block w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Nein, zurück zur Startseite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
