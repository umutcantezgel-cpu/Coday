import { BlogPost } from '@/features/blog/model/types';
import { BLOG_POSTS as BLOG_POSTS_DE } from '@/features/blog/model/data.de';
import { BLOG_POSTS as BLOG_POSTS_EN } from '@/features/blog/model/data.en';

export const getBlogPosts = (locale: string = 'de'): BlogPost[] => {
  return locale.startsWith('en') ? BLOG_POSTS_EN : BLOG_POSTS_DE;
};

// Backwards compatibility default export (Defaults to German)
export const BLOG_POSTS = BLOG_POSTS_DE;

export const getBlogPost = (slug: string, locale: string = 'de'): BlogPost | undefined => {
  const posts = getBlogPosts(locale);
  return posts.find((post) => post.slug === slug);
};

export const getMatchingBlogPost = (
  slug: string,
  currentLocale: string = 'de',
  targetLocale: string = 'en'
): BlogPost | undefined => {
  const currentPost = getBlogPost(slug, currentLocale);
  if (!currentPost) {
    const targetPost = getBlogPost(slug, targetLocale);
    if (targetPost) {
      return getBlogPosts(currentLocale).find((p) => String(p.id) === String(targetPost.id));
    }
    return undefined;
  }
  const otherPosts = getBlogPosts(targetLocale);
  return otherPosts.find((p) => String(p.id) === String(currentPost.id));
};
