'use client';

import { useEffect } from 'react';
import { useCalculatorStore } from '@/features/calculator/model/store';

export const StepInitializer = () => {
  const setStep = useCalculatorStore((state) => state.setStep);

  useEffect(() => {
    setStep('packages');
  }, [setStep]);

  return null;
};
