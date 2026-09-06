import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import de from '../../../../../public/locales/de/common.json';
import en from '../../../../../public/locales/en/common.json';
import {
  HESSEN_HUB,
  LOCATION_GROUPS,
  resolveMessage,
  type LocationLink,
} from '../locationLinks';

const BASE_URL = 'https://www.codayweb.de';

const allLinks: LocationLink[] = [HESSEN_HUB, ...LOCATION_GROUPS.flatMap((group) => group.links)];
const uniqueHrefs = new Set(allLinks.map((link) => link.href));

describe('location links', () => {
  it('has four groups and 38 unique pages including the Hessen hub', () => {
    expect(LOCATION_GROUPS).toHaveLength(4);
    expect(uniqueHrefs.size).toBe(38);
    expect(uniqueHrefs.has('/standorte/hessen')).toBe(true);
    expect(HESSEN_HUB.href).toBe('/standorte/hessen');
    // 9 (hub + 8 cities) + 12 + 4 + 13 counties
    expect(LOCATION_GROUPS.map((group) => group.links.length)).toEqual([9, 12, 4, 13]);
  });

  it('points only at internal location routes', () => {
    for (const href of uniqueHrefs) {
      expect(href).toMatch(/^\/(webdesign-|regionen\/|standorte\/)/);
    }
  });

  it('resolves every title, label and description key in the de and en common messages', () => {
    const keys = [
      ...LOCATION_GROUPS.map((group) => group.titleKey),
      ...allLinks.map((link) => link.labelKey),
      ...allLinks.flatMap((link) => (link.descKey ? [link.descKey] : [])),
    ];
    expect(keys.length).toBeGreaterThan(38);

    for (const key of keys) {
      expect(resolveMessage(de, key), `de: ${key}`).not.toBe('');
      expect(resolveMessage(en, key), `en: ${key}`).not.toBe('');
    }
  });

  it('resolveMessage returns an empty string for missing or non-string values', () => {
    expect(resolveMessage(de, 'nav.locations.rhein_main.title')).toBe('Rhein-Main & Taunus');
    expect(resolveMessage(de, 'nav.locations.does_not_exist')).toBe('');
    expect(resolveMessage(de, 'nav.locations.rhein_main.title.deeper')).toBe('');
    // An object, not a string
    expect(resolveMessage(de, 'nav.locations')).toBe('');
    expect(resolveMessage({}, 'anything')).toBe('');
  });

  it('is listed in the sitemap, page for page', async () => {
    const urls = new Set((await sitemap()).map((entry) => entry.url));
    for (const href of uniqueHrefs) {
      expect(urls.has(`${BASE_URL}/de${href}`), href).toBe(true);
    }
  });
});
