import React from 'react';
import { Warning } from '@phosphor-icons/react';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { useTranslation } from 'react-i18next';

export interface UrgencyMeterProps {
  score: number;
}

export const UrgencyMeter: React.FC<UrgencyMeterProps> = ({ score }) => {
  const { t } = useTranslation('analyzer');

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
      <OptimizedIcon icon={Warning} className="mx-auto mb-2 text-yellow-500" />
      <p className="text-gray-500 text-sm">{t('urgency.unavailable', { score })}</p>
    </div>
  );
};

export default UrgencyMeter;
