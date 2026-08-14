import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

import { ALUMNI_STORIES, ALUMNI_STATS } from '../constants/alumniDatas';


export default function AlumniPage() {
  const recentAlumni = ALUMNI_STORIES.find(a => a.recent) || ALUMNI_STORIES[0];

  return (
    <div className="bg-surface text-on-surface antialiased font-body-md">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

        {/* Page Header */}
        <motion.header
          className="mb-24 pt-16"
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.p variants={revealVariant} className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">
            Alumni
          </motion.p>
          <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter">
            The Network.
          </motion.h1>
          <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Engineers who passed through ACE are now building the future at the world's most consequential technology companies.
          </motion.p>
        </motion.header>

        {/* Stats Strip */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 border-t border-outline-variant mb-24"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          {ALUMNI_STATS.map(s => (
            <motion.div key={s.label} variants={revealVariant} className="py-10 px-4 text-center flex flex-col items-center justify-center border-r border-outline-variant last:border-r-0">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">{s.value}</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">{s.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* Alumni Stories Grid */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-24"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          {ALUMNI_STORIES.filter(a => !a.recent).map(a => (
            <motion.article key={a.name} variants={revealVariant}
              className="border border-outline-variant p-6 flex flex-col justify-between hover:bg-surface-container-low transition-colors h-full group"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img className="w-12 h-12 rounded-full object-cover border border-outline-variant" alt={a.name} src={a.img} />
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary text-lg">{a.name}</h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{a.role}</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 bg-surface-container-low text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider mb-4">
                  {a.domain}
                </span>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">{a.quote}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Comp Package</span>
                <span className="font-mono text-mono text-primary">{a.pkg}</span>
              </div>
            </motion.article>
          ))}
        </motion.section>

        {/* Featured Alumni Spotlight */}
        <motion.section
          className="border-y border-outline-variant py-16 mb-24"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={revealVariant} className="relative h-[500px] w-full overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt={recentAlumni.name}
                src={recentAlumni.img}
              />
            </motion.div>
            <motion.div variants={revealVariant}>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">Spotlight Series</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">{recentAlumni.name}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{recentAlumni.role}</p>
              <div className="space-y-8">
                <div>
                  <h4 className="font-label-sm text-label-sm text-primary font-bold uppercase mb-2">Featured Quote</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">"{recentAlumni.quote}"</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* View More */}
        <div className="flex justify-center mb-24">
          <button className="px-8 py-3 border border-outline-variant font-label-sm text-label-sm text-primary hover:bg-surface-container-low transition-colors bg-surface-container-lowest">
            View More Alumni
          </button>
        </div>
      </main>
    </div>
  );
}
