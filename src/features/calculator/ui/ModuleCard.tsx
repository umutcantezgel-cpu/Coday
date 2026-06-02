'use client';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Module } from '@/shared/data/modules';
import { Icon } from '@/shared/ui/Icon';
import { AnimatePresence, motion } from 'motion/react';
import { formatCurrency } from '@/shared/utils/formatters';

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  isIncluded?: boolean;
  isRecommended?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isSelected,
  onToggle,
  disabled,
  isIncluded = false,
  isRecommended = false,
}) => {
  const t = useTranslations('calculator');
  const locale = useLocale();
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  return (
    <div
      onClick={!disabled && !isIncluded ? onToggle : undefined}
      className={`
        relative p-4 rounded-xl border transition motion-reduce:duration-[0.01ms] duration-300 flex flex-col h-full
        ${
          isIncluded
            ? 'bg-emerald-50/50 border-emerald-200 cursor-default'
            : !disabled
              ? 'cursor-pointer group'
              : ''
        }
        ${
          isSelected && !isIncluded
            ? 'bg-primary/5 border-primary shadow-md ring-1 ring-primary/20'
            : ''
        }
        ${
          !isSelected && !isIncluded && !disabled
            ? 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-lg'
            : ''
        }
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
      `}
    >
      {/* Badges */}
      {isIncluded && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md z-20 flex items-center gap-1">
          <Icon name="check" className="text-[10px]" /> {t('card.included')}
        </span>
      )}
      {!isIncluded && module.isPopular && (
        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-gradient-to-r from-primary to-secondary text-white text-[9px] uppercase font-bold tracking-wider rounded-full shadow-md z-10">
          {t('card.bestseller')}
        </span>
      )}
      {!isIncluded && (module.isRecommended || isRecommended) && (
        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-emerald-500 text-white text-[9px] uppercase font-bold tracking-wider rounded-full shadow-md z-10">
          {t('card.recommended')}
        </span>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2 mt-1">
        <div
          className={`p-2 rounded-lg transition-colors motion-reduce:duration-[0.01ms] ${
            isIncluded
              ? 'bg-emerald-100 text-emerald-600'
              : isSelected
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
          }`}
        >
          <Icon name={module.icon} className="text-xl" />
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-lg text-gray-900">
            {formatCurrency(module.priceInCents / 100, 'EUR', locale)}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wide">
            {module.priceType === 'one-time' ? t('card.one_time') : t('card.monthly')}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <h3 className="font-display font-bold text-base text-gray-900 mb-1">
          {t(`modules.${module.id}.name`)}
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          {t(`modules.${module.id}.description`)}
        </p>

        {/* Learn More Toggle */}
        <button
          onClick={handleToggleDetails}
          className="active:scale-[0.97] flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary hover:text-primary/80 transition-colors motion-reduce:duration-[0.01ms] mb-2"
        >
          <Icon name={showDetails ? 'expand_less' : 'expand_more'} className="text-sm" />
          {showDetails ? 'Weniger anzeigen' : 'Mehr erfahren'}
        </button>

        {/* Expandable Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-2 leading-relaxed">
                {t(`modules.${module.id}.learn_more`)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selection Indicator (Implicit/Minimal) */}
      <div
        className={`
                mt-auto w-full py-1.5 rounded-md text-center text-xs font-bold transition motion-reduce:duration-[0.01ms]
                ${
                  isIncluded
                    ? 'bg-emerald-100 text-emerald-700'
                    : isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900'
                }
            `}
      >
        {isIncluded
          ? t('card.status.included')
          : isSelected
            ? t('card.status.selected')
            : t('card.status.add')}
      </div>
    </div>
  );
};
