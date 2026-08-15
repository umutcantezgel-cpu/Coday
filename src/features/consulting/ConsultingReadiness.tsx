'use client';
import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Lightning,
  CodeBlock,
} from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';

type QuestionKey = 'q1' | 'q2' | 'q3' | 'q4';
type OptionKey = 'a' | 'b' | 'c';

interface Question {
  id: QuestionKey;
  icon: React.ElementType;
}

const QUESTIONS: Question[] = [
  { id: 'q1', icon: Brain },
  { id: 'q2', icon: Lightning },
  { id: 'q3', icon: CodeBlock },
  { id: 'q4', icon: ArrowRight }, // Placeholder icon
];

export const ConsultingReadiness: React.FC = () => {
  const t = useTranslations('consulting');
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<QuestionKey, OptionKey | null>>({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
  });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option: OptionKey) => {
    const currentQ = QUESTIONS[currentStep]!.id;
    setAnswers((prev) => ({ ...prev, [currentQ]: option }));

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = () => {
    // Simple logic: More 'a's -> Strategy, More 'c's -> Execution
    const counts = { a: 0, b: 0, c: 0 };
    Object.values(answers).forEach((val) => {
      if (val) counts[val]++;
    });

    if (counts.a >= 2) return 'strategy';
    if (counts.c >= 3) return 'execution';
    return 'hybrid';
  };

  const resultKey = calculateResult();

  return (
    <div
      className="w-full max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 text-slate-900"
      role="region"
      aria-label="Consulting readiness diagnostic"
    >
      <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!started && (
            <m.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <OptimizedIcon icon={Brain} className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-slate-900">
                {t('diagnostic.title')}
              </h2>
              <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
                {t('diagnostic.subtitle')}
              </p>
              <button
                onClick={() => setStarted(true)}
                className="active:scale-[0.97] px-8 py-4 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-colors motion-reduce:duration-[0.01ms] flex items-center gap-2 mx-auto text-lg shadow-lg shadow-primary-700/20"
              >
                {t('diagnostic.start_btn')}
                <OptimizedIcon icon={ArrowRight} className="w-5 h-5" />
              </button>
            </m.div>
          )}

          {started && !finished && (
            <m.div
              key="question"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-mono font-bold text-blue-600" aria-hidden="true">
                  0{currentStep + 1} / 0{QUESTIONS.length}
                </span>
                <div
                  className="h-1.5 bg-slate-100 rounded-full flex-1 mx-4 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={currentStep + 1}
                  aria-valuemin={1}
                  aria-valuemax={QUESTIONS.length}
                  aria-label={`Question ${currentStep + 1} of ${QUESTIONS.length}`}
                >
                  <div
                    className="h-full bg-blue-600 rounded-full transition motion-reduce:duration-[0.01ms] duration-500"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-slate-900">
                {t(`diagnostic.questions.${QUESTIONS[currentStep]!.id}.text`)}
              </h2>

              <div className="grid gap-4 md:grid-cols-3" role="group" aria-label="Answer options">
                {(['a', 'b', 'c'] as OptionKey[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="active:scale-[0.97] p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 transition motion-reduce:duration-[0.01ms] text-left group shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:bg-blue-50 shadow-xs">
                      <span className="text-xs font-mono font-bold text-slate-700 group-hover:text-blue-600">
                        {opt.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium leading-snug">
                      {t(`diagnostic.questions.${QUESTIONS[currentStep]!.id}.options.${opt}`)}
                    </p>
                  </button>
                ))}
              </div>
            </m.div>
          )}

          {finished && (
            <m.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-green-50 text-green-800 border border-green-200 mb-6 font-mono text-sm font-bold">
                ANALYSIS COMPLETE
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">
                {t(`diagnostic.results.${resultKey}.title`)}
              </h2>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t(`diagnostic.results.${resultKey}.description`)}
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="active:scale-[0.97] px-8 py-4 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl shadow-lg shadow-primary-700/20 flex items-center justify-center gap-2">
                  <OptimizedIcon icon={CheckCircle} className="w-5 h-5" />
                  {t(`diagnostic.results.${resultKey}.action`)}
                </button>
                <button
                  onClick={() => {
                    setFinished(false);
                    setStarted(false);
                    setCurrentStep(0);
                    setAnswers({ q1: null, q2: null, q3: null, q4: null });
                  }}
                  className="active:scale-[0.97] px-8 py-4 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold rounded-xl transition motion-reduce:duration-[0.01ms] shadow-xs"
                >
                  Neustarten
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
