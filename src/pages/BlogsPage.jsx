import { motion } from 'framer-motion';

const BLOG_PREVIEWS = [
  {
    id: 1,
    tag: 'SYSTEMS ARCHITECTURE',
    readTime: '8 min read',
    date: 'OCT 2026',
    title: 'High-Throughput Event Ingestion: Architecture Patterns Beyond 100k EPS',
    excerpt: 'How we engineered resilient stream partitions, handled backpressure cascades, and sustained sub-10ms delivery guarantees in distributed event brokers.',
    author: {
      name: 'Aswin Sreeraj',
      role: 'ACE Candidate',
      initials: 'AS',
    },
    technologies: ['Distributed Systems', 'Go', 'Kafka', 'gRPC'],
  },
  {
    id: 2,
    tag: 'FRONTEND RUNTIME',
    readTime: '6 min read',
    date: 'OCT 2026',
    title: 'Zero-Jank Interaction Budgets: Profiling Composite Layers & Web Schedulers',
    excerpt: 'An investigation into browser micro-task lifecycles, offloading state transformations to Web Workers, and architecting silky 120 FPS render pipelines.',
    author: {
      name: 'Athira Suresh',
      role: 'ACE Candidate',
      initials: 'AS',
    },
    technologies: ['Performance', 'Web Vitals', 'React', 'Chromium'],
  },
  {
    id: 3,
    tag: 'DATABASE INTERNALS',
    readTime: '11 min read',
    date: 'SEP 2026',
    title: 'Zero-Downtime Relational Migrations: Multi-Phase Dual Writes in Production',
    excerpt: 'A blueprint for executing breaking schema changes across multi-terabyte tables without holding exclusive locks or interrupting live transactions.',
    author: {
      name: 'Shahid Noushad',
      role: 'R/D Associate',
      initials: 'SN',
    },
    technologies: ['PostgreSQL', 'Transactions', 'Locks', 'Replication'],
  },
  {
    id: 4,
    tag: 'ENGINEERING CULTURE',
    readTime: '5 min read',
    date: 'SEP 2026',
    title: 'The Discipline of Code Rigor: Transforming Foundations into Elite Craftsmanship',
    excerpt: 'Why peer RFCs, relentless benchmark tests, and transparent post-mortems bridge the chasm between basic tutorial coding and production engineering.',
    author: {
      name: 'Venkitesh NS',
      role: 'ACE Candidate',
      initials: 'VK',
    },
    technologies: ['Code Review', 'RFC Process', 'Benchmarking'],
  },
];

export default function BlogsPage() {
  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary font-body-md min-h-screen">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 sm:pt-8 md:pt-10 pb-16 md:pb-24">
        {/* Header */}
        <header className="mb-6 md:mb-12 max-w-3xl">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3 tracking-tighter">
            ACE Engineering Chronicle
          </h1>
          {/* <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            In-depth explorations, production post-mortems, and architectural benchmarks straight from the fellows and engineers inside the ACE ecosystem.
          </p> */}
        </header>

        {/* Blog Cards with Overarching Glassmorphism Coming Soon Overlay (2 cards stacked on mobile, 4 on desktop) */}
        <div className="relative rounded-2xl md:rounded-[24px] overflow-hidden">
          {/* Background Grid: 2 cards vertically on mobile, 4 in 2-col grid on md+ screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 select-none pointer-events-none opacity-85">
            {BLOG_PREVIEWS.map((post, idx) => (
              <article
                key={post.id}
                className={`${idx >= 2 ? 'hidden md:flex' : 'flex'} bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 sm:p-6 md:p-7 flex-col justify-between shadow-xs transition-shadow`}
              >
                <div>
                  {/* Card Meta */}
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-on-surface-variant mb-2 md:mb-3 tracking-wider uppercase">
                    <span className="text-primary font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {post.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-display-lg text-lg sm:text-xl md:text-2xl text-primary font-bold tracking-tight leading-snug mb-2 md:mb-2.5">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4 md:mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer: Author & Tech Badges */}
                <div className="pt-3 md:pt-4 border-t border-outline-variant/60 flex flex-wrap items-center justify-between gap-2.5 md:gap-3">
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-soft text-primary font-mono text-[9px] sm:text-[10px] font-bold flex items-center justify-center border border-primary/10">
                      {post.author.initials}
                    </div>
                    <div>
                      <div className="font-body-md text-[11px] sm:text-xs font-semibold text-primary leading-tight">
                        {post.author.name}
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] text-on-surface-variant">
                        {post.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {post.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 sm:px-2 py-0.5 rounded-sm bg-surface-container-high text-on-surface font-mono text-[9px] sm:text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Overall Blurry Overlay with Glassmorphism "Coming Soon" Modal at Vertical Center */}
          <div className="absolute inset-0 z-10 bg-slate-950/20 backdrop-blur-[5px] flex items-center justify-center p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-[24px]">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden w-auto md:w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_24px_60px_rgba(0,18,48,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] rounded-2xl sm:rounded-[28px] py-4 px-7 sm:p-8 md:p-10 text-center"
            >
              {/* Ambient radial glow */}
              <div className="pointer-events-none absolute -top-20 -left-20 w-44 h-44 bg-accent/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 w-44 h-44 bg-primary/40 rounded-full blur-3xl" />

              {/* Top specular highlight shimmer */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Title */}
              <h2 className="font-display-lg text-xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight md:mb-3 drop-shadow-sm whitespace-nowrap">
                <span className="md:hidden">Coming Soon...</span>
                <span className="hidden md:inline">Coming Soon</span>
              </h2>

              {/* Subtitle - hidden on mobile screens */}
              <p className="hidden md:block font-body-md text-xs sm:text-sm text-white/80 leading-relaxed mb-4 sm:mb-6 max-w-md mx-auto">
                We are finalizing our technical publishing platform. Detailed system designs, benchmark studies, and production stories from ACE fellows are being peer-reviewed.
              </p>

              {/* Subtle Footer Note - hidden on mobile screens */}
              <div className="hidden md:flex pt-3 sm:pt-4 border-t border-white/10 items-center justify-center gap-2 text-white/60 font-mono text-[10px] tracking-wider uppercase">
                <span className="material-symbols-outlined text-[13px] text-accent">schedule</span>
                <span>Inaugural Issue Launching Soon</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
