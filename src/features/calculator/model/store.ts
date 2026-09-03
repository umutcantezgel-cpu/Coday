import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { modules, Module, getModule } from '@/shared/data/modules';
import {
  PACKAGES,
  normalizePackageId,
  getPackageName as lookupPackageName,
  type PackageId,
  type Locale,
} from '@/shared/data/packages';

const DEFAULT_PACKAGE: PackageId = 'business';

/** Basis module id for a package id or alias; unknown ids fall back to the default package. */
function basisModuleFor(packageId: string): string {
  const id = normalizePackageId(packageId) ?? DEFAULT_PACKAGE;
  return PACKAGES[id].basisModuleId;
}

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
  getSelectedAddonIds: () => string[];
  getPackageName: (locale?: Locale) => string | null;
  getSummaryText: () => string;
  getStructuredLeadData: (locale?: Locale) => {
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
            const mod = getModule(id);
            if (mod && mod.category !== 'basis') {
              newSet.add(id);
            }
          });
        }

        newSet.add(basisModuleFor(packageId));

        set({
          selectedPackageId: normalizePackageId(packageId) ?? packageId,
          selectedModuleIds: newSet,
        });
      },

      setPackageAndAddons: (packageId, addonIds = []) => {
        const newSet = new Set<string>([basisModuleFor(packageId)]);

        // Add verified add-on modules only
        addonIds.forEach((id) => {
          const mod = getModule(id);
          if (mod && mod.category !== 'basis') {
            newSet.add(id);
          }
        });

        set({
          selectedPackageId: normalizePackageId(packageId) ?? packageId,
          selectedModuleIds: newSet,
        });
      },

      toggleModule: (moduleId) =>
        set((state) => {
          const foundModule = getModule(moduleId);
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

      getSelectedAddonIds: () =>
        get()
          .getSelectedModules()
          .filter((m) => m.category !== 'basis')
          .map((m) => m.id),

      getPackageName: (locale = 'de') => lookupPackageName(get().selectedPackageId, locale),

      getSummaryText: () => {
        const selectedMods = get().getSelectedModules();
        const packageName = get().getPackageName();

        let text = '';
        if (packageName) {
          text += `Gewähltes Paket: ${packageName}\n`;
        }
        if (selectedMods.length > 0) {
          text += `Ausgewählte Module / Add-ons: ${selectedMods.map((m) => m.plainName.de).join(', ')}\n`;
        }
        text += `Kalkulation: Individuelles Angebot auf Anfrage`;
        return text;
      },

      getStructuredLeadData: (locale = 'de') => {
        const { selectedPackageId, selectedModuleIds } = get();
        const packageName = get().getPackageName(locale);
        const allModules = modules.filter((m) => selectedModuleIds.has(m.id));
        const basisModule = allModules.find((m) => m.category === 'basis');
        const addons = allModules
          .filter((m) => m.category !== 'basis')
          .map((m) => ({ id: m.id, name: m.plainName[locale], category: m.category }));

        return {
          packageId: normalizePackageId(selectedPackageId) || basisModule?.id || 'individual',
          packageName:
            packageName ||
            basisModule?.plainName[locale] ||
            (locale === 'en' ? 'Custom project' : 'Individuelles Projekt'),
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
            const storedPackageId: unknown = parsed?.state?.selectedPackageId;
            return {
              ...parsed,
              state: {
                ...parsed.state,
                // Visitors may still carry legacy aliases (e.g. "professional") in storage.
                selectedPackageId:
                  typeof storedPackageId === 'string'
                    ? (normalizePackageId(storedPackageId) ?? storedPackageId)
                    : null,
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
