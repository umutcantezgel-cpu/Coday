import React from 'react';
import { useTranslations } from 'next-intl';
import {
  // LockKey,
  Cloud,
  IdentificationCard,
  ChatCircleDots,
  ShieldCheck,
  Cpu,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { m } from 'motion/react';

export const TechSovereigntySection: React.FC = () => {
  const t = useTranslations('public-sector');

  const items = [
    {
      key: 'kubernetes',
      icon: Cloud,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
    },
    {
      key: 'iam',
      icon: IdentificationCard,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
    },
    {
      key: 'chat',
      icon: ChatCircleDots,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
    },
    {
      key: 'hosting',
      icon: ShieldCheck,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/20',
    },
  ];

  return (
    <section className="py-[var(--space-section)] bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <OptimizedIcon icon={Cpu} className="w-4 h-4" />
            <span>{t('tech_stack.title')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-4">
            {t('tech_stack.headline')}
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">{t('tech_stack.description')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <m.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border ${item.border} hover:bg-slate-800 transition-colors motion-reduce:duration-[0.01ms] group`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bg} ${item.color}`}
              >
                <OptimizedIcon icon={item.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {t(`tech_stack.items.${item.key}.title`)}
              </h3>

              {/* Tech Badge */}
              <div className="inline-block px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-4">
                {t(`tech_stack.items.${item.key}.tech`)}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {t(`tech_stack.items.${item.key}.desc`)}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};
