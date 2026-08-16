import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../constants/faqDatas';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-outline-variant">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-headline-md text-headline-md text-primary group-hover:text-on-surface-variant transition-colors">
          {q}
        </span>
        <span className={`material-symbols-outlined text-on-surface-variant transform transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          add
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-6 font-body-md text-body-md text-on-surface-variant">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Faq() {
  return (
    <motion.div
      className="md:col-span-6 md:col-start-7"
      initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
    >
      <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-primary mb-10 pb-4 border-b border-outline-variant">
        Frequently Asked Questions
      </motion.h2>
      <div className="border-t border-outline-variant">
        {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
      </div>
    </motion.div>
  );
}
