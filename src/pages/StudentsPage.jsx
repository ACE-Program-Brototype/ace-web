import { useState } from 'react';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

import { STUDENTS } from '../constants/studentsDatas';


export default function StudentsPage() {
  const [query, setQuery] = useState('');

  const filtered = STUDENTS.filter(s => {
    const q = query.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.stack.toLowerCase().includes(q) || s.batch.toLowerCase().includes(q);
  });

  return (
    <div className="bg-surface-container-lowest text-primary antialiased font-body-md">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

        {/* Page Header */}
        <motion.header
          className="mb-24 text-left pt-16 max-w-full"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-8 tracking-tighter">
            The Roster.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            A curated directory of high-performance developers within the ACE ecosystem. Filter by batch, domain, or tech stack.
          </motion.p>
        </motion.header>

        {/* Search & Filter */}
        <section className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-outline-variant pb-8">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant px-2 pointer-events-none">search</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 pl-10 py-2 font-body-md text-body-md text-primary placeholder:text-on-surface-variant transition-colors rounded-none outline-none"
              placeholder="Search by name, tech stack, or batch..."
              type="text"
            />
          </div>
        </section>

        {/* Directory Grid */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-24"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          {filtered.map(s => (
            <motion.article
              key={s.name}
              variants={revealVariant}
              className="border border-outline-variant bg-surface-container-lowest p-6 transition-colors duration-300 hover:border-primary group"
            >
              <div className="aspect-square mb-6 overflow-hidden bg-surface-container-low">
                <img
                  alt={s.name}
                  src={s.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="font-body-md font-bold text-primary">{s.name}</h3>
                <p className="font-mono text-mono text-on-surface-variant uppercase tracking-widest text-[11px]">{s.batch}</p>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 line-clamp-2">{s.stack}</p>
              <div className="flex items-center space-x-3 pt-4 border-t border-outline-variant">
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">link</span>
                </a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">code</span>
                </a>
                <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
