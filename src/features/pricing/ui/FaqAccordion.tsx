'use client';

import React, { useState, useId } from 'react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const baseId = useId();

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4" role="region" aria-label="Frequently asked questions">
      {items.map((item, idx) => {
        const isOpen = openFaqIndex === idx;
        const panelId = `${baseId}-panel-${idx}`;
        const triggerId = `${baseId}-trigger-${idx}`;
        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-[2rem] p-1.5 shadow-[0_0_40px_-10px_rgba(0,0,0,0.03)] transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_0_50px_-10px_rgba(0,0,0,0.05)] motion-safe:animate-fade-in-up"
            style={{
              animationDelay: `${Math.min(idx * 50, 400)}ms`,
              animationDuration: '250ms',
              animationFillMode: 'both',
            }}
          >
            <div className="bg-gray-50/50 rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
              <h3>
                <button
                  id={triggerId}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="active:scale-[0.99] w-full px-6 py-6 text-left flex justify-between items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[calc(2rem-0.375rem)] transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-colors motion-reduce:transform-none"
                >
                  <span className="font-bold text-gray-900 pr-4 text-lg">{item.question}</span>
                  <div
                    aria-hidden="true"
                    className={`w-8 h-8 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none motion-reduce:transform-none ${isOpen ? 'rotate-180 bg-primary/10 text-primary' : 'text-gray-500'}`}
                  >
                    <OptimizedIcon icon={CaretDown} />
                  </div>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`overflow-hidden transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
