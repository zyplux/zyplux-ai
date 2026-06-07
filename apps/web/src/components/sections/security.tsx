import { SECURITY } from '../../content';
import { Reveal } from '../ui/reveal';
import { SpotlightCard } from '../ui/spotlight-card';

export const Security = () => (
  <section className='relative py-32' id='security'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-6'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{SECURITY.heading}</span>
        </h2>
      </Reveal>

      <Reveal className='mx-auto mb-16 max-w-2xl text-center'>
        <p className='text-lg text-muted'>{SECURITY.intro}</p>
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-5xl'>
        {SECURITY.points.map((point, index) => (
          <Reveal delay={index * 0.08} key={point.title}>
            <SpotlightCard>
              <h3 className='text-xl font-semibold text-heading mb-2'>{point.title}</h3>
              {point.detail !== undefined && <p className='text-muted'>{point.detail}</p>}
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
