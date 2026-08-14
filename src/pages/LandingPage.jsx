import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../components/Footer';
import { STUDENTS } from '../constants/studentsDatas';


/* ─── Reveal animation ─────────────────────────────────────────── */
const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── LandingPage ──────────────────────────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const rosterRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollContainer = rosterRef.current;
    if (!scrollContainer) return;

    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(() => {
        const cardWidth = 320 + 24; // min-w-[320px] + gap-6 (24px)
        const singleSetWidth = STUDENTS.length * cardWidth;

        // Smoothly scroll to next card
        scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });

        // Check if we've scrolled past the first set of items
        setTimeout(() => {
          if (scrollContainer.scrollLeft >= singleSetWidth) {
            // Instantly reset scroll position to loop seamlessly
            scrollContainer.scrollTo({ left: scrollContainer.scrollLeft - singleSetWidth, behavior: 'instant' });
          }
        }, 600); // Wait for the smooth scroll animation to finish
      }, 1800); // 3-second pause between each scroll
    }

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary font-body-md">

      {/* ══════════════════════════════════════════════════════════
          2. HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative bg-surface border-b border-outline-variant overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-16"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="max-w-4xl">
            <motion.h1
              variants={revealVariant}
              className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-6 tracking-tighter"
            >
              Elevated Engineering.
            </motion.h1>
            <motion.p
              variants={revealVariant}
              className="font-body-lg text-body-lg text-on-surface-variant md:w-3/5 leading-relaxed"
            >
              ACE is a high-performance ecosystem within Brototype. We are a student-led collective bridging the gap between baseline learning and elite, production-grade software engineering.
            </motion.p>
          </div>
        </motion.div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          3. THE NARRATIVE — "A Culture of Rigor."
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        id="manifesto"
        className="py-section-gap border-b border-outline-variant"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Image */}
            <motion.div variants={revealVariant} className="lg:col-span-7 aspect-[4/3] bg-surface-container-low border border-outline-variant overflow-hidden p-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGMyqiLRso0zD71filZ0IwIl4vxrL3jTH-8BpRYPvcDIMpK4edoGBu28_8ZuQYqnr5KqsJNkV2F4540Z4wx-vo6k_Xr5jqfxnW5zF5p1cQ3BicvDHOT-XiGYET8FTZ1ZNtGd6cLidA-gQwJci69N-HSJ-y5hkFh1BsOEiyg1_7B37wkr2Sog_uECl6aQRIQdjBIF99ayxp7Adwpmv3uRalQDS2nl1UZjX9BfOQ2DmZAXhaZrXdxTNX"
                alt="ACE Software Engineers Collaborating"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </motion.div>

            {/* Copy */}
            <motion.div variants={revealVariant} className="lg:col-span-5 lg:pl-12 flex flex-col justify-center">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
                A Culture of Rigor.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Built for those who push boundaries, our community thrives on advanced domain research, peer-led code reviews, and industry-grade sprints. We don't just learn frameworks; we engineer resilient systems and cultivate the discipline required for elite output.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          4. PROVEN OUTCOMES — Stats Grid
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
              Proven Outcomes.
            </h2>
            <p className="font-body-md text-on-surface-variant">The numbers behind our high-performance ecosystem.</p>
          </motion.div>

          {/* 4-column stat grid */}
          <motion.div variants={revealVariant} className="grid grid-cols-2 md:grid-cols-4 border-t border-outline-variant">
            <div className="py-12 pr-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">150+</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Total Placements</div>
            </div>
            <div className="py-12 px-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">12 LPA</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Average Package</div>
            </div>
            <div className="py-12 px-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">36 LPA</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Highest Package</div>
            </div>
            <div className="py-12 pl-8">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">45+</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Hiring Partners</div>
            </div>
          </motion.div>

          <motion.div variants={revealVariant} className="mt-12">
            <Link
              onClick={handleScrollToTop}
              to="/outcomes"
              className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary hover:underline underline-offset-4"
            >
              View full placement report
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          5. THE ROSTER — Horizontal Scroll Carousel
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface-container-lowest"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header row */}
          <motion.div variants={revealVariant} className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                The Roster.
              </h2>
              <p className="font-body-md text-on-surface-variant">A curated look at the current generation of ACE engineers.</p>
            </div>
            <Link
              onClick={handleScrollToTop}
              to="/directory"
              className="hidden md:block bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-8 py-3 hover:bg-primary/80 transition-colors"
            >
              EXPLORE THE DIRECTORY
            </Link>
          </motion.div>

          {/* Scroll container */}
          <motion.div
            variants={revealVariant}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            ref={rosterRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {[...STUDENTS, ...STUDENTS].map((s, idx) => (
              <div key={`${s.name}-${idx}`} className="snap-start min-w-[320px] w-80 border border-outline-variant bg-surface flex flex-col overflow-hidden p-4 group hover:border-primary transition-colors duration-200">
                <img src={s.img} alt={s.name} className="w-full h-64 object-cover mb-4 group-hover:scale-[1.02] transition-transform duration-300" />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-primary font-headline-md text-headline-md">{s.name}</div>
                  <div className="text-sm text-on-surface-variant font-mono text-mono">{s.batch}</div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-surface-container-high font-mono text-[10px] uppercase text-on-surface">{s.stack}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-8 md:hidden">
            <Link onClick={handleScrollToTop} to="/students" className="block text-center bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 hover:bg-primary/80 transition-colors">
              Explore the Directory
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          6. ALUMNI NETWORK — Bento Grid
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
              Alumni Network.
            </h2>
            <p className="font-body-md text-on-surface-variant">Our engineers build the future at top-tier organizations.</p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div variants={revealVariant} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Spotlight Feature Card */}
            <div className="md:col-span-2 md:row-span-2 flex flex-col overflow-hidden border border-outline-variant bg-surface-container-lowest">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLv7xdE91E31_n7DMH06j6eUyeS4DWRjQ_cePh5NjpZhswvg1j-rMdjEOYwoVyEPKgSUrJjfTl1JWIkwN1U_HwlG0O-KLphS5yQAv_DWoZJ2Pc9RqYrLWjrHCTM9a6VWOg6W6EssnJ0K0l0kbkeXXGI8KConAEdq0PcFVKeoQh5bzOijkOcLH9-O8uhThahLiI9bV2_PzkfSa5JgjYduAW9HYsWtIBlTmZuTupXpzPMXTpsVUdBGTVhfUCg"
                alt="Arjun Mehta — SDE II at Google"
                className="w-full h-[65%] object-cover"
              />
              <div className="p-6 flex flex-col justify-start gap-4 h-[35%]">
                <div>
                  <div className="font-headline-md text-headline-md text-primary">Arjun Mehta</div>
                  <div className="font-body-md text-sm text-on-surface-variant">SDE II @ Google</div>
                </div>
              </div>
            </div>

            {/* Dark Typography Tile */}
            <div className="col-span-1 row-span-1 aspect-square bg-primary p-8 flex items-center justify-center text-center">
              <div className="font-display-lg text-headline-md text-on-primary tracking-tighter leading-none uppercase">
                PRODUCT COMPANIES
              </div>
            </div>

            {/* Photo Tile — Priya Nair */}
            <div className="col-span-1 row-span-1 aspect-square relative group overflow-hidden border border-outline-variant">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLu91gPeJLb7LYkO42G7qN7NLW9A35tAN6Y81iwCA-j3EjRlLt0-slUT9p_UKsWBKhzfNqwEI_cmw4YqXBD3Z7Xj39MdQwmKRAKkdqLNpxT6I3mJeKhctESLEUWIea3MF5qvDcF2NB9RxZI3J8AkKtF-WcwTWesL6aaN9yI5VucLOe63EXveHmGPj9-rACIqo1gIuLUinYHszlduEIH5yUoSwJ0y8a3BbkDNs3gh8ivKAOOoZyyYyTXIBpU"
                alt="Priya Nair"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white font-bold text-sm">Priya Nair</div>
              </div>
            </div>

            {/* Photo Tile — Rohan Das */}
            <div className="col-span-1 row-span-1 aspect-square relative group overflow-hidden border border-outline-variant">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLtxpzAYqXlo2HkvLZ3DPPGAzmA7K-45yYybIMItv_RmqgxoY6VvYMV6XtMtGzddHL1O7qZ_B0EpatNt7wjL3Q6wwaJgCyeI_rMsJCEMv_7eZeFX_C1cKT_eiM8d9DiQ0OMPvdi4ENnanRNzoBpl6KU1d-WYSfMG26SFvnWe3opz0alJEpWM451U_kZGenzy5j5a9kMXaPNJcHg4djEHtOhwmZSfT4Tvw7c8sHrELGd_ynn1iB4aQncOs1g"
                alt="Rohan Das"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white font-bold text-sm">Rohan Das</div>
              </div>
            </div>

            {/* Surface Tile */}
            <div className="col-span-1 row-span-1 aspect-square bg-surface-container-high p-8 flex items-center justify-center text-center border border-outline-variant">
              <div className="font-display-lg text-headline-md text-primary tracking-tighter leading-none uppercase">
                GLOBAL NETWORK
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealVariant} className="mt-12 flex justify-center">
            <Link
              onClick={handleScrollToTop}
              to="/alumni"
              className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-12 py-4 hover:bg-primary/80 transition-colors"
            >
              View All Alumni
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          7. THE ECOSYSTEM — 3-Column Pillars
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface-container-lowest"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.h2 variants={revealVariant} className="font-headline-md text-headline-md text-primary mb-16 text-center">
            The Ecosystem
          </motion.h2>

          <motion.div variants={revealVariant} className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-outline-variant">
            {[
              {
                icon: 'psychology',
                title: 'ACE Forge',
                desc: 'Discovering and shaping high-intent engineers through disciplined pre-training. A crucible for foundational excellence.',
              },
              {
                icon: 'terminal',
                title: 'ACE DevelUp',
                desc: 'Sharpening algorithmic logic through peer-driven, gamified coding arenas. Continuous iteration towards mastery.',
              },
              {
                icon: 'forum',
                title: 'Community & Panels',
                desc: 'Cultivating leadership through public speaking, alumni mentorship, and open dialogue. Building the next generation of tech voices.',
              },
            ].map(p => (
              <div key={p.title} className="p-8 md:p-12 border-b border-r border-outline-variant hover:bg-surface-container-low transition-colors duration-300">
                <div className="w-12 h-12 mb-8 flex items-center justify-center border border-outline-variant rounded bg-surface">
                  <span className="material-symbols-outlined text-primary">{p.icon}</span>
                </div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-primary mb-4">{p.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          8. THE OUTPUT — Featured Projects
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="flex justify-between items-end mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">The Output.</h2>
            <Link
              onClick={handleScrollToTop}
              to="/students"
              className="hidden md:inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary hover:text-on-surface-variant transition-colors"
            >
              View full directory
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </motion.div>

          <motion.div variants={revealVariant} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                tag: 'Golang / React', title: 'Distributed Task Queue', meta: 'Batch 14 • High Concurrency',
                desc: 'Architected a highly available distributed task queue system handling 10k+ concurrent requests using Go routines and gRPC for inter-service communication.',
                author: 'Aswin Sreeraj',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmhKpFactP2TzfdRbejL3bt625z5KSZNy0eFbP9bKO_yv4RiJ6eqcYCtqF6nehtumHQDn9o5zxAzFPwTJc7cN0int04wZqF5UyZZPL5mJbHgpuNzE-cLZJxfuk1qlpyjmKG12ZciOTamcI-7llRaRo6DlxW_3N5daeycz2TwmEaWrkyjF6mDOOGSWTNGkfLflY2ZYdNyp1YL8npHifHSmipoIQ1eqgOEioM7MaMzuYKNzi34tEW6R',
              },
              {
                tag: 'Node.js / Redis', title: 'Real-time Analytics Engine', meta: 'Batch 12 • Data Pipeline',
                desc: 'Engineered a low-latency analytics ingestion pipeline processing streaming events using Redis Streams and optimized Node.js workers.',
                author: 'Neha Sharma',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqg4q0FXbXyzzmgwmxiBWfx8p_Q6NascEA5Paf2b4E-c7_Nlirsym5S6tg3Kz5H2Bq2pZDBzrFD4EXvcM74-Geo8M8R4--cTwmIZDXpJVKwqIjr_tDq8-AwFbHrgam4WrqZQDqXMY1bxy867tzQQaDqMnTll1oIG8wRZocRM6X-lGhwz0maoJm7LYRTJkbqbYcbdxn7XCZ0J4VDNS-VYTT-zbB4zomdHwhUa4DnOqkjG0jV2LmArzW',
              },
              {
                tag: 'Rust / WebAssembly', title: 'Browser-Based IDE Core', meta: 'Batch 15 • Systems Level',
                desc: 'Implemented a lightweight syntax parser and execution engine in Rust, compiled to WebAssembly for near-native in-browser performance.',
                author: 'Rahul Verma',
                img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2hbfRoBuWy6EiOmY3F4UsvXB5JmCApr9ShpyST5vyV8stCZ9uwdZj6hYMiVlTxQ1GEEX9JhE43fxmIm_yQCqeC0s9gK-i9TCfy7EkADPJ_7iMuuZdhZ-NjAMvub7n6NVTtd02uu-s9xRuEmPLiZwd381ipwRN4M57QmytyyFZYiw6EJ4UrSQeia52traooiGs2Gb82G8Zk8pSa4-MYYesImAokuQrRp42aoY0ML9fJhUD8CVGLS-',
              },
            ].map(proj => (
              <div key={proj.title} className="bg-surface-container-lowest border border-outline-variant p-6 hover:border-primary transition-colors duration-300 flex flex-col h-full group">
                <div className="aspect-video bg-surface-container-low border border-outline-variant mb-6 overflow-hidden relative">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-surface border border-outline-variant px-2 py-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary block" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">{proj.tag}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="mb-4">
                    <h4 className="font-headline-md text-[20px] text-primary leading-tight">{proj.title}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{proj.meta}</p>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm flex-grow mb-6">{proj.desc}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant mt-auto">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant" />
                    <span className="font-label-sm text-label-sm uppercase tracking-wider">{proj.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link
              onClick={handleScrollToTop}
              to="/students"
              className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary border border-outline-variant px-6 py-3 hover:bg-surface-container-low transition-colors"
            >
              View full directory
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          9. THE JOURNAL — Article List
      ══════════════════════════════════════════════════════════ */}
      {/* <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface-container-lowest"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="flex justify-between items-end mb-12 border-b border-primary pb-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                The Journal.
              </h2>
              <p className="font-body-md text-on-surface-variant">Technical publications and engineering retrospectives from the community.</p>
            </div>
            <Link
              to="/journal"
              className="hidden md:block bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-8 py-3 hover:bg-primary/80 transition-colors"
            >
              EXPLORE THE JOURNAL
            </Link>
          </motion.div>

          <motion.div variants={revealVariant} className="flex flex-col">
            {[
              { date: 'Oct 12, 2023', title: 'Building a Multi-Role Platform in Golang', author: 'Aswin Sreeraj', time: '8 min' },
              { date: 'Sep 28, 2023', title: 'Optimizing React Re-renders at Scale', author: 'Sarah Chen', time: '5 min' },
              { date: 'Sep 15, 2023', title: 'The State of Modern CI/CD Pipelines', author: 'David Kim', time: '12 min' },
            ].map((a, i) => (
              <Link
                key={i}
                to="/journal"
                className="group block border-b border-outline-variant py-6 hover:bg-surface-container-low transition-colors px-4 -mx-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-2 font-mono text-mono text-on-surface-variant">{a.date}</div>
                  <div className="md:col-span-6 font-headline-md text-[20px] text-primary group-hover:underline decoration-1 underline-offset-4">{a.title}</div>
                  <div className="md:col-span-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-dim border border-outline-variant" />
                    by {a.author}
                  </div>
                  <div className="md:col-span-1 text-right font-mono text-mono text-on-surface-variant hidden md:block">{a.time}</div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.section> */}

      {/* ══════════════════════════════════════════════════════════
          10. CLOSING STATEMENT
      ══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-32 bg-background flex flex-col items-center justify-center text-center px-margin-mobile"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={revealVariant}
      >
        <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary max-w-4xl mx-auto tracking-tighter">
          Excellence is not an act, but a habit.
        </h2>
        <div className="mt-12 w-16 h-px bg-outline-variant" />
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          11. FOOTER
      ══════════════════════════════════════════════════════════ */}
      <Footer />

    </div>
  );
}
