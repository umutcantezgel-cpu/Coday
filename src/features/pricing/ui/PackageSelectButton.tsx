'use client';

import React from 'react';
import { useRouter } from '@/i18n/navigation';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

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
      className={`group active:scale-[0.97] w-full py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between gap-2 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none motion-reduce:transition-colors motion-reduce:transform-none ${
        popular
          ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-lg shadow-primary-700/25 hover:shadow-xl hover:shadow-primary-700/30'
          : 'bg-slate-100 border border-slate-200 text-slate-900 hover:bg-slate-200/80 hover:border-slate-300'
      }`}
    >
      <span className="flex-1 text-center">{ctaText}</span>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:scale-105 motion-reduce:transform-none ${
          popular ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-sm'
        }`}
      >
        <OptimizedIcon icon={ArrowRight} className="text-sm" />
      </div>
    </button>
  );
};
