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
          <h2 className="text-2xl font-bold text-slate-900">Der Unterschied</h2>
        </div>
        <div className="md:col-span-1 bg-red-50 py-2 rounded-t-xl md:rounded-xl border border-red-200 text-red-700 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs">
          <OptimizedIcon icon={XCircle} className="w-4 h-4 text-red-600" />
          Standard Dev Shop
        </div>
        <div className="md:col-span-1 bg-blue-50 py-2 rounded-t-xl md:rounded-xl border border-blue-200 text-blue-800 font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs">
          <OptimizedIcon icon={Trophy} className="w-4 h-4 text-blue-600" />
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
            className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 bg-white rounded-2xl md:rounded-xl overflow-hidden shadow-sm"
          >
            {/* Label (Mobile: Top, Desktop: Left) */}
            <div className="p-4 md:p-6 flex items-center gap-4 bg-slate-50 md:rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                <OptimizedIcon icon={row.icon} className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900">{t(`${prefix}.${row.id}.label`)}</span>
            </div>

            {/* Bad Side */}
            <div className="p-4 md:p-6 flex items-center gap-3 bg-red-50/40 md:rounded-xl border-x md:border border-slate-200 group hover:border-red-300 transition-colors motion-reduce:duration-[0.01ms]">
              <OptimizedIcon
                icon={XCircle}
                className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors motion-reduce:duration-[0.01ms] shrink-0"
              />
              <span className="text-slate-600 group-hover:text-red-800 transition-colors motion-reduce:duration-[0.01ms] text-sm md:text-base">
                {t(`${prefix}.${row.id}.bad`)}
              </span>
            </div>

            {/* Good Side */}
            <div className="p-4 md:p-6 flex items-center gap-3 bg-blue-50/40 md:rounded-xl border-b md:border border-slate-200 group hover:border-blue-300 transition-colors motion-reduce:duration-[0.01ms] shadow-sm">
              <OptimizedIcon icon={CheckCircle} className="w-5 h-5 text-blue-600 shrink-0" />
              <span className="text-slate-900 font-bold text-sm md:text-base">
                {t(`${prefix}.${row.id}.good`)}
              </span>
            </div>
          </m.div>
        ))}
      </div>
    </div>
  );
};
