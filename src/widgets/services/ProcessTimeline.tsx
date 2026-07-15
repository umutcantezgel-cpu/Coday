import React from 'react';
import { m } from 'motion/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

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
    <section className="py-[var(--space-section)] bg-surface-elevated relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {subtitle && (
            <span className="text-action-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="font-display font-black text-3xl sm:text-5xl text-content-base mb-6 leading-tight text-balance">
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
              <m.div
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
                    className={`bg-surface-elevated p-8 rounded-2xl shadow-flat border border-border-muted hover:shadow-glow transition motion-reduce:duration-[0.01ms] duration-300 hover:scale-[0.97] ease-spring ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <div
                      className={`flex items-center mb-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-action-primary font-bold text-lg mr-4 md:mx-4">
                        {index + 1}
                      </span>
                      <p className="font-display font-bold text-2xl text-content-base">
                        {step.title}
                      </p>
                    </div>
                    <p className="text-content-muted leading-relaxed max-w-prose text-pretty text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-surface-elevated rounded-full border-4 border-primary z-10 shadow-sm">
                  {step.icon ? (
                    <OptimizedIcon
                      icon={step.icon}
                      className="text-action-primary text-xl"
                      weight="bold"
                    />
                  ) : (
                    <OptimizedIcon
                      icon={CheckCircle}
                      className="text-action-primary text-xl"
                      weight="fill"
                    />
                  )}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
