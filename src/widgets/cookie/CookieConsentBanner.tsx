'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Cookie, CaretDown, CaretUp, Sliders } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Link } from '@/i18n/navigation';
import { useConsentStore } from '@/shared/lib/consent/consentStore';
import { CODAY_STORAGE_INVENTORY } from '@/shared/lib/consent/storageGate';
import CookieSettingsModal from '@/widgets/cookie/CookieSettingsModal';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { useLocale } from 'next-intl';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const locale = useLocale();
  const isEn = locale === 'en';

  const { hasConsented, showSettings, acceptAll, rejectAll, openSettings, closeSettings } =
    useConsentStore();

  const handleReject = useCallback(() => {
    rejectAll('banner');
    setIsVisible(false);
  }, [rejectAll]);

  const handleAccept = useCallback(() => {
    acceptAll('banner');
    setIsVisible(false);
  }, [acceptAll]);

  const bannerRef = useFocusTrap(isVisible && !showSettings, handleReject);

  useEffect(() => {
    if (!hasConsented) {
      // Delay slightly to prevent LCP layout thrashing
      const timer = setTimeout(() => setIsVisible(true), 2200);
      return () => clearTimeout(timer);
    }
  }, [hasConsented]);

  const shouldRenderBanner = isVisible && !hasConsented;

  if (!shouldRenderBanner && !showSettings) return null;

  return (
    <>
      {shouldRenderBanner && (
        <div
          ref={bannerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consent-banner-title"
          aria-describedby="consent-banner-desc"
          className="fixed bottom-4 left-4 right-4 z-[100] max-w-4xl mx-auto transition motion-reduce:duration-[0.01ms] duration-500 transform translate-y-0 opacity-100"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-2xl p-6 sm:p-7 flex flex-col gap-5 text-slate-900 ring-1 ring-black/5">
            {/* Header / Intro */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div
                className="p-3 bg-primary-50 text-primary-700 rounded-xl shrink-0 border border-primary-100/80"
                aria-hidden="true"
              >
                <OptimizedIcon icon={ShieldCheck} className="w-7 h-7 text-primary-700" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h2
                    id="consent-banner-title"
                    className="text-lg font-bold text-slate-900 tracking-tight"
                  >
                    {isEn
                      ? 'Privacy & Data Storage Settings'
                      : 'Privatsphäre & Speichereinstellungen'}
                  </h2>
                  <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    {isEn ? 'GDPR / TDDDG compliant' : 'DSGVO / TDDDG konform'}
                  </span>
                </div>
                <p id="consent-banner-desc" className="text-sm text-slate-600 leading-relaxed">
                  {isEn
                    ? 'We use strictly local storage technologies (LocalStorage / SessionStorage) to guarantee fast loading speeds (< 300ms) and save your interface preferences. No persistent marketing cookies or third-country data transfers are used without your explicit consent.'
                    : 'Wir setzen ausschließlich lokale Speichertechnologien (LocalStorage / SessionStorage) ein, um Ihnen blitzschnelle Ladezeiten (< 300ms) und Komfortfunktionen wie den Strobi-Assistenten zu ermöglichen. Es erfolgt kein Drittlandtransfer ohne Ihre ausdrückliche Einwilligung.'}
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs text-slate-500">
                  <Link
                    href="/legal/datenschutz"
                    className="hover:text-primary-600 underline underline-offset-2 transition-colors"
                  >
                    {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
                  </Link>
                  <Link
                    href="/legal/impressum"
                    className="hover:text-primary-600 underline underline-offset-2 transition-colors"
                  >
                    {isEn ? 'Legal Notice' : 'Impressum'}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 font-medium ml-auto"
                    aria-expanded={showDetails}
                  >
                    <span>{isEn ? 'View Storage Details' : 'Speicherdetails ansehen'}</span>
                    <OptimizedIcon
                      icon={showDetails ? CaretUp : CaretDown}
                      className="w-3.5 h-3.5"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Disclosure Table */}
            {showDetails && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2.5 max-h-48 overflow-y-auto">
                <p className="font-semibold text-slate-900 mb-1">
                  {isEn
                    ? 'Active Local Storage Keys on Coday:'
                    : 'Verwendete lokale Speicherschlüssel bei Coday:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CODAY_STORAGE_INVENTORY.map((item) => (
                    <div
                      key={item.key}
                      className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <code className="font-mono text-primary-700 font-bold text-[11px]">
                          {item.key}
                        </code>
                        <span className="text-[10px] font-medium text-slate-500">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-snug">
                        {isEn ? item.purposeEn : item.purposeDe}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Strict EDSA Anti-Dark-Pattern (Identical size & prominence) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={openSettings}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200/80"
              >
                <OptimizedIcon icon={Sliders} className="w-4 h-4 text-slate-600" />
                <span>{isEn ? 'Custom Settings' : 'Einstellungen anpassen'}</span>
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-5 py-2.5 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all duration-200 shadow-xs hover:border-slate-400 text-center"
              >
                {isEn ? 'Only Essential Storage' : 'Nur Essenzielle zulassen'}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-xl transition-all duration-200 shadow-sm hover:shadow text-center"
              >
                {isEn ? 'Accept All & Continue' : 'Alle akzeptieren'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <CookieSettingsModal isOpen={showSettings} onClose={closeSettings} onSave={closeSettings} />
      )}
    </>
  );
};

export default CookieConsentBanner;
