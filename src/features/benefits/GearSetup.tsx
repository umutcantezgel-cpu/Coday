'use client';
import React, { useState } from 'react';
import { m } from 'motion/react';
import { Desktop, Laptop, Monitor, Headphones } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const GearSetup: React.FC = () => {
  const [laptop, setLaptop] = useState<'mac' | 'win'>('mac');
  const [monitor, setMonitor] = useState<'ultra' | 'dual' | 'pro'>('ultra');
  const [audio, setAudio] = useState<'pods' | 'over'>('over');

  const equipment = {
    laptops: {
      mac: { name: 'MacBook Pro 16" M3 Max', desc: '128GB RAM · 4TB SSD' },
      win: { name: 'Dell XPS 15', desc: 'i9 · RTX 4070 · 64GB RAM' },
    },
    monitors: {
      ultra: { name: 'LG 49" Ultrawide', desc: '5120x1440 · 144Hz' },
      dual: { name: '2x Dell UltraSharp 27"', desc: '4K IPS · USB-C Hub' },
      pro: { name: 'Apple Studio Display', desc: '5K Retina · Nano-texture' },
    },
    audio: {
      pods: { name: 'AirPods Pro 2', desc: 'Active Noise Cancellation' },
      over: { name: 'Sony WH-1000XM5', desc: 'Industry leading noise canceling' },
    },
  };

  return (
    <div className="bg-surface-elevated rounded-3xl p-8 lg:p-12 border border-primary/10 overflow-hidden relative shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <OptimizedIcon icon={Desktop} className="text-[300px] text-primary" aria-hidden="true" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div>
          <h3 className="font-display font-bold text-3xl text-secondary-900 mb-2">Dein Setup.</h3>
          <p className="text-secondary-600 mb-8">
            Wähle deine Waffen. Wir bestellen alles vor deinem ersten Tag.
          </p>

          <div className="space-y-8">
            {/* Laptop Selector */}
            <div>
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-3 block">
                Machine
              </label>
              <div className="flex gap-4" role="group" aria-label="Machine auswählen">
                <button
                  aria-pressed={laptop === 'mac'}
                  onClick={() => setLaptop('mac')}
                  className={`active:scale-[0.97] flex-1 p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] text-left ${laptop === 'mac' ? 'bg-primary-50 border-primary-300 text-primary-900 shadow-sm' : 'bg-white border-neutral-200 text-secondary-600 hover:bg-neutral-50'}`}
                >
                  <div className="font-bold mb-1">Apple</div>
                  <div className="text-xs opacity-70">M3 Max</div>
                </button>
                <button
                  aria-pressed={laptop === 'win'}
                  onClick={() => setLaptop('win')}
                  className={`active:scale-[0.97] flex-1 p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] text-left ${laptop === 'win' ? 'bg-primary-50 border-primary-300 text-primary-900 shadow-sm' : 'bg-white border-neutral-200 text-secondary-600 hover:bg-neutral-50'}`}
                >
                  <div className="font-bold mb-1">Windows</div>
                  <div className="text-xs opacity-70">Dell XPS</div>
                </button>
              </div>
            </div>

            {/* Monitor Selector */}
            <div>
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-3 block">
                Display
              </label>
              <div className="grid grid-cols-3 gap-2" role="group" aria-label="Display auswählen">
                {[
                  { id: 'ultra', label: 'Ultrawide' },
                  { id: 'dual', label: 'Dual 4K' },
                  { id: 'pro', label: 'Studio' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    aria-pressed={monitor === opt.id}
                    onClick={() => setMonitor(opt.id as 'ultra' | 'dual' | 'pro')}
                    className={`active:scale-[0.97] p-3 rounded-lg border transition motion-reduce:duration-[0.01ms] text-sm font-bold ${monitor === opt.id ? 'bg-primary-50 border-primary-300 text-primary-900 shadow-sm' : 'bg-white border-neutral-200 text-secondary-600 hover:bg-neutral-50'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Selector */}
            <div>
              <label className="text-xs font-bold text-secondary-500 uppercase tracking-wider mb-3 block">
                Audio
              </label>
              <div className="flex gap-4" role="group" aria-label="Audio auswählen">
                <button
                  aria-pressed={audio === 'over'}
                  onClick={() => setAudio('over')}
                  className={`active:scale-[0.97] flex-1 p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] text-left ${audio === 'over' ? 'bg-primary-50 border-primary-300 text-primary-900 shadow-sm' : 'bg-white border-neutral-200 text-secondary-600 hover:bg-neutral-50'}`}
                >
                  <div className="font-bold mb-1">Over-Ear</div>
                  <div className="text-xs opacity-70">Sony XM5</div>
                </button>
                <button
                  aria-pressed={audio === 'pods'}
                  onClick={() => setAudio('pods')}
                  className={`active:scale-[0.97] flex-1 p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] text-left ${audio === 'pods' ? 'bg-primary-50 border-primary-300 text-primary-900 shadow-sm' : 'bg-white border-neutral-200 text-secondary-600 hover:bg-neutral-50'}`}
                >
                  <div className="font-bold mb-1">In-Ear</div>
                  <div className="text-xs opacity-70">AirPods Pro</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-neutral-50 rounded-2xl p-8 flex flex-col justify-center relative border border-neutral-200 shadow-inner">
          <div className="absolute top-4 right-4 text-xs font-mono text-green-600 font-bold flex items-center gap-2">
            <span
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse motion-reduce:animate-none"
              aria-hidden="true"
            ></span>
            READY TO SHIP
          </div>

          <div className="space-y-6">
            <m.div
              key={laptop}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-neutral-100 shadow-sm p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                <OptimizedIcon icon={Laptop} className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-secondary-900">{equipment.laptops[laptop].name}</h4>
                <p className="text-secondary-500 text-sm">{equipment.laptops[laptop].desc}</p>
              </div>
            </m.div>

            <m.div
              key={monitor}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-neutral-100 shadow-sm p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                <OptimizedIcon icon={Monitor} className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-secondary-900">{equipment.monitors[monitor].name}</h4>
                <p className="text-secondary-500 text-sm">{equipment.monitors[monitor].desc}</p>
              </div>
            </m.div>

            <m.div
              key={audio}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-neutral-100 shadow-sm p-4 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary-50 border border-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                <OptimizedIcon icon={Headphones} className="text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-secondary-900">{equipment.audio[audio].name}</h4>
                <p className="text-secondary-500 text-sm">{equipment.audio[audio].desc}</p>
              </div>
            </m.div>

            <div className="pt-8 border-t border-neutral-200 mt-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-secondary-500 text-xs uppercase tracking-wider mb-1 font-bold">
                    Gesamtwert (ca.)
                  </p>
                  <div className="text-3xl font-bold text-secondary-900 font-mono">
                    {laptop === 'mac' ? '€5.800' : '€4.200'}
                  </div>
                </div>
                <button className="active:scale-[0.97] px-4 py-2 bg-primary-600 text-white font-bold rounded-lg text-sm hover:bg-primary-700 transition-colors motion-reduce:duration-[0.01ms] shadow-sm">
                  Bestellung simulieren
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearSetup;
