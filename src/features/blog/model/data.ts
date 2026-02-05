
import { BlogPost } from './types';
import { BLOG_POSTS as BLOG_POSTS_DE } from './data.de';
import { BLOG_POSTS as BLOG_POSTS_EN } from './data.en';

export const getBlogPosts = (locale: string = 'de'): BlogPost[] => {
    return locale.startsWith('en') ? BLOG_POSTS_EN : BLOG_POSTS_DE;
};

// Backwards compatibility default export (Defaults to German)
export const BLOG_POSTS = BLOG_POSTS_DE;

export const getBlogPost = (slug: string, locale: string = 'de'): BlogPost | undefined => {
    const posts = getBlogPosts(locale);
    return posts.find(post => post.slug === slug);
};
