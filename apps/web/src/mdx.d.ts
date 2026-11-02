declare module '*.mdx' {
  export const frontmatter: unknown;
}

declare module '@content/pages/home.mdx' {
  import type { MDXContent } from 'mdx/types';

  const Body: MDXContent;
  export default Body;

  export const frontmatter: {
    description: string;
    title: string;
  };
}

declare module '@content/pages/privacy.mdx' {
  import type { MDXContent } from 'mdx/types';

  const Body: MDXContent;
  export default Body;

  export const frontmatter: {
    description: string;
    headline: string;
    title: string;
  };
}

declare module '@content/pages/insights.mdx' {
  import type { MDXContent } from 'mdx/types';

  const Body: MDXContent;
  export default Body;

  export const frontmatter: {
    button: string;
    description: string;
    emailLabel: string;
    headline: string;
    title: string;
  };
}

declare module '@content/pages/agent.mdx' {
  import type { MDXContent } from 'mdx/types';

  const Body: MDXContent;
  export default Body;

  export const frontmatter: {
    button: string;
    description: string;
    emailLabel: string;
    headline: string;
    title: string;
  };
}
