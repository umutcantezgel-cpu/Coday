import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

interface CookiePreferences {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentState {
  hasConsented: boolean;
  consentTimestamp: string | null;
  preferences: CookiePreferences;
  showBanner: boolean;
  showSettings: boolean;

  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  resetConsent: () => void;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const useCookieStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      consentTimestamp: null,
      preferences: defaultPreferences,
      showBanner: true,
      showSettings: false,

      acceptAll: () =>
        set({
          hasConsented: true,
          consentTimestamp: new Date().toISOString(),
          preferences: {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true,
          },
          showBanner: false,
          showSettings: false,
        }),

      rejectAll: () =>
        set({
          hasConsented: true,
          consentTimestamp: new Date().toISOString(),
          preferences: {
            necessary: true, // Always required
            functional: false,
            analytics: false,
            marketing: false,
          },
          showBanner: false,
          showSettings: false,
        }),

      savePreferences: (prefs) =>
        set((state) => ({
          hasConsented: true,
          consentTimestamp: new Date().toISOString(),
          preferences: {
            ...state.preferences,
            ...prefs,
            necessary: true, // Always required
          },
          showBanner: false,
          showSettings: false,
        })),

      openSettings: () => set({ showSettings: true }),
      closeSettings: () => set({ showSettings: false }),

      resetConsent: () =>
        set({
          hasConsented: false,
          consentTimestamp: null,
          preferences: defaultPreferences,
          showBanner: true,
          showSettings: false,
        }),
    }),
    {
      name: 'coday-cookie-consent',
    }
  )
);

export default useCookieStore;
