'use client';
import React, { useState, useEffect } from 'react';
import { Cookie } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import Link from 'next/link';
import { useCookieStore } from '@/shared/lib/cookieStore';
import CookieSettingsModal from '@/widgets/cookie/CookieSettingsModal';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { hasConsented, acceptAll, rejectAll } = useCookieStore();

  useEffect(() => {
    // Check store state instead of raw localStorage for consistency
    if (!hasConsented) {
      // Use requestAnimationFrame to avoid hydration mismatch without artificial delays
      requestAnimationFrame(() => setIsVisible(true));
    } else if (isVisible) {
      setTimeout(() => setIsVisible(false), 0);
    }
  }, [hasConsented, isVisible]);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    // Settings modal handles saving, we just close the banner relies on store state update
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible && !showSettings) return null;

  return (
    <>
      <div
        aria-label="Cookie Banner"
        role="dialog"
        className={`fixed bottom-4 left-4 right-4 z-[100] max-w-4xl mx-auto transition-all motion-reduce:duration-[0.01ms] duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 items-center lg:items-start text-center lg:text-left ring-1 ring-black/5">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <OptimizedIcon icon={Cookie} className="w-8 h-8" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Privatsphäre-Einstellungen</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern,
                Leistung zu messen und personalisierte Inhalte anzuzeigen. Einige sind essenziell,
                andere helfen uns, diese Website und Ihre Erfahrung zu verbessern.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 justify-center lg:justify-start">
              <Link href="/legal/privacy" className="hover:text-primary underline">
                Datenschutzerklärung
              </Link>
              <Link href="/legal/imprint" className="hover:text-primary underline">
                Impressum
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              Alle akzeptieren
            </button>
            <button
              onClick={handleRejectAll}
              className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors motion-reduce:duration-[0.01ms] shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
            >
              Ablehnen
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors motion-reduce:duration-[0.01ms] whitespace-nowrap"
            >
              Einstellungen
            </button>
          </div>
        </div>
      </div>

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieConsentBanner;
