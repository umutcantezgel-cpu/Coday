'use client';

import { useConsentStore, type ConsentCategory } from './consentStore';
import { CODAY_STORAGE_INVENTORY, type StorageItemDefinition } from './storageInventory';

export { CODAY_STORAGE_INVENTORY, type StorageItemDefinition };

const inMemoryStorage = new Map<string, string>();

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
