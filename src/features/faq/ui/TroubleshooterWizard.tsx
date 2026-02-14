import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretRight, Check, ArrowRight } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

// Simple decision tree data (internal for now, could move to data.ts later)
const steps = [
    {
        id: 'goal',
        question: "What is your main goal right now?",
        options: [
            { id: 'growth', label: "Increase Revenue / Leads", next: 'growth-context' },
            { id: 'launch', label: "Launch a New Product", next: 'launch-context' },
            { id: 'efficiency', label: "Automate / Save Time", next: 'efficiency-context' },
            { id: 'fix', label: "Fix Technical Issues", next: 'fix-context' }
        ]
    },
    {
        id: 'growth-context',
        question: "How are you currently acquiring customers?",
        options: [
            { id: 'ads', label: "Paid Ads (High CPA)", result: 'cro' },
            { id: 'organic', label: "SEO / Content (Slow)", result: 'seo' },
            { id: 'referral', label: "Referrals (Unpredictable)", result: 'marketing' }
        ]
    },
    {
        id: 'launch-context',
        question: "What stage are you in?",
        options: [
            { id: 'idea', label: "Just an Idea", result: 'strategy' },
            { id: 'prototype', label: "Have a Prototype/Design", result: 'dev' },
            { id: 'ready', label: "Ready to Scale", result: 'marketing' }
        ]
    },
    {
        id: 'efficiency-context',
        question: "Where is the bottleneck?",
        options: [
            { id: 'support', label: "Customer Support Overload", result: 'ai-support' },
            { id: 'manual', label: "Manual Data Entry", result: 'automation' },
            { id: 'cms', label: "Website Updates are Slow", result: 'headless' }
        ]
    },
    {
        id: 'fix-context',
        question: "What is broken?",
        options: [
            { id: 'speed', label: "Website is Slow", result: 'performance' },
            { id: 'security', label: "Security Concerns / Hacks", result: 'security' },
            { id: 'ux', label: "Users are Confused", result: 'ux-audit' }
        ]
    }
];

const results = {
    'cro': { title: "Conversion Optimization", desc: "You don't need more traffic, you need better conversion.", link: "/services/marketing" },
    'seo': { title: "SEO Strategy", desc: "Dominate search results with a technical SEO audit.", link: "/services/seo" },
    'marketing': { title: "Growth Marketing", desc: "A holistic strategy to diversify your acquisition channels.", link: "/services/marketing" },
    'strategy': { title: "Digital Consulting", desc: "Let's validate your idea before you build it.", link: "/beratung" },
    'dev': { title: "Web/App Development", desc: "Turn your design into a high-performance product.", link: "/services/web-development" },
    'ai-support': { title: "AI Integration", desc: "Automate support with custom AI agents.", link: "/services/web-development/web-apps" },
    'automation': { title: "Process Automation", desc: "Connect your tools and stop manual work.", link: "/services/web-development/api-integrations" },
    'headless': { title: "Headless CMS Migration", desc: "Empower your marketing team with a modern CMS.", link: "/services/web-development/headless-cms" },
    'performance': { title: "Performance Audit", desc: "Speed up your site to improve UX and Rankings.", link: "/services/performance" },
    'security': { title: "Security Hardenning", desc: "Protect your assets with enterprise-grade security.", link: "/services/enterprise-web" },
    'ux-audit': { title: "UX/UI Audit", desc: "Identify friction points and improve usability.", link: "/services/web-design/audit" }
};

const TroubleshooterWizard = () => {
    const { t } = useTranslation(['faq']); // Should localized titles later
    const [history, setHistory] = useState<string[]>(['goal']);
    const [result, setResult] = useState<string | null>(null);

    const currentStepId = history[history.length - 1];
    const currentStep = steps.find(s => s.id === currentStepId);

    const handleSelect = (option: any) => {
        if (option.result) {
            setResult(option.result);
        } else if (option.next) {
            setHistory([...history, option.next]);
        }
    };

    const reset = () => {
        setHistory(['goal']);
        setResult(null);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto my-16">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                        {result ? "Our Recommendation" : "Not sure where to start?"}
                    </h2>
                    {history.length > 1 && !result && (
                        <button onClick={reset} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                            Restart
                        </button>
                    )}
                    {result && (
                        <button onClick={reset} className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                            Start Over
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {!result && currentStep ? (
                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl text-slate-700 dark:text-slate-300 font-medium">
                                {currentStep.question}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentStep.options.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleSelect(opt)}
                                        className="text-left px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {opt.label}
                                            </span>
                                            <CaretRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : result && results[result as keyof typeof results] ? (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">
                                {results[result as keyof typeof results].title}
                            </h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                                {results[result as keyof typeof results].desc}
                            </p>
                            <a
                                href={results[result as keyof typeof results].link}
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                            >
                                Explore Solution <ArrowRight className="w-5 h-5" />
                            </a>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TroubleshooterWizard;
