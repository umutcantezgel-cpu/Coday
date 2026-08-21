'use client';
import React, { useState } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { m } from 'motion/react';

const DesignSystemShowcase: React.FC = () => {
  const [theme, setTheme] = useState<'brand-a' | 'brand-b'>('brand-a');

  const themes = {
    'brand-a': {
      name: 'Playful Startup',
      primary: '#F59E0B', // Amber
      secondary: '#7C3AED', // Violet
      radius: '1.5rem', // Rounded-3xl
      font: 'font-display',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      bg: 'bg-neutral-100',
      textColor: 'text-gray-900',
      buttonText: 'text-gray-900',
      border: 'border-2 border-black',
    },
    'brand-b': {
      name: 'Enterprise Tech',
      primary: '#3B82F6', // Blue
      secondary: '#1E293B', // Slate
      radius: '0.25rem', // Rounded
      font: 'font-sans',
      shadow: 'shadow-sm hover:shadow-md',
      bg: 'bg-surface-elevated',
      textColor: 'text-slate-700',
      buttonText: 'text-white',
      border: 'border border-border-subtle',
    },
  };

  const current = themes[theme];

  return (
    <div className="bg-surface-light rounded-3xl p-8 border border-border-muted overflow-hidden relative">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="font-display font-bold text-2xl text-content-base">The Power of Tokens</h3>
          <p className="text-slate-500 text-sm mt-1">Ein System. Unendliche Möglichkeiten.</p>
        </div>

        {/* Toggle */}
        <div className="bg-surface-elevated p-1 rounded-xl border border-border-subtle flex gap-1">
          <button
            onClick={() => setTheme('brand-a')}
            aria-pressed={theme === 'brand-a'}
            className={`active:scale-[0.97] px-4 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${theme === 'brand-a' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-surface-muted'}`}
          >
            Playful
          </button>
          <button
            onClick={() => setTheme('brand-b')}
            aria-pressed={theme === 'brand-b'}
            className={`active:scale-[0.97] px-4 py-2 rounded-lg text-sm font-bold transition motion-reduce:duration-[0.01ms] ${theme === 'brand-b' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-surface-muted'}`}
          >
            Enterprise
          </button>
        </div>
      </div>

      <m.div
        layout
        className={`grid md:grid-cols-2 gap-8 p-8 rounded-2xl transition-colors motion-reduce:duration-[0.01ms] duration-500 ${current.bg} border border-border-subtle/50`}
      >
        {/* Card Component */}
        <m.div
          layout
          className={`p-6 ${current.bg} ${current.border} shadow-none`}
          style={{
            borderRadius: current.radius,
            boxShadow:
              theme === 'brand-a'
                ? '4px 4px 0px 0px rgba(0,0,0,1)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            className="w-12 h-12 mb-4 flex items-center justify-center rounded-full"
            style={{
              backgroundColor: current.primary,
              color: theme === 'brand-a' ? 'black' : 'white',
            }}
          >
            <Icon name="star" />
          </div>
          <h4 className={`text-xl font-bold mb-2 ${current.textColor} ${current.font}`}>
            Feature Card
          </h4>
          <p className={`text-sm mb-6 ${current.textColor} opacity-80`}>
            Hochwertige UI-Komponenten passen sich nahtlos an Ihre Markenidentität an.
          </p>
          <button
            className={`active:scale-[0.97] px-6 py-2 font-bold transition-transform motion-reduce:duration-[0.01ms] ${current.buttonText}`}
            style={{
              backgroundColor: current.secondary,
              borderRadius: current.radius,
              boxShadow: theme === 'brand-a' ? '2px 2px 0px 0px rgba(0,0,0,1)' : 'none',
            }}
          >
            Action
          </button>
        </m.div>

        {/* Input Elements */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="design-email" className={`text-sm font-bold ${current.textColor}`}>
              Email Address
            </label>
            <m.input
              layout
              id="design-email"
              type="text"
              placeholder="kontakt@unternehmen.de"
              className={`w-full px-4 py-3 outline-none transition motion-reduce:duration-[0.01ms] focus:ring-2`}
              style={{
                borderRadius: current.radius,
                border:
                  current.border.split(' ')[0] === 'border-2'
                    ? '2px solid black'
                    : '1px solid #e2e8f0',
                boxShadow: theme === 'brand-a' ? '2px 2px 0px 0px rgba(0,0,0,0.5)' : 'none',
              }}
            />
          </div>

          {/* Alert / Badge */}
          <m.div
            layout
            className={`p-4 flex items-center gap-3`}
            style={{
              backgroundColor: `${current.primary}20`,
              borderRadius: current.radius,
              border: theme === 'brand-a' ? '2px solid black' : `1px solid ${current.primary}40`,
            }}
          >
            <Icon name="info" style={{ color: theme === 'brand-a' ? 'black' : current.primary }} />
            <span className={`text-sm font-bold ${current.textColor}`}>System Alert</span>
          </m.div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked="true"
              aria-label="Toggle State"
              className="w-12 h-6 rounded-full relative transition-colors motion-reduce:duration-[0.01ms] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                backgroundColor: current.secondary,
                border: theme === 'brand-a' ? '2px solid black' : 'none',
              }}
            >
              <span
                className="absolute right-1 top-1 w-4 h-4 bg-surface-elevated rounded-full shadow-sm"
                aria-hidden="true"
              ></span>
            </button>
            <span className={`text-sm font-bold ${current.textColor}`}>Toggle State</span>
          </div>
        </div>
      </m.div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {['Primary Color', 'Border Radius', 'Typography'].map((label, i) => (
          <div key={i} className="text-center">
            <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">{label}</div>
            <div className="font-mono text-xs font-bold text-content-base bg-surface-elevated py-1 px-2 rounded border border-border-muted inline-block">
              {i === 0 && current.primary}
              {i === 1 && current.radius}
              {i === 2 && current.font}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignSystemShowcase;
