import { motion } from 'motion/react';

import { PROCESS } from '../../content';
import { Reveal } from '../ui/reveal';
import { SpotlightCard } from '../ui/spotlight-card';

export const ProcessLadder = () => (
  <section className='relative py-32' id='how-it-works'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{PROCESS.heading}</span>
        </h2>
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl'>
        {PROCESS.steps.map((step, index) => (
          <Reveal delay={index * 0.08} key={step.title}>
            <SpotlightCard>
              <span className='mb-6 flex size-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-semibold text-accent'>
                {index + 1}
              </span>
              <h3 className='text-xl font-semibold text-heading mb-3'>{step.title}</h3>
              <p className='text-muted'>{step.body}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal className='mt-16 text-center'>
        <motion.a
          className='inline-block px-7 py-3.5 rounded-lg bg-accent text-background font-semibold shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/45 transition-shadow'
          href='#audit'
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          {PROCESS.cta}
        </motion.a>
      </Reveal>
    </div>
  </section>
);
