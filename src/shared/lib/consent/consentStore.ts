'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const CONSENT_POLICY_VERSION = 2;
export const CONSENT_STORAGE_KEY = 'coday-consent-v2';
export const CONSENT_LEGACY_KEY = 'coday-cookie-consent';

export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface ConsentCategories {
  necessary: true; // Always true by law (TDDDG § 25 Abs. 2)
  functional: boolean; // Theme, Strobi Chat history, Configurator state
  analytics: boolean; // First/Third-party analytics
  marketing: boolean; // Conversion tracking
}

export type ConsentMethod = 'banner' | 'settings_modal' | 'footer' | 'floating_shield' | 'migrated';

export interface ConsentRecord {
  hasConsented: boolean;
  policyVersion: number;
  timestamp: string | null;
  method: ConsentMethod | null;
  categories: ConsentCategories;
}

export interface ConsentStoreState extends ConsentRecord {
  showBanner: boolean;
  showSettings: boolean;

  // Actions
  acceptAll: (method?: ConsentMethod) => void;
  rejectAll: (method?: ConsentMethod) => void;
  saveCustom: (categories: Partial<ConsentCategories>, method?: ConsentMethod) => void;
  openSettings: () => void;
  closeSettings: () => void;
  resetConsent: () => void;
}

const defaultCategories: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function dispatchConsentEvent(categories: ConsentCategories) {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(
        new CustomEvent('coday-consent-updated', {
          detail: { categories, timestamp: new Date().toISOString() },
        })
      );
    } catch {
      // Ignore if custom events not supported in environment
    }
  }
}

export const useConsentStore = create<ConsentStoreState>()(
  persist(
    (set, get) => ({
      hasConsented: false,
      policyVersion: CONSENT_POLICY_VERSION,
      timestamp: null,
      method: null,
      categories: defaultCategories,
      showBanner: false,
      showSettings: false,

      acceptAll: (method: ConsentMethod = 'banner') => {
        const categories: ConsentCategories = {
          necessary: true,
          functional: true,
          analytics: true,
          marketing: true,
        };
        const timestamp = new Date().toISOString();
        set({
          hasConsented: true,
          policyVersion: CONSENT_POLICY_VERSION,
          timestamp,
          method,
          categories,
          showBanner: false,
          showSettings: false,
        });
        dispatchConsentEvent(categories);
      },

      rejectAll: (method: ConsentMethod = 'banner') => {
        const categories: ConsentCategories = {
          necessary: true,
          functional: false,
          analytics: false,
          marketing: false,
        };
        const timestamp = new Date().toISOString();
        set({
          hasConsented: true,
          policyVersion: CONSENT_POLICY_VERSION,
          timestamp,
          method,
          categories,
          showBanner: false,
          showSettings: false,
        });
        dispatchConsentEvent(categories);
      },

      saveCustom: (
        customCategories: Partial<ConsentCategories>,
        method: ConsentMethod = 'settings_modal'
      ) => {
        const categories: ConsentCategories = {
          necessary: true,
          functional: Boolean(customCategories.functional),
          analytics: Boolean(customCategories.analytics),
          marketing: Boolean(customCategories.marketing),
        };
        const timestamp = new Date().toISOString();
        set({
          hasConsented: true,
          policyVersion: CONSENT_POLICY_VERSION,
          timestamp,
          method,
          categories,
          showBanner: false,
          showSettings: false,
        });
        dispatchConsentEvent(categories);
      },

      openSettings: () => set({ showSettings: true }),
      closeSettings: () => set({ showSettings: false }),

      resetConsent: () => {
        set({
          hasConsented: false,
          policyVersion: CONSENT_POLICY_VERSION,
          timestamp: null,
          method: null,
          categories: defaultCategories,
          showBanner: true,
          showSettings: false,
        });
        dispatchConsentEvent(defaultCategories);
      },
    }),
    {
      name: CONSENT_STORAGE_KEY,
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : (null as any)
      ),
      version: CONSENT_POLICY_VERSION,
      migrate: (persistedState: any, version: number) => {
        if (!persistedState || version < CONSENT_POLICY_VERSION) {
          const legacyPreferences = persistedState?.preferences || persistedState?.categories;
          if (legacyPreferences && persistedState?.hasConsented) {
            return {
              hasConsented: true,
              policyVersion: CONSENT_POLICY_VERSION,
              timestamp: persistedState.consentTimestamp || new Date().toISOString(),
              method: 'migrated' as ConsentMethod,
              categories: {
                necessary: true,
                functional: Boolean(legacyPreferences.functional),
                analytics: Boolean(legacyPreferences.analytics),
                marketing: Boolean(legacyPreferences.marketing),
              },
              showBanner: false,
              showSettings: false,
            };
          }
          return {
            hasConsented: false,
            policyVersion: CONSENT_POLICY_VERSION,
            timestamp: null,
            method: null,
            categories: defaultCategories,
            showBanner: true,
            showSettings: false,
          };
        }
        return persistedState as ConsentStoreState;
      },
    }
  )
);
