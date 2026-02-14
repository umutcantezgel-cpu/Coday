import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Buildings, CaretRight, Check, X, IdentificationCard, CreditCard, FileText } from '@phosphor-icons/react';
import { clsx } from 'clsx';

const OZG_LEVELS = [
    { id: 1, label: "Info Only", desc: "Static PDF downloads" },
    { id: 2, label: "Interactive", desc: "Digital forms (no auth)" },
    { id: 3, label: "Transactional", desc: "Full process with BundID" },
    { id: 4, label: "Integrated", desc: "Once-Only Principle (Data re-use)" }
];

const MODULES = [
    { id: 'bundid', icon: IdentificationCard, label: "BundID Integration", weight: 30 },
    { id: 'epayment', icon: CreditCard, label: "ePayment (PayPal/Giropay)", weight: 20 },
    { id: 'upload', icon: FileText, label: "Digital Document Upload", weight: 20 },
    { id: 'status', icon: CaretRight, label: "Real-time Status Tracking", weight: 30 }
];

export const OZGReadiness: React.FC = () => {
    const [activeModules, setActiveModules] = useState<string[]>([]);

    const toggleModule = (id: string) => {
        setActiveModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const score = MODULES.reduce((acc, m) => activeModules.includes(m.id) ? acc + m.weight : acc, 0);

    const getLevel = () => {
        if (score >= 90) return 4;
        if (score >= 60) return 3;
        if (score >= 30) return 2;
        return 1;
    };

    const currentLevel = getLevel();

    return (
        <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl">
            <div className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                        <Buildings size={32} weight="duotone" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">OZG 2.0 Readiness Check</h3>
                        <p className="text-gray-500">How digital is your administration really?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-400 uppercase mb-2">Select Implemented Features</p>
                        {MODULES.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => toggleModule(m.id)}
                                className={clsx(
                                    "w-full p-4 rounded-xl border flex items-center justify-between transition-all",
                                    activeModules.includes(m.id)
                                        ? "border-blue-500 bg-blue-50 text-blue-900 shadow-sm"
                                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <m.icon size={24} className={activeModules.includes(m.id) ? "text-blue-600" : "text-gray-400"} />
                                    <span className="font-medium">{m.label}</span>
                                </div>
                                <div className={clsx(
                                    "w-6 h-6 rounded-full flex items-center justify-center border",
                                    activeModules.includes(m.id) ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 bg-white"
                                )}>
                                    {activeModules.includes(m.id) && <Check size={14} weight="bold" />}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="dark:bg-gray-900 bg-gray-50 rounded-3xl p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase mb-6">Maturity Level</p>
                            <div className="space-y-6 relative">
                                {/* Connecting Line */}
                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />

                                {OZG_LEVELS.map((level) => {
                                    const isActive = currentLevel >= level.id;
                                    const isCurrent = currentLevel === level.id;

                                    return (
                                        <div key={level.id} className="relative pl-10">
                                            <motion.div
                                                className={clsx(
                                                    "absolute left-0 top-1 w-6 h-6 rounded-full border-4 z-10 box-border bg-white",
                                                    isActive ? "border-blue-600" : "border-gray-300"
                                                )}
                                                animate={{
                                                    scale: isCurrent ? 1.2 : 1,
                                                    borderColor: isActive ? "#2563EB" : "#D1D5DB"
                                                }}
                                            />
                                            <div className={clsx("transition-opacity", isActive ? "opacity-100" : "opacity-40")}>
                                                <h4 className={clsx("font-bold text-sm", isCurrent ? "text-blue-600" : "text-gray-900")}>
                                                    Level {level.id}: {level.label}
                                                </h4>
                                                <p className="text-xs text-gray-500">{level.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-500 text-sm">Readiness Score</span>
                                <span className="text-3xl font-mono font-bold text-gray-900">{score}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score}%` }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OZGReadiness;
