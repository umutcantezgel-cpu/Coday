'use client';

import { useConsentStore, type ConsentCategory } from './consentStore';

const inMemoryStorage = new Map<string, string>();

/**
 * Registry of stored keys on Coday and their respective TDDDG / DSGVO classification.
 */
export interface StorageItemDefinition {
  key: string;
  category: ConsentCategory;
  purposeDe: string;
  purposeEn: string;
  duration: string;
  storageType: 'localStorage' | 'sessionStorage';
}

export const CODAY_STORAGE_INVENTORY: StorageItemDefinition[] = [
  {
    key: 'coday-consent-v2',
    category: 'necessary',
    purposeDe: 'Speichert den audit-festen Einwilligungsnachweis nach DSGVO Art. 7 Abs. 1.',
    purposeEn: 'Stores audit-proof consent decision under GDPR Art. 7(1).',
    duration: '12 Monate',
    storageType: 'localStorage',
  },
  {
    key: 'theme',
    category: 'functional',
    purposeDe: 'Speichert die vom Nutzer gewählte Hell-/Dunkel-Darstellung.',
    purposeEn: 'Stores user preference for Light/Dark display theme.',
    duration: 'Dauerhaft bis Löschung',
    storageType: 'localStorage',
  },
  {
    key: 'strobi-chat-storage',
    category: 'functional',
    purposeDe: 'Ermöglicht das Fortsetzen des Beratungsgesprächs mit dem AI-Assistenten Strobi.',
    purposeEn: 'Allows continuing conversations with AI assistant Strobi across views.',
    duration: 'Sitzung / 30 Tage',
    storageType: 'localStorage',
  },
  {
    key: 'coday-configurator-state',
    category: 'functional',
    purposeDe: 'Merkt sich gewählte Optionen im interaktiven Webdesign-Kalkulator.',
    purposeEn: 'Stores selected options in the interactive web design calculator.',
    duration: 'Sitzung',
    storageType: 'sessionStorage',
  },
];

export const storageGate = {
  getItem: (key: string, category: ConsentCategory = 'functional'): string | null => {
    if (typeof window === 'undefined') return null;

    const consent = useConsentStore.getState().categories;
    const isAllowed = category === 'necessary' || Boolean(consent[category]);

    if (!isAllowed) {
      return inMemoryStorage.get(key) ?? null;
    }

    try {
      return window.localStorage.getItem(key);
    } catch {
      return inMemoryStorage.get(key) ?? null;
    }
  },

  setItem: (key: string, value: string, category: ConsentCategory = 'functional'): void => {
    if (typeof window === 'undefined') return;

    const consent = useConsentStore.getState().categories;
    const isAllowed = category === 'necessary' || Boolean(consent[category]);

    if (!isAllowed) {
      inMemoryStorage.set(key, value);
      return;
    }

    try {
      window.localStorage.setItem(key, value);
    } catch {
      inMemoryStorage.set(key, value);
    }
  },

  removeItem: (key: string): void => {
    inMemoryStorage.delete(key);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
      } catch (err) {
        // Storage access might be blocked in restricted browser contexts
        void err;
      }
    }
  },
};
