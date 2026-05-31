'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, TrendUp, ChartBar, Lock } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: number;
  }[];
}

export const DataMaturityAssessment: React.FC = () => {
  const t = useTranslations('blog.dataMaturity');
  const [currentStep, setCurrentStep] = useState(0);

  const QUESTIONS: Question[] = useMemo(
    () => [
      {
        id: 1,
        // Questions are hardcoded in German — UI shell (title, buttons, results) uses i18n keys
        text: 'Wie treffen Sie aktuell Marketing-Entscheidungen?',
        options: [
          { text: 'Bauchgefühl & Erfahrung', points: 1 },
          { text: 'Basis-Reports (Google Analytics)', points: 2 },
          { text: 'Excel-Tabellen & Manuelle Auswertung', points: 3 },
          { text: 'Echtzeit-Dashboards & Attribution Modeling', points: 4 },
        ],
      },
      // ... (rest of questions - assuming they stay content for now or I add more keys)
      // I will just put the array back inside for now to avoid the reference error, but I won't fully localize the questions body in this step if keys are missing.
      // I'll localize the Result Levels which I DID add keys for.
      {
        id: 2,
        text: 'Wie oft schauen Sie sich Ihre Marketing-Daten an?',
        options: [
          { text: 'Einmal im Monat (oder seltener)', points: 1 },
          { text: 'Wöchentlich', points: 2 },
          { text: 'Täglich', points: 3 },
          { text: 'Stündlich / Automatische Alerts', points: 4 },
        ],
      },
      {
        id: 3,
        text: 'Kennen Sie Ihren Customer Lifetime Value (CLV)?',
        options: [
          { text: 'Was ist das?', points: 1 },
          { text: 'Grobe Schätzung', points: 2 },
          { text: 'Ja, Durchschnittswert', points: 3 },
          { text: 'Ja, pro Kanal und Kohorte', points: 4 },
        ],
      },
      {
        id: 4,
        text: 'Was passiert mit Ihren Leads?',
        options: [
          { text: 'Landen im E-Mail Postfach', points: 1 },
          { text: 'Manuelle Eintragung in Excel', points: 2 },
          { text: 'Einfaches CRM (HubSpot free etc.)', points: 3 },
          { text: 'Vollautomatisches Nurturing & Scoring', points: 4 },
        ],
      },
    ],
    []
  );

  const LEVELS = useMemo(
    () => [
      {
        minDetails: 0,
        title: `Level 1: ${t('levels.0')}`,
        description: t('descriptions.0'),
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
      },
      {
        minDetails: 6,
        title: `Level 2: ${t('levels.1')}`,
        description: t('descriptions.1'),
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
      },
      {
        minDetails: 10,
        title: `Level 3: ${t('levels.2')}`,
        description: t('descriptions.2'),
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
      },
      {
        minDetails: 14,
        title: `Level 4: ${t('levels.3')}`,
        description: t('descriptions.3'),
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
      },
    ],
    [t]
  );
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setScore(0);
    setCurrentStep(0);
    setShowResult(false);
  };

  const getResult = () => {
    return [...LEVELS].reverse().find((l) => score >= l.minDetails) || LEVELS[0]!;
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="my-12 w-full max-w-3xl mx-auto font-sans">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow motion-reduce:duration-[0.01ms] duration-300">
        <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 flex items-center gap-2">
              <ChartBar className="w-6 h-6 text-primary" />
              {t('title')}
            </h3>
            {!showResult && (
              <span className="text-sm font-medium text-gray-900/60 bg-white px-3 py-1 rounded-full border border-gray-200">
                {t('questionStep', {
                  current: currentStep + 1,
                  total: QUESTIONS.length,
                })}
              </span>
            )}
          </div>

          {!showResult && (
            <div className="w-full bg-gray-200/30 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-8 leading-relaxed">
                  {QUESTIONS[currentStep]!.text}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUESTIONS[currentStep]!.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.points)}
                      className="active:scale-[0.97] group p-4 text-left rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all motion-reduce:duration-[0.01ms] duration-200 flex items-center justify-between"
                    >
                      <span className="text-gray-900 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                        {option.text}
                      </span>
                      <CheckCircle className="w-5 h-5 opacity-0 group-hover:opacity-100 text-primary transition-all motion-reduce:duration-[0.01ms] transform translate-x-2 group-hover:translate-x-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div
                  className={cn(
                    'inline-flex items-center justify-center w-20 h-20 rounded-full mb-6',
                    getResult().bg,
                    getResult().color
                  )}
                >
                  <TrendUp className="w-10 h-10" />
                </div>

                <h4 className="text-2xl font-bold text-gray-900 mb-2">{t('yourStatus')}</h4>
                <div
                  className={cn(
                    'text-3xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r',
                    score < 6
                      ? 'from-red-500 to-red-700'
                      : score < 10
                        ? 'from-orange-500 to-orange-700'
                        : score < 14
                          ? 'from-blue-500 to-blue-700'
                          : 'from-green-500 to-green-700'
                  )}
                >
                  {getResult().title}
                </div>

                <p className="text-lg text-gray-900/80 mb-8 max-w-lg mx-auto leading-relaxed">
                  {getResult().description}
                </p>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-left mb-8">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    {t('recommendation')}
                  </h5>
                  <ul className="space-y-3">
                    {score < 10 ? (
                      <>
                        <li className="flex items-start gap-2 text-sm text-gray-900/80">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Implementieren Sie sofort GDPR-konformes Server-Side Tracking.
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-900/80">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Definieren Sie KPI-Metriken, die echten Umsatz widerspiegeln.
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2 text-sm text-gray-900/80">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Nutzen Sie Predictive Analytics für Budget-Allokation.
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-900/80">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          Automatisieren Sie Bidding-Strategien basierend auf CLV.
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={reset}
                    className="active:scale-[0.97] px-6 py-2 rounded-lg text-gray-900/60 hover:text-primary hover:bg-primary/5 transition-all motion-reduce:duration-[0.01ms]"
                  >
                    {t('retry')}
                  </button>
                  <a
                    href="/contact"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:shadow-lg hover:opacity-90 transition-all motion-reduce:duration-[0.01ms] flex items-center gap-2"
                  >
                    {t('bookAudit')} <CheckCircle className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
