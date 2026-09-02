import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

import { PARTNER_LOGOS, PLACEMENTS, PLACEMENT_STATS } from '../constants/placementDatas';


export default function PlacementPage() {
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
          <motion.div variants={revealVariant} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {PARTNER_LOGOS.map((partner, i) => {
              const src = typeof partner === 'string' ? partner : partner.src;
              const name = typeof partner === 'string' ? '' : partner.name;
              const isWhiteLogo = typeof partner === 'object' && (partner.type === 'white' || partner.name === 'KubeNine');

              return (
                <div
                  key={i}
                  className="aspect-[4/3] md:aspect-square border border-outline-variant bg-surface-container-lowest flex flex-col items-center justify-between p-6 hover:bg-surface-container-low hover:border-primary/50 transition-all group cursor-pointer"
                >
                  <div className="w-full flex-1 flex items-center justify-center min-h-[60px]">
                    <img
                      style={isWhiteLogo ? { filter: 'brightness(0)' } : undefined}
                      className="max-h-12 max-w-[85%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      src={src}
                      alt={name || 'Partner company logo'}
                    />
                  </div>
                  {name && (
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-medium text-center mt-2 group-hover:text-primary transition-colors">
                      {name}
                    </span>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* 4. Placement Ledger */}
        <motion.section
          className="py-24 border-b border-outline-variant"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        >
          <motion.h2 variants={revealVariant} className="font-headline-lg text-headline-lg mb-12 text-primary">
            Recent Offers
          </motion.h2>
          <motion.div variants={revealVariant} className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b-2 border-primary">
                  {['Placed On', 'Name', 'Role', 'Domain', 'Company', 'Package'].map(h => (
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
                    <td className="py-6 px-4 text-on-surface">
                      {p.company === 'ND' ? (
                        <span className="text-on-surface-variant italic">ND (Non-Disclosable)</span>
                      ) : (
                        p.company
                      )}
                    </td>
                    <td className="py-6 px-4 text-primary font-medium">{p.pkg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.section>

        {/* 5. CTA */}
        <section className="py-32 text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8">Join the next generation of engineers.</h2>
          <Link to="/alumni" className="inline-flex items-center font-mono text-mono text-on-surface-variant hover:text-primary transition-colors group">
            View Alumni Stories
            <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform text-[18px]">arrow_forward</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
