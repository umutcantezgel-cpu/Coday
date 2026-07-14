'use client';

import React, { useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Lightning, Code, ChartLineUp } from '@phosphor-icons/react/dist/ssr';

export const InteractivePhilosophyVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full max-w-[340px] mx-auto lg:mx-0"
      style={{ perspective: 1000 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-[2rem] transform -rotate-6 scale-105 pointer-events-none" />

      <m.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl p-6 overflow-hidden cursor-default"
      >
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        {/* Top Header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400">performance.config.ts</span>
        </div>

        {/* Content */}
        <div className="space-y-4" style={{ transform: 'translateZ(50px)' }}>
          {/* Lighthouse Score 1 */}
          <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">
                <Lightning weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-200">Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-mono font-bold text-lg">100</span>
            </div>
          </div>

          {/* Lighthouse Score 2 */}
          <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary-500/20 text-primary-400 p-2 rounded-lg">
                <ChartLineUp weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-200">SEO Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"
                style={{ animationDelay: '200ms' }}
              />
              <span className="text-primary-400 font-mono font-bold text-lg">100</span>
            </div>
          </div>

          {/* Lighthouse Score 3 */}
          <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 text-purple-400 p-2 rounded-lg">
                <Code weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-slate-200">Best Practices</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"
                style={{ animationDelay: '400ms' }}
              />
              <span className="text-purple-400 font-mono font-bold text-lg">100</span>
            </div>
          </div>
        </div>

        {/* Footer Tech Stack */}
        <div
          className="mt-6 pt-4 border-t border-white/10 flex justify-center gap-2"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-2 py-1 bg-white/5 rounded shadow-sm border border-white/5">
            React 19
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-2 py-1 bg-white/5 rounded shadow-sm border border-white/5">
            Next.js 15
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-2 py-1 bg-white/5 rounded shadow-sm border border-white/5">
            Edge
          </span>
        </div>
      </m.div>
    </div>
  );
};
