import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

/**
 * StatCounter — Animated count-up number on scroll entry.
 * 
 * Props:
 *   - value: number (target)
 *   - suffix: string appended after number (e.g. '%', '+', 'K')
 *   - prefix: string prepended (e.g. '$')
 *   - label: descriptor text
 *   - duration: animation duration in seconds (default 2)
 */
export default function StatCounter({ value, suffix = '', prefix = '', label, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const displayValue = useMotionValue(0);
  const rounded = useSpring(displayValue, { stiffness: 80, damping: 20 });
  const displayed = useTransform(rounded, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      animate(displayValue, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, value, duration, displayValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="stat-counter"
    >
      <motion.span
        className="display-md"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {displayed}
      </motion.span>
      {label && (
        <motion.p
          className="label text-muted"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  );
}
