import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@/shared/ui/Icon';
import { Link } from 'react-router-dom';

export const CookieConsentBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Delay slightly for animation
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 z-[9999] max-w-2xl mx-auto"
                >
                    <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left ring-1 ring-black/5">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                            <Icon name="cookie" className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Wir nutzen Cookies</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern,
                                Leistung zu messen und personalisierte Inhalte anzuzeigen.
                                Mehr Informationen finden Sie in unserer <Link to="/legal/privacy" className="text-primary hover:underline">Datenschutzerklärung</Link>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Alle akzeptieren
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    Nur Essenzielle
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsentBanner;
