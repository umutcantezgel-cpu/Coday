'use client';
import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowCounterClockwise,
  Trophy,
  Sparkle,
  BookOpen,
} from '@phosphor-icons/react/dist/ssr';
import { useRtl } from '@/shared/hooks/useRtl';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface InteractiveQuizProps {
  title: string;
  questions: QuizQuestion[];
  className?: string;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ title, questions, className = '' }) => {
  const { isRtl } = useRtl();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion]!.correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const current = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      className={`bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10 ${className}`}
      role="group"
      aria-labelledby="quiz-title"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 id="quiz-title" className="text-xl font-bold text-secondary">
          {title}
        </h3>
        <span
          className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
          aria-live="polite"
        >
          {currentQuestion + 1}/{questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Fortschritt: ${Math.round(progress)}%`}
      >
        <m.div
          className="h-full w-full bg-primary rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: isRtl ? 'right' : 'left' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <m.div
            key={currentQuestion}
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
          >
            <fieldset className="border-none p-0 m-0">
              <legend className="text-lg font-medium text-secondary mb-6">
                {current?.question}
              </legend>
              <div className="space-y-3">
                {current?.options?.map((option, index) => {
                  const isCorrect = index === current.correctIndex;
                  const isSelected = index === selectedAnswer;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      aria-pressed={isSelected}
                      className={`
                        w-full text-start p-4 rounded-xl border-2 transition motion-reduce:duration-[0.01ms]
                        ${
                          selectedAnswer === null
                            ? 'border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer'
                            : isCorrect
                              ? 'border-green-500 bg-green-50'
                              : isSelected
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 opacity-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-medium ${isSelected && !isCorrect ? 'text-red-600' : isCorrect && showResult ? 'text-green-600' : 'text-secondary'}`}
                        >
                          {option}
                        </span>
                        {showResult && isCorrect && (
                          <CheckCircle className="text-green-500" size={20} aria-label="Richtig" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="text-red-500" size={20} aria-label="Falsch" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            {showResult && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <p className="text-sm text-slate-600 bg-white p-4 rounded-xl border border-gray-100 mb-4"></p>
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors motion-reduce:duration-[0.01ms]"
                >
                  {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </m.div>
            )}
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                {score === questions.length ? (
                  <Trophy size={36} className="text-amber-500" />
                ) : score >= questions.length / 2 ? (
                  <Sparkle size={36} className="text-primary-500" />
                ) : (
                  <BookOpen size={36} className="text-slate-500" />
                )}
              </div>
            </div>
            <h4 className="text-2xl font-bold text-secondary mb-2" aria-live="polite">
              {score}/{questions.length} richtig!
            </h4>
            <p className="text-slate-600 mb-6">
              {score === questions.length
                ? 'Perfekt! Du bist ein Experte!'
                : score >= questions.length / 2
                  ? 'Gut gemacht! Weiter so!'
                  : 'Nicht schlecht! Lies den Artikel nochmal durch.'}
            </p>
            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-colors motion-reduce:duration-[0.01ms] mx-auto"
            >
              <ArrowCounterClockwise size={18} aria-hidden="true" />
              Nochmal versuchen
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveQuiz;
