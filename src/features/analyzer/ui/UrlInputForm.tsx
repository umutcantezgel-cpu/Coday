import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAnalyzerStore } from '../model/store';
import { Icon } from '@/shared/ui/Icon';

export const UrlInputForm: React.FC = () => {
    const { url, isValidUrl, status, error, setUrl, startAnalysis } = useAnalyzerStore();
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValidUrl && status === 'idle') {
            startAnalysis();
        }
    };

    const isLoading = status === 'validating' || status === 'analyzing';

    return (
        <div className="w-full max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                {/* Main Input Container */}
                <div
                    className={`
            relative flex items-center rounded-2xl overflow-hidden
            transition-all duration-300 ease-out
            ${isFocused
                            ? 'ring-4 ring-primary/20 shadow-2xl shadow-primary/10'
                            : 'shadow-xl'
                        }
            ${error ? 'ring-2 ring-red-500/50' : ''}
          `}
                >
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-100 transition-opacity" />

                    {/* Input Field */}
                    <div className="relative flex-1 flex items-center bg-white rounded-l-2xl">
                        {/* Icon */}
                        <div className="pl-6 pr-3">
                            <Search className={`w-6 h-6 transition-colors ${isFocused ? 'text-primary' : 'text-gray-400'}`} />
                        </div>

                        {/* Input */}
                        <input
                            type="url"
                            inputMode="url"
                            autoComplete="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="www.deine-website.de"
                            className="
                flex-1 py-5 pr-4 text-lg font-medium
                placeholder:text-gray-400 text-gray-900
                focus:outline-none bg-transparent
              "
                            disabled={isLoading}
                        />

                        {/* Validation Indicator */}
                        <AnimatePresence mode="wait">
                            {url && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="pr-4"
                                >
                                    {isValidUrl ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-orange-400" />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isValidUrl || isLoading}
                        className={`
              relative px-8 py-5 font-bold text-white text-lg
              transition-all duration-300
              ${isValidUrl && !isLoading
                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'
                            }
            `}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Analysiere...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span>Jetzt analysieren</span>
                                <Icon name="arrow_forward" className="text-xl" />
                            </span>
                        )}
                    </button>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 font-medium">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

            {/* Helper Text */}
            <p className="text-center text-gray-500 mt-6 text-sm">
                Gib die URL deiner Website ein und erhalte innerhalb von 60 Sekunden einen
                <span className="text-primary font-semibold"> kostenlosen Audit-Report</span>.
            </p>
        </div>
    );
};

export default UrlInputForm;
