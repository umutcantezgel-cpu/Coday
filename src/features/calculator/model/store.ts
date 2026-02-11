import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modules, Module } from '../../../data/modules';

interface CalculatorState {
  selectedModuleIds: Set<string>;
  selectedPackageId: string | null;
  currentStep: 'packages' | 'calculator' | 'contact';
  selectPackage: (packageId: string) => void;
  toggleModule: (moduleId: string) => void;
  selectBasePackage: (moduleId: string) => void;
  setStep: (step: 'packages' | 'calculator' | 'contact') => void;
  reset: () => void;

  // Computed (helper getters)
  getTotalOneTime: () => number;
  getTotalMonthly: () => number;
  getSelectedModules: () => Module[];
  getPackageName: () => string | null;
  getSummaryText: () => string;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      selectedModuleIds: new Set<string>(['basis-starter']), // Default validation
      selectedPackageId: null,
      currentStep: 'packages' as const,

      selectPackage: (packageId) => {
        const newSet = new Set<string>();

        // Map Packages to Modules (Pre-selection)
        switch (packageId) {
          case 'starter':
            newSet.add('basis-starter');
            // Starter features usually included in base price
            break;
          case 'professional':
            newSet.add('basis-business'); // Corporate Website
            newSet.add('func-cms'); // CMS
            newSet.add('support-basic'); // Monthly Support
            break;
          case 'enterprise':
            newSet.add('basis-enterprise'); // Web App
            newSet.add('commerce-headless'); // E-Commerce
            newSet.add('support-pro'); // Premium Support
            break;
          default:
            newSet.add('basis-starter');
        }

        set({
          selectedPackageId: packageId,
          selectedModuleIds: newSet,
        });
      },

      toggleModule: (moduleId) =>
        set((state) => {
          const module = modules.find((m) => m.id === moduleId);
          if (!module) return state;

          const newSet = new Set(state.selectedModuleIds);

          // Logic for Basis Package (Radio Button behavior)
          if (module.category === 'basis') {
            // Remove other basis packages
            modules.filter((m) => m.category === 'basis').forEach((m) => newSet.delete(m.id));
            newSet.add(moduleId);
            return { selectedModuleIds: newSet };
          }

          // Toggle logic
          if (newSet.has(moduleId)) {
            newSet.delete(moduleId);
          } else {
            newSet.add(moduleId);

            // Auto-select dependencies
            if (module.dependencies) {
              module.dependencies.forEach((depId) => newSet.add(depId));
            }
          }

          return { selectedModuleIds: newSet };
        }),

      selectBasePackage: (moduleId) => get().toggleModule(moduleId),

      setStep: (step) => set({ currentStep: step }),

      reset: () =>
        set({
          selectedModuleIds: new Set(['basis-starter']),
          selectedPackageId: null,
          currentStep: 'packages',
        }),

      getTotalOneTime: () => {
        const { selectedModuleIds } = get();
        return modules
          .filter((m) => selectedModuleIds.has(m.id) && m.priceType === 'one-time')
          .reduce((sum, m) => sum + m.priceInCents, 0);
      },

      getTotalMonthly: () => {
        const { selectedModuleIds } = get();
        return modules
          .filter((m) => selectedModuleIds.has(m.id) && m.priceType === 'monthly')
          .reduce((sum, m) => sum + m.priceInCents, 0);
      },

      getSelectedModules: () => {
        const { selectedModuleIds } = get();
        return modules.filter((m) => selectedModuleIds.has(m.id));
      },

      getPackageName: () => {
        const { selectedPackageId } = get();
        if (!selectedPackageId) return null;
        const names: Record<string, string> = {
          starter: 'Starter',
          professional: 'Professional',
          enterprise: 'Enterprise',
        };
        return names[selectedPackageId] || null;
      },

      getSummaryText: () => {
        const selectedMods = get().getSelectedModules();
        const totalOneTime = get().getTotalOneTime();
        const totalMonthly = get().getTotalMonthly();
        const packageName = get().getPackageName();

        let text = '';
        if (packageName) {
          text += `Paket: ${packageName}\n`;
        }
        if (selectedMods.length > 0) {
          text += `Module: ${selectedMods.map((m) => m.name).join(', ')}\n`;
        }
        text += `Einmalig: ${(totalOneTime / 100).toLocaleString('de-DE')} €`;
        if (totalMonthly > 0) {
          text += ` | Monatlich: ${(totalMonthly / 100).toLocaleString('de-DE')} €`;
        }
        return text;
      },
    }),
    {
      name: 'calculator-storage',
      // Serilizing Set to Array for local storage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return { ...state, selectedModuleIds: new Set(state.selectedModuleIds) };
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: { ...value.state, selectedModuleIds: Array.from(value.state.selectedModuleIds) },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
