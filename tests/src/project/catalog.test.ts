import { expect, it } from './project';

it('every workspace manifest sources dependencies from the catalog', ({ app }) => {
  for (const manifest of app.manifests) {
    for (const spec of manifest.specs.values()) expect(spec).toMatch(/^(?:catalog|workspace):/u);
  }
});
