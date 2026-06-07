import founderPhoto from '../../assets/founder.jpg';
import { FOUNDER } from '../../content';
import { Reveal } from '../ui/reveal';

export const FounderNote = () => (
  <section className='relative py-32'>
    <div className='container mx-auto px-4 max-w-3xl'>
      <Reveal className='text-center mb-16'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{FOUNDER.heading}</span>
        </h2>
      </Reveal>

      <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
        <img
          alt={FOUNDER.photoAlt}
          className='size-40 shrink-0 rounded-full border border-border object-cover'
          height={400}
          src={founderPhoto}
          width={400}
        />
        <div className='space-y-4'>
          {FOUNDER.paragraphs.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
