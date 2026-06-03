'use client';

import React from 'react';

import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Clock } from '@phosphor-icons/react';

const Events: React.FC = () => {
  return (
    <div className="bg-background-light min-h-dvh pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-display font-black text-5xl md:text-6xl text-gradient mb-6">
            Anstehende Events
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Workshops, Webinare und Meetups für die nächste Generation von Agenturen.
          </p>
        </div>

        <ul className="space-y-6" role="list">
          {[1, 2, 3].map((item) => (
            <li
              key={item}
              className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg focus-within:shadow-lg transition motion-reduce:duration-[0.01ms] duration-300 list-none"
            >
              <div className="md:w-1/3 bg-slate-100 relative h-48 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
                  <span className="block text-xs font-bold text-slate-500 uppercase">April</span>
                  <time dateTime={`2026-04-${10 + item}`} className="block text-xl font-black text-emerald-900 text-center">
                    {10 + item}
                  </time>
                </div>
              </div>

              <div className="p-8 md:w-2/3 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                    Webinar
                  </span>
                  <span className="text-slate-400 text-xs flex items-center">
                    <OptimizedIcon icon={Clock} className="text-[14px] mr-1" aria-hidden="true" />
                    <time dateTime={`2026-04-${10 + item}T14:00`}>14:00 - 15:30</time>
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Agency Growth Masterclass #{item}
                </h3>
                <p className="text-slate-500 mb-6 line-clamp-2">
                  Lerne wie du deine Agentur auf das nächste Level hebst mit modernsten Strategien
                  und Automatisierung.
                </p>

                <button className="active:scale-[0.97] self-start px-6 py-3 rounded-xl bg-gradient-ocean text-white font-bold text-sm shadow-md hover:shadow-lg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition motion-reduce:duration-[0.01ms]">
                  Jetzt anmelden
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;
