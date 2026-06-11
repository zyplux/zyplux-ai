import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

import '@/index.css';

const RootDocument = () => (
  <html lang='en'>
    <head>
      <HeadContent />
    </head>
    <body>
      <Outlet />
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  component: RootDocument,
  head: () => ({
    links: [{ href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' }],
    meta: [{ charSet: 'utf8' }, { content: 'width=device-width, initial-scale=1.0', name: 'viewport' }],
  }),
});
