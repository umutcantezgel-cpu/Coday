import React from 'react';
import { Icon } from '@/shared/ui/Icon';
import { useCalculatorStore } from '../model/store';
import { modules } from '../../../data/modules';

export const ProjectSummary: React.FC = () => {
    const selectedModuleIds = useCalculatorStore(state => state.selectedModuleIds);
    const selectedPackageId = useCalculatorStore(state => state.selectedPackageId);

    // Helper to get modules
    const selectedModules = modules.filter(m => selectedModuleIds.has(m.id));
    const totalOneTime = selectedModules.filter(m => m.priceType === 'one-time').reduce((acc, m) => acc + m.priceInCents, 0);
    const totalMonthly = selectedModules.filter(m => m.priceType === 'monthly').reduce((acc, m) => acc + m.priceInCents, 0);

    if (selectedModules.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-flat mb-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Icon name="inventory_2" className="mr-2 text-primary" />
                Ihre Konfiguration
            </h3>

            {selectedPackageId && (
                <div className="mb-4 pb-4 border-b border-gray-50">
                    <span className="text-xs text-gray-400 uppercase font-bold">Basis-Paket</span>
                    <div className="font-display font-bold text-lg text-primary capitalize">
                        {selectedPackageId}
                    </div>
                </div>
            )}

            <div className="space-y-2 mb-6 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                {selectedModules.map(m => (
                    <div key={m.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{m.name}</span>
                        <span className="font-medium">{(m.priceInCents / 100).toLocaleString('de-DE')}€</span>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-500 text-sm">Einmalig ca.</span>
                    <span className="font-bold text-gray-900 text-lg">{(totalOneTime / 100).toLocaleString('de-DE')}€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Monatlich ca.</span>
                    <span className="font-bold text-gray-700">{(totalMonthly / 100).toLocaleString('de-DE')}€</span>
                </div>
            </div>
        </div>
    );
};
