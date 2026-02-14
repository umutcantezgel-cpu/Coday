import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Lightning,
  CodeBlock,
  CaretRight,
} from '@phosphor-icons/react';
import { OptimizedIcon } from '../../shared/ui/OptimizedIcon';

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
  const { t } = useTranslation('consulting');
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
    const currentQ = QUESTIONS[currentStep].id;
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
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 text-white">
      <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!started && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/50">
                <OptimizedIcon icon={Brain} className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {t('diagnostic.title')}
              </h3>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                {t('diagnostic.subtitle')}
              </p>
              <button
                onClick={() => setStarted(true)}
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto text-lg"
              >
                {t('diagnostic.start_btn')}
                <OptimizedIcon icon={ArrowRight} className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {started && !finished && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-mono text-blue-400">
                  0{currentStep + 1} / 0{QUESTIONS.length}
                </span>
                <div className="h-1 bg-slate-800 rounded-full flex-1 mx-4">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
                {t(`diagnostic.questions.${QUESTIONS[currentStep].id}.text`)}
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                {(['a', 'b', 'c'] as OptionKey[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="p-6 rounded-xl bg-slate-800 border-2 border-slate-700 hover:border-blue-500 hover:bg-slate-750 transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-full border border-slate-600 bg-slate-900 flex items-center justify-center mb-4 group-hover:border-blue-500 group-hover:bg-blue-500/10">
                      <span className="text-xs font-mono text-slate-400 group-hover:text-blue-400">
                        {opt.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium leading-snug">
                      {t(`diagnostic.questions.${QUESTIONS[currentStep].id}.options.${opt}`)}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {finished && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 mb-6 font-mono text-sm">
                ANALYSIS COMPLETE
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
                {t(`diagnostic.results.${resultKey}.title`)}
              </h3>
              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t(`diagnostic.results.${resultKey}.description`)}
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2">
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
                  className="px-8 py-4 bg-transparent border border-slate-600 text-slate-300 hover:text-white hover:border-white font-bold rounded-xl transition-all"
                >
                  Neustarten
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
