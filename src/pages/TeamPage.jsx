import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const FOUNDERS = [
  {
    role: 'Director of Curriculum', name: 'Dr. Elara Vance',
    quote: '"Shaping the pedagogical frameworks that elevate our collective discourse."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXfNHF3bIB_n0w7Zq8ZgV2E4BnC1t4IXpnSyMr1cpryy9SNsvmLCQibo-xXDxS9CfhCLCvK564BijayMborlFQq_CzTpslIeD6BgEs140Q11Zeux-czclnSQBs7UhSAFgk7HX0OeiIGPJlfRcvmvtfSoF2QWmkvpS532WI29yPjOIlioUfAI9USk8n2vobL_7WD2cwk_se2KpVuYjqVQIIKgXLJoOt1YDarW8oICUZ7yZp2l_92p4H',
  },
  {
    role: 'Head of Ethics', name: 'Julian Thorne',
    quote: '"Safeguarding the integrity and philosophical rigor of community engagements."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnKC-e5YfIVSRBwv4mlAco1EzLtWFdf7F9zPtBnCzSPkeczQk6TTBGVFGM365Sr0m5kGomUTbnwO_zP5-1nni0Nqkmq6V2Zq6QrNS3Myn3zjNGlYtzYwkt_WMjJixeBoa2tzKXdta7J2oCehU2WutfUvAMR7Hrnsv2zlQa-oBeTCT-MMXxlb3t7pUSdE0jOUrgarVkbF7gCsUscEt9Ine46HWFxyR6_2cYOlgInM6TzkaNFduG9iRy',
  },
];

const HANDLERS = [
  {
    role: 'Alumni Coordinator', name: 'Sarah Jenkins',
    quote: 'Bridging past achievements with future endeavors.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3D9G-xEjeM7l1nMU3wR-w3SdkJeqMlZNW8GGNSN9B0MgvOkpNJdVgDzgnnvmgSuNBKb366A44OC6Q1X2BFYWADcCn50SXv-CxJfe_vUGZDloinWPRaO9jicm0-EUNjJ1U25euR-pru7StMRXNc7XsxuGHu8dbET96h__3sGb_ixZDx9bE2NBoUOc4AzeIZGSnhNyxs-jDnlroEb71lk34__8Fj9gAw6NELGe90T5eHKpD5qitW6om',
  },
  {
    role: 'Journal Editor', name: 'Marcus Chen',
    quote: 'Curating insights from the vanguard of our community.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACjJY8-Cy2pxV7W3mqcE1PHKiy7rnsan8WRUJcCNkPK8an86FSV6OuIKCsnisheZ99Y1cMGs4Saz9hjK_zrJRZ0s2_iRdpqLzo82luIsQ4yQCwv7QJFINggIRctIOcpegAan-_egQwwVJyaJMvidBI3YjmIxBJWtN2_2FOS1YKzrQaHBEXgecu1WNQ6WFRx5axGTlo0o1blw-T4yEiaD0IMR-lR8XEabzySKctqif5BXHgBspLAft4',
  },
  {
    role: 'Event Architect', name: 'Elena Rostova',
    quote: 'Designing spaces for intellectual collision and connection.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA_pFMnfajKu0x6li3SxMwnqDvHSKQZwINw3S_Zxl-MwPg043dTqVEU-PNTXrZyDhWmzggS3MR5kmkbdjUoAJAvXhkCWGBBmvKQSPvU3IBUW26fB_4UssXSfv0wBQ7vdL4qs-iDzjKnaI43YJfycea7XXGLZwrtpyYKDVZzuOKaaP4Ty6qLlDBPVjndXJQaltcxDnLmpSMdgRI_J7BnJgrEqobz0UH_gbW3OQLnb2_pm1lKZibXb6I',
  },
];

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
