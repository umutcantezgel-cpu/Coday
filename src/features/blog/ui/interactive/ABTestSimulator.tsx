
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { SplitHorizontal, Users, CursorClick, ArrowsClockwise } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { cn } from '@/shared/lib/utils';

interface Variant {
    id: 'A' | 'B';
    name: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    conversionRate: number; // base rate
}

const VARIANTS: Record<'A' | 'B', Variant> = {
    A: {
        id: 'A',
        name: 'Das Bauchgefühl (Control)',
        description: 'Hübsches Design, aber unklare Botschaft. "Wir"-fokussiert.',
        buttonText: 'Mehr erfahren',
        buttonColor: 'bg-gray-800',
        conversionRate: 1.2
    },
    B: {
        id: 'B',
        name: 'Die Daten-Variante (Challenger)',
        description: 'Klarer Nutzen, starke Kontrastfarbe, "Ich"-fokussiert.',
        buttonText: 'Gratis Audit sichern',
        buttonColor: 'bg-primary',
        conversionRate: 4.8
    }
};

export const ABTestSimulator: React.FC = () => {
    const { t } = useTranslation();
    const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');
    const [visitors, setVisitors] = useState(0);
    const [conversions, setConversions] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [simSpeed] = useState(1);

    // Simulation Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setVisitors(prev => prev + Math.floor(Math.random() * 5) + 1);

                // Random conversion chance based on rate
                const currentRate = VARIANTS[activeVariant].conversionRate;
                // Add some noise (+/- 0.5%)
                const noisyRate = currentRate + (Math.random() - 0.5);

                if (Math.random() * 100 < noisyRate) {
                    setConversions(prev => prev + 1);
                }
            }, 100 / simSpeed);
        }

        return () => clearInterval(interval);
    }, [isRunning, activeVariant, simSpeed]);

    const currentCR = visitors > 0 ? ((conversions / visitors) * 100).toFixed(2) : "0.00";

    const reset = () => {
        setIsRunning(false);
        setVisitors(0);
        setConversions(0);
    };

    return (
        <div className="my-12 font-sans w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl">

                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <SplitHorizontal className="text-primary" />
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{t('blog:abTest.title')}</h3>
                            <p className="text-xs text-gray-400 font-mono">{t('blog:abTest.subtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isRunning ? (
                            <button
                                onClick={() => setIsRunning(true)}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                            >
                                <ArrowsClockwise className="w-4 h-4" /> {t('blog:abTest.start')}
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsRunning(false)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-all"
                            >
                                {t('blog:abTest.stop')}
                            </button>
                        )}
                        <button
                            onClick={reset}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Reset"
                        >
                            <ArrowsClockwise className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">

                    {/* Controls Side */}
                    <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100 flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">{t('blog:abTest.selectVariant')}</h4>

                        {(['A', 'B'] as const).map((variantId) => (
                            <button
                                key={variantId}
                                onClick={() => {
                                    if (activeVariant !== variantId) {
                                        // Normally A/B tests run parallel, but for simulation we switch views
                                        setActiveVariant(variantId);
                                        // Optional: Reset stats on switch to clearer demo? No, keeps history funnier. 
                                        // Actually better to reset to show fair comparison or keep distinct buckets.
                                        // For simplicity, we just switch the "Live View" but keep counting cumulative for that bucket?
                                        // Let's just switch the active parameters simulation uses.
                                    }
                                }}
                                className={clsx(
                                    "p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                                    activeVariant === variantId
                                        ? "bg-white border-primary shadow-md ring-1 ring-primary/20"
                                        : "bg-white border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <strong className={clsx("text-xl font-bold", activeVariant === variantId ? "text-primary" : "text-gray-400")}>
                                        {variantId}
                                    </strong>
                                    {variantId === 'B' && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">OPTIMIZED</span>}
                                </div>
                                <div className="text-sm font-medium text-gray-800 mb-1">
                                    {variantId === 'A' ? t('blog:abTest.variantA.name') : t('blog:abTest.variantB.name')}
                                </div>
                                <div className="text-xs text-gray-500 leading-snug">
                                    {variantId === 'A' ? t('blog:abTest.variantA.description') : t('blog:abTest.variantB.description')}
                                </div>
                            </button>
                        ))}

                        <div className="mt-auto pt-6 border-t border-gray-200">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{t('blog:abTest.metrics.header')}</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> {t('blog:abTest.metrics.visitors')}</span>
                                    <span className="font-mono font-bold text-gray-900">{visitors.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm flex items-center gap-2"><CursorClick className="w-4 h-4" /> {t('blog:abTest.metrics.conversions')}</span>
                                    <span className="font-mono font-bold text-gray-900">{conversions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="text-gray-800 font-bold text-sm">{t('blog:abTest.metrics.rate')}</span>
                                    <span className={clsx(
                                        "font-mono font-bold text-lg",
                                        parseFloat(currentCR) > 2 ? "text-green-600" : "text-gray-600"
                                    )}>
                                        {currentCR}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Side */}
                    <div className="w-full md:w-2/3 bg-gray-100 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">

                        {/* Device Mockup */}
                        <div className="bg-white w-full max-w-[320px] rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] border-gray-900 relative z-10">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-20"></div>

                            {/* Screen Content */}
                            <div className="h-[500px] flex flex-col relative">
                                {/* Navbar */}
                                <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 pt-4">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                    <div className="w-16 h-4 bg-gray-100 rounded-full"></div>
                                </div>

                                {/* Hero Section */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeVariant}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 flex flex-col p-6 items-center text-center justify-center bg-gray-50"
                                    >
                                        {/* Image Placeholder */}
                                        <div className="w-full aspect-video bg-gray-200 rounded-xl mb-6 animate-pulse"></div>

                                        {/* Headline */}
                                        <h3 className={clsx(
                                            "font-bold mb-4",
                                            activeVariant === 'A' ? "text-xl text-gray-800" : "text-2xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                                        )}>
                                            {activeVariant === 'A' ? t('blog:abTest.variantA.headline') : t('blog:abTest.variantB.headline')}
                                        </h3>

                                        {/* Copy */}
                                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                            {activeVariant === 'A'
                                                ? t('blog:abTest.variantA.copy')
                                                : t('blog:abTest.variantB.copy')}
                                        </p>

                                        {/* Button */}
                                        <button className={cn(
                                            "w-full py-4 rounded-xl text-white font-bold shadow-lg transition-transform active:scale-95",
                                            VARIANTS[activeVariant].buttonColor
                                        )}>
                                            {activeVariant === 'A' ? t('blog:abTest.variantA.button') : t('blog:abTest.variantB.button')}
                                        </button>

                                        {/* Trust Elements (Only Variant B) */}
                                        {activeVariant === 'B' && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                                className="flex items-center gap-2 mt-4 text-[10px] text-gray-400"
                                            >
                                                <div className="flex -space-x-2">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white"></div>)}
                                                </div>
                                                <span>{t('blog:abTest.variantB.trust')}</span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
