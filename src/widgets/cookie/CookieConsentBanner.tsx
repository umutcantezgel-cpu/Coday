import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';
import { Link } from 'react-router-dom';
import { useCookieStore } from './lib/cookieStore';
import CookieSettingsModal from './CookieSettingsModal';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { hasConsented, acceptAll, rejectAll } = useCookieStore();

  useEffect(() => {
    // Check store state instead of raw localStorage for consistency
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    } else if (isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
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

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 z-[100] max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 items-center lg:items-start text-center lg:text-left ring-1 ring-black/5">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Icon name="cookie" className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Privatsphäre-Einstellungen
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern,
                    Leistung zu messen und personalisierte Inhalte anzuzeigen. Einige sind
                    essenziell, andere helfen uns, diese Website und Ihre Erfahrung zu verbessern.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-600 justify-center lg:justify-start">
                  <Link to="/legal/privacy" className="hover:text-primary underline">
                    Datenschutzerklärung
                  </Link>
                  <Link to="/legal/imprint" className="hover:text-primary underline">
                    Impressum
                  </Link>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Alle akzeptieren
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Ablehnen
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CookieSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveSettings}
      />
    </>
  );
};

export default CookieConsentBanner;
