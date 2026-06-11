import { Cpu, Crosshair, Map } from 'lucide-react';

import { Pictogram } from '@/components/ui/pictogram';
import { Reveal } from '@/components/ui/reveal';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { SystemMap } from '@/components/ui/system-map';
import { METHOD } from '@/content';

const BEAT_ICONS = [Map, Crosshair, Cpu];

export const Method = () => (
  <section className='relative py-32' id='approach'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-10'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{METHOD.heading}</span>
        </h2>
      </Reveal>

      <Reveal className='mx-auto max-w-2xl space-y-4 text-lg text-muted'>
        {METHOD.paragraphs.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal>
        <SystemMap content={METHOD.diagram} />
      </Reveal>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl'>
        {METHOD.beats.map((beat, index) => {
          const Icon = BEAT_ICONS[index];
          return (
            <Reveal delay={index * 0.08} key={beat.title}>
              <SpotlightCard>
                {Icon !== undefined && <Pictogram delay={index * 0.08} icon={Icon} />}
                <h3 className='text-xl font-semibold text-heading mb-2'>{beat.title}</h3>
                <p className='text-muted'>{beat.detail}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
