import { pageHead, type PageHead, type PageMeta } from '@zyplux/web/seo';

import type { Harness } from '@/stories/harness';

const flatten = ({ meta }: PageHead) => meta.map(tag => ('title' in tag ? tag.title : tag.content)).join('\n');

export const seoHarness = (name: string, meta: PageMeta, path: string) =>
  ({
    open: () => {
      const head = flatten(pageHead(meta, path));
      let isDisposed = false;
      return Promise.resolve({
        assert: {
          shows: text => {
            if (isDisposed) {
              throw new Error('scene used after dispose');
            }
            if (!head.includes(text)) {
              throw new Error(`expected the ${name} page head to include ${JSON.stringify(text)}`);
            }
          },
        },
        dispose: () => {
          isDisposed = true;
        },
      });
    },
  }) satisfies Harness;
