import type { MouseEvent } from 'react';

import { Brain, Cpu, Network, Sparkles, Workflow, Zap } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const features = [
  {
    description:
      'AI agents that execute complex workflows without manual intervention, reducing operational overhead by up to 80%.',
    icon: Brain,
    title: 'Autonomous Agents',
  },
  {
    description: 'Scale processing across multiple nodes for parallel task execution and faster decision-making.',
    icon: Network,
    title: 'Distributed Processing',
  },
  {
    description:
      'Orchestrate teams of specialized agents that collaborate to solve complex problems beyond individual capabilities.',
    icon: Workflow,
    title: 'Multi-Agent Coordination',
  },
  {
    description: 'Systems that improve performance over time by learning from outcomes and user feedback.',
    icon: Sparkles,
    title: 'Continuous Learning',
  },
  {
    description: 'Agents understand nuanced context and intent, delivering more accurate and relevant results.',
    icon: Cpu,
    title: 'Contextual Intelligence',
  },
  {
    description: 'Dynamic response to changing conditions with sub-second decision-making and execution.',
    icon: Zap,
    title: 'Real-Time Adaptation',
  },
];

const trackSpotlight = (event: MouseEvent<HTMLDivElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--spot-x', `${String(event.clientX - bounds.left)}px`);
  event.currentTarget.style.setProperty('--spot-y', `${String(event.clientY - bounds.top)}px`);
};

const FeatureCard = ({
  feature,
  index,
  isFeatured = false,
}: {
  feature: (typeof features)[0];
  index: number;
  isFeatured?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: false });
  const Icon = feature.icon;

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 32 }}
      ref={ref}
      style={{ willChange: 'transform, opacity' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -3 }}
    >
      <div
        className={`relative h-full overflow-hidden rounded-xl border bg-surface ${
          isFeatured ? 'border-accent/30 p-10 md:p-12' : 'border-border p-8'
        } transition-[border-color,box-shadow] duration-300 group-hover:border-accent/55 group-hover:shadow-glow`}
        onMouseMove={trackSpotlight}
        style={{ backgroundImage: 'linear-gradient(180deg, rgb(110 118 129 / 0.07), transparent 40%)' }}
      >
        <div
          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'
          style={{
            background:
              'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(88 166 255 / 0.08), transparent 65%)',
          }}
        />

        <motion.div
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 relative z-10 transition-colors duration-300 group-hover:bg-accent/15`}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: index * 0.08 + 0.15, duration: 0.4 }}
        >
          <Icon className={`${isFeatured ? 'h-8 w-8' : 'h-6 w-6'} text-accent`} />
        </motion.div>

        <h3
          className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'} font-semibold text-heading mb-3 relative z-10`}
        >
          {feature.title}
        </h3>
        <p className={`text-muted relative z-10 ${isFeatured ? 'text-lg' : ''}`}>{feature.description}</p>
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-100px', once: false });

  return (
    <section className='relative py-32 overflow-hidden' id='capabilities'>
      <div className='container mx-auto px-4'>
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          ref={ref}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
            <span className='text-gradient'>Core Capabilities</span>
          </h2>
          <p className='text-xl text-muted max-w-2xl mx-auto'>
            Build intelligent applications powered by autonomous AI agents that think, learn, and execute
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <FeatureCard feature={feature} index={index} isFeatured={index === 0} key={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
