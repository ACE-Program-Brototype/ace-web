import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer";
import { STUDENTS } from "../constants/studentsDatas";
import { ALUMNI_MEMBERS, SPOTLIGHT_ALUMNI } from "../constants/alumniDatas";
import { PROJECTS } from "../constants/projectDatas";

const spotlightAlumni = SPOTLIGHT_ALUMNI[0] || ALUMNI_MEMBERS[0];
const otherAlumni = ALUMNI_MEMBERS.filter((a) => a.id !== spotlightAlumni.id).slice(0, 2);

/* ─── Reveal animation ─────────────────────────────────────────── */
const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── LandingPage ──────────────────────────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const rosterRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });

        // Check if we've scrolled past the first set of items
        setTimeout(() => {
          if (scrollContainer.scrollLeft >= singleSetWidth) {
            // Instantly reset scroll position to loop seamlessly
            scrollContainer.scrollTo({
              left: scrollContainer.scrollLeft - singleSetWidth,
              behavior: "instant",
            });
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
      <header
        ref={heroRef}
        className="relative bg-surface border-b border-outline-variant overflow-hidden"
      >
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
              ACE is a high-performance ecosystem within Brototype. We are a
              student-led collective bridging the gap between baseline learning
              and elite, production-grade software engineering.
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
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Image */}
            <motion.div
              variants={revealVariant}
              className="lg:col-span-7 aspect-[4/3] bg-surface-container-low border border-outline-variant overflow-hidden p-2"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1683120730432-b5ea74bd9047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="ACE Software Engineers Collaborating"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={revealVariant}
              className="lg:col-span-5 lg:pl-12 flex flex-col justify-center"
            >
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
                A Culture of Rigor.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Built for those who push boundaries, our community thrives on
                advanced domain research, peer-led code reviews, and
                industry-grade sprints. We don't just learn frameworks; we
                engineer resilient systems and cultivate the discipline required
                for elite output.
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
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
              Proven Outcomes.
            </h2>
            <p className="font-body-md text-on-surface-variant">
              The numbers behind our high-performance ecosystem.
            </p>
          </motion.div>

          {/* 4-column stat grid */}
          <motion.div
            variants={revealVariant}
            className="grid grid-cols-2 md:grid-cols-4 border-t border-outline-variant"
          >
            <div className="py-12 pr-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">
                11+
              </div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Total Placements
              </div>
            </div>
            <div className="py-12 px-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">
                13.45 LPA
              </div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Average Package
              </div>
            </div>
            <div className="py-12 px-8 border-r border-outline-variant">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">
                30+ LPA
              </div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Highest Package
              </div>
            </div>
            <div className="py-12 pl-8">
              <div className="font-headline-lg text-headline-lg text-primary mb-2">
                5+
              </div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Hiring Partners
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealVariant} className="mt-12">
            <Link
              onClick={handleScrollToTop}
              to="/outcomes"
              className="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-primary hover:underline underline-offset-4"
            >
              View full placement report
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
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
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header row */}
          <motion.div
            variants={revealVariant}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
                The Roster.
              </h2>
              <p className="font-body-md text-on-surface-variant">
                A curated look at the current generation of ACE engineers.
              </p>
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
              <div
                key={`${s.name}-${idx}`}
                className="snap-start min-w-[320px] w-80 border border-outline-variant bg-surface flex flex-col overflow-hidden p-4 group hover:border-primary transition-colors duration-200"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-64 object-cover mb-4 group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-primary font-headline-md text-headline-md">
                    {s.name}
                  </div>
                  <div className="text-sm text-on-surface-variant font-mono text-mono">
                    {s.batch}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 bg-surface-container-high font-mono text-[10px] uppercase text-on-surface">
                      {s.stack}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="mt-8 md:hidden">
            <Link
              onClick={handleScrollToTop}
              to="/students"
              className="block text-center bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 hover:bg-primary/80 transition-colors"
            >
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
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
              Alumni Network.
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Our engineers build the future at top-tier organizations.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={revealVariant}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {/* Spotlight Feature Card */}
            <div className="md:col-span-2 md:row-span-2 flex flex-col overflow-hidden border border-outline-variant bg-surface-container-lowest group hover:border-primary/50 transition-all">
              <div className="relative flex-1 min-h-[280px] overflow-hidden bg-surface-container-high">
                <img
                  referrerPolicy="no-referrer"
                  src={spotlightAlumni.img}
                  alt={`${spotlightAlumni.name} — ${spotlightAlumni.role}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary text-[10px] font-mono uppercase tracking-widest px-3 py-1">
                    Spotlight
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-xs text-white font-mono text-xs font-semibold">
                    {spotlightAlumni.pkg}
                  </span>
                </div>
              </div>
              <div className="p-6 shrink-0 flex items-center justify-between">
                <div>
                  <div className="font-headline-md text-headline-md text-primary text-lg font-bold">
                    {spotlightAlumni.name}
                  </div>
                  <div className="font-body-md text-sm text-on-surface-variant">
                    {spotlightAlumni.role} • {spotlightAlumni.domain}
                  </div>
                </div>
                <span className="font-mono text-xs text-on-surface-variant">
                  {spotlightAlumni.placedOn}
                </span>
              </div>
            </div>

            {/* Dark Typography Outcome Tile */}
            <div className="col-span-1 row-span-1 aspect-square bg-primary p-6 md:p-8 flex flex-col justify-between text-on-primary">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest uppercase opacity-80">
                  Outcomes
                </span>
                <span className="material-symbols-outlined text-[20px] opacity-80">
                  trending_up
                </span>
              </div>
              <div>
                <div className="font-display-lg text-2xl md:text-3xl font-bold tracking-tighter leading-tight uppercase mb-1">
                  30+ LPA
                </div>
                <div className="text-xs uppercase tracking-wider opacity-90 font-medium">
                  Highest Compensation
                </div>
              </div>
              <div className="pt-3 border-t border-on-primary/20 flex justify-between items-center text-[11px] font-mono opacity-85">
                <span>Avg Package</span>
                <span className="font-bold">13.45 LPA</span>
              </div>
            </div>

            {/* Photo Tiles for Person 2 and Person 3 */}
            {otherAlumni.map((a) => (
              <div
                key={a.id || a.name}
                className="col-span-1 row-span-1 aspect-square relative group overflow-hidden border border-outline-variant bg-surface-container-high"
              >
                <img
                  referrerPolicy="no-referrer"
                  src={a.img}
                  alt={a.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="text-white font-bold text-sm mb-0.5">
                    {a.name}
                  </div>
                  <div className="text-white/80 text-xs mb-2.5 line-clamp-1">
                    {a.role}
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] uppercase tracking-wider bg-white/20 text-white px-2 py-0.5">
                      {a.domain}
                    </span>
                    {a.pkg && (
                      <span className="text-[10px] font-mono bg-primary text-on-primary px-2 py-0.5 font-medium">
                        {a.pkg}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Feature & Ecosystem Tile */}
            <div className="col-span-1 row-span-1 aspect-square bg-surface-container-high p-6 md:p-8 flex flex-col justify-between border border-outline-variant group hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-on-surface-variant tracking-widest uppercase">
                  Career Pipeline
                </span>
                <span className="material-symbols-outlined text-primary text-[20px]">
                  verified
                </span>
              </div>
              <div>
                <div className="font-headline-md text-lg md:text-xl font-bold text-primary mb-1">
                  High-Growth Teams
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Direct hiring channels for engineers across MERN, AI/ML, and DevOps.
                </p>
              </div>
              <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                <span>Partner Network</span>
                <span className="text-primary font-bold">5+ Companies</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={revealVariant}
            className="mt-12 flex justify-center"
          >
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
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.h2
            variants={revealVariant}
            className="font-headline-md text-headline-md text-primary mb-16 text-center"
          >
            The Ecosystem
          </motion.h2>

          <motion.div
            variants={revealVariant}
            className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-outline-variant"
          >
            {[
              {
                icon: "psychology",
                title: "ACE Forge",
                desc: "Discovering and shaping high-intent engineers through disciplined pre-training. A crucible for foundational excellence.",
              },
              {
                icon: "terminal",
                title: "ACE DevelUp",
                desc: "Sharpening algorithmic logic through peer-driven, gamified coding arenas. Continuous iteration towards mastery.",
              },
              {
                icon: "forum",
                title: "Community & Panels",
                desc: "Cultivating leadership through public speaking, alumni mentorship, and open dialogue. Building the next generation of tech voices.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-8 md:p-12 border-b border-r border-outline-variant hover:bg-surface-container-low transition-colors duration-300"
              >
                <div className="w-12 h-12 mb-8 flex items-center justify-center border border-outline-variant rounded bg-surface">
                  <span className="material-symbols-outlined text-primary">
                    {p.icon}
                  </span>
                </div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-primary mb-4">
                  {p.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {p.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
    8. THE PROJECT SHOWCASE
══════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-section-gap border-b border-outline-variant bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div
            variants={revealVariant}
            className="flex justify-between items-end mb-16"
          >
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              The Project Showcase.
            </h2>
          </motion.div>

          <motion.div
            variants={revealVariant}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {PROJECTS.map((proj) => (
              <div
                key={proj.title}
                className="bg-surface-container-lowest border border-outline-variant p-6 hover:border-on-surface-variant transition-colors duration-300 flex flex-col h-full group"
              >
                <div className="aspect-video bg-surface-container-low border border-outline-variant mb-6 overflow-hidden relative">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${proj.title} on GitHub`}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/95 text-black shadow-lg hover:bg-white hover:scale-105 transition-all duration-200"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.341-3.369-1.341-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 .3-.012 2.415-.012 2.744 0 .267.18.578.688.48A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2 py-1 mb-3 border border-outline-variant bg-surface-container-low font-mono text-[10px] uppercase tracking-wider text-on-surface-variant">
                      {proj.tag}
                    </span>

                    <h4 className="font-headline-md text-[20px] text-primary leading-tight">
                      {proj.title}
                    </h4>

                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                      {proj.meta}
                    </p>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant text-sm flex-grow mb-6">
                    {proj.desc}
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant mt-auto">
                    <img
                      src={proj.authorImg}
                      alt={proj.author}
                      className="w-8 h-8 rounded-full object-cover border border-outline-variant"
                    />

                    <span className="font-label-sm text-label-sm uppercase tracking-wider">
                      {proj.author}
                    </span>
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
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
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
        viewport={{ once: true, margin: "-80px" }}
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
