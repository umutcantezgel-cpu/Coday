'use client';

import React from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight } from '@phosphor-icons/react';

interface PackageSelectButtonProps {
  pkgId: string;
  ctaText: string;
  popular?: boolean;
}

export const PackageSelectButton: React.FC<PackageSelectButtonProps> = ({
  pkgId,
  ctaText,
  popular,
}) => {
  const selectPackage = useCalculatorStore((state) => state.selectPackage);
  const setStep = useCalculatorStore((state) => state.setStep);
  const router = useRouter();

  const handleSelect = () => {
    selectPackage(pkgId);
    setStep('calculator');
    router.push('/calculator');
  };

  return (
    <button
      onClick={handleSelect}
      className={`group active:scale-[0.97] w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none motion-reduce:transition-colors motion-reduce:transform-none ${
        popular
          ? 'bg-primary text-slate-900 hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30'
          : 'bg-black/5 border border-black/10 text-gray-900 hover:bg-black/10 hover:border-black/20'
      }`}
    >
      <span className="flex-1 text-center">{ctaText}</span>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:scale-105 motion-reduce:transform-none ${
          popular ? 'bg-black/10' : 'bg-black/5'
        }`}
      >
        <OptimizedIcon icon={ArrowRight} className="text-sm" />
      </div>
    </button>
  );
};
