import { useState } from 'react';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const CATEGORIES = ['All', 'Engineering', 'System Architecture', 'Community', 'Newsletters'];

const ARTICLES = [
  { date: 'Aug 02', title: 'The Evolution of Type Safety in Distributed Systems',        author: 'Sarah Jenkins', time: '12 min', tag: 'Engineering' },
  { date: 'Jul 28', title: 'Designing for Extreme Whitespace',                           author: 'Marcus Chen',   time: '6 min',  tag: 'System Architecture' },
  { date: 'Jul 15', title: 'The ACE Outcomes: A Year in Review',                         author: 'Elena Rostova', time: '10 min', tag: 'Community' },
  { date: 'Jul 05', title: 'A Practitioner\'s Guide to Idiomatic Go',                   author: 'Aswin Sreeraj', time: '9 min',  tag: 'Engineering' },
  { date: 'Jun 20', title: 'Micro-Frontends at Scale: Lessons from Production',          author: 'Priya Nair',    time: '7 min',  tag: 'Engineering' },
  { date: 'Jun 08', title: 'The ACE Newsletter — June 2026',                             author: 'ACE Editorial', time: '5 min',  tag: 'Newsletters' },
];

export default function JournalPage() {
  const [active, setActive] = useState('All');

  const articles = ARTICLES.filter(a => active === 'All' || a.tag === active);

  return (
    <div className="bg-surface antialiased font-body-md min-h-screen">
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

        {/* Header */}
        <motion.section
          className="mb-section-gap max-w-4xl pt-16"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter">
            The Journal.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant md:w-3/5 leading-relaxed">
            Research, technical deep-dives, and insights from the engineers within the ACE ecosystem.
          </motion.p>
        </motion.section>

        {/* Category Filter */}
        <section className="mb-16 border-b border-outline-variant pb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <nav className="flex gap-8">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`font-label-sm text-label-sm uppercase tracking-wider transition-colors ${
                  active === c ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </nav>
        </section>

        {/* Featured Article */}
        <motion.section
          className="mb-section-gap group cursor-pointer"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-7 aspect-[4/3] lg:aspect-[16/9] w-full overflow-hidden bg-surface-container-high relative">
              <img
                alt="Featured article image"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvwGzgJyRMmq7hDctG3WyMkG2OFuUbHusMKrHt5XvuN6S9oJd6Y1y83xIu8TRI-AdUSlQAFHy0O55E2mEssHq6Kv43SfwjuU244EF4bDN_cp-8Hta-vVd_PIwxJ6CjhBgFkKrB4X0x4nOsOZjTVLho9WBGapWmMrMIqPNPGTciEMuBDc02xlXR3BO_SCP6lSiaoMBSaUq-Ij6AHR4xfmWrPnjeGXb9rZ_LDF5zhPmZA1WjmXnXZCbW"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center h-full pt-8 lg:pt-0 lg:pl-8">
              <div className="font-label-sm text-label-sm uppercase text-on-surface-variant mb-4 tracking-wider flex items-center gap-2">
                <span>August 6, 2026</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant inline-block" />
                <span>8 min read</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6 group-hover:text-on-surface-variant transition-colors duration-300">
                Building a Multi-Role Event Platform using Go and Clean Architecture.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 line-clamp-3">
                Exploring the structural decisions and trade-offs required to design a highly concurrent, multi-tenant event management system capable of handling heterogeneous user roles and complex state transitions without sacrificing type safety or developer velocity.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
                  <img
                    alt="Aswin Sreeraj"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf7oLSE_IhJmldW8jDfpVJnM_mDQcaacE9pFaEnkKn32LGlNzk7X4uj09nuVWN0G9TY20LAQJIxf-d0IHwbpSp-mzIUoD32rgJ5ImsXSIBKW7NLgx78ovR7lWGAh2I_EHI5q1KgQN9uC0MdgSKwlIcHsDyifsj9IpbeTqspxg6_KlsTySq14IT0qXk8gprQH8Wvu88U31G2Mpr0ELsfLP9jNFsNKGU0TOqyvVAi06YCcTMsMdX4NnP"
                  />
                </div>
                <span className="font-label-sm text-label-sm uppercase text-primary tracking-wide">Aswin Sreeraj</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Article Ledger */}
        <motion.section
          className="mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="border-t border-outline-variant flex flex-col">
            {articles.map(a => (
              <motion.a
                key={a.title}
                variants={revealVariant}
                href="#"
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-300 px-4 -mx-4 items-center"
              >
                <div className="md:col-span-2 font-mono text-mono text-on-surface-variant">{a.date}</div>
                <div className="md:col-span-6 flex flex-col gap-2">
                  <h3 className="font-headline-md text-headline-md text-primary group-hover:text-on-surface-variant transition-colors">{a.title}</h3>
                  <span className="inline-block px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider w-max">{a.tag}</span>
                </div>
                <div className="md:col-span-4 font-label-sm text-label-sm uppercase text-on-surface-variant md:text-right tracking-wider flex items-center md:justify-end gap-2 mt-4 md:mt-0">
                  <span>{a.author}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant inline-block" />
                  <span>{a.time}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Load More */}
        <section className="flex justify-center mt-12 mb-section-gap">
          <button className="bg-surface text-primary border border-outline-variant font-label-sm text-label-sm px-8 py-3 uppercase tracking-wider hover:bg-surface-container-low hover:border-primary transition-all duration-300">
            Load More Articles
          </button>
        </section>
      </main>
    </div>
  );
}
