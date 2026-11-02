import { describe, expect, it } from './stories';

describe('sections documents', () => {
  it('1.1.1 wraps each level-two heading and its body in a section element', async ({ app }) => {
    const compiled = await app.compileMdx(app.sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('Section');
    expect(compiled).toContain('"The method"');
  });

  it('1.1.2 centers a lone intro paragraph inside its section', async ({ app }) => {
    const compiled = await app.compileMdx(app.sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('Intro');
    expect(compiled).toContain('centered');
  });

  it('1.1.3 exports the frontmatter fields alongside the content', async ({ app }) => {
    const compiled = await app.compileMdx(app.sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('const frontmatter');
  });

  it('1.1.4 leaves a document without the sections flag untouched', async ({ app }) => {
    const compiled = await app.compileMdx('## Plain heading\n\nPlain body.');
    expect(compiled).not.toContain('Section');
  });
});

describe('section heading attributes', () => {
  it('1.2.1 reads an id and layout tokens from the heading suffix', async ({ app }) => {
    const compiled = await app.compileMdx(app.sectionsDoc('## The method [.narrow #method]\n\nBody.'));
    expect(compiled).toContain('"method"');
    expect(compiled).toContain('"narrow"');
    expect(compiled).toContain('"The method"');
  });

  it('1.2.2 rejects an unknown section attribute', async ({ app }) => {
    await expect(app.compileMdx(app.sectionsDoc('## The method [.bogus]\n\nBody.'))).rejects.toThrow(
      /unknown section attribute/,
    );
  });
});

describe('section body content', () => {
  it('1.3.1 preserves lists and code after the introduction', async ({ app }) => {
    const compiled = await app.compileMdx(
      app.sectionsDoc('## The method\n\nIntro.\n\n- One\n- Two\n\n```ts\nconst x = 1;\n```'),
    );
    expect(compiled).toContain('One');
    expect(compiled).toContain('const x = 1');
  });

  it('1.3.2 rejects module exports inside a section', async ({ app }) => {
    await expect(app.compileMdx(app.sectionsDoc('## The method\n\nexport const x = 1;'))).rejects.toThrow(
      'cannot appear inside a section',
    );
  });
});

describe('insight metadata updates', () => {
  it('1.4.1 reloads metadata changes while preserving body-only updates', async ({ app }) => {
    const plugin = await app.openFrontmatterPlugin();
    const file = new URL('../../../apps/web/content/insights/what-an-agent-actually-does.mdx', import.meta.url)
      .pathname;
    const source = '---\ntitle: A post\ndate: 2026-11-01\ndescription: A description\n---\nBody';
    try {
      await plugin.update(file, source);
      expect(plugin.send).toHaveBeenCalledTimes(1);
      await plugin.update(file, `${source} changed`);
      expect(plugin.send).toHaveBeenCalledTimes(1);
      await plugin.update(file, source.replace('A post', 'Another post'));
      expect(plugin.send).toHaveBeenCalledTimes(app.METADATA_EDIT_RELOAD_COUNT);
      await plugin.update(file, 'Invalid metadata');
      expect(plugin.send).toHaveBeenCalledTimes(app.INVALID_METADATA_RELOAD_COUNT);
      await plugin.update(file, 'Still invalid');
      expect(plugin.send).toHaveBeenCalledTimes(app.INVALID_METADATA_RELOAD_COUNT);
      await plugin.update('/unrelated.mdx', source);
      expect(plugin.send).toHaveBeenCalledTimes(app.INVALID_METADATA_RELOAD_COUNT);
    } finally {
      await plugin.close();
    }
  });
});

it('1.3.3 supports quotes and sections without introductions', async ({ app }) => {
  const compiled = await app.compileMdx(app.sectionsDoc('## Quote\n\n> A quote'));
  expect(compiled).toContain('blockquote');
  expect(compiled).not.toContain('Intro');
});

it('1.3.4 preserves multiple introductory paragraphs', async ({ app }) => {
  const compiled = await app.compileMdx(app.sectionsDoc('## Intro\n\nFirst.\n\nSecond.'));
  expect(compiled).toContain('First.');
  expect(compiled).toContain('Second.');
  expect(compiled).not.toContain('centered');
});

it('1.2.3 supports centered and slim section attributes', async ({ app }) => {
  const compiled = await app.compileMdx(app.sectionsDoc('## Slim [.centered .slim]\n\nBody.'));
  expect(compiled).toContain('centered');
  expect(compiled).toContain('slim');
});

it('1.2.4 rejects formatted section headings', async ({ app }) => {
  await expect(app.compileMdx(app.sectionsDoc('## **Bold**\n\nBody.'))).rejects.toThrow(
    'section headings must be plain text',
  );
});
