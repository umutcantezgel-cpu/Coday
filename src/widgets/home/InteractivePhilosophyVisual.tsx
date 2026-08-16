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
      <div className="absolute inset-0 bg-primary-500/10 blur-3xl rounded-[2rem] transform -rotate-6 scale-105 pointer-events-none" />

      <m.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-hidden cursor-default"
      >
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent pointer-events-none" />

        {/* Top Header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-mono text-slate-700 font-semibold">
            performance.config.ts
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3.5" style={{ transform: 'translateZ(50px)' }}>
          {/* Lighthouse Score 1 */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 text-emerald-800 p-2 rounded-lg">
                <Lightning weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 font-mono font-bold text-lg">100</span>
            </div>
          </div>

          {/* Lighthouse Score 2 */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 text-primary-800 p-2 rounded-lg">
                <ChartLineUp weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900">SEO Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"
                style={{ animationDelay: '200ms' }}
              />
              <span className="text-primary-700 font-mono font-bold text-lg">100</span>
            </div>
          </div>

          {/* Lighthouse Score 3 */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-800 p-2 rounded-lg">
                <Code weight="fill" className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Best Practices</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"
                style={{ animationDelay: '400ms' }}
              />
              <span className="text-purple-700 font-mono font-bold text-lg">100</span>
            </div>
          </div>
        </div>

        {/* Footer Tech Stack */}
        <div
          className="mt-6 pt-4 border-t border-slate-200 flex justify-center gap-2"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-700 px-2.5 py-1 bg-slate-100 rounded-md shadow-xs border border-slate-200">
            React 19
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-700 px-2.5 py-1 bg-slate-100 rounded-md shadow-xs border border-slate-200">
            Next.js 15
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-700 px-2.5 py-1 bg-slate-100 rounded-md shadow-xs border border-slate-200">
            Edge
          </span>
        </div>
      </m.div>
    </div>
  );
};
