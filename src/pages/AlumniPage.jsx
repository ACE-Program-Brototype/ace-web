import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const ALUMNI_STORIES = [
  {
    name: 'Elena Rostova', role: 'Senior Backend Engineer @ Stripe', batch: 'BCR102', pkg: '36 LPA',
    quote: '"The rigorous architectural patterns taught at ACE became my foundation. When scaling distributed systems today, I still fall back on those core principles."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmHLOEdpN9erWdTQ67qjIQcL8zKMvlkB8qVURx9vjXR3XdgPNk9vrL88HQ0BcAefwN0RtDfvI9ycM9fY5gEsC0dSwNFKXMGaLDBt2mewJHdr0JmOMNA8ugXVK5CPHrpumbgqH9H3GXOVW6dFSrOAOUHxiGe6sgB7Wlraxsf3uAt7X4Es8cD6wHLqLk7jT1fL4gydM38a7SluiSMgOn95Cz1zIqMm0JVDdDMVePH-LLIXITESJACBx5',
  },
  {
    name: 'Marcus Chen', role: 'Systems Architect @ AWS', batch: 'BCR101', pkg: '42 LPA',
    quote: '"ACE didn\'t just teach syntax; it taught us how to think like engineers. The transition to a hyper-scale cloud environment felt completely natural."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNbZj-0QBYDOoJTTT9vJf8wFq_oKwQU6XKnDmfPda1kK2ZiCjToQ9_3isDtd3xndo4f000qzMl3Z-Gsuq2i-A4pKFGpYqGrF35elQ-itqdvgYlfKZSEm4NQ0__-mdrlFn00w88HagLDp9v2bw57rPs4oEYsF6ElGhZNYEbbhS6ibl-7sRUTCoqIG1N6IZ4nyOpCkJIkpNq1A-V2xBqW2K4aA86yOZAfl0KNtjmjKdK1rEeYYrzrdWp',
  },
  {
    name: 'Sarah Jenkins', role: 'Founding Engineer @ Vercel', batch: 'BCR103', pkg: 'Equity + Base',
    quote: '"The community aspect of ACE was unparalleled. Building complex side projects with peers prepared me perfectly for the fast pace of early-stage startups."',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPLTgBsOB-CoirRTdIcncsMcS1plRSjdbT71WR2jZUZBTl23tazMB4fSc30qi4_WzJoio70kwTbYt63zT36bbzPG7P0t7oFhvp9OXywQkd42az_tzTM-F3AXaL4elNwyme1ofE9Al8DMC1C7wS3Is-g2d6aj52azwLZhFWLG-rR9xTcVHgo04mpi6SC31-uwV3cIDqWuSkQEc17uhs3qgi3hiZ1pvV4gN3ZkUPPsHs2lEaB3GYN8nj',
  },
];

export default function AlumniPage() {
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
          {[
            { value: '150+', label: 'Alumni Placed' },
            { value: '36 LPA', label: 'Highest Package' },
            { value: '45+', label: 'Partner Companies' },
            { value: '12 LPA', label: 'Average Package' },
          ].map(s => (
            <motion.div key={s.label} variants={revealVariant} className="py-10 pr-8 border-r border-outline-variant last:border-r-0">
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
          {ALUMNI_STORIES.map(a => (
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
                  Batch {a.batch}
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
                alt="David Osei, Principal Engineer at Google DeepMind"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCOZeMSC1jBp3Wpv_BOciC5XBz5ZGjs3S6VQ4Nd4A_hpBCQapR8B_7dNGwM_I8oGI8_HlMSyC22WovinCZVUo4_RyBeGYPDxOcmKhxSeAMabjoFvl-cu62QEUSWN3KsvOzHJj6r2wqV4qwitq3UHBMVKYyOPnzA5KTQy7hvCi_Ihb4iY06aBbP3iOxKf6y0cXbmf4cTkMlsmjL2DwBgzWG3f1ykHXu6Aj4cr6dI7iIOC8a6OY1FOyu"
              />
            </motion.div>
            <motion.div variants={revealVariant}>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">Spotlight Series</span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">David Osei</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Principal Engineer @ Google DeepMind</p>
              <div className="space-y-8">
                <div>
                  <h4 className="font-label-sm text-label-sm text-primary font-bold uppercase mb-2">Q: How did ACE shape your trajectory?</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">"The curriculum forced a level of intellectual honesty I hadn't encountered before. You couldn't just make code work; you had to understand why it worked at the lowest level."</p>
                </div>
                <div>
                  <h4 className="font-label-sm text-label-sm text-primary font-bold uppercase mb-2">Q: Advice for current cohorts?</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">"Embrace the struggle during the systems design modules. That discomfort is where the actual growth happens. Also, lean on your peers — they will be your professional network for life."</p>
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
