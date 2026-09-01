import { describe, it, expect } from 'vitest';
import { getBlogPosts } from '@/features/blog/model/data';
import { BLOG_SLUG_DE_TO_EN, BLOG_SLUG_EN_TO_DE } from '@/features/blog/model/blogSlugMap';

/**
 * blogSlugMap.ts exists so the site-wide LanguageSwitcher does not have to import
 * the blog corpus. These tests keep the hand-maintained map identical to what the
 * data files produce, so it can never rot into wrong hreflang links.
 */
describe('blogSlugMap', () => {
  const dePosts = getBlogPosts('de');
  const enPosts = getBlogPosts('en');

  const derive = (from: typeof dePosts, to: typeof enPosts) => {
    const byId = new Map(to.map((p) => [String(p.id), p.slug]));
    const out: Record<string, string> = {};
    for (const post of from) {
      const counterpart = byId.get(String(post.id));
      if (counterpart) out[post.slug] = counterpart;
    }
    return out;
  };

  it('has unique post ids per locale (id pairing is the source of truth)', () => {
    for (const posts of [dePosts, enPosts]) {
      const ids = posts.map((p) => String(p.id));
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('matches the pairing derived from the blog data', () => {
    expect(BLOG_SLUG_DE_TO_EN).toEqual(derive(dePosts, enPosts));
    expect(BLOG_SLUG_EN_TO_DE).toEqual(derive(enPosts, dePosts));
  });

  it('is a mutual inverse', () => {
    for (const [de, en] of Object.entries(BLOG_SLUG_DE_TO_EN)) {
      expect(BLOG_SLUG_EN_TO_DE[en]).toBe(de);
    }
    expect(Object.keys(BLOG_SLUG_DE_TO_EN).length).toBe(Object.keys(BLOG_SLUG_EN_TO_DE).length);
  });

  it('only points at slugs that have a real page', () => {
    const deSlugs = new Set(dePosts.map((p) => p.slug));
    const enSlugs = new Set(enPosts.map((p) => p.slug));

    for (const [de, en] of Object.entries(BLOG_SLUG_DE_TO_EN)) {
      expect(deSlugs.has(de)).toBe(true);
      expect(enSlugs.has(en)).toBe(true);
    }
  });
});
