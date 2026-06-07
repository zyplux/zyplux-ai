import { FINAL_CTA } from '../../content';
import { AuditForm } from '../forms/audit-form';
import { Reveal } from '../ui/reveal';

export const FinalCta = () => (
  <section className='relative py-32' id='audit'>
    <div className='container mx-auto px-4 max-w-xl text-center'>
      <Reveal>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
          <span className='text-gradient'>{FINAL_CTA.heading}</span>
        </h2>
        <p className='text-lg text-muted mb-12'>{FINAL_CTA.sub}</p>
      </Reveal>
      <Reveal>
        <AuditForm />
      </Reveal>
    </div>
  </section>
);
