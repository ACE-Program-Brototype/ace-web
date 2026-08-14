import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

import { FOUNDERS, HANDLERS } from '../constants/teamDatas';


export default function TeamPage() {
  return (
    <div className="bg-surface-container-lowest antialiased font-body-md flex flex-col min-h-screen">
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

        {/* Header */}
        <motion.header
          className="pt-32 pb-section-gap w-full"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter">
            The Handlers.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            The stewards of the ACE Community. A dedicated group of professionals ensuring rigorous standards, fostering intellectual growth, and maintaining the highest echelon of academic discourse.
          </motion.p>
        </motion.header>

        {/* Founding Stewards */}
        <motion.section
          className="mb-section-gap"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="flex items-center gap-4 mb-12 border-b border-outline-variant pb-4">
            <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Founding Stewards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {FOUNDERS.map(f => (
              <motion.div
                key={f.name}
                variants={revealVariant}
                className="group flex flex-col md:flex-row bg-surface-container-lowest border border-outline-variant overflow-hidden hover:border-primary transition-colors duration-300"
              >
                <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img alt={f.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={f.img} />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center bg-surface-bright">
                  <span className="font-mono text-mono text-on-surface-variant uppercase tracking-wider mb-2 text-xs">{f.role}</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">{f.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-6 leading-relaxed">{f.quote}</p>
                  <a aria-label="LinkedIn Profile" className="mt-auto text-on-surface-variant hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">open_in_new</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Handlers */}
        <motion.section
          className="mb-section-gap"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="flex items-center gap-4 mb-12 border-b border-outline-variant pb-4">
            <h2 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Community Handlers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {HANDLERS.map(h => (
              <motion.div
                key={h.name}
                variants={revealVariant}
                className="group bg-surface-container-lowest border border-outline-variant p-2 hover:border-primary transition-colors duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 bg-surface-container-low">
                  <img alt={h.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={h.img} />
                </div>
                <div className="px-2 pb-4">
                  <h4 className="font-headline-md text-headline-md text-primary mb-1">{h.name}</h4>
                  <p className="font-mono text-mono text-on-surface-variant uppercase tracking-wider text-xs mb-4">{h.role}</p>
                  <p className="font-body-md text-body-md text-on-surface-variant italic leading-snug mb-6">{h.quote}</p>
                  <a aria-label="LinkedIn Profile" className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined">open_in_new</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <section className="py-section-gap flex flex-col items-center justify-center text-center">
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">Have a question for the team?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-headline-md text-headline-md text-primary hover:text-on-surface-variant transition-colors duration-200 border-b border-primary pb-1 hover:border-outline-variant"
          >
            Contact Us <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
