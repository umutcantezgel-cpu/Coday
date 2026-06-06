import React from 'react';
import { useTranslations } from 'next-intl';
import { m } from 'motion/react';
import {
  XCircle,
  CheckCircle,
  Scales,
  CurrencyDollar,
  Clock,
  ShieldWarning,
  Trophy,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

export interface ProblemSolventMatrixProps {
  namespace?: string;
  prefix?: string;
}

export const ProblemSolventMatrix: React.FC<ProblemSolventMatrixProps> = ({
  namespace = 'consulting',
  prefix = 'matrix.rows',
}) => {
  const t = useTranslations(namespace);

  const ROWS = [
    {
      id: 'focus',
      icon: Scales,
      bad: 'Ticket Abarbeitung',
      good: 'Business Outcome',
    },
    {
      id: 'architecture',
      icon: ShieldWarning,
      bad: 'Gewachsenes Chaos',
      good: 'Skalierbare Module',
    },
    {
      id: 'speed',
      icon: Clock,
      bad: 'Schneller Start (Tech Dept)',
      good: 'Schnelles Scaling (Asset)',
    },
    {
      id: 'cost',
      icon: CurrencyDollar,
      bad: 'Stundensätze & Nachforderungen',
      good: 'Investment in Value',
    },
  ];

  return (
    <div
      className="w-full max-w-5xl mx-auto"
      role="region"
      aria-label="Comparison: Standard Dev Shop vs Coday Strategy Partner"
    >
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center md:text-left">
        <div className="md:col-span-1 flex items-center justify-center md:justify-start">
          <h2 className="text-2xl font-bold text-white">Der Unterschied</h2>
        </div>
        <div className="md:col-span-1 bg-red-500/10 py-2 rounded-t-xl md:rounded-xl border border-red-500/20 text-red-400 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2">
          <OptimizedIcon icon={XCircle} className="w-4 h-4" />
          Standard Dev Shop
        </div>
        <div className="md:col-span-1 bg-blue-500/10 py-2 rounded-t-xl md:rounded-xl border border-blue-500/20 text-blue-400 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2">
          <OptimizedIcon icon={Trophy} className="w-4 h-4" />
          Coday Strategy Partner
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {ROWS.map((row, index) => (
          <m.div
            key={row.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 bg-slate-800/50 rounded-2xl md:rounded-xl overflow-hidden md:bg-transparent"
          >
            {/* Label (Mobile: Top, Desktop: Left) */}
            <div className="p-4 md:p-6 flex items-center gap-4 bg-slate-800/80 md:bg-slate-800 md:rounded-xl border border-slate-700">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400">
                <OptimizedIcon icon={row.icon} className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-200">{t(`${prefix}.${row.id}.label`)}</span>
            </div>

            {/* Bad Side */}
            <div className="p-4 md:p-6 flex items-center gap-3 bg-red-900/5 md:bg-slate-800 md:rounded-xl border-x md:border border-slate-700/50 md:border-red-900/10 group hover:border-red-500/30 transition-colors motion-reduce:duration-[0.01ms]">
              <OptimizedIcon
                icon={XCircle}
                className="w-5 h-5 text-red-500/50 group-hover:text-red-500 transition-colors motion-reduce:duration-[0.01ms] shrink-0"
              />
              <span className="text-slate-400 group-hover:text-red-200 transition-colors motion-reduce:duration-[0.01ms] text-sm md:text-base">
                {t(`${prefix}.${row.id}.bad`)}
              </span>
            </div>

            {/* Good Side */}
            <div className="p-4 md:p-6 flex items-center gap-3 bg-blue-900/5 md:bg-slate-800 md:rounded-xl border-b md:border border-slate-700/50 md:border-blue-900/10 group hover:border-blue-500/30 transition-colors motion-reduce:duration-[0.01ms] shadow-[0_0_0_1px_rgba(59,130,246,0)_inset] hover:shadow-[0_0_0_1px_rgba(59,130,246,0.2)_inset]">
              <OptimizedIcon
                icon={CheckCircle}
                className="w-5 h-5 text-blue-500 shrink-0 shadow-lg shadow-blue-500/20"
              />
              <span className="text-white font-medium text-sm md:text-base">
                {t(`${prefix}.${row.id}.good`)}
              </span>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
};
