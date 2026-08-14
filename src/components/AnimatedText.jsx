import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

/**
 * AnimatedText — Splits text into words and animates each word in.
 * 
 * Props:
 *   - text: string to animate
 *   - el: HTML element tag (default: 'h1')
 *   - className
 *   - once: animate only once (default true)
 *   - delay: stagger delay in seconds
 */
export default function AnimatedText({
  text,
  el: Element = 'h1',
  className = '',
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 24, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: 800 }}
    >
      <Element className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            style={{ display: 'inline-block', overflow: 'hidden' }}
          >
            {word}
          </motion.span>
        ))}
      </Element>
    </motion.div>
  );
}

/**
 * GradientText — Animated gradient text reveal
 */
export function GradientText({ text, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ backgroundSize: '0% 2px' }}
      animate={isInView ? { backgroundSize: '100% 2px' } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundImage: 'linear-gradient(currentColor, currentColor)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 100%',
        paddingBottom: '2px',
      }}
    >
      {text}
    </motion.span>
  );
}
