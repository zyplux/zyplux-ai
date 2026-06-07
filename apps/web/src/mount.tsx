import type { ReactNode } from 'react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

export const mount = (page: ReactNode) => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    throw new Error('Root element not found');
  }

  createRoot(rootElement).render(<StrictMode>{page}</StrictMode>);
};
