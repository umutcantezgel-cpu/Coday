import React from 'react';
import { m } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  MagnifyingGlass,
  Blueprint,
  Laptop,
  RocketLaunch,
  Trophy,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

const STEPS = [
  {
    id: '1',
    icon: MagnifyingGlass,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    id: '2',
    icon: Blueprint,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
  },
  {
    id: '3',
    icon: Laptop,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
  {
    id: '4',
    icon: RocketLaunch,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
  },
  {
    id: '5',
    icon: Trophy,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
  },
];

export interface MethodologyGraphProps {
  namespace?: string;
  prefix?: string;
}

export const MethodologyGraph: React.FC<MethodologyGraphProps> = ({
  namespace = 'consulting',
  prefix = 'methodology',
}) => {
  const t = useTranslations(namespace);

  return (
    <div
      className="w-full max-w-6xl mx-auto py-12"
      role="region"
      aria-label="Methodology process: 5 steps from analysis to results"
    >
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-1 bg-gradient-to-r from-teal-200 via-primary-200 to-amber-200 -z-10 rounded-full"
        />

        <ol className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {STEPS.map((step, index) => (
            <m.li
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group cursor-default"
            >
              {/* Icon Circle */}
              <div
                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 
                                ${step.bg} ${step.border} border-2 backdrop-blur-sm 
                                transition motion-reduce:duration-[0.01ms] duration-300 group-hover:scale-110 group-hover:shadow-md z-10 relative bg-white shadow-sm`}
              >
                <OptimizedIcon icon={step.icon} className={`w-8 h-8 ${step.color}`} />

                {/* Pulse Effect */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-2xl ${step.bg} animate-ping opacity-0 group-hover:opacity-30 transition-opacity motion-reduce:duration-[0.01ms] motion-reduce:animate-none`}
                />
              </div>

              {/* Mobile Connector */}
              {index < STEPS.length - 1 && (
                <div aria-hidden="true" className="md:hidden flex justify-center mb-8">
                  <OptimizedIcon icon={ArrowRight} className="w-6 h-6 text-slate-400" />
                </div>
              )}

              {/* Content */}
              <div className="text-center px-2">
                <div
                  aria-hidden="true"
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 mb-3 uppercase tracking-wider shadow-xs"
                >
                  Step 0{step.id}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors motion-reduce:duration-[0.01ms]">
                  {t(`${prefix}.steps.${step.id}.title`)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors motion-reduce:duration-[0.01ms]">
                  {t(`${prefix}.steps.${step.id}.desc`)}
                </p>
              </div>
            </m.li>
          ))}
        </ol>
      </div>
    </div>
  );
};
