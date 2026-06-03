'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { staggerContainer, fadeUpVariants, STAGGER, TRANSITION } from '@/shared/lib/motion';

interface TimelineItem {
  week: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  return (
    <div className={`relative py-8 ${className}`} aria-label="Projektzeitplan">
      {/* Horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 rounded-full" aria-hidden="true" />

      <motion.ol
        className="flex justify-between items-start relative list-none p-0 m-0"
        variants={staggerContainer(STAGGER.hero)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUpVariants}
            transition={TRANSITION.reveal}
            className="flex flex-col items-center text-center group cursor-pointer"
            style={{ width: `${100 / items.length}%` }}
            aria-current={item.completed ? undefined : index === 0 ? 'step' : undefined}
          >
            {/* Node */}
            <div
              className={`
              relative z-10 w-12 h-12 rounded-full flex items-center justify-center
              transition motion-reduce:duration-[0.01ms] duration-300 group-hover:scale-110
              ${
                item.completed
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white border-2 border-primary/30 text-primary group-hover:border-primary'
              }
            `}
              aria-hidden="true"
            >
              {item.completed ? (
                <Check size={20} />
              ) : (
                <span className="text-sm font-bold">{item.week}</span>
              )}
            </div>

            {/* Content */}
            <div className="mt-4 px-2">
              <h4 className="font-bold text-secondary text-sm mb-1 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                {item.title}
                {item.completed && <span className="sr-only"> (abgeschlossen)</span>}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed hidden md:block">
                {item.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

export default Timeline;
