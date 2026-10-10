import { useState } from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };

import { STUDENTS } from '../constants/studentsDatas';


export default function StudentsPage() {
  const [query, setQuery] = useState('');

  const filtered = STUDENTS.filter(s => {
    const q = query.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.stack.toLowerCase().includes(q) || s.batch.toLowerCase().includes(q);
  });

  return (
    <div className="bg-surface-container-lowest text-primary antialiased font-body-md">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-12 md:pt-section-gap pb-12 md:pb-section-gap">

        {/* Page Header */}
        <motion.header
          className="mb-8 md:mb-20 text-left pt-0 md:pt-12 max-w-full"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.h1 variants={revealVariant} className="font-display-lg text-3xl sm:text-4xl md:text-display-lg text-primary mb-2 sm:mb-4 md:mb-6 tracking-tighter">
            The Roster.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-md text-sm sm:text-base md:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            A curated directory of high-performance developers within the ACE ecosystem. Filter by batch, domain, or tech stack.
          </motion.p>
        </motion.header>

        {/* Search & Filter */}
        <section className="mb-8 md:mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 border-b border-outline-variant pb-4 md:pb-6">
          <div className="relative w-full sm:w-96">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant px-2 pointer-events-none">search</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search directory by name, tech stack, or batch"
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 pl-10 py-2 font-body-md text-sm sm:text-body-md text-primary placeholder:text-on-surface-variant transition-colors rounded-none outline-none"
              placeholder="Search by name, tech stack, or batch..."
              type="text"
            />
          </div>
        </section>

        {/* Directory Grid */}
        {filtered.length > 0 ? (
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-gutter mb-16 md:mb-24"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "100px" }} variants={stagger}
          >
            {filtered.map((s, index) => (
              <motion.article
                key={s.name}
                variants={revealVariant}
                className="border border-outline-variant bg-surface-container-lowest p-4 sm:p-5 md:p-6 transition-colors duration-300 hover:border-primary group"
              >
                <div className="aspect-square mb-4 md:mb-6 overflow-hidden bg-surface-container-low">
                  <img
                    alt={s.name}
                    src={s.img}
                    width={400}
                    height={400}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-1 mb-3 md:mb-4">
                  <h3 className="font-body-md font-bold text-base md:text-body-md text-primary">{s.name}</h3>
                  <p className="font-mono text-mono text-on-surface-variant uppercase tracking-widest text-[10px] md:text-[11px]">{s.batch}</p>
                </div>
                <p className="font-label-sm text-xs md:text-label-sm text-on-surface-variant mb-4 md:mb-6 line-clamp-2">{s.stack}</p>
                <div className="flex items-center space-x-3 pt-3 md:pt-4 border-t border-outline-variant">
                  {s.linkedin && (
                    <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}'s LinkedIn profile`} className="text-on-surface-variant hover:text-primary transition-colors">
                      <FaLinkedin className="text-[18px] md:text-[20px]" />
                    </a>
                  )}
                  {s.github && (
                    <a href={s.github} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}'s GitHub profile`} className="text-on-surface-variant hover:text-primary transition-colors">
                      <FaGithub className="text-[18px] md:text-[20px]" />
                    </a>
                  )}
                  {s.portfolio && (
                    <a href={s.portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}'s portfolio`} className="text-on-surface-variant hover:text-primary transition-colors">
                      <FaGlobe className="text-[18px] md:text-[20px]" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 px-6 text-center border border-dashed border-outline-variant bg-surface-container-lowest mb-24"
          >
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">search_off</span>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">No Matches Found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              We couldn't find any students matching "<span className="text-primary font-bold">{query}</span>". Try adjusting your search terms or checking for typos.
            </p>
            <button 
              onClick={() => setQuery('')}
              className="mt-6 px-6 py-3 border border-outline-variant hover:border-primary text-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors bg-surface-container-low hover:bg-surface-container-lowest"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
