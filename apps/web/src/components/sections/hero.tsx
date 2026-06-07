import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero = () => (
  <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
    <div className='container mx-auto px-4 py-32 relative z-10'>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className='text-center max-w-4xl mx-auto'
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-8'
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className='h-4 w-4 text-accent' />
          <span className='text-sm font-medium text-accent'>Neural Intelligence Systems</span>
        </motion.div>

        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className='text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tight'
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className='text-gradient animate-shimmer bg-[length:200%_auto]'>Zyplux</span>
        </motion.h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className='text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Experience the future of agentic web systems and cognitive frameworks.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center'
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.button
            aria-label='Deploy AI Agents (Coming Soon)'
            className='px-7 py-3.5 rounded-lg bg-accent text-background font-semibold flex items-center gap-2 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/45 transition-shadow'
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Deploy Agents
            <ArrowRight className='h-5 w-5' />
          </motion.button>

          <motion.button
            aria-label='Explore AI Framework (Coming Soon)'
            className='px-7 py-3.5 rounded-lg border border-border bg-surface/60 text-heading font-semibold hover:border-accent/55 hover:bg-surface transition-colors'
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Framework
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2'
        initial={{ opacity: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          className='text-muted'
          initial={{ y: 0 }}
          transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
        >
          <div className='w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-2'>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              className='w-1.5 h-1.5 bg-accent rounded-full'
              initial={{ y: 0 }}
              transition={{ delay: 1.1, duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
