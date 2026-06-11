import { createFileRoute, notFound } from '@tanstack/react-router';

import { INSIGHTS_POSTS } from '@/content';
import { InsightsPostPage } from '@/pages/insights-post-page';
import { postHead } from '@/seo';

const findPost = (slug: string) => {
  const post = INSIGHTS_POSTS.find(candidate => candidate.slug === slug);
  if (!post) {
    throw notFound();
  }
  return post;
};

const PostComponent = () => {
  const { slug } = Route.useParams();
  return <InsightsPostPage post={findPost(slug)} />;
};

export const Route = createFileRoute('/insights_/$slug')({
  component: PostComponent,
  head: ({ match }) => postHead(findPost(match.params.slug)),
});
