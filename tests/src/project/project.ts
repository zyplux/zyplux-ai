import { existsSync, readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test as base } from 'vitest';
import { parse } from 'yaml';
import * as z from 'zod';

const REPO_ROOT = fileURLToPath(new URL('../../../', import.meta.url));

const WORKSPACE_GLOB_SUFFIX = '/*';

const SpecsSchema = z.record(z.string(), z.string()).default({});

const WorkspaceSchema = z.object({ packages: z.array(z.string()).default([]) });

const ManifestSchema = z.object({
  dependencies: SpecsSchema,
  devDependencies: SpecsSchema,
  name: z.string().optional(),
  optionalDependencies: SpecsSchema,
  peerDependencies: SpecsSchema,
});

type Manifest = z.infer<typeof ManifestSchema>;

const readManifest = async (relativePath: string) => {
  const manifestText = await readFile(path.join(REPO_ROOT, relativePath), 'utf8');
  return ManifestSchema.parse(JSON.parse(manifestText));
};

const collectSpecs = ({ dependencies, devDependencies, optionalDependencies, peerDependencies }: Manifest) => {
  const fields = {
    dependencies: dependencies,
    devDependencies: devDependencies,
    optionalDependencies: optionalDependencies,
    peerDependencies: peerDependencies,
  };
  const specs = new Map<string, string>();
  for (const [field, entries] of Object.entries(fields)) {
    const specEntries = Object.entries(entries);
    for (const [dependency, spec] of specEntries) {
      specs.set(`${field} "${dependency}"`, spec);
    }
  }
  return specs;
};

const expandWorkspace = (pattern: string) => {
  if (!pattern.endsWith(WORKSPACE_GLOB_SUFFIX)) {
    return [pattern];
  }
  const parent = pattern.slice(0, -WORKSPACE_GLOB_SUFFIX.length);
  return readdirSync(path.join(REPO_ROOT, parent))
    .map(entry => `${parent}/${entry}`)
    .filter(relativeDir => statSync(path.join(REPO_ROOT, relativeDir)).isDirectory());
};

const findManifestPaths = async () => {
  const workspacePath = path.join(REPO_ROOT, 'pnpm-workspace.yaml');
  const contents = await readFile(workspacePath, 'utf8');
  const workspace = WorkspaceSchema.parse(parse(contents));
  const paths = ['package.json'];
  for (const pattern of workspace.packages) {
    for (const relativeDir of expandWorkspace(pattern)) {
      const manifestPath = `${relativeDir}/package.json`;
      if (existsSync(path.join(REPO_ROOT, manifestPath))) {
        paths.push(manifestPath);
      }
    }
  }
  return paths.toSorted((left, right) => left.localeCompare(right));
};

const manifests: { name: string; specs: Map<string, string> }[] = [];
const manifestPaths = await findManifestPaths();
for (const relativePath of manifestPaths) {
  const manifest = await readManifest(relativePath);
  manifests.push({ name: manifest.name ?? relativePath, specs: collectSpecs(manifest) });
}

const app = { manifests };

export const it = base.extend<{ app: typeof app }>({
  app: async ({}, provide) => {
    await provide(app);
  },
});
export { expect } from 'vitest';
