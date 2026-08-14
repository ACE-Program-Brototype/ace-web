import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, viewportConfig } from '../utils/animations';

/**
 * SectionReveal — wraps any section block with a stagger container.
 * Children animate in via fadeInUp when scrolled into view.
 * 
 * Props:
 *   - className: extra CSS classes
 *   - delay: optional delay before stagger starts
 *   - children
 */
export default function SectionReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      style={{ '--stagger-delay': `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealItem — individual animated child inside a SectionReveal.
 * Use as a direct child to inherit stagger timing.
 */
export function RevealItem({ children, className = '', variants = fadeInUp }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
