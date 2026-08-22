import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modules, Module } from '@/shared/data/modules';
import { formatCurrency } from '@/shared/utils/formatters';

interface CalculatorState {
  selectedModuleIds: Set<string>;
  selectedPackageId: string | null;
  currentStep: 'packages' | 'calculator' | 'contact';
  selectPackage: (packageId: string, keepAddons?: boolean) => void;
  setPackageAndAddons: (packageId: string, addonIds?: string[]) => void;
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
  getStructuredLeadData: () => {
    packageId: string;
    packageName: string;
    addons: Array<{ id: string; name: string; category?: string }>;
  };
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      selectedModuleIds: new Set<string>(['basis-starter']), // Default validation
      selectedPackageId: null,
      currentStep: 'packages' as const,

      selectPackage: (packageId, keepAddons = false) => {
        const currentSet = get().selectedModuleIds;
        const newSet = new Set<string>();

        if (keepAddons) {
          // Keep existing non-basis modules
          currentSet.forEach((id) => {
            const mod = modules.find((m) => m.id === id);
            if (mod && mod.category !== 'basis') {
              newSet.add(id);
            }
          });
        }

        // Map Packages exactly 1:1 to their base module (4 Tiers)
        switch (packageId) {
          case 'starter':
          case 'onepager':
            newSet.add('basis-starter');
            break;
          case 'business':
          case 'professional':
            newSet.add('basis-business');
            break;
          case 'corporate':
          case 'pro-corporate':
          case 'scale':
            newSet.add('basis-corporate');
            break;
          case 'enterprise':
          case 'ultimate':
          case 'custom-app':
            newSet.add('basis-enterprise');
            break;
          default:
            newSet.add('basis-business');
        }

        set({
          selectedPackageId: packageId,
          selectedModuleIds: newSet,
        });
      },

      setPackageAndAddons: (packageId, addonIds = []) => {
        const newSet = new Set<string>();

        // Add base package (4 Tiers)
        switch (packageId) {
          case 'starter':
          case 'onepager':
            newSet.add('basis-starter');
            break;
          case 'business':
          case 'professional':
            newSet.add('basis-business');
            break;
          case 'corporate':
          case 'pro-corporate':
          case 'scale':
            newSet.add('basis-corporate');
            break;
          case 'enterprise':
          case 'ultimate':
          case 'custom-app':
            newSet.add('basis-enterprise');
            break;
          default:
            newSet.add('basis-business');
        }

        // Add verified add-on modules
        addonIds.forEach((id) => {
          const mod = modules.find((m) => m.id === id);
          if (mod && mod.category !== 'basis') {
            newSet.add(id);
          }
        });

        set({
          selectedPackageId: packageId,
          selectedModuleIds: newSet,
        });
      },

      toggleModule: (moduleId) =>
        set((state) => {
          const foundModule = modules.find((m) => m.id === moduleId);
          if (!foundModule) return state;

          const newSet = new Set(state.selectedModuleIds);

          // Logic for Basis Package (Radio Button behavior)
          if (foundModule.category === 'basis') {
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
            if (foundModule.dependencies) {
              foundModule.dependencies.forEach((depId) => newSet.add(depId));
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
          starter: 'Starter (Klein)',
          onepager: 'Starter (Klein)',
          business: 'Business (Mittel)',
          professional: 'Business (Mittel)',
          corporate: 'Pro Corporate (Groß)',
          'pro-corporate': 'Pro Corporate (Groß)',
          scale: 'Pro Corporate (Groß)',
          enterprise: 'Enterprise Platform (Extrem groß)',
          ultimate: 'Enterprise Platform (Extrem groß)',
        };
        return names[selectedPackageId] || null;
      },

      getSummaryText: () => {
        const selectedMods = get().getSelectedModules();
        const packageName = get().getPackageName();

        let text = '';
        if (packageName) {
          text += `Gewähltes Paket: ${packageName}\n`;
        }
        if (selectedMods.length > 0) {
          text += `Ausgewählte Module / Add-ons: ${selectedMods.map((m) => m.name).join(', ')}\n`;
        }
        text += `Kalkulation: Individuelles Angebot auf Anfrage`;
        return text;
      },

      getStructuredLeadData: () => {
        const { selectedPackageId, selectedModuleIds } = get();
        const packageName = get().getPackageName();
        const allModules = modules.filter((m) => selectedModuleIds.has(m.id));
        const basisModule = allModules.find((m) => m.category === 'basis');
        const addons = allModules
          .filter((m) => m.category !== 'basis')
          .map((m) => ({ id: m.id, name: m.name, category: m.category }));

        return {
          packageId: selectedPackageId || basisModule?.id || 'individual',
          packageName: packageName || basisModule?.name || 'Individuelles Projekt',
          addons,
        };
      },
    }),
    {
      name: 'calculator-storage',
      // Serilizing Set to Array for local storage
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const parsed = JSON.parse(str);
            return {
              ...parsed,
              state: {
                ...parsed.state,
                selectedModuleIds: new Set(parsed.state.selectedModuleIds),
              },
            };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          const serialized = {
            ...value,
            state: {
              ...value.state,
              selectedModuleIds: Array.from(value.state.selectedModuleIds),
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);
