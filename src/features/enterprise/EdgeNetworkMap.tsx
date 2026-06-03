import React from 'react';
import { motion } from 'motion/react';

const locations = [
  { x: 50, y: 30, name: 'New York' },
  { x: 48, y: 35, name: 'Washington' },
  { x: 15, y: 35, name: 'California' },
  { x: 85, y: 25, name: 'London' },
  { x: 90, y: 28, name: 'Frankfurt' }, // Central DB
  { x: 95, y: 20, name: 'Stockholm' },
  { x: 140, y: 40, name: 'Tokyo' },
  { x: 130, y: 50, name: 'Singapore' },
  { x: 150, y: 70, name: 'Sydney' },
  { x: 70, y: 80, name: 'São Paulo' },
];

export const EdgeNetworkMap: React.FC = () => {
  return (
    <div role="img" aria-label="Global Edge Network Map showing server locations in New York, Washington, California, London, Frankfurt, Stockholm, Tokyo, Singapore, Sydney, and São Paulo connected via Frankfurt hub" className="relative w-full aspect-video md:aspect-[2/1] bg-secondary/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8">
      <div className="absolute top-4 start-6 z-10">
        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
          Global Edge Network
        </div>
        <div className="text-2xl font-black text-secondary">Latency is the Enemy.</div>
      </div>

      {/* Simulated Map Container - Using simple dots for abstract map to avoid heavy SVG assets */}
      <div className="relative w-full h-full max-w-4xl max-h-[500px]" aria-hidden="true">
        {/* World Map Outline (Simplified/Abstract) */}
        <svg
          className="w-full h-full absolute inset-0 opacity-10"
          viewBox="0 0 200 100"
          aria-hidden="true"
        >
          <path
            d="M20,30 Q50,10 80,30 T150,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {/* Just a stylized curve for aesthetics, as real map path is huge */}
        </svg>

        {locations.map((loc, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3"
            style={{ left: `${(loc.x / 180) * 100}%`, top: `${loc.y}%` }}
          >
            {/* Pulse */}
            <motion.div
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="absolute inset-0 bg-primary rounded-full motion-reduce:hidden"
            />
            {/* Dot */}
            <div className="w-3 h-3 bg-primary rounded-full relative z-10 shadow-[0_0_10px_theme(colors.primary)]" />

            {/* Label (Tooltips on hover could apply here) */}
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 opacity-0 hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms] whitespace-nowrap">
              {loc.name}
            </span>
          </motion.div>
        ))}

        {/* Connection Lines (Frankfurt Hub) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {locations.map((loc, i) => {
            if (loc.name === 'Frankfurt') return null;
            const frankfurt = locations.find((l) => l.name === 'Frankfurt')!;
            const x1 = (frankfurt.x / 180) * 100;
            const y1 = frankfurt.y;
            const x2 = (loc.x / 180) * 100;
            const y2 = loc.y;

            return (
              <motion.line
                key={i}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#gradient)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 1, delay: 1 }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#147a7a" />
              <stop offset="100%" stopColor="#2D3748" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
