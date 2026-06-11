import { createFileRoute } from '@tanstack/react-router';

import { PAGES } from '@/content';
import { AgentPage } from '@/pages/agent-page';
import { pageHead } from '@/seo';

export const Route = createFileRoute('/agent')({
  component: AgentPage,
  head: () => pageHead(PAGES.agent),
});
