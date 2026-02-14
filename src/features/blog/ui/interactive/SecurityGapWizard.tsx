import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  LockKey,
  UserSwitch,
  Database,
  ArrowRight,
  CheckCircle,
  Warning,
  XCircle,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';

const QUESTIONS = [
  {
    id: 'auth',
    icon: UserSwitch,
    question: 'How do your employees log in?',
    options: [
      { label: "Password only (e.g. 'Password123')", score: 0 },
      { label: 'Password + SMS 2FA', score: 5 },
      { label: 'Hardware Key (YubiKey) or Biometrics', score: 10 },
    ],
  },
  {
    id: 'encryption',
    icon: LockKey,
    question: 'How is customer data stored?',
    options: [
      { label: 'Plain text (Excel/CSV)', score: 0 },
      { label: 'Standard DB Encryption', score: 5 },
      { label: 'End-to-End Encryption (Zero Knowledge)', score: 10 },
    ],
  },
  {
    id: 'backups',
    icon: Database,
    question: 'What is your Backup Strategy?',
    options: [
      { label: 'We manual copy files sometimes', score: 0 },
      { label: 'Daily automated backups (On-site)', score: 5 },
      { label: 'Immutable Off-site Backups (Ransomware Proof)', score: 10 },
    ],
  },
];

export const SecurityGapWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getResult = () => {
    if (percentage >= 90)
      return {
        title: 'Fort Knox',
        color: 'green',
        desc: 'You are ready for ISO 27001 validation.',
        icon: ShieldCheck,
      };
    if (percentage >= 50)
      return {
        title: 'Standard Protection',
        color: 'yellow',
        desc: 'Good basics, but vulnerable to targeted attacks.',
        icon: Warning,
      };
    return {
      title: 'Open Door',
      color: 'red',
      desc: 'Critical vulnerabilities detected. Immediate action required.',
      icon: XCircle,
    };
  };

  const result = getResult();
  const currentQuestion = QUESTIONS[step];

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl min-h-[400px] flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${((step + (showResult ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-lg"
            >
              <div className="mb-8 flex justify-center text-blue-600">
                <currentQuestion.icon size={48} weight="duotone" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-8">{currentQuestion.question}</h3>

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-blue-900">
                      {option.label}
                    </span>
                    <ArrowRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600"
                    />
                  </button>
                ))}
              </div>
              <div className="mt-8 text-xs text-xs text-gray-400 font-mono uppercase tracking-widest">
                Step {step + 1} of {QUESTIONS.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg"
            >
              <div
                className={clsx(
                  'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4',
                  result.color === 'green'
                    ? 'bg-green-100 border-green-200 text-green-600'
                    : result.color === 'yellow'
                      ? 'bg-yellow-100 border-yellow-200 text-yellow-600'
                      : 'bg-red-100 border-red-200 text-red-600'
                )}
              >
                <result.icon size={48} weight="fill" />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.title}</h3>
              <p className="text-gray-500 mb-8">{result.desc}</p>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase">Security Score</span>
                  <span className="text-2xl font-mono font-bold">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={clsx(
                      'h-full',
                      percentage >= 90
                        ? 'bg-green-500'
                        : percentage >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(0);
                  setScores([]);
                  setShowResult(false);
                }}
                className="text-gray-400 hover:text-gray-900 text-sm font-medium underline decoration-gray-300 underline-offset-4"
              >
                Restart Assessment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SecurityGapWizard;
