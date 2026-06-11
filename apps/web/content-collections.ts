import { type Context, defineCollection, defineConfig, type Meta } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { compileMDX } from '@content-collections/mdx';
import { getMDXComponent } from 'mdx-bundler/client/index.js';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { z } from 'zod';

// Compiled MDX evaluates via `new Function`, which workerd disallows even during
// build-time prerendering (EvalError: code generation from strings). MDX bodies are
// therefore evaluated and rendered to static HTML here, at content build time; pages
// receive plain HTML strings and never evaluate code on Workers.
const renderMDX = async (context: Context, document: { _meta: Meta; content: string }) => {
  const code = await compileMDX(context, document);
  return renderToStaticMarkup(createElement(getMDXComponent(code)));
};

const pageMeta = {
  content: z.string(),
  description: z.string(),
  path: z.string(),
  title: z.string(),
};

const landing = defineCollection({
  directory: 'content/pages',
  include: 'index.mdx',
  name: 'landing',
  schema: z.object({
    ...pageMeta,
    auditForm: z.object({
      button: z.string(),
      companyLabel: z.string(),
      emailLabel: z.string(),
      nameLabel: z.string(),
      taskLabel: z.string(),
    }),
    build: z.object({
      buckets: z.array(z.object({ detail: z.string(), outcome: z.string(), surface: z.string(), title: z.string() })),
      heading: z.string(),
      intro: z.string(),
    }),
    faq: z.object({
      heading: z.string(),
      items: z.array(z.object({ answer: z.string(), question: z.string() })),
    }),
    finalCta: z.object({ heading: z.string(), sub: z.string() }),
    founder: z.object({ heading: z.string(), paragraphs: z.array(z.string()), photoAlt: z.string() }),
    hero: z.object({
      badge: z.string(),
      microcopy: z.string(),
      primaryCta: z.string(),
      secondaryCta: z.string(),
      subhead: z.string(),
    }),
    method: z.object({
      beats: z.array(z.object({ detail: z.string(), title: z.string() })),
      diagram: z.object({
        badge: z.string(),
        captionPending: z.string(),
        captionResolved: z.string(),
        figcaption: z.string(),
        nodes: z.array(z.object({ label: z.string(), snag: z.boolean().optional() })),
      }),
      heading: z.string(),
      paragraphs: z.array(z.string()),
    }),
    miniDashboard: z.object({ question: z.string() }),
    notChatbot: z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
      points: z.array(z.object({ detail: z.string(), title: z.string() })),
    }),
    process: z.object({
      cta: z.string(),
      heading: z.string(),
      steps: z.array(z.object({ body: z.string(), title: z.string() })),
    }),
    security: z.object({
      heading: z.string(),
      intro: z.string(),
      points: z.array(z.object({ detail: z.string().optional(), title: z.string() })),
    }),
    timeline: z.object({
      bridgeEnd: z.string(),
      bridgeLink: z.string(),
      bridgeStart: z.string(),
      intro: z.string(),
      scenes: z.array(z.object({ body: z.string(), status: z.string(), timestamp: z.string(), title: z.string() })),
    }),
  }),
});

const capturePage = (name: string, include: string) =>
  defineCollection({
    directory: 'content/pages',
    include,
    name,
    schema: z.object({
      ...pageMeta,
      button: z.string(),
      emailLabel: z.string(),
      headline: z.string(),
    }),
    transform: async (document, context) => ({
      ...document,
      body: await renderMDX(context, document),
    }),
  });

const agent = capturePage('agent', 'agent.mdx');
const insights = capturePage('insights', 'insights.mdx');

const privacy = defineCollection({
  directory: 'content/pages',
  include: 'privacy.mdx',
  name: 'privacy',
  schema: z.object({
    ...pageMeta,
    headline: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    body: await compileMarkdown(context, document),
  }),
});

const posts = defineCollection({
  directory: 'content/insights',
  include: '*.mdx',
  name: 'posts',
  schema: z.object({
    content: z.string(),
    date: z.string(),
    description: z.string(),
    draft: z.boolean(),
    title: z.string(),
  }),
  transform: async (document, context) => ({
    ...document,
    body: await renderMDX(context, document),
    slug: document._meta.path,
  }),
});

const site = defineCollection({
  directory: 'content',
  include: 'site.yaml',
  name: 'site',
  parser: 'yaml',
  schema: z.object({
    brandName: z.string(),
    contactEmail: z.string(),
    footer: z.object({
      blurb: z.string(),
      contactHeading: z.string(),
      linkedin: z.object({ href: z.string(), label: z.string() }),
      navigateHeading: z.string(),
      pages: z.array(z.object({ href: z.string(), label: z.string() })),
      pagesHeading: z.string(),
    }),
    formMessages: z.object({
      auditSuccess: z.string(),
      captureSuccess: z.string(),
      errorPrefix: z.string(),
      sending: z.string(),
    }),
    nav: z.object({
      agentLink: z.string(),
      backHome: z.string(),
      cta: z.string(),
      links: z.array(z.object({ href: z.string(), label: z.string() })),
    }),
    siteDomain: z.string(),
    skipLinkLabel: z.string(),
    tagline: z.string(),
  }),
});

export default defineConfig({
  content: [landing, agent, insights, privacy, posts, site],
});
