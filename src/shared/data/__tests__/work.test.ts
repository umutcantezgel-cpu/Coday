import { describe, it, expect } from 'vitest';
import { workData } from '@/shared/data/work';

/**
 * A live URL must be a plain ASCII https URL: lowercase host of letters, digits,
 * dots and hyphens, then an optional path. IDN hosts with umlauts (the old
 * "wetzlar-schlüsseldienst.de") and whitespace are rejected, so a broken value
 * can no longer ship as a link on the references.
 */
const LIVE_URL = /^https:\/\/[a-z0-9.-]+(?:\/[a-z0-9._~/-]*)?$/;

/** The references the home page teaser features (PortfolioTeaserSection). */
const TEASER_SLUGS = ['batherm', 'schluesseldienst-wetzlar', 'memobaut'] as const;

describe('work.ts – customer references', () => {
  it('stores every defined liveUrl as a plain https URL without whitespace or umlauts', () => {
    const withLiveUrl = Object.values(workData).filter((p) => p.liveUrl !== undefined);
    expect(withLiveUrl.length).toBeGreaterThan(0);
    for (const project of withLiveUrl) {
      const url = project.liveUrl as string;
      expect(url, `${project.slug}: liveUrl "${url}"`).toMatch(LIVE_URL);
      expect(url, `${project.slug}: whitespace`).not.toMatch(/\s/);
      expect(url, `${project.slug}: non-ASCII`).toMatch(/^[\x21-\x7e]+$/);
      expect(() => new URL(url), `${project.slug}: parseable`).not.toThrow();
      expect(new URL(url).host.length, `${project.slug}: host`).toBeGreaterThan(3);
    }
  });

  it('keys every record by its own slug', () => {
    for (const [key, project] of Object.entries(workData)) {
      expect(project.slug, `workData.${key}`).toBe(key);
    }
  });

  it('has a record for each project the home page teaser features', () => {
    for (const slug of TEASER_SLUGS) {
      const project = workData[slug];
      expect(project, `workData.${slug}`).toBeDefined();
      expect(project.content.de.title.length).toBeGreaterThan(0);
      expect(project.content.en.title.length).toBeGreaterThan(0);
    }
  });
});
