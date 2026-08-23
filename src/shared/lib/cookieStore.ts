'use client';

import {
  useConsentStore,
  type ConsentCategories,
  type ConsentCategory,
} from './consent/consentStore';

export type CookieCategory = ConsentCategory;

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

/**
 * Backward compatibility adapter bridging useConsentStore to legacy useCookieStore hooks.
 */
export function useCookieStore() {
  const store = useConsentStore();

  return {
    hasConsented: store.hasConsented,
    consentTimestamp: store.timestamp,
    preferences: store.categories as CookiePreferences,
    showBanner: store.showBanner,
    showSettings: store.showSettings,

    acceptAll: () => store.acceptAll('banner'),
    rejectAll: () => store.rejectAll('banner'),
    savePreferences: (prefs: Partial<CookiePreferences>) =>
      store.saveCustom(
        {
          functional: prefs.functional,
          analytics: prefs.analytics,
          marketing: prefs.marketing,
        },
        'settings_modal'
      ),
    openSettings: () => store.openSettings(),
    closeSettings: () => store.closeSettings(),
    resetConsent: () => store.resetConsent(),
  };
}

useCookieStore.getState = () => {
  const store = useConsentStore.getState();
  return {
    hasConsented: store.hasConsented,
    consentTimestamp: store.timestamp,
    preferences: store.categories as CookiePreferences,
    showBanner: store.showBanner,
    showSettings: store.showSettings,
    acceptAll: () => store.acceptAll('banner'),
    rejectAll: () => store.rejectAll('banner'),
    savePreferences: (prefs: Partial<CookiePreferences>) =>
      store.saveCustom(
        {
          functional: prefs.functional,
          analytics: prefs.analytics,
          marketing: prefs.marketing,
        },
        'settings_modal'
      ),
    openSettings: () => store.openSettings(),
    closeSettings: () => store.closeSettings(),
    resetConsent: () => store.resetConsent(),
  };
};

export default useCookieStore;
