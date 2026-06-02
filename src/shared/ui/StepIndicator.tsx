'use client';
import React from 'react';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

interface Step {
  id: string;
  label: string;
}

const stepIds = ['packages', 'calculator', 'contact'] as const;

interface StepIndicatorProps {
  currentStep: 'packages' | 'calculator' | 'contact';
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, className = '' }) => {
  const t = useTranslations('common');
  const steps: Step[] = stepIds.map((id) => ({
    id,
    label: t(`steps.${id}`),
  }));
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm
                  transition motion-reduce:duration-[0.01ms] duration-300 transform
                  ${isCurrent ? 'scale-110' : 'scale-100'}
                  ${isCompleted ? 'bg-primary text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white ring-2 md:ring-4 ring-primary/20' : ''}
                  ${isUpcoming ? 'bg-gray-100 text-gray-500 border-2 border-gray-200' : ''}
                `}
              >
                {isCompleted ? <Check size={14} className="md:w-[18px] md:h-[18px]" /> : index + 1}
              </div>
              <span
                className={`
                text-[10px] md:text-xs mt-1 md:mt-2 font-medium whitespace-nowrap
                ${isCurrent ? 'text-gray-900' : ''}
                ${isCompleted ? 'text-gray-600' : ''}
                ${isUpcoming ? 'text-gray-500' : ''}
              `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-8 sm:w-16 md:w-24 h-0.5 mx-1 md:mx-2 relative self-start mt-4 md:mt-5">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div
                  style={{ width: isCompleted ? '100%' : '0%' }}
                  className="absolute inset-y-0 left-0 bg-primary rounded-full transition duration-500 ease-in-out"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
