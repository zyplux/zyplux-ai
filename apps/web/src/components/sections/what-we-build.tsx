import { LayoutDashboard, RefreshCw, Smartphone } from 'lucide-react';

import { MiniDashboard } from '@/components/ui/mini-dashboard';
import { Pictogram } from '@/components/ui/pictogram';
import { Reveal } from '@/components/ui/reveal';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { BUILD, MINI_DASHBOARD } from '@/content';

const BUCKET_ICONS = [RefreshCw, LayoutDashboard, Smartphone];

export const WhatWeBuild = () => (
  <section className='relative py-32' id='build'>
    <div className='container mx-auto px-4'>
      <Reveal className='text-center mb-6'>
        <h2 className='text-4xl md:text-5xl font-bold tracking-tight'>
          <span className='text-gradient'>{BUILD.heading}</span>
        </h2>
      </Reveal>

      <Reveal className='mx-auto mb-16 max-w-2xl text-center'>
        <p className='text-lg text-muted'>{BUILD.intro}</p>
      </Reveal>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl items-stretch'>
        {BUILD.buckets.map((bucket, index) => {
          const Icon = BUCKET_ICONS[index];
          const isEdge = bucket.surface.startsWith('At the edge');
          const badgeClass = isEdge
            ? 'border-violet/30 bg-violet/10 text-violet'
            : 'border-accent/30 bg-accent/10 text-accent';
          return (
            <Reveal delay={index * 0.08} key={bucket.title}>
              <SpotlightCard>
                <div className='flex h-full flex-col'>
                  <span
                    className={`mb-5 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
                  >
                    {bucket.surface}
                  </span>
                  {Icon !== undefined && <Pictogram delay={index * 0.08} icon={Icon} />}
                  <h3 className='text-xl font-semibold text-heading mb-2'>{bucket.title}</h3>
                  <p className='text-muted mb-6'>{bucket.detail}</p>
                  <p className='mt-auto inline-flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm text-success'>
                    {bucket.outcome}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal className='mx-auto mt-16 max-w-4xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-2xl border border-border bg-surface/40 p-8'>
          <div>
            <h3 className='text-2xl font-semibold text-heading mb-3'>Ask a question, get a view.</h3>
            <p className='text-muted'>
              No ticket, no waiting on the data team. Type what you want to know in plain language and a dashboard is
              assembled from your own data while you watch — a scenario of what &ldquo;light up the system&rdquo; looks
              like.
            </p>
          </div>
          <MiniDashboard question={MINI_DASHBOARD.question} />
        </div>
      </Reveal>
    </div>
  </section>
);
