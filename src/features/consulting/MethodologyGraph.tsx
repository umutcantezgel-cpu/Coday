import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  MagnifyingGlass,
  Blueprint,
  Laptop,
  RocketLaunch,
  Trophy,
  ArrowRight,
} from '@phosphor-icons/react';
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
  const { t } = useTranslation(namespace);

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-purple-900 to-yellow-900 -z-10 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {STEPS.map((step, index) => (
            <motion.div
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
                                transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] z-10 relative bg-slate-900`}
              >
                <OptimizedIcon icon={step.icon} className={`w-8 h-8 ${step.color}`} />

                {/* Pulse Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl ${step.bg} animate-ping opacity-0 group-hover:opacity-50 transition-opacity`}
                />
              </div>

              {/* Mobile Connector */}
              {index < STEPS.length - 1 && (
                <div className="md:hidden flex justify-center mb-8">
                  <OptimizedIcon icon={ArrowRight} className="w-6 h-6 text-slate-700" />
                </div>
              )}

              {/* Content */}
              <div className="text-center px-2">
                <div className="inline-block px-2 py-1 rounded text-[10px] font-mono text-slate-500 bg-slate-800 mb-3 uppercase tracking-wider">
                  Step 0{step.id}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {t(`${prefix}.steps.${step.id}.title`)}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {t(`${prefix}.steps.${step.id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
