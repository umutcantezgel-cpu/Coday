import { describe, it, expect } from 'vitest';
import { getNavItems, type NavLink } from '@/widgets/navigation/config';

/** Every link the header can render, whether it sits in a group or directly on the item. */
function allHeaderLinks(): NavLink[] {
  return getNavItems().flatMap((item) => [
    ...(item.links ?? []),
    ...(item.groups ?? []).flatMap((group) => group.links),
  ]);
}

describe('header navigation config', () => {
  it('links only to internal routes', () => {
    const links = allHeaderLinks();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.href.startsWith('http')).toBe(false);
    }
  });

  it('keeps the location pages out of the header (they live in the footer now)', () => {
    for (const link of allHeaderLinks()) {
      expect(link.href).not.toMatch(/^\/(webdesign-|regionen\/|standorte\/)/);
    }
  });

  it('has an industries item with exactly one group of 13 links', () => {
    const industries = getNavItems().filter((item) => item.label === 'nav.industries.label');
    expect(industries).toHaveLength(1);

    const groups = industries[0].groups ?? [];
    expect(groups).toHaveLength(1);
    expect(groups[0].title).toBe('nav.industries.label');
    expect(groups[0].links).toHaveLength(13);
    for (const link of groups[0].links) {
      expect(link.href).toMatch(/^\/(branchen|angebot-handwerker)/);
    }
  });

  it('no longer carries the combined locations item', () => {
    expect(getNavItems().some((item) => item.label === 'nav.locations.label')).toBe(false);
  });
});
