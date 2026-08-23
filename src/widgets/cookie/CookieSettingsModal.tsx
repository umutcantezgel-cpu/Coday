'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useConsentStore, type ConsentCategories } from '@/shared/lib/consent/consentStore';
import { X, CheckCircle, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { m, AnimatePresence } from 'motion/react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const locale = useLocale();
  const isEn = locale === 'en';
  const { categories, saveCustom, acceptAll, rejectAll } = useConsentStore();
  const containerRef = useFocusTrap(isOpen, onClose);

  const [prevCategories, setPrevCategories] = useState(categories);
  const [localCategories, setLocalCategories] = useState<ConsentCategories>(categories);

  if (categories !== prevCategories) {
    setPrevCategories(categories);
    setLocalCategories(categories);
  }

  const handleSave = () => {
    saveCustom(localCategories, 'settings_modal');
    onSave();
  };

  const handleAcceptAll = () => {
    acceptAll('settings_modal');
    onSave();
  };

  const handleRejectAll = () => {
    rejectAll('settings_modal');
    onSave();
  };

  const toggleCategory = (cat: keyof ConsentCategories) => {
    if (cat === 'necessary') return; // Cannot disable essential
    setLocalCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <m.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          aria-describedby="cookie-settings-desc"
          className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200 text-slate-900 my-8"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100/60 text-primary-800 rounded-lg">
                <OptimizedIcon icon={ShieldCheck} className="w-5 h-5 text-primary-700" />
              </div>
              <div>
                <h2 id="cookie-settings-title" className="text-lg font-bold text-slate-900">
                  {isEn ? 'Privacy & Storage Settings' : 'Privatsphäre & Speichereinstellungen'}
                </h2>
                <p id="cookie-settings-desc" className="text-xs text-slate-500">
                  {isEn
                    ? 'Configure your preferences individually'
                    : 'Individuelle Einstellungen nach TDDDG & DSGVO'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-slate-200/80 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={isEn ? 'Close settings' : 'Einstellungen schließen'}
            >
              <OptimizedIcon icon={X} className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Categories Body */}
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* Category 1: Essential */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4">
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    {isEn
                      ? 'Technically Necessary (Essential)'
                      : 'Technisch erforderlich (Essenziell)'}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    {isEn ? 'Required' : 'Immer aktiv'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Required for basic site navigation, security, and storing your consent choices. Cannot be disabled.'
                    : 'Erforderlich für grundlegende Seitenfunktionen, Sicherheitsrichtlinien und Speicherung Ihrer Einwilligungsauswahl.'}
                </p>
              </div>
              <div
                role="switch"
                aria-checked="true"
                aria-disabled="true"
                aria-label={isEn ? 'Necessary storage' : 'Notwendige Speicherung'}
                className="w-11 h-6 bg-slate-900 rounded-full flex items-center p-1 shrink-0 cursor-not-allowed opacity-80"
              >
                <div className="w-4 h-4 rounded-full bg-white ml-auto" />
              </div>
            </div>

            {/* Category 2: Functional / Comfort */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    {isEn ? 'Comfort & Interactive Features' : 'Komfort & Interaktive Funktionen'}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                    {isEn ? 'Comfort' : 'Komfort'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Enables persistent light/dark theme selection, seamless AI assistant conversations (Strobi), and pricing calculator state.'
                    : 'Ermöglicht das Speichern Ihres Themes (Hell/Dunkel), Chat-Verläufe mit AI-Berater Strobi sowie Kalkulator-Zustände.'}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={localCategories.functional}
                aria-label={isEn ? 'Functional storage' : 'Funktionale Speicherung'}
                onClick={() => toggleCategory('functional')}
                className={`w-11 h-6 rounded-full flex items-center p-1 shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  localCategories.functional ? 'bg-primary-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    localCategories.functional ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Category 3: Analytics */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    {isEn
                      ? 'Statistical Performance & Measurement'
                      : 'Statistische Leistung & Messung'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isEn
                    ? 'Helps us measure site performance anonymously without cross-site tracking or selling data.'
                    : 'Hilft uns bei der anonymisierten Reichweitenmessung und Optimierung der Seitenladezeiten ohne Cross-Site-Tracking.'}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={localCategories.analytics}
                aria-label={isEn ? 'Analytics storage' : 'Statistische Speicherung'}
                onClick={() => toggleCategory('analytics')}
                className={`w-11 h-6 rounded-full flex items-center p-1 shrink-0 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  localCategories.analytics ? 'bg-primary-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    localCategories.analytics ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleRejectAll}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all shadow-xs text-center"
            >
              {isEn ? 'Reject All Optional' : 'Alle Optionalen ablehnen'}
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all shadow-xs text-center flex-1 sm:flex-initial"
              >
                {isEn ? 'Save Selection' : 'Auswahl speichern'}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all shadow-sm text-center flex-1 sm:flex-initial"
              >
                {isEn ? 'Accept All' : 'Alle akzeptieren'}
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </AnimatePresence>
  );
};

export default CookieSettingsModal;
