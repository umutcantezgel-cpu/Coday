import React from 'react';
import { motion } from 'motion/react';
import { Check } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
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
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${isCompleted ? 'bg-primary text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white ring-4 ring-primary/20' : ''}
                  ${isUpcoming ? 'bg-gray-100 text-gray-400 border-2 border-gray-200' : ''}
                `}
              >
                {isCompleted ? <Check size={18} /> : index + 1}
              </motion.div>
              <span
                className={`
                text-xs mt-2 font-medium whitespace-nowrap
                ${isCurrent ? 'text-primary' : ''}
                ${isCompleted ? 'text-gray-600' : ''}
                ${isUpcoming ? 'text-gray-400' : ''}
              `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-16 sm:w-24 h-0.5 mx-2 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-primary rounded-full"
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
