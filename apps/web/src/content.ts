import { allAgents, allInsights, allLandings, allPosts, allPrivacies, allSites } from 'content-collections';

export { FORM_ENDPOINT, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL, THEME_COLOR } from './config';

const single = <T>(documents: T[], collection: string): T => {
  const [document] = documents;
  if (!document) {
    throw new Error(`expected exactly one document in the ${collection} collection`);
  }
  return document;
};

const landing = single(allLandings, 'landing');
const agentPage = single(allAgents, 'agent');
const insightsPage = single(allInsights, 'insights');
const privacyPage = single(allPrivacies, 'privacy');
const site = single(allSites, 'site');

export const BRAND_NAME = site.brandName;
export const TAGLINE = site.tagline;
export const SITE_DOMAIN = site.siteDomain;
export const CONTACT_EMAIL = site.contactEmail;
export const SKIP_LINK_LABEL = site.skipLinkLabel;

export const PAGES = {
  agent: { description: agentPage.description, path: agentPage.path, title: agentPage.title },
  index: { description: landing.description, path: landing.path, title: landing.title },
  insights: { description: insightsPage.description, path: insightsPage.path, title: insightsPage.title },
  privacy: { description: privacyPage.description, path: privacyPage.path, title: privacyPage.title },
};

export type FormName = 'agent-updates' | 'audit' | 'insights-updates';

export const FORM_MESSAGES = site.formMessages;
export const NAV = site.nav;
export const FOOTER = site.footer;

export const HERO = landing.hero;
export const METHOD = landing.method;
export const BUILD = landing.build;
export const TIMELINE = landing.timeline;
export const NOT_CHATBOT = landing.notChatbot;
export const PROCESS = landing.process;
export const FOUNDER = landing.founder;
export const SECURITY = landing.security;
export const FAQ = landing.faq;
export const FINAL_CTA = landing.finalCta;
export const AUDIT_FORM = landing.auditForm;
export const MINI_DASHBOARD = landing.miniDashboard;

export const AGENT_PAGE = {
  body: agentPage.body,
  button: agentPage.button,
  emailLabel: agentPage.emailLabel,
  headline: agentPage.headline,
};

export const INSIGHTS_PAGE = {
  body: insightsPage.body,
  button: insightsPage.button,
  emailLabel: insightsPage.emailLabel,
  headline: insightsPage.headline,
};

export const PRIVACY_PAGE = {
  body: privacyPage.body,
  headline: privacyPage.headline,
};

export const INSIGHTS_POSTS = allPosts
  .filter(post => !post.draft)
  .toSorted((a, b) => b.date.localeCompare(a.date))
  .map(post => ({
    body: post.body,
    date: post.date,
    description: post.description,
    slug: post.slug,
    title: post.title,
  }));

export type InsightsPost = (typeof INSIGHTS_POSTS)[number];
