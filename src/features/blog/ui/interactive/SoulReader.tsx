import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, HandPalm, Robot } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { OptimizedImage } from '../../../../shared/ui/OptimizedImage';

interface SoulReaderProps {
  data?: {
    mode?: string;
    title?: string;
    description?: string;
  };
}

export const SoulReader: React.FC<SoulReaderProps> = ({ data }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selected, setSelected] = useState<'human' | 'ai' | null>(null);

  const handleVote = (choice: 'human' | 'ai') => {
    if (hasVoted) return;
    setSelected(choice);
    setHasVoted(true);
  };

  const isCorrect = selected === 'human';

  return (
    <div className="my-16 relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gray-50 shadow-2xl">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 p-8 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
              Interactive Experiment
            </span>
          </div>

          <h3 className="text-3xl md:text-5xl font-display font-bold text-secondary mb-4">
            {data?.title || 'The Turing Test for Design'}
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            {data?.description ||
              'Can you feel the difference? One of these images was crafted by a human soul, the other by a GPU. Choose the human one.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Human Option */}
          <QuizOption
            type="human"
            image="/images/blog/anti-ai-human.webp"
            label="Option A"
            hasVoted={hasVoted}
            isSelected={selected === 'human'}
            onSelect={() => handleVote('human')}
            isCorrect={true}
          />

          {/* AI Option */}
          <QuizOption
            type="ai"
            image="/images/blog/anti-ai-artificial.webp"
            label="Option B"
            hasVoted={hasVoted}
            isSelected={selected === 'ai'}
            onSelect={() => handleVote('ai')}
            isCorrect={false}
          />
        </div>

        <AnimatePresence>
          {hasVoted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-12 overflow-hidden"
            >
              <div
                className={clsx(
                  'p-8 rounded-2xl border-2 text-left relative overflow-hidden',
                  isCorrect ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'
                )}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                  <div
                    className={clsx(
                      'w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-3xl shadow-lg',
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    )}
                  >
                    {isCorrect ? <HandPalm weight="fill" /> : <Robot weight="fill" />}
                  </div>
                  <div>
                    <h4
                      className={clsx(
                        'text-2xl font-bold mb-2',
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      )}
                    >
                      {isCorrect ? 'Correct! You felt it.' : 'You were deceived.'}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {isCorrect
                        ? "The sketch on the left has imperfections, varied line weight, and chaotic energy. That is the human touch. AI struggles with 'happy accidents'."
                        : "You picked the AI generation. It's cleaner, glossier, and technically 'perfect'. But it lacks the raw, chaotic energy of the human sketch. Don't worry, 60% of people get this wrong."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface QuizOptionProps {
  type: 'human' | 'ai';
  image: string;
  label: string;
  hasVoted: boolean;
  isSelected: boolean;
  onSelect: () => void;
  isCorrect: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  image,
  label,
  hasVoted,
  isSelected,
  onSelect,
  isCorrect,
}) => {
  const isRevealed = hasVoted;

  return (
    <button
      onClick={onSelect}
      disabled={hasVoted}
      className="group relative w-full text-left focus:outline-none"
    >
      <div
        className={clsx(
          'relative aspect-square rounded-[2rem] overflow-hidden border-4 transition-all duration-500 shadow-2xl',
          !hasVoted &&
            'hover:scale-[1.02] border-transparent hover:border-primary/50 cursor-pointer',
          hasVoted && isCorrect && 'border-green-500 ring-4 ring-green-500/20 grayscale-0',
          hasVoted && !isCorrect && 'border-red-500 ring-4 ring-red-500/20 grayscale-[0.8]',
          hasVoted && !isCorrect && !isSelected && 'opacity-50 grayscale'
        )}
      >
        <OptimizedImage src={image} alt={label} className="w-full h-full object-cover" />

        {/* Overlay Result */}
        {isRevealed && (
          <div
            className={clsx(
              'absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 animate-[fadeIn_0.5s_forwards]'
            )}
          >
            {isCorrect ? (
              <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform">
                <CheckCircle size={24} weight="fill" /> HUMAN
              </div>
            ) : (
              <div className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform">
                <Robot size={24} weight="fill" /> AI
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center px-4">
        <span className="text-xl font-bold text-gray-400 group-hover:text-primary transition-colors">
          {label}
        </span>
        {!hasVoted && (
          <span className="px-4 py-1 rounded-full border border-gray-200 text-sm font-medium text-gray-500 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            Select
          </span>
        )}
      </div>
    </button>
  );
};
