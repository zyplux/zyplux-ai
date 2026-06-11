import { createFileRoute } from '@tanstack/react-router';

import App from '@/app';
import { PAGES } from '@/content';
import { pageHead } from '@/seo';

export const Route = createFileRoute('/')({
  component: App,
  head: ({ match }) => pageHead(PAGES.index, match.pathname),
});
