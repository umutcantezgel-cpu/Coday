import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieStore } from './lib/cookieStore';

/**
 * Cookie Consent Banner
 * DSGVO-compliant cookie banner with Aurora design
 */
export const CookieConsentBanner: React.FC = () => {
    const { hasConsented, showBanner, acceptAll, rejectAll, openSettings } = useCookieStore();

    // Don't show if already consented
    if (hasConsented || !showBanner) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
            >
                <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-aurora-mist p-6 md:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary">cookie</span>
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
                                Cookie-Einstellungen
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
                                Einige sind notwendig, andere helfen uns, die Website zu verbessern.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                            onClick={acceptAll}
                            className="flex-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            Alle akzeptieren
                        </button>
                        <button
                            onClick={rejectAll}
                            className="flex-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            Nur notwendige
                        </button>
                        <button
                            onClick={openSettings}
                            className="px-6 py-3 text-primary font-medium hover:underline transition-colors"
                        >
                            Einstellungen
                        </button>
                    </div>

                    {/* Privacy Link */}
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        Mehr erfahren Sie in unserer{' '}
                        <a href="/datenschutz" className="text-primary hover:underline">
                            Datenschutzerklärung
                        </a>
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieConsentBanner;
