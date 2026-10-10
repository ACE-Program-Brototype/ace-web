import { useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer";
import { LANDING_SPOTLIGHT_ALUMNI, LANDING_OTHER_ALUMNI } from "../constants/landingAlumniDatas";

const RosterSection = lazy(() => import("../components/landing/RosterSection"));
const SelectedWorksSection = lazy(() => import("../components/landing/SelectedWorksSection"));

const spotlightAlumni = LANDING_SPOTLIGHT_ALUMNI;
const otherAlumni = LANDING_OTHER_ALUMNI;

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-surface text-on-surface antialiased selection:bg-primary selection:text-on-primary font-body-md">
      {/* ══════════════════════════════════════════════════════════
          2. HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <header
        ref={heroRef}
        className="relative bg-surface border-b border-outline-variant overflow-hidden"
      >
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 sm:pt-16 md:pt-32 pb-12 md:pb-16"
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
              className="font-body-md text-sm sm:text-base text-on-surface-variant md:w-3/5 leading-relaxed"
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
              className="lg:col-span-7 w-full aspect-[4/3] bg-surface-container-low border border-outline-variant overflow-hidden p-1.5 sm:p-2"
            >
              <img
                src="/images/culture.webp"
                srcSet="/images/culture-mobile.webp 640w, /images/culture.webp 1060w"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                alt="ACE Community - A Culture of Rigor"
                className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out"
                fetchPriority="high"
                decoding="async"
                width="1060"
                height="795"
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
        className="py-12 md:py-section-gap border-b border-outline-variant bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div variants={revealVariant} className="mb-8 md:mb-16">
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
            <div className="py-4 pr-4 pl-0 md:py-12 md:pr-8 border-r border-outline-variant">
              <div className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary mb-1.5 md:mb-2">
                11+
              </div>
              <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-wider text-on-surface-variant">
                Total Placements
              </div>
            </div>
            <div className="py-4 pl-4 pr-0 md:py-12 md:px-8 border-r-0 md:border-r border-outline-variant">
              <div className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary mb-1.5 md:mb-2 whitespace-nowrap">
                13.45 LPA
              </div>
              <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-wider text-on-surface-variant">
                Average Package
              </div>
            </div>
            <div className="py-4 pr-4 pl-0 md:py-12 md:px-8 border-r border-outline-variant">
              <div className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary mb-1.5 md:mb-2 whitespace-nowrap">
                30+ LPA
              </div>
              <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-wider text-on-surface-variant">
                Highest Package
              </div>
            </div>
            <div className="py-4 pl-4 pr-0 md:py-12 md:pl-8">
              <div className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-primary mb-1.5 md:mb-2">
                5+
              </div>
              <div className="font-label-sm text-xs md:text-label-sm uppercase tracking-wider text-on-surface-variant">
                Hiring Partners
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealVariant} className="mt-8 md:mt-12">
            <Link
              onClick={handleScrollToTop}
              to="/outcomes"
              className="inline-flex items-center gap-1.5 md:gap-2 font-label-sm text-xs md:text-label-sm uppercase tracking-wider text-primary hover:underline underline-offset-4"
            >
              View full placement report
              <span className="material-symbols-outlined text-[14px] md:text-[16px]">
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════
          5. THE ROSTER — Horizontal Scroll Carousel (Lazy)
      ══════════════════════════════════════════════════════════ */}
      <Suspense fallback={<div className="py-section-gap border-b border-outline-variant bg-surface-container-lowest" />}>
        <RosterSection />
      </Suspense>

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
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="600"
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
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="300"
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
              to="/outcomes"
              className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-12 py-4 border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200"
            >
              View Outcomes
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
            className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-16 text-center"
          >
            The Ecosystem.
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
          8. THE PROJECT SHOWCASE (Lazy)
      ══════════════════════════════════════════════════════════ */}
      <Suspense fallback={<div className="py-section-gap border-b border-outline-variant bg-surface" />}>
        <SelectedWorksSection />
      </Suspense>

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
    </main>
  );
}
