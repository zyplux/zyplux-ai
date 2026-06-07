import { Check } from 'lucide-react';

import { TIMELINE } from '../../content';
import { Reveal } from '../ui/reveal';

const TimelineScene = ({ index, scene }: { index: number; scene: (typeof TIMELINE.scenes)[0] }) => (
  <li className='relative'>
    <span
      aria-hidden
      className='absolute -left-[38px] top-1.5 size-3 rounded-full border-2 border-accent bg-background'
    />
    <Reveal delay={index * 0.08}>
      <h3 className='text-xl md:text-2xl font-semibold mb-3'>
        <span className='text-accent'>{scene.timestamp}</span>
        <span className='text-heading'> — {scene.title}</span>
      </h3>
      <p className='text-muted mb-4'>{scene.body}</p>
      <p className='inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm text-success'>
        <Check aria-hidden className='h-4 w-4' />
        {scene.status}
      </p>
    </Reveal>
  </li>
);

export const VignetteTimeline = () => (
  <section className='relative py-32' id='week'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-20'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{TIMELINE.intro}</span>
        </h2>
      </Reveal>

      <ol className='relative mx-auto max-w-2xl space-y-16 border-l border-border pl-8'>
        {TIMELINE.scenes.map((scene, index) => (
          <TimelineScene index={index} key={scene.timestamp} scene={scene} />
        ))}
      </ol>

      <Reveal className='mx-auto mt-20 max-w-2xl text-center'>
        <p className='text-muted'>
          {TIMELINE.bridgeStart}{' '}
          <a className='text-accent hover:underline' href='#audit'>
            {TIMELINE.bridgeLink}
          </a>
          {TIMELINE.bridgeEnd}
        </p>
      </Reveal>
    </div>
  </section>
);
