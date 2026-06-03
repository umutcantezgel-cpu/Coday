'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Lightning, Globe, Cpu } from '@phosphor-icons/react/dist/ssr';

export const Speedometer: React.FC = () => {
  const [score, setScore] = useState(0);

  // Simulate "Live Test"
  useEffect(() => {
    // While in view logic handled by parent or intersection observer is better,
    // but let's just cheat with a simple recursive timer for the "Live" feel
    const interval = setInterval(() => {
      setScore((prev) => (prev < 100 ? prev + 1 : 100));
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto" role="region" aria-label="Lighthouse Performance Score">
      {/* Main Gauge */}
      <div className="flex flex-col items-center justify-center mb-16 relative" aria-hidden="true">
        <div className="w-64 h-32 overflow-hidden relative">
          {/* Gauge Background */}
          <div className="w-64 h-64 rounded-full border-[20px] border-white/5 border-b-0 absolute top-0 left-0" />

          {/* Gauge Progress */}
          <motion.div
            initial={{ rotate: -180 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, type: 'spring' }}
            className="w-64 h-64 rounded-full border-[20px] border-primary border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0 rotate-45 origin-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} // Half circle clip
          />
        </div>

        {/* Needle / Score */}
        <div className="absolute top-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl font-black text-white font-display tracking-tighter"
            aria-live="polite"
            aria-atomic="true"
          >
            {score}
          </motion.div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            Lighthouse Score
          </span>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'First Contentful Paint',
            val: '0.2s',
            icon: Lightning,
            color: 'text-emerald-400',
          },
          { label: 'Global Request Latency', val: '45ms', icon: Globe, color: 'text-blue-400' },
          { label: 'Time to Interactive', val: '0s', icon: Cpu, color: 'text-cyan-400' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors motion-reduce:duration-[0.01ms]"
          >
            <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />
    </div>
  );
};
