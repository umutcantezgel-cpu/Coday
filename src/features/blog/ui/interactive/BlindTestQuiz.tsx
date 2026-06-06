'use client';
import React, { useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import { Trophy, Warning } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/shared/lib/utils';

interface VotingOption {
  id: 'ai' | 'human';
  image: string;
  label: string;
  price: string;
  conversionRate: string;
  isWinner: boolean;
}

const BlindTestQuiz: React.FC = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selected, setSelected] = useState<'ai' | 'human' | null>(null);

  const options: VotingOption[] = [
    {
      id: 'ai',
      image: '/images/brand/coday-full.webp', // Placeholder
      label: 'Design A',
      price: '500€',
      conversionRate: '0.8%',
      isWinner: false,
    },
    {
      id: 'human',
      image: '/images/brand/coday-full.webp', // Placeholder
      label: 'Design B',
      price: '15.000€',
      conversionRate: '4.2%',
      isWinner: true,
    },
  ];

  const handleVote = (id: 'ai' | 'human') => {
    if (hasVoted) return;
    setSelected(id);
    setHasVoted(true);
  };

  return (
    <section
      className="my-16 scroll-mt-24"
      id="blind-test-quiz"
      aria-label="Blind-Test: Welches Design verkauft mehr?"
    >
      <div className="text-center mb-8">
        <h3 className="font-display font-bold text-3xl text-secondary mb-3">
          Blind-Test: Welches Design verkauft mehr?
        </h3>
        <p className="text-gray-600">
          Klicken Sie auf das Design, das hochwertiger und vertrauenswürdiger wirkt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {options.map((option) => (
          <div key={option.id} className="relative group">
            {/* Image Card */}
            <m.button
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              whileHover={!hasVoted ? { scale: 1.02 } : {}}
              whileTap={!hasVoted ? { scale: 0.98 } : {}}
              className={cn(
                'w-full aspect-[4/5] rounded-3xl overflow-hidden border-4 transition motion-reduce:duration-[0.01ms] duration-500 relative bg-gray-100',
                hasVoted && selected === option.id
                  ? 'border-primary shadow-2xl shadow-primary/20'
                  : 'border-transparent hover:border-gray-200 shadow-lg',
                hasVoted && !option.isWinner && 'grayscale-[0.5] opacity-70'
              )}
            >
              {/* Overlay for "Click to Vote" */}
              {!hasVoted && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors motion-reduce:duration-[0.01ms] z-10 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-secondary font-bold px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition motion-reduce:duration-[0.01ms] duration-300">
                    Dieses Design wählen
                  </span>
                </div>
              )}

              {/* Actual Image (using placeholders for now, maybe simple colored blocks or generic images) */}
              <div
                className={cn(
                  'w-full h-full flex items-center justify-center text-gray-400 bg-gray-100',
                  option.id === 'ai' ? 'bg-indigo-50' : 'bg-emerald-50'
                )}
              >
                <span className="font-display font-bold text-2xl opacity-20" aria-hidden="true">
                  {option.label}
                </span>
              </div>

              {/* 
               <OptimizedImage
                src={option.image}
                alt={option.label}
                className="w-full h-full object-cover"
              /> 
              */}
            </m.button>

            {/* Result Reveal */}
            <AnimatePresence>
              {hasVoted && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={cn(
                    'mt-6 p-6 rounded-2xl border backdrop-blur-sm',
                    option.isWinner ? 'bg-primary/5 border-primary/20' : 'bg-red-50 border-red-100'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        'font-bold text-lg',
                        option.isWinner ? 'text-primary' : 'text-gray-600'
                      )}
                    >
                      {option.id === 'ai' ? 'Der "Baukasten"' : 'Das "Meisterwerk"'}
                    </span>
                    {option.isWinner ? (
                      <Trophy size={24} className="text-primary" weight="fill" />
                    ) : (
                      <Warning size={24} className="text-red-400" />
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-gray-500">Kostenfaktor:</span>
                      <span className="font-mono font-bold text-secondary">{option.price}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/50 pb-2">
                      <span className="text-gray-500">Conversion Rate:</span>
                      <span
                        className={cn(
                          'font-mono font-bold',
                          option.isWinner ? 'text-green-600' : 'text-red-500'
                        )}
                      >
                        {option.conversionRate}
                      </span>
                    </div>
                    <div className="pt-2 text-xs leading-relaxed opacity-80">
                      {option.id === 'ai'
                        ? "Standard-Template. Nutzt 'Stock-Fotos' und generische Layouts. Wirkt billig."
                        : 'Maßgeschneidert. Nutzt Psychologie und Branding. Wirkt autoritär.'}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {hasVoted && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center p-8 bg-gray-50 rounded-3xl border border-gray-100"
          aria-live="polite"
        >
          <h4 className="font-bold text-xl text-secondary mb-2">Die Wahrheit tut weh.</h4>
          <p className="text-gray-600 max-w-2xl mx-auto">
            87% der Nutzer entschieden sich für Design B, obwohl es 30x mehr kostet. Warum? Weil
            Qualität Vertrauen schafft. Und Vertrauen ist die Währung des Internets.
          </p>
        </m.div>
      )}
    </section>
  );
};

export default BlindTestQuiz;
