import { describe, it, expect } from 'vitest';
import {
  PACKAGES,
  PACKAGE_IDS,
  PACKAGE_LIST,
  PACKAGE_ALIASES,
  normalizePackageId,
  getPackageName,
  getPackage,
  getPackageByBasisModule,
} from '@/shared/data/packages';
import { modules, CONFIGURATOR_ADDON_IDS, getModule } from '@/shared/data/modules';
import de from '../../../../public/locales/de/pricing.json';
import en from '../../../../public/locales/en/pricing.json';

const LOCALES = { de, en } as const;

describe('packages.ts – single source of truth', () => {
  it('normalises every alias to a canonical id and rejects unknown ids', () => {
    expect(normalizePackageId('starter')).toBe('starter');
    expect(normalizePackageId('onepager')).toBe('starter');
    expect(normalizePackageId('professional')).toBe('business');
    expect(normalizePackageId('pro-corporate')).toBe('corporate');
    expect(normalizePackageId('scale')).toBe('corporate');
    expect(normalizePackageId('ultimate')).toBe('enterprise');
    expect(normalizePackageId('custom-app')).toBe('enterprise');
    expect(normalizePackageId(' Business ')).toBe('business');
    expect(normalizePackageId('foo')).toBeNull();
    expect(normalizePackageId(null)).toBeNull();
    expect(normalizePackageId(undefined)).toBeNull();
    for (const alias of Object.keys(PACKAGE_ALIASES)) {
      expect(PACKAGE_IDS).toContain(normalizePackageId(alias));
    }
  });

  it('keeps tiers in order 1..4 and maps to an existing basis module', () => {
    PACKAGE_LIST.forEach((pkg, idx) => {
      expect(pkg.tier).toBe(idx + 1);
      const basis = getModule(pkg.basisModuleId);
      expect(basis?.category).toBe('basis');
      expect(getPackageByBasisModule(pkg.basisModuleId)?.id).toBe(pkg.id);
      expect(pkg.deliveryDays).toBeGreaterThan(0);
    });
    expect(PACKAGE_LIST.filter((p) => p.popular)).toHaveLength(1);
  });

  it('has plain-language names in both languages', () => {
    for (const pkg of PACKAGE_LIST) {
      expect(pkg.name.de.length).toBeGreaterThan(3);
      expect(pkg.name.en.length).toBeGreaterThan(3);
      expect(getPackageName(pkg.id, 'de')).toBe(pkg.name.de);
      expect(getPackageName(pkg.id, 'en')).toBe(pkg.name.en);
    }
    expect(getPackageName('professional')).toBe(PACKAGES.business.name.de);
    expect(getPackage('scale')?.id).toBe('corporate');
    expect(getPackage('nope')).toBeNull();
  });

  it('only references add-on modules that exist and are not basis modules', () => {
    for (const pkg of PACKAGE_LIST) {
      for (const id of [...pkg.recommendedAddonIds, ...pkg.includedAddonIds]) {
        const mod = getModule(id);
        expect(mod, `${pkg.id} references unknown module ${id}`).toBeDefined();
        expect(mod?.category).not.toBe('basis');
      }
    }
    for (const id of CONFIGURATOR_ADDON_IDS) {
      expect(getModule(id)?.category).not.toBe('basis');
    }
  });

  it('has complete pricing.json copy for every package in de and en', () => {
    for (const [locale, json] of Object.entries(LOCALES)) {
      for (const pkg of PACKAGE_LIST) {
        const copy = json.packages[pkg.id];
        expect(copy, `${locale}: packages.${pkg.id}`).toBeDefined();
        expect(copy.name).toBe(pkg.name[locale as 'de' | 'en']);
        for (const key of ['subtitle', 'for_who', 'example', 'outcome', 'cta'] as const) {
          expect(copy[key].length, `${locale}: ${pkg.id}.${key}`).toBeGreaterThan(3);
        }
        expect(copy.features.length).toBeGreaterThanOrEqual(5);
        for (const f of copy.features) {
          expect(f.label.length).toBeGreaterThan(3);
          expect(f.hint.length).toBeGreaterThan(10);
        }
        for (const ni of copy.not_included) {
          expect(
            getModule(ni.addon_id),
            `${locale}: ${pkg.id} not_included ${ni.addon_id}`
          ).toBeDefined();
        }
      }
      for (const row of json.comparison.rows) {
        for (const id of PACKAGE_IDS) {
          expect(typeof row[id], `${locale}: comparison row ${row.key} lacks ${id}`).toBe('string');
        }
      }
      const deliveryRow = json.comparison.rows.find((r) => r.key === 'delivery');
      expect(deliveryRow).toBeDefined();
      for (const pkg of PACKAGE_LIST) {
        expect(deliveryRow?.[pkg.id]).toContain(String(pkg.deliveryDays));
      }
      for (const id of CONFIGURATOR_ADDON_IDS) {
        const addon = (
          json.addons.items as Record<
            string,
            { name: string; benefit: string; for_who: string; type: string }
          >
        )[id];
        expect(addon, `${locale}: addons.items.${id}`).toBeDefined();
        expect(['optional', 'care']).toContain(addon.type);
      }
    }
  });

  it('gives every module plain names and benefits in both languages', () => {
    for (const mod of modules) {
      expect(mod.plainName.de.length).toBeGreaterThan(2);
      expect(mod.plainName.en.length).toBeGreaterThan(2);
      expect(mod.benefit.de.length).toBeGreaterThan(10);
      expect(mod.benefit.en.length).toBeGreaterThan(10);
    }
  });
});
