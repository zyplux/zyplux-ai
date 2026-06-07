import type { ReactNode } from 'react';

import { ArrowLeft, Zap } from 'lucide-react';

import { BRAND_NAME, NAV, SKIP_LINK_LABEL } from '../../content';
import { Footer } from '../sections/footer';
import { GridBackground } from './grid-background';

export const SubpageLayout = ({ children }: { children: ReactNode }) => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      {SKIP_LINK_LABEL}
    </a>
    <GridBackground />
    <header className='border-b border-border'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <a className='flex items-center gap-2' href='/'>
          <Zap className='h-6 w-6 text-accent' />
          <span className='text-xl font-bold tracking-tight text-heading'>{BRAND_NAME}</span>
        </a>
        <a
          className='flex items-center gap-2 text-sm font-medium text-muted hover:text-heading transition-colors'
          href='/'
        >
          <ArrowLeft aria-hidden className='h-4 w-4' />
          {NAV.backHome}
        </a>
      </div>
    </header>
    <main className='container mx-auto px-4 py-24 max-w-2xl' id='main-content'>
      {children}
    </main>
    <Footer />
  </div>
);
