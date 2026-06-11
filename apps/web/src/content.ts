import { allAgents, allInsights, allLandings, allPrivacies, allSites } from 'content-collections';

const single = <T>(documents: T[], collection: string): T => {
  const [document] = documents;
  if (!document) {
    throw new Error(`expected exactly one document in the ${collection} collection`);
  }
  return document;
};

const landing = single(allLandings, 'landing');
const site = single(allSites, 'site');

export const AGENT_PAGE = single(allAgents, 'agent');
export const INSIGHTS_PAGE = single(allInsights, 'insights');
export const PRIVACY_PAGE = single(allPrivacies, 'privacy');

export const BRAND_NAME = site.brandName;
export const TAGLINE = site.tagline;
export const CONTACT_EMAIL = site.contactEmail;
export const SKIP_LINK_LABEL = site.skipLinkLabel;
export const FORM_MESSAGES = site.formMessages;
export const NAV = site.nav;
export const FOOTER = site.footer;

export const PAGES = {
  agent: { description: AGENT_PAGE.description, title: AGENT_PAGE.title },
  index: { description: landing.description, title: landing.title },
  insights: { description: INSIGHTS_PAGE.description, title: INSIGHTS_PAGE.title },
  privacy: { description: PRIVACY_PAGE.description, title: PRIVACY_PAGE.title },
};

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
