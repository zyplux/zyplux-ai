import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import * as z from 'zod';

export const POSTS_DIR = fileURLToPath(new URL('../content/insights', import.meta.url));

const PostSchema = z.object({
  date: z.string(),
  description: z.string(),
  draft: z.boolean().default(false),
  title: z.string(),
});

export const parseFrontmatter = (source: string) => {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!block?.[1]) throw new Error('expected a frontmatter block');
  return PostSchema.parse(parse(block[1]));
};

export const readInsightsFrontmatter = async () => {
  const fileNames = await readdir(POSTS_DIR);
  const entries = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async fileName => {
        const meta = parseFrontmatter(await readFile(path.join(POSTS_DIR, fileName), 'utf8'));
        return [fileName.replace(/\.mdx$/, ''), meta] as const;
      }),
  );
  return Object.fromEntries(entries);
};

export const readPostCards = async () => {
  const frontmatter = await readInsightsFrontmatter();
  return Object.entries(frontmatter)
    .filter(([, meta]) => !meta.draft)
    .map(([slug, meta]) => ({ ...meta, slug }));
};
