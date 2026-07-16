'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'motion/react';
import {
  MagicWand,
  CaretRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  Buildings,
  GlobeHemisphereWest,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

type WizardStep = 'budget' | 'type' | 'result';
type BudgetOption = 'low' | 'mid' | 'high';
type TypeOption = 'service' | 'license';

export const TenderWizard: React.FC = () => {
  const t = useTranslations('public-sector');
  const [step, setStep] = useState<WizardStep>('budget');
  const [budget, setBudget] = useState<BudgetOption | null>(null);

  const handleBudgetSelect = (option: BudgetOption) => {
    setBudget(option);
    setStep('type');
  };

  const handleTypeSelect = (_option: TypeOption) => {
    setStep('result');
  };

  const resetWizard = () => {
    setStep('budget');
    setBudget(null);
  };

  const getResultKey = () => {
    if (budget === 'low') return 'direct';
    if (budget === 'high') return 'vgv';
    return 'uvgo';
  };

  const resultKey = getResultKey();

  const getResultIcon = () => {
    switch (resultKey) {
      case 'direct':
        return CheckCircle;
      case 'vgv':
        return GlobeHemisphereWest;
      default:
        return Buildings;
    }
  };

  const ResultIcon = getResultIcon();

  return (
    <section className="py-[var(--space-section)] bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <OptimizedIcon icon={MagicWand} className="w-4 h-4" />
            <span>{t('wizard.title')}</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            {t('wizard.headline')}
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">{t('wizard.description')}</p>
        </div>

        <div
          role="group"
          aria-label={t('wizard.headline')}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
        >
          {/* Step Progress Indicator */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
            role="list"
            aria-label={`Schritt ${step === 'budget' ? 1 : step === 'type' ? 2 : 3} von 3`}
          >
            {(['budget', 'type', 'result'] as const).map((s, idx) => (
              <div key={s} className="flex items-center" role="listitem">
                <div
                  className={`w-3 h-3 rounded-full transition-colors motion-reduce:duration-[0.01ms] ${
                    s === step
                      ? 'bg-blue-500'
                      : (step === 'type' && s === 'budget') || step === 'result'
                        ? 'bg-blue-500/50'
                        : 'bg-slate-600'
                  }`}
                  aria-current={s === step ? 'step' : undefined}
                />
                {idx < 2 && <div className="w-6 h-px bg-slate-600 mx-1" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <div aria-live="polite">
              {step === 'budget' && (
                <m.div
                  key="budget"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <p className="text-xl font-bold text-white mb-8 text-center">
                    {t('wizard.steps.budget.question')}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(['low', 'mid', 'high'] as BudgetOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleBudgetSelect(opt)}
                        className="active:scale-[0.97] p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:bg-blue-600 hover:border-blue-500 transition motion-reduce:duration-[0.01ms] group text-left"
                      >
                        <div className="w-3 h-3 rounded-full bg-slate-500 group-hover:bg-white mb-4" />
                        <span className="font-bold text-slate-200 group-hover:text-white block">
                          {t(`wizard.steps.budget.options.${opt}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </m.div>
              )}

              {step === 'type' && (
                <m.div
                  key="type"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <button
                    onClick={() => setStep('budget')}
                    aria-label="Zurück zum vorherigen Schritt"
                    className="active:scale-[0.97] mb-8 text-slate-400 hover:text-white flex items-center gap-2 text-sm"
                  >
                    <ArrowLeft aria-hidden="true" /> Zurück
                  </button>
                  <p className="text-xl font-bold text-white mb-8 text-center">
                    {t('wizard.steps.type.question')}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {(['service', 'license'] as TypeOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleTypeSelect(opt)}
                        className="active:scale-[0.97] p-6 rounded-xl bg-slate-700/50 border border-slate-600 hover:bg-blue-600 hover:border-blue-500 transition motion-reduce:duration-[0.01ms] group flex items-center gap-4"
                      >
                        <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-blue-500/20">
                          <OptimizedIcon
                            icon={FileText}
                            className="w-6 h-6 text-slate-400 group-hover:text-white"
                          />
                        </div>
                        <span className="font-bold text-slate-200 group-hover:text-white">
                          {t(`wizard.steps.type.options.${opt}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </m.div>
              )}

              {step === 'result' && (
                <m.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center"
                >
                  <div className="inline-block p-4 rounded-full bg-emerald-500/10 mb-6">
                    <OptimizedIcon icon={ResultIcon} className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-700 text-xs font-mono text-slate-300 mb-4 border border-slate-600">
                    {t(`wizard.results.${resultKey}.badge`)}
                  </div>
                  <p className="text-3xl font-bold text-white mb-4">
                    {t(`wizard.results.${resultKey}.title`)}
                  </p>
                  <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
                    {t(`wizard.results.${resultKey}.desc`)}
                  </p>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button
                      onClick={resetWizard}
                      className="active:scale-[0.97] text-slate-400 hover:text-white px-6 py-3"
                    >
                      Neu starten
                    </button>
                    <Link
                      href={`?type=${resultKey}#contact`}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-colors motion-reduce:duration-[0.01ms] flex items-center justify-center gap-2"
                    >
                      {t(`wizard.results.${resultKey}.action`)}
                      <CaretRight weight="bold" />
                    </Link>
                  </div>
                </m.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
