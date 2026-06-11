import { allPosts } from 'content-collections';

export const INSIGHTS_POSTS = allPosts.filter(post => !post.draft).toSorted((a, b) => b.date.localeCompare(a.date));

export type InsightsPost = (typeof INSIGHTS_POSTS)[number];
