import { motion } from "framer-motion";
import {
  ALUMNI_MEMBERS,
  ALUMNI_STATS,
} from "../constants/alumniDatas";

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function AlumniPage() {

  return (
    <div className="bg-surface text-on-surface antialiased font-body-md">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 sm:pt-16 md:pt-section-gap pb-section-gap">
        {/* 1. Page Header */}
        <motion.header
          className="mb-12 md:mb-20 pt-0 md:pt-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={revealVariant}
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4"
          >
            Alumni
          </motion.p>
          <motion.h1
            variants={revealVariant}
            className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter"
          >
            The Network.
          </motion.h1>
          <motion.p
            variants={revealVariant}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed"
          >
            Engineers who passed through ACE are now building the future at
            high-impact startups and technology companies.
          </motion.p>
        </motion.header>

        {/* 2. Stats Strip */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-3 border-y border-outline-variant"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {ALUMNI_STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={revealVariant}
              className="py-10 px-4 text-center flex flex-col items-center justify-center border-r border-outline-variant last:border-r-0"
            >
              <div className="font-headline-lg text-headline-lg text-primary mb-2">
                {s.value}
              </div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* 3. All Alumni Cards Directory (Chronologically Arranged by Placed Date) */}
        <motion.section
          className="mb-24 pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={revealVariant}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">
                Directory
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                All Placed Alumni
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-md">
              A comprehensive directory of engineers launched from ACE into
              industry leadership, arranged chronologically by placement date.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ALUMNI_MEMBERS.map((alumnus) => (
              <motion.div
                key={alumnus.id}
                variants={revealVariant}
                className="border border-outline-variant bg-surface-container-lowest hover:border-primary/50 transition-all flex flex-col overflow-hidden group"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-high">
                  <img
                    referrerPolicy="no-referrer"
                    src={alumnus.img}
                    alt={alumnus.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 bg-black/75 text-white font-mono text-[10px] tracking-wider uppercase backdrop-blur-xs">
                      {alumnus.domain}
                    </span>
                  </div>
                </div>

                {/* Card details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-primary text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                      {alumnus.name}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface font-medium mb-3">
                      {alumnus.role}
                    </p>

                    <div className="space-y-1.5 text-xs text-on-surface-variant">
                      {/* <div className="flex items-center justify-between">
                        <span className="font-label-sm uppercase text-[10px] text-on-surface-variant/70">Company</span>
                        <span className="font-medium text-on-surface text-right">
                          {alumnus.company === 'ND' || alumnus.company === 'Non-Disclosable' ? (
                            <span className="italic text-on-surface-variant">Non-Disclosable</span>
                          ) : (
                            alumnus.company
                          )}
                        </span>
                      </div> */}
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm uppercase text-[10px] text-on-surface-variant/70">
                          Placed On
                        </span>
                        <span className="font-mono text-on-surface text-right">
                          {alumnus.placedOn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-outline-variant flex items-center justify-between">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant">
                      Package
                    </span>
                    <span className="font-mono text-xs font-semibold text-primary">
                      {alumnus.pkg === "ND" ||
                      alumnus.pkg === "Non-Disclosable" ||
                      alumnus.pkg === "Non Disclosable" ? (
                        <span className="italic font-normal text-on-surface-variant">
                          Non-Disclosable
                        </span>
                      ) : (
                        alumnus.pkg
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
