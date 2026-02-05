import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieStore, CookieCategory } from './lib/cookieStore';

interface CookieCategoryConfig {
    key: CookieCategory;
    name: string;
    description: string;
    required?: boolean;
}

const categories: CookieCategoryConfig[] = [
    {
        key: 'necessary',
        name: 'Notwendig',
        description: 'Erforderlich für die Grundfunktionen der Website (Session, Sicherheit).',
        required: true,
    },
    {
        key: 'functional',
        name: 'Funktional',
        description: 'Speichern Ihre Präferenzen wie Chatbot-Verlauf und Spracheinstellungen.',
    },
    {
        key: 'analytics',
        name: 'Analyse',
        description: 'Helfen uns zu verstehen, wie Sie die Website nutzen (Google Analytics).',
    },
    {
        key: 'marketing',
        name: 'Marketing',
        description: 'Werden verwendet, um Ihnen relevante Werbung anzuzeigen.',
    },
];

/**
 * Cookie Settings Modal
 * Detailed cookie preferences with toggles
 */
export const CookieSettingsModal: React.FC = () => {
    const { showSettings, closeSettings, preferences, savePreferences, acceptAll, rejectAll } = useCookieStore();
    const [localPrefs, setLocalPrefs] = useState(preferences);

    // Update local prefs when store prefs change
    React.useEffect(() => {
        setLocalPrefs(preferences);
    }, [preferences]);

    const handleToggle = (key: CookieCategory) => {
        if (key === 'necessary') return; // Cannot disable
        setLocalPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        savePreferences(localPrefs);
    };

    if (!showSettings) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={closeSettings}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="font-display font-bold text-xl text-gray-900">
                                Cookie-Einstellungen
                            </h2>
                            <button
                                onClick={closeSettings}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Wählen Sie aus, welche Cookies Sie akzeptieren möchten.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                        {categories.map((cat) => (
                            <div
                                key={cat.key}
                                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-gray-900">{cat.name}</h4>
                                        {cat.required && (
                                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                                Erforderlich
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{cat.description}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer p-2 -m-2 min-h-[44px] min-w-[44px]">
                                    <input
                                        type="checkbox"
                                        checked={localPrefs[cat.key]}
                                        onChange={() => handleToggle(cat.key)}
                                        disabled={cat.required}
                                        className="sr-only peer"
                                    />
                                    <div className={`w-11 h-6 rounded-full transition-colors ${cat.required
                                        ? 'bg-primary cursor-not-allowed'
                                        : 'bg-gray-200 peer-checked:bg-primary'
                                        }`}>
                                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${localPrefs[cat.key] ? 'translate-x-5' : 'translate-x-0'
                                            }`} />
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Auswahl speichern
                        </button>
                        <button
                            onClick={acceptAll}
                            className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Alle akzeptieren
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieSettingsModal;
