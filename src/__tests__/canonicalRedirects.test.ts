import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { CANONICAL_HREF } from '@/shared/data/canonicalLinks';
import { CANONICAL_REDIRECTS } from '../../scripts/qa/canonicalRedirects.mjs';

/**
 * Three places have to agree on which page owns which topic: the link helper the
 * app renders through, the redirect table Next serves, and the QA script that
 * proves the redirects work. Drift between them is silent — an internal link
 * would point at a 301, or a retired URL would 404 — so it is asserted here.
 */
describe('canonical duplicate → owner map', () => {
  // `/services/web-design/design-systems` was already redirected before this
  // pass, so it is in the app map but not in the new redirect table.
  const PRE_EXISTING = new Set(['/services/web-design/design-systems']);

  const appMap = Object.fromEntries(
    Object.entries(CANONICAL_HREF).filter(([source]) => !PRE_EXISTING.has(source))
  );

  it('the QA script table matches the app link map', () => {
    expect(CANONICAL_REDIRECTS).toEqual(appMap);
  });

  it('next.config.ts redirects every source to the same owner', () => {
    const config = readFileSync('next.config.ts', 'utf8');

    for (const [source, destination] of Object.entries(appMap)) {
      const bare = new RegExp(
        `source:\\s*'${source}',\\s*destination:\\s*'${destination}',`.replace(/[/-]/g, '\\$&')
      );
      const prefixed = new RegExp(
        `source:\\s*'/:locale\\(de\\|en\\)${source}',\\s*destination:\\s*'/:locale${destination}',`.replace(
          /[/-]/g,
          '\\$&'
        )
      );
      const normalised = config.replace(/\s+/g, ' ');

      expect(normalised, `missing bare redirect for ${source}`).toMatch(bare);
      expect(normalised, `missing locale redirect for ${source}`).toMatch(prefixed);
    }
  });

  it('no owner is itself retired, so no redirect chains', () => {
    for (const destination of Object.values(CANONICAL_HREF)) {
      expect(CANONICAL_HREF[destination]).toBeUndefined();
    }
  });
});
