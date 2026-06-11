import type { InsightsPost } from '@/posts';

import { SubpageLayout } from '@/components/layout/subpage-layout';

export const InsightsPostPage = ({ post }: { post: InsightsPost }) => (
  <SubpageLayout>
    <article>
      <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-2'>
        <span className='text-gradient'>{post.title}</span>
      </h1>
      <p className='text-sm text-muted mb-8'>{post.date}</p>
      <div className='space-y-4 text-lg' dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  </SubpageLayout>
);
