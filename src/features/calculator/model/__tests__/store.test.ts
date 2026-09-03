import { describe, it, expect, beforeEach } from 'vitest';
import { useCalculatorStore } from '@/features/calculator/model/store';
import { PACKAGES } from '@/shared/data/packages';

describe('calculator store – package handling', () => {
  beforeEach(() => {
    useCalculatorStore.getState().reset();
  });

  it('maps aliases to the right basis module and keeps only known add-ons', () => {
    useCalculatorStore
      .getState()
      .setPackageAndAddons('professional', ['func-cms', 'unknown-addon', 'basis-starter']);
    const state = useCalculatorStore.getState();
    expect(state.selectedPackageId).toBe('business');
    expect(state.selectedModuleIds.has('basis-business')).toBe(true);
    expect(state.selectedModuleIds.has('func-cms')).toBe(true);
    expect(state.selectedModuleIds.has('unknown-addon')).toBe(false);
    expect(state.selectedModuleIds.has('basis-starter')).toBe(false);
    expect(state.getSelectedAddonIds()).toEqual(['func-cms']);
  });

  it('falls back to the business package for unknown ids', () => {
    useCalculatorStore.getState().selectPackage('does-not-exist');
    expect(useCalculatorStore.getState().selectedModuleIds.has('basis-business')).toBe(true);
  });

  it('selectPackage("scale") selects the corporate basis module', () => {
    useCalculatorStore.getState().selectPackage('scale');
    const state = useCalculatorStore.getState();
    expect(state.selectedPackageId).toBe('corporate');
    expect(state.selectedModuleIds.has(PACKAGES.corporate.basisModuleId)).toBe(true);
  });

  it('returns plain-language names for both locales', () => {
    useCalculatorStore.getState().setPackageAndAddons('enterprise', ['seo-tech']);
    const state = useCalculatorStore.getState();
    expect(state.getPackageName()).toBe(PACKAGES.enterprise.name.de);
    expect(state.getPackageName('en')).toBe(PACKAGES.enterprise.name.en);

    const lead = state.getStructuredLeadData('en');
    expect(lead.packageId).toBe('enterprise');
    expect(lead.packageName).toBe(PACKAGES.enterprise.name.en);
    expect(lead.addons).toEqual([{ id: 'seo-tech', name: 'Get found on Google', category: 'seo' }]);
  });

  it('keeps add-ons when switching packages with keepAddons', () => {
    useCalculatorStore.getState().setPackageAndAddons('starter', ['func-cms']);
    useCalculatorStore.getState().selectPackage('corporate', true);
    const ids = useCalculatorStore.getState().selectedModuleIds;
    expect(ids.has('basis-corporate')).toBe(true);
    expect(ids.has('basis-starter')).toBe(false);
    expect(ids.has('func-cms')).toBe(true);
  });
});
