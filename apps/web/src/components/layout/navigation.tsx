import { Zap } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';

import { BRAND_NAME, NAV } from '@/content';

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 200 });

  useMotionValueEvent(scrollY, 'change', latest => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg border-border' : 'bg-transparent border-transparent'
      }`}
      initial={{ y: -80 }}
      style={{ willChange: 'transform' }}
      transition={{ damping: 30, stiffness: 100, type: 'spring' }}
    >
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <motion.a
          aria-label='Scroll to top'
          className='flex items-center gap-2 cursor-pointer'
          href='/'
          onClick={event => {
            event.preventDefault();
            window.scrollTo({ behavior: 'smooth', top: 0 });
            globalThis.history.pushState({}, '', '/');
          }}
          transition={{ stiffness: 300, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
        >
          <Zap className='h-6 w-6 text-accent' />
          <span className='text-xl font-bold tracking-tight text-heading'>{BRAND_NAME}</span>
        </motion.a>

        <div className='flex items-center gap-6'>
          <div className='hidden md:flex items-center gap-6'>
            {NAV.links.map(link => (
              <a
                className='text-sm font-medium text-muted hover:text-heading transition-colors'
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
            <a className='text-sm font-medium text-muted hover:text-heading transition-colors' href='/agent'>
              {NAV.agentLink}
            </a>
          </div>
          <a
            className='rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background shadow-lg shadow-accent/30 transition-shadow hover:shadow-xl hover:shadow-accent/45'
            href='#audit'
          >
            {NAV.cta}
          </a>
        </div>
      </div>

      <motion.div
        className='absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-accent to-violet'
        style={{ scaleX: scrollProgress }}
      />
    </motion.nav>
  );
};
