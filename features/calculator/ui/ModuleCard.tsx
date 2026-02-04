import React from 'react';
import { Module } from '../../../data/modules';

interface ModuleCardProps {
    module: Module;
    isSelected: boolean;
    onToggle: () => void;
    disabled?: boolean;
    isIncluded?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isSelected, onToggle, disabled, isIncluded = false }) => {
    return (
        <div
            onClick={!disabled && !isIncluded ? onToggle : undefined}
            className={`
        relative p-4 rounded-xl border transition-all duration-300 flex flex-col h-full
        ${isIncluded
                    ? 'bg-emerald-50/50 border-emerald-200 cursor-default'
                    : !disabled
                        ? 'cursor-pointer group'
                        : ''}
        ${isSelected && !isIncluded
                    ? 'bg-primary/5 border-primary shadow-aurora ring-1 ring-primary/20'
                    : ''}
        ${!isSelected && !isIncluded && !disabled
                    ? 'bg-white border-gray-100 hover:border-primary/30 hover:shadow-lg'
                    : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
      `}
        >
            {/* Badges - Fix positioning */}
            {isIncluded && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md z-20 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">check</span> Inklusive
                </span>
            )}
            {!isIncluded && module.isPopular && (
                <span className="absolute -top-2 left-4 px-2 py-0.5 bg-gradient-to-r from-primary to-secondary text-white text-[9px] uppercase font-bold tracking-wider rounded-full shadow-md z-10">
                    Bestseller
                </span>
            )}
            {!isIncluded && module.isRecommended && (
                <span className="absolute -top-2 left-4 px-2 py-0.5 bg-green-500 text-white text-[9px] uppercase font-bold tracking-wider rounded-full shadow-md z-10">
                    Empfohlen
                </span>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-2 mt-1">
                <div className={`p-2 rounded-lg transition-colors ${isIncluded ? 'bg-emerald-100 text-emerald-600' :
                        isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                    <span className="material-symbols-outlined text-xl">{module.icon}</span>
                </div>
                <div className="text-right">
                    <div className="font-display font-bold text-lg text-gray-900">
                        {(module.priceInCents / 100).toLocaleString('de-DE')} €
                    </div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">
                        {module.priceType === 'one-time' ? 'Einmalig' : 'Monatlich'}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h3 className="font-display font-bold text-base text-gray-900 mb-1">{module.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    {module.description}
                </p>
            </div>

            {/* Selection Indicator (Implicit/Minimal) */}
            <div className={`
                mt-3 w-full py-1.5 rounded-md text-center text-xs font-bold transition-all
                ${isIncluded
                    ? 'bg-emerald-100 text-emerald-700'
                    : isSelected
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-900'
                }
            `}>
                {isIncluded ? 'Im Paket enthalten' : isSelected ? 'Ausgewählt' : 'Hinzufügen'}
            </div>
        </div>
    );
};
