import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants } from '../utils/animations';

export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
