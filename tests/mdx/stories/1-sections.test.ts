import { compile } from '@mdx-js/mdx';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { describe, expect, it } from 'vitest';

const compileMdx = async (source: string) => String(await compile(source, MDX_OPTIONS));

const sectionsDoc = (body: string) => `---
sections: true
---

${body}
`;

describe('sections documents', () => {
  it('1.1.1 wraps each level-two heading and its body in a section element', async () => {
    const compiled = await compileMdx(sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('Section');
    expect(compiled).toContain('"The method"');
  });

  it('1.1.2 centers a lone intro paragraph inside its section', async () => {
    const compiled = await compileMdx(sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('Intro');
    expect(compiled).toContain('centered');
  });

  it('1.1.3 exports the frontmatter fields alongside the content', async () => {
    const compiled = await compileMdx(sectionsDoc('## The method\n\nStart with the system.'));
    expect(compiled).toContain('const frontmatter');
  });

  it('1.1.4 leaves a document without the sections flag untouched', async () => {
    const compiled = await compileMdx('## Plain heading\n\nPlain body.');
    expect(compiled).not.toContain('Section');
  });
});

describe('section heading attributes', () => {
  it('1.2.1 reads an id and layout tokens from the heading suffix', async () => {
    const compiled = await compileMdx(sectionsDoc('## The method [.narrow #method]\n\nBody.'));
    expect(compiled).toContain('"method"');
    expect(compiled).toContain('"narrow"');
    expect(compiled).toContain('"The method"');
  });

  it('1.2.2 rejects an unknown section attribute', async () => {
    await expect(compileMdx(sectionsDoc('## The method [.bogus]\n\nBody.'))).rejects.toThrow(
      /unknown section attribute/,
    );
  });
});
