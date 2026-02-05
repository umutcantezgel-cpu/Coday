import React from 'react';
import { motion } from 'framer-motion';

interface UrgencyMeterProps {
    score: number;
    showDetails?: boolean;
}

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({ score, showDetails = true }) => {
    // Calculate angle for gauge needle (-90 to 90 degrees)
    const needleAngle = -90 + (score / 100) * 180;

    // Get urgency level
    const getUrgencyLevel = (score: number) => {
        if (score <= 30) return { level: 'Niedrig', color: 'text-green-500', bg: 'from-green-400 to-green-600' };
        if (score <= 60) return { level: 'Mittel', color: 'text-yellow-500', bg: 'from-yellow-400 to-orange-500' };
        if (score <= 80) return { level: 'Hoch', color: 'text-orange-500', bg: 'from-orange-400 to-red-500' };
        return { level: 'Kritisch', color: 'text-red-500', bg: 'from-red-500 to-red-700' };
    };

    const { level, color, bg } = getUrgencyLevel(score);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            {/* Header */}
            <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-600 uppercase tracking-wider mb-2">
                    Dringlichkeit
                </h3>
                <p className="text-sm text-gray-500">
                    Wie schnell solltest du handeln?
                </p>
            </div>

            {/* Gauge */}
            <div className="relative w-64 h-32 mx-auto mb-6">
                {/* Background Arc */}
                <svg viewBox="0 0 200 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="33%" stopColor="#eab308" />
                            <stop offset="66%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                    </defs>

                    {/* Arc Background */}
                    <path
                        d="M 10 100 A 90 90 0 0 1 190 100"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />

                    {/* Colored Arc */}
                    <path
                        d="M 10 100 A 90 90 0 0 1 190 100"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="16"
                        strokeLinecap="round"
                    />

                    {/* Tick Marks */}
                    {[0, 25, 50, 75, 100].map((tick, i) => {
                        const angle = -90 + (tick / 100) * 180;
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 100 + 75 * Math.cos(rad);
                        const y1 = 100 + 75 * Math.sin(rad);
                        const x2 = 100 + 85 * Math.cos(rad);
                        const y2 = 100 + 85 * Math.sin(rad);

                        return (
                            <g key={tick}>
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9ca3af" strokeWidth="2" />
                                <text
                                    x={100 + 65 * Math.cos(rad)}
                                    y={100 + 65 * Math.sin(rad)}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xs fill-gray-400 font-medium"
                                >
                                    {tick}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Needle */}
                <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: needleAngle }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                    className="absolute bottom-0 left-1/2 origin-bottom"
                    style={{ width: '4px', height: '70px', marginLeft: '-2px' }}
                >
                    <div className={`w-full h-full bg-gradient-to-t ${bg} rounded-full shadow-lg`} />
                    <div className="absolute -bottom-2 left-1/2 w-4 h-4 -ml-2 bg-gray-800 rounded-full shadow-lg" />
                </motion.div>
            </div>

            {/* Score Display */}
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className={`text-5xl font-black ${color} mb-2`}
                >
                    {score}
                </motion.div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${bg} text-white font-bold`}>
                    <span className="material-symbols-outlined text-sm">
                        {score <= 30 ? 'check_circle' : score <= 60 ? 'warning' : 'error'}
                    </span>
                    {level}
                </div>
            </div>

            {/* Details */}
            {showDetails && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                            <div className="font-bold text-green-500">0-30</div>
                            <div className="text-gray-500">Niedrig</div>
                        </div>
                        <div>
                            <div className="font-bold text-yellow-500">31-60</div>
                            <div className="text-gray-500">Mittel</div>
                        </div>
                        <div>
                            <div className="font-bold text-red-500">61-100</div>
                            <div className="text-gray-500">Hoch</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UrgencyMeter;
