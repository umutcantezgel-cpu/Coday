"use client";

import React from 'react';
import { Warning } from '@phosphor-icons/react/dist/ssr';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useTranslations } from 'next-intl';

export interface UrgencyMeterProps {
  score: number;
}

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({ score }) => {
  const t = useTranslations('analyzer');

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
      <OptimizedIcon icon={Warning} className="mx-auto mb-2 text-yellow-500" />
      <p className="text-gray-500 text-sm">{t('urgency.unavailable', { score })}</p>
    </div>
  );
};

export default UrgencyMeter;
