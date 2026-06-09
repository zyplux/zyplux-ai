import { Zap } from 'lucide-react';

import { BRAND_NAME, CONTACT_EMAIL, FOOTER, NAV } from '@/content';

export const Footer = () => (
  <footer className='relative mt-24 py-12 border-t border-border'>
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-8 mb-8'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex items-center gap-2 mb-4'>
            <Zap className='h-6 w-6 text-accent' />
            <span className='text-xl font-bold tracking-tight text-heading'>{BRAND_NAME}</span>
          </div>
          <p className='text-muted max-w-md'>{FOOTER.blurb}</p>
        </div>

        <div>
          <h3 className='font-semibold text-heading mb-4'>{FOOTER.navigateHeading}</h3>
          <ul className='space-y-2'>
            {NAV.links.map(link => (
              <li key={link.href}>
                <a className='text-muted hover:text-accent transition-colors' href={`/${link.href}`}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-heading mb-4'>{FOOTER.pagesHeading}</h3>
          <ul className='space-y-2'>
            {FOOTER.pages.map(page => (
              <li key={page.href}>
                <a className='text-muted hover:text-accent transition-colors' href={page.href}>
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-heading mb-4'>{FOOTER.contactHeading}</h3>
          <ul className='space-y-2'>
            <li>
              <a className='text-muted hover:text-accent transition-colors' href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                className='text-muted hover:text-accent transition-colors'
                href={FOOTER.linkedin.href}
                rel='noreferrer'
                target='_blank'
              >
                {FOOTER.linkedin.label}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='pt-8 border-t border-border text-center text-sm text-muted'>
        <p>
          © {new Date().getFullYear()} {BRAND_NAME}.
        </p>
      </div>
    </div>
  </footer>
);
