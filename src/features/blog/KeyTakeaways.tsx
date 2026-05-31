import React from 'react';
import { Lightbulb, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';

export interface KeyTakeaway {
  text: string;
  icon?: 'bulb' | 'check' | 'star';
}

export interface KeyTakeawaysProps {
  items: KeyTakeaway[];
  title?: string;
  className?: string;
}

export const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
  items,
  title = 'Wichtigste Erkenntnisse',
  className = '',
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative my-12 p-6 sm:p-8 rounded-2xl bg-secondary border border-white/[0.08] overflow-hidden ${className}`}
      aria-labelledby="key-takeaways-heading"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <header className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Lightbulb size={24} weight="duotone" />
          </div>
          <h2
            id="key-takeaways-heading"
            className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight"
          >
            {title}
          </h2>
        </header>

        {/* Semantic list for Answer Engine extractors */}
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              id={`takeaway-${idx}`}
              className="flex gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors motion-reduce:duration-[0.01ms] border border-transparent hover:border-white/[0.05]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <div className="mt-0.5 text-primary shrink-0">
                <CheckCircle size={20} weight="fill" />
              </div>
              <div>
                <strong className="block text-white font-medium mb-1">{item.text}</strong>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
