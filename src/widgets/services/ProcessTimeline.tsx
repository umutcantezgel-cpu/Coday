import React from 'react';
import { motion } from 'motion/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle } from '@phosphor-icons/react';

export interface ProcessStep {
  title: string;
  description: string;
  icon?: React.ElementType;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps, title, subtitle }) => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {subtitle && (
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-display font-black text-3xl sm:text-5xl text-secondary mb-6 leading-tight">
              {title}
            </h2>
          )}
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 pl-24 md:pl-0 md:px-12 flex flex-col">
                  <div
                    className={`bg-white p-8 rounded-2xl shadow-flat border border-gray-100 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <div
                      className={`flex items-center mb-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg mr-4 md:mx-4">
                        {index + 1}
                      </span>
                      <h3 className="font-display font-bold text-2xl text-secondary">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-primary z-10 shadow-sm">
                  {step.icon ? (
                    <OptimizedIcon
                      icon={step.icon}
                      className="text-primary text-xl"
                      weight="bold"
                    />
                  ) : (
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-primary text-xl"
                      weight="fill"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
