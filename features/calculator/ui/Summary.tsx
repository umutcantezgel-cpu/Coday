import React, { useMemo } from 'react';
import { useCalculatorStore } from '../model/store';
import { NavLink } from 'react-router-dom';
import { modules } from '../../../data/modules';

export const CalculatorSummary: React.FC = () => {
    const selectedModuleIds = useCalculatorStore(state => state.selectedModuleIds);

    const selectedModules = useMemo(() => {
        return modules.filter(m => selectedModuleIds.has(m.id));
    }, [selectedModuleIds]);

    const totalOneTime = useMemo(() => {
        return selectedModules
            .filter(m => m.priceType === 'one-time')
            .reduce((sum, m) => sum + m.priceInCents, 0);
    }, [selectedModules]);

    const totalMonthly = useMemo(() => {
        return selectedModules
            .filter(m => m.priceType === 'monthly')
            .reduce((sum, m) => sum + m.priceInCents, 0);
    }, [selectedModules]);

    // Simple discount logic mockup
    const discount = totalOneTime > 500000 ? 5 : 0;
    const discountedOneTime = totalOneTime * (1 - discount / 100);

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-aurora-lg p-6 lg:p-8 sticky top-24">
            <h3 className="font-display font-bold text-2xl text-gray-900 mb-6">Ihr Paket</h3>

            {/* Selected List - Scrollable */}
            <div className="max-h-[40vh] overflow-y-auto pr-2 mb-6 space-y-3 custom-scrollbar">
                {selectedModules.length === 0 && <p className="text-gray-400 text-sm">Wähle Module aus...</p>}
                {selectedModules.map(module => (
                    <div key={module.id} className="flex justify-between items-start text-sm">
                        <span className="text-gray-700 font-medium">{module.name}</span>
                        <span className="text-gray-900 font-bold whitespace-nowrap">
                            {(module.priceInCents / 100).toLocaleString('de-DE')} €
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4 mb-8">
                {/* One Time */}
                <div className="flex justify-between items-end">
                    <span className="text-gray-600">Einmalig</span>
                    <div className="text-right">
                        {discount > 0 && (
                            <div className="text-xs text-green-500 font-bold mb-1">
                                {discount}% Rabatt aktiviert
                            </div>
                        )}
                        <div className="font-display font-black text-3xl text-gray-900 leading-none">
                            {(discountedOneTime / 100).toLocaleString('de-DE')} €
                        </div>
                    </div>
                </div>

                {/* Monthly */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Monatlich</span>
                    <span className="font-bold text-gray-900">
                        {(totalMonthly / 100).toLocaleString('de-DE')} €
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <NavLink to="/contact" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1">
                    Weiter zur Anfrage
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                </NavLink>
                <div className="text-center">
                    <button className="text-xs text-gray-400 hover:text-gray-600 underline">
                        Konfiguration teilen
                    </button>
                </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center text-primary text-xs font-bold uppercase tracking-wider mb-1">
                    <span className="material-symbols-outlined mr-1 text-sm">speed</span>
                    Garantie
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                    Dieses Setup garantiert einen Google Loghthouse Score von <span className="font-bold text-gray-900">95+</span>.
                </p>
            </div>
        </div>
    );
};
