import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useConsentStore, CONSENT_POLICY_VERSION, CONSENT_STORAGE_KEY } from '../consentStore';
import { storageGate } from '../storageGate';
import { CODAY_STORAGE_INVENTORY } from '../storageInventory';

describe('GDPR & TDDDG Consent Architecture', () => {
  beforeEach(() => {
    useConsentStore.getState().resetConsent();
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      window.sessionStorage?.clear?.();
    }
  });

  it('should initialize with hasConsented = false and only necessary category true', () => {
    const state = useConsentStore.getState();
    expect(state.hasConsented).toBe(false);
    expect(state.categories.necessary).toBe(true);
    expect(state.categories.functional).toBe(false);
    expect(state.categories.analytics).toBe(false);
    expect(state.categories.marketing).toBe(false);
    expect(state.policyVersion).toBe(CONSENT_POLICY_VERSION);
  });

  it('acceptAll should grant all categories and record timestamp + method', () => {
    useConsentStore.getState().acceptAll('banner');
    const state = useConsentStore.getState();

    expect(state.hasConsented).toBe(true);
    expect(state.categories.necessary).toBe(true);
    expect(state.categories.functional).toBe(true);
    expect(state.categories.analytics).toBe(true);
    expect(state.categories.marketing).toBe(true);
    expect(state.method).toBe('banner');
    expect(typeof state.timestamp).toBe('string');
  });

  it('rejectAll should grant only necessary category and record rejection', () => {
    useConsentStore.getState().rejectAll('banner');
    const state = useConsentStore.getState();

    expect(state.hasConsented).toBe(true);
    expect(state.categories.necessary).toBe(true);
    expect(state.categories.functional).toBe(false);
    expect(state.categories.analytics).toBe(false);
    expect(state.categories.marketing).toBe(false);
    expect(state.method).toBe('banner');
  });

  it('saveCustom should correctly store granular category selections', () => {
    useConsentStore.getState().saveCustom(
      {
        functional: true,
        analytics: false,
        marketing: false,
      },
      'settings_modal'
    );

    const state = useConsentStore.getState();
    expect(state.hasConsented).toBe(true);
    expect(state.categories.necessary).toBe(true);
    expect(state.categories.functional).toBe(true);
    expect(state.categories.analytics).toBe(false);
    expect(state.categories.marketing).toBe(false);
    expect(state.method).toBe('settings_modal');
  });

  it('storageGate should allow necessary keys regardless of consent', () => {
    storageGate.setItem('test-necessary-key', 'secret-val', 'necessary');
    expect(storageGate.getItem('test-necessary-key', 'necessary')).toBe('secret-val');
  });

  it('storageGate should use in-memory fallback when functional consent is not granted', () => {
    useConsentStore.getState().rejectAll();

    storageGate.setItem('strobi-chat-storage', 'hello-world', 'functional');
    // Still retrievable in session memory
    expect(storageGate.getItem('strobi-chat-storage', 'functional')).toBe('hello-world');
  });

  it('CODAY_STORAGE_INVENTORY should declare all active storage keys with purposes and durations', () => {
    expect(CODAY_STORAGE_INVENTORY.length).toBeGreaterThanOrEqual(4);
    const keys = CODAY_STORAGE_INVENTORY.map((i) => i.key);
    expect(keys).toContain('coday-consent-v2');
    expect(keys).toContain('theme');
    expect(keys).toContain('strobi-chat-storage');
  });
});
