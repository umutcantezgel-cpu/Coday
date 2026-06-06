'use client';
import React, { useState } from 'react';
import { m } from 'motion/react';
import { Palette, CornersOut, ArrowsOut, Check } from '@phosphor-icons/react/dist/ssr';
import { clsx } from 'clsx';

export const ComponentConfigurator: React.FC = () => {
  const [radius, setRadius] = useState<'none' | 'sm' | 'md' | 'lg' | 'full'>('md');
  const [color, setColor] = useState<'blue' | 'purple' | 'green' | 'red'>('blue');
  const [padding, setPadding] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');

  const radiusMap = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-[2rem]',
    full: 'rounded-full',
  };

  const colorMap = {
    blue: 'bg-blue-600 shadow-blue-200',
    purple: 'bg-purple-600 shadow-purple-200',
    green: 'bg-green-600 shadow-green-200',
    red: 'bg-red-600 shadow-red-200',
  };

  const paddingMap = {
    compact: 'p-4',
    comfortable: 'p-8',
    spacious: 'p-12',
  };

  return (
    <div className="my-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Controls */}
      <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-200 shadow-lg space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
            <Palette size={20} className="text-gray-400" />
            <span>Brand Color</span>
          </div>
          <div className="flex gap-3">
            {(['blue', 'purple', 'green', 'red'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={clsx(
                  'active:scale-[0.97]',
                  'w-10 h-10 rounded-full border-2 transition motion-reduce:duration-[0.01ms] shadow-sm',
                  color === c ? 'border-gray-900 scale-110' : 'border-transparent scale-100',
                  c === 'blue' && 'bg-blue-600',
                  c === 'purple' && 'bg-purple-600',
                  c === 'green' && 'bg-green-600',
                  c === 'red' && 'bg-red-600'
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
            <CornersOut size={20} className="text-gray-400" />
            <span>Border Radius</span>
          </div>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className={clsx(
                  'active:scale-[0.97]',
                  'flex-1 py-2 text-xs font-bold rounded-md transition motion-reduce:duration-[0.01ms] capitalize',
                  radius === r
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
            <ArrowsOut size={20} className="text-gray-400" />
            <span>Spacing Density</span>
          </div>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {(['compact', 'comfortable', 'spacious'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPadding(p)}
                className={clsx(
                  'active:scale-[0.97]',
                  'flex-1 py-2 text-xs font-bold rounded-md transition motion-reduce:duration-[0.01ms] capitalize',
                  padding === p
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2 bg-gray-50 rounded-3xl border border-gray-200 flex items-center justify-center min-h-[400px] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 to-transparent" />

        <m.div
          layout
          className={clsx(
            'bg-white shadow-2xl max-w-sm w-full mx-8 relative z-10 transition motion-reduce:duration-[0.01ms] duration-300 ease-out',
            radiusMap[radius],
            paddingMap[padding]
          )}
        >
          <div className="flex items-start gap-4 mb-6">
            <m.div
              layout
              className={clsx(
                'w-12 h-12 flex items-center justify-center text-white shadow-xl',
                colorMap[color],
                radius === 'full'
                  ? 'rounded-full'
                  : radius === 'none'
                    ? 'rounded-none'
                    : 'rounded-lg'
              )}
            >
              <Check size={24} weight="bold" />
            </m.div>
            <div>
              <m.div layout className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <m.div layout className="h-3 w-48 bg-gray-100 rounded" />
            </div>
          </div>

          <m.div layout className="space-y-3 mb-8">
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-5/6 bg-gray-100 rounded" />
            <div className="h-2 w-4/6 bg-gray-100 rounded" />
          </m.div>

          <m.button
            layout
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={clsx(
              'w-full py-3 px-6 text-white font-bold shadow-lg transition-colors motion-reduce:duration-[0.01ms]',
              colorMap[color],
              radius === 'full' ? 'rounded-full' : radius === 'none' ? 'rounded-none' : 'rounded-lg' // Buttons usually match brand radius
            )}
          >
            Primary Action
          </m.button>
        </m.div>
      </div>
    </div>
  );
};

export default ComponentConfigurator;
