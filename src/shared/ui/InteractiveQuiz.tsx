import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

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
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        setShowResult(true);
        if (index === questions[currentQuestion].correctIndex) {
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
        <div className={`bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-secondary">{title}</h3>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {currentQuestion + 1}/{questions.length}
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <p className="text-lg font-medium text-secondary mb-6">{current.question}</p>

                        <div className="space-y-3">
                            {current.options.map((option, index) => {
                                const isCorrect = index === current.correctIndex;
                                const isSelected = index === selectedAnswer;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        disabled={selectedAnswer !== null}
                                        className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all
                      ${selectedAnswer === null
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
                                            <span className={`font-medium ${isSelected && !isCorrect ? 'text-red-600' : isCorrect && showResult ? 'text-green-600' : 'text-secondary'}`}>
                                                {option}
                                            </span>
                                            {showResult && isCorrect && <CheckCircle className="text-green-500" size={20} />}
                                            {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" size={20} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6"
                            >
                                <p className="text-sm text-slate-600 bg-white p-4 rounded-xl border border-gray-100 mb-4">
                                    💡 {current.explanation}
                                </p>
                                <button
                                    onClick={nextQuestion}
                                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    {currentQuestion < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'}
                                    <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="text-6xl mb-4">
                            {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🎉' : '📚'}
                        </div>
                        <h4 className="text-2xl font-bold text-secondary mb-2">
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
                            className="flex items-center gap-2 px-6 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-colors mx-auto"
                        >
                            <RotateCcw size={18} />
                            Nochmal versuchen
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveQuiz;
