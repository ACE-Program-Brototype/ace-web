import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

import { PLACEMENTS, PLACEMENT_STATS } from '../constants/placementDatas';
import PartnerLogosMarquee from '../components/PartnerLogosMarquee';


export default function PlacementPage() {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  return (
    <div className="bg-surface-container-lowest text-on-surface antialiased font-body-md">
      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-section-gap">

        {/* 1. Header */}
        <motion.section
          className="pt-24 pb-12 border-b border-outline-variant"
          initial="hidden" animate="visible" variants={stagger}
        >
          <div className="pt-8">
            <motion.h1 variants={revealVariant} className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-8 text-left tracking-tighter">
              The Outcomes.
            </motion.h1>
            <motion.p variants={revealVariant} className="font-body-lg text-body-lg text-on-surface-variant max-w-lg text-left">
              A data-driven record of engineering excellence and career growth.
            </motion.p>
          </div>
        </motion.section>

        {/* 2. Key Metrics */}
        <motion.section
          className="py-24 border-b border-outline-variant"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
            {PLACEMENT_STATS.map(m => (
              <motion.div key={m.label} variants={revealVariant} className="p-8 text-center flex flex-col items-center justify-center">
                <div className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-4 tracking-tighter">{m.value}</div>
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3. Hiring Partners */}
        <motion.section
          className="py-24 border-b border-outline-variant"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-center mb-16 text-primary">
            Where our engineers go.
          </motion.h2>
          <PartnerLogosMarquee />
        </motion.section>

        {/* 4. Placement Ledger / Recent Offers */}
        <motion.section
          className="py-24 border-b border-outline-variant"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg text-primary mb-2">
                Recent Offers
              </motion.h2>
              <motion.p variants={revealVariant} className="font-body-md text-sm text-on-surface-variant">
                Verified offers and career milestones from the ACE cohort.
              </motion.p>
            </div>

            {/* View Mode Toggle Switcher */}
            <motion.div variants={revealVariant} className="inline-flex p-1 border border-outline-variant bg-surface self-start sm:self-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-label-sm text-xs font-semibold uppercase tracking-wider transition-all ${viewMode === 'cards'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                Mini Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-label-sm text-xs font-semibold uppercase tracking-wider transition-all ${viewMode === 'table'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">table_rows</span>
                Table View
              </button>
            </motion.div>
          </div>

          {viewMode === 'cards' ? (
            /* Individual Mini Cards Grid */
            <motion.div
              variants={revealVariant}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
            >
              {PLACEMENTS.map((p) => {
                const isDisclosablePkg =
                  p.pkg &&
                  p.pkg !== 'ND' &&
                  p.pkg !== 'Non-Disclosable' &&
                  p.pkg !== 'Non Disclosable';

                const isDisclosableCompany =
                  p.company &&
                  p.company !== 'ND' &&
                  p.company !== 'Non-Disclosable';

                return (
                  <div
                    key={p.name}
                    className="border border-outline-variant bg-surface p-5 flex flex-col justify-between hover:border-primary/60 hover:shadow-md transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Row: Avatar & Package Tag */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-12 h-12 rounded-sm overflow-hidden border border-outline-variant bg-surface-container-low shrink-0">
                          {p.img ? (
                            <img
                              src={p.img}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-primary font-mono text-sm">
                              {p.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        <span
                          className={`font-mono text-xs px-2.5 py-1 border font-semibold tracking-tight ${isDisclosablePkg
                            ? 'bg-accent/15 border-accent/40 text-primary'
                            : 'bg-surface-container-high border-outline-variant text-on-surface-variant'
                            }`}
                        >
                          {isDisclosablePkg ? p.pkg : 'Non-Disclosable'}
                        </span>
                      </div>

                      {/* Name & Role */}
                      <h3 className="font-headline-sm text-base font-bold text-primary group-hover:text-primary transition-colors leading-snug truncate">
                        {p.name}
                      </h3>
                      <p className="font-body-md text-xs text-on-surface-variant truncate mt-0.5">
                        {p.role}
                      </p>

                      {/* Domain & Company */}
                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-outline-variant">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-surface-container-high text-on-surface border border-outline-variant">
                          {p.domain}
                        </span>
                        {/* <span className="font-mono text-xs text-on-surface-variant truncate font-medium">
                          {isDisclosableCompany ? p.company : 'Non-Disclosable'}
                        </span> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Table View */
            <motion.div variants={revealVariant} className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="border-b-2 border-primary">
                    {['Placed On', 'Name', 'Role', 'Domain', 'Package'].map(h => (
                      <th key={h} className="py-4 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono text-mono">
                  {PLACEMENTS.map(p => (
                    <tr key={p.name} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="py-6 px-4 text-on-surface-variant">{p.placedOn}</td>
                      <td className="py-6 px-4 font-medium text-primary">{p.name}</td>
                      <td className="py-6 px-4 text-on-surface">{p.role}</td>
                      <td className="py-6 px-4 text-on-surface-variant">{p.domain}</td>
                      {/* <td className="py-6 px-4 text-on-surface">
                        {p.company === 'ND' || p.company === 'Non-Disclosable' ? (
                          <span className="text-on-surface-variant italic">Non-Disclosable</span>
                        ) : (
                          p.company
                        )}
                      </td> */}
                      <td className="py-6 px-4 text-primary font-medium">
                        {p.pkg === 'ND' || p.pkg === 'Non-Disclosable' || p.pkg === 'Non Disclosable' ? (
                          <span className="text-on-surface-variant italic font-normal">Non-Disclosable</span>
                        ) : (
                          p.pkg
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.section>

        {/* 5. CTA */}
        <section className="py-32 text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Join the next generation of engineers.</h2>
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            to="/alumni" className="inline-flex items-center font-mono text-mono text-on-surface-variant hover:text-primary transition-colors group">
            View Alumni Stories
            <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform text-[18px]">arrow_forward</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
