import { NOT_CHATBOT } from '../../content';
import { Reveal } from '../ui/reveal';
import { SpotlightCard } from '../ui/spotlight-card';

export const NotChatbot = () => (
  <section className='relative py-32'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-12'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{NOT_CHATBOT.heading}</span>
        </h2>
      </Reveal>

      <Reveal className='mx-auto mb-16 max-w-2xl space-y-4 text-lg text-muted'>
        {NOT_CHATBOT.paragraphs.map(paragraph => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-4xl'>
        {NOT_CHATBOT.points.map((point, index) => (
          <Reveal delay={index * 0.08} key={point.title}>
            <SpotlightCard>
              <h3 className='text-xl font-semibold text-heading mb-2'>{point.title}</h3>
              <p className='text-muted'>— {point.detail}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
