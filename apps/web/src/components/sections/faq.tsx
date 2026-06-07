import { ChevronDown } from 'lucide-react';

import { FAQ } from '../../content';
import { Reveal } from '../ui/reveal';

export const Faq = () => (
  <section className='relative py-32' id='faq'>
    <div className='container mx-auto px-4 max-w-3xl'>
      <Reveal className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{FAQ.heading}</span>
        </h2>
      </Reveal>

      <div className='space-y-4'>
        {FAQ.items.map(item => (
          <Reveal key={item.question}>
            <details className='group rounded-xl border border-border bg-surface transition-colors hover:border-accent/55'>
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-heading'>
                {item.question}
                <ChevronDown
                  aria-hidden
                  className='h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180'
                />
              </summary>
              <p className='px-5 pb-5 text-muted'>{item.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
