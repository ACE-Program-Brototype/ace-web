import { useState } from 'react';
import { motion } from 'framer-motion';

const revealVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const STUDENTS = [
  {
    name: 'Alex Mercer', batch: 'BCR313', stack: 'Golang · Next.js · PostgreSQL · Docker',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Samantha Chen', batch: 'BCR313', stack: 'React · TypeScript · Node.js · GraphQL',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Marcus Johnson', batch: 'BCR312', stack: 'Python · Django · AWS · Kubernetes',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Elena Rodriguez', batch: 'BCR314', stack: 'Vue.js · Laravel · MySQL · Redis',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Rahul Verma', batch: 'BCR314', stack: 'Rust · WebAssembly · Systems',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Ayasha Singh', batch: 'BCR313', stack: 'Java · Spring Boot · Kafka · Redis',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Chris Park', batch: 'BCR312', stack: 'React Native · Node.js · MongoDB',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Priya Nair', batch: 'BCR315', stack: 'Go · gRPC · PostgreSQL · Docker',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  },
];

const FILTERS = ['All', 'Web Dev', 'Golang', 'React', 'Batch BCR313'];

export default function StudentsPage() {
  const [query, setQuery]     = useState('');
  const [active, setActive]   = useState('All');

  const filtered = STUDENTS.filter(s => {
    const q = query.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.stack.toLowerCase().includes(q) || s.batch.toLowerCase().includes(q);
    const matchF = active === 'All' ||
      (active === 'Golang' && s.stack.includes('Golang')) ||
      (active === 'React' && s.stack.includes('React')) ||
      (active === 'Web Dev' && (s.stack.includes('React') || s.stack.includes('Vue') || s.stack.includes('Next'))) ||
      (active === 'Batch BCR313' && s.batch === 'BCR313');
    return matchQ && matchF;
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
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
                  active === f
                    ? 'bg-surface-container-low text-primary border border-transparent'
                    : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:bg-surface-container-low'
                }`}
              >
                {f}
              </button>
            ))}
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

        {/* Load More */}
        <div className="flex justify-center pb-section-gap border-b border-outline-variant">
          <button className="px-8 py-3 border border-outline-variant bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-low transition-colors duration-300">
            Load More
          </button>
        </div>
      </main>
    </div>
  );
}
