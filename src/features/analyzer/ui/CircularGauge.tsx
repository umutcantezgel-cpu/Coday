import React from 'react';
import { motion } from 'framer-motion';

interface CircularGaugeProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    color: string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
    score,
    size = 60,
    strokeWidth = 6,
    color
}) => {
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Determine gradient colors based on score
    const getColor = (s: number) => {
        if (s >= 80) return '#22c55e'; // green-500
        if (s >= 50) return '#eab308'; // yellow-500
        return '#ef4444'; // red-500
    };

    const strokeColor = getColor(score);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress Circle */}
                <motion.circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Score Text */}
            <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-700" style={{ fontSize: size * 0.3 }}>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {Math.round(score)}
                </motion.span>
            </div>
        </div>
    );
};
