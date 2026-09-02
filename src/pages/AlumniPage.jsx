import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ALUMNI_MEMBERS, SPOTLIGHT_ALUMNI, ALUMNI_STORIES, ALUMNI_STATS } from '../constants/alumniDatas';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function AlumniPage() {
  // Spotlight Series State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpotlightPaused, setIsSpotlightPaused] = useState(false);

  // Testimonials Carousel State
  const testimonialsRef = useRef(null);
  const [isTestimonialsPaused, setIsTestimonialsPaused] = useState(false);

  // Auto-scroll spotlight series
  useEffect(() => {
    if (isSpotlightPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SPOTLIGHT_ALUMNI.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isSpotlightPaused]);

  // Auto-scroll testimonials carousel (3 visible at once on desktop)
  useEffect(() => {
    if (isTestimonialsPaused) return;
    const interval = setInterval(() => {
      if (testimonialsRef.current) {
        const container = testimonialsRef.current;
        const card = container.querySelector('.testimonial-card');
        if (card) {
          const cardWidth = card.offsetWidth + 24; // width + gap
          const maxScroll = container.scrollWidth - container.clientWidth;

          if (container.scrollLeft + cardWidth >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: cardWidth, behavior: 'smooth' });
          }
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isTestimonialsPaused]);

  const prevSpotlight = () => {
    setCurrentIndex((prev) => (prev - 1 + SPOTLIGHT_ALUMNI.length) % SPOTLIGHT_ALUMNI.length);
  };

  const nextSpotlight = () => {
    setCurrentIndex((prev) => (prev + 1) % SPOTLIGHT_ALUMNI.length);
  };

  const scrollTestimonialsPrev = () => {
    if (testimonialsRef.current) {
      const card = testimonialsRef.current.querySelector('.testimonial-card');
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      testimonialsRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollTestimonialsNext = () => {
    if (testimonialsRef.current) {
      const card = testimonialsRef.current.querySelector('.testimonial-card');
      const cardWidth = card ? card.offsetWidth + 24 : 380;
      const maxScroll = testimonialsRef.current.scrollWidth - testimonialsRef.current.clientWidth;
      if (testimonialsRef.current.scrollLeft + cardWidth >= maxScroll - 10) {
        testimonialsRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        testimonialsRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased font-body-md">
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">

        {/* 1. Page Header */}
        <motion.header
          className="mb-20 pt-16"
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
            Engineers who passed through ACE are now building the future at high-impact startups and technology companies.
          </motion.p>
        </motion.header>

        {/* 2. Stats Strip */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 border-t border-outline-variant mb-24"
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

        {/* 3. Automatic Full-Width Spotlight Carousel (Above Testimonials) */}
        <motion.section
          className="border-y border-outline-variant py-16 mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div
            className="relative group/spotlight px-2 sm:px-6"
            onMouseEnter={() => setIsSpotlightPaused(true)}
            onMouseLeave={() => setIsSpotlightPaused(false)}
          >
            {/* Side Navigation Arrow: Left */}
            <button
              onClick={prevSpotlight}
              aria-label="Previous Spotlight"
              className="absolute -left-3 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-surface border border-outline-variant hover:border-primary hover:bg-surface-container-high text-primary flex items-center justify-center transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>

            {/* Side Navigation Arrow: Right */}
            <button
              onClick={nextSpotlight}
              aria-label="Next Spotlight"
              className="absolute -right-3 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-surface border border-outline-variant hover:border-primary hover:bg-surface-container-high text-primary flex items-center justify-center transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            {/* Carousel Slider Track */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {SPOTLIGHT_ALUMNI.map((alumnus) => (
                  <div key={alumnus.id} className="w-full shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                      {/* Image container: same 500px height */}
                      <motion.div
                        variants={revealVariant}
                        className="relative h-[380px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden border border-outline-variant bg-surface-container-low"
                      >
                        <img
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover"
                          alt={alumnus.name}
                          src={alumnus.img}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-on-primary text-[10px] font-mono uppercase tracking-widest px-3 py-1">
                            Spotlight
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3.5 py-1.5 bg-black/85 backdrop-blur-xs text-white font-mono text-sm font-semibold border border-white/10">
                            {alumnus.pkg}
                          </span>
                        </div>
                      </motion.div>

                      {/* Content side */}
                      <motion.div variants={revealVariant} className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
                            Spotlight Series
                          </span>
                          <span className="text-on-surface-variant/40">•</span>
                          <span className="font-mono text-xs text-on-surface-variant">
                            0{currentIndex + 1} / 0{SPOTLIGHT_ALUMNI.length}
                          </span>
                        </div>

                        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
                          {alumnus.name}
                        </h2>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">
                          {alumnus.companyRole || `${alumnus.role} ${alumnus.company !== 'ND' && alumnus.company !== 'Non-Disclosable' ? `@ ${alumnus.company}` : ''}`}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          <span className="px-3 py-1 bg-surface-container-high text-primary font-label-sm text-xs uppercase tracking-wider border border-outline-variant">
                            {alumnus.domain}
                          </span>
                          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label-sm text-xs uppercase tracking-wider border border-outline-variant">
                            Placed: {alumnus.placedOn}
                          </span>
                          <span className="px-3 py-1 bg-surface-container-high text-primary font-mono text-xs border border-outline-variant">
                            Package: {alumnus.pkg}
                          </span>
                        </div>

                        <div className="p-6 bg-surface-container-low border-l-2 border-primary">
                          <h4 className="font-label-sm text-label-sm text-primary font-bold uppercase mb-2">
                            Featured Highlight
                          </h4>
                          <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                            "{alumnus.quote}"
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {SPOTLIGHT_ALUMNI.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 ${currentIndex === i ? 'w-8 bg-primary' : 'w-2 bg-outline-variant hover:bg-primary/50'
                    }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4. Stories from the Community (3 Visible at once, Horizontally Scrollable & Auto-scrolling) */}
        <motion.section
          className="mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={revealVariant} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">
                Testimonials
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                Stories from the Community.
              </h2>
            </div>

            {/* Navigation buttons for testimonials */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollTestimonialsPrev}
                aria-label="Previous Testimonials"
                className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <button
                onClick={scrollTestimonialsNext}
                aria-label="Next Testimonials"
                className="w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Testimonials Auto-scroll Track (3 cards per row on desktop) */}
          <div
            ref={testimonialsRef}
            onMouseEnter={() => setIsTestimonialsPaused(true)}
            onMouseLeave={() => setIsTestimonialsPaused(false)}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ALUMNI_STORIES.map((a) => (
              <motion.article
                key={a.name}
                className="testimonial-card w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start border border-outline-variant p-6 flex flex-col justify-between hover:bg-surface-container-low transition-all h-auto min-h-[300px] group bg-surface-container-lowest hover:border-primary/50"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-outline-variant shrink-0"
                      alt={a.name}
                      src={a.img}
                    />
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary text-base font-bold">
                        {a.name}
                      </h3>
                      <p className="font-label-sm text-xs text-on-surface-variant line-clamp-1">
                        {a.companyRole || `${a.role} ${a.company !== 'ND' && a.company !== 'Non-Disclosable' ? `@ ${a.company}` : ''}`}
                      </p>
                    </div>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider mb-4 border border-outline-variant">
                    {a.domain}
                  </span>
                  <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                    "{a.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant flex justify-between items-center text-xs">
                  <span className="font-label-sm text-on-surface-variant">Placed: {a.placedOn}</span>
                  <span className="font-mono text-primary font-medium">{a.pkg}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* 5. All Alumni Cards Directory (Chronologically Arranged by Placed Date) */}
        <motion.section
          className="mb-24 pt-8 border-t border-outline-variant"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={revealVariant} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block mb-2">
                Directory
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                All Placed Alumni
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant max-w-md">
              A comprehensive directory of engineers launched from ACE into industry leadership, arranged chronologically by placement date.
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
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm uppercase text-[10px] text-on-surface-variant/70">Company</span>
                        <span className="font-medium text-on-surface text-right">
                          {alumnus.company === 'ND' || alumnus.company === 'Non-Disclosable' ? (
                            <span className="italic text-on-surface-variant">Non-Disclosable</span>
                          ) : (
                            alumnus.company
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm uppercase text-[10px] text-on-surface-variant/70">Placed On</span>
                        <span className="font-mono text-on-surface text-right">{alumnus.placedOn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-outline-variant flex items-center justify-between">
                    <span className="font-label-sm text-[10px] uppercase text-on-surface-variant">Package</span>
                    <span className="font-mono text-xs font-semibold text-primary">
                      {alumnus.pkg === 'ND' || alumnus.pkg === 'Non-Disclosable' || alumnus.pkg === 'Non Disclosable' ? (
                        <span className="italic font-normal text-on-surface-variant">Non-Disclosable</span>
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
