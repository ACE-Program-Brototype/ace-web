import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ALUMNI_MEMBERS, SPOTLIGHT_ALUMNI, ALUMNI_STORIES, ALUMNI_STATS } from '../constants/alumniDatas';
import PartnerLogosMarquee from '../components/PartnerLogosMarquee';

const revealVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const getCardOffset = (index, current, total) => {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

export default function AlumniPage() {
  // Spotlight Series State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpotlightPaused, setIsSpotlightPaused] = useState(false);

  // Mobile Touch Swipe Handling for Spotlight Carousel
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleSpotlightTouchStart = (e) => {
    setIsSpotlightPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = 0;
    touchEndY.current = 0;
  };

  const handleSpotlightTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleSpotlightTouchEnd = () => {
    setIsSpotlightPaused(false);
    if (touchEndX.current === 0) return;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;

    // Detect dominant horizontal swipe with 40px threshold
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left -> next card
        setCurrentIndex((prev) => (prev + 1) % SPOTLIGHT_ALUMNI.length);
      } else {
        // Swiped right -> prev card
        setCurrentIndex((prev) => (prev - 1 + SPOTLIGHT_ALUMNI.length) % SPOTLIGHT_ALUMNI.length);
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

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
          className="grid grid-cols-2 md:grid-cols-4 border-y border-outline-variant"
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

        {/* 3. Hiring Partners */}
        <motion.section
          className="py-24 border-b border-outline-variant"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2
            variants={revealVariant}
            className="font-headline-lg text-headline-lg text-center mb-16 text-primary"
          >
            Where our engineers go.
          </motion.h2>
          <PartnerLogosMarquee />
        </motion.section>

        {/* 4. Automatic 3D Coverflow Spotlight Carousel */}
        <motion.section
          className="border-b border-outline-variant py-20 mb-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* Section Header: Centered in the middle */}
          <div className="flex flex-col items-center text-center mb-8 md:mb-12 px-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="font-label-sm text-label-sm text-accent uppercase tracking-widest font-semibold block">
                Spotlight Series
              </span>
              <span className="text-on-surface-variant/40">•</span>
              <span className="font-mono text-xs text-on-surface-variant">
                0{currentIndex + 1} / 0{SPOTLIGHT_ALUMNI.length}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
              Distinguished Alumni
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant">
              Discover how our alumni transformed their passion into industry-defining careers.
            </p>
          </div>

          <div
            className="relative group/spotlight px-2 sm:px-6 flex flex-col items-center justify-center touch-pan-y"
            onMouseEnter={() => setIsSpotlightPaused(true)}
            onMouseLeave={() => setIsSpotlightPaused(false)}
            onTouchStart={handleSpotlightTouchStart}
            onTouchMove={handleSpotlightTouchMove}
            onTouchEnd={handleSpotlightTouchEnd}
          >
            {/* 3D Coverflow Stage */}
            <div
              className="relative w-full h-[540px] sm:h-[600px] md:h-[640px] flex items-center justify-center overflow-hidden py-6"
              style={{ perspective: '1200px' }}
            >
              {SPOTLIGHT_ALUMNI.map((alumnus, idx) => {
                const offset = getCardOffset(idx, currentIndex, SPOTLIGHT_ALUMNI.length);
                const isCenter = offset === 0;

                // Compute carousel transforms (all cards at same flat angle, not tilted)
                let xTransform = '0%';
                let scaleTransform = 1;
                let rotateTransform = 0;
                let zIndexVal = 30;
                let opacityVal = 1;

                if (offset === 0) {
                  xTransform = '0%';
                  scaleTransform = 1;
                  rotateTransform = 0;
                  zIndexVal = 30;
                  opacityVal = 1;
                } else if (offset === -1) {
                  xTransform = '-64%';
                  scaleTransform = 0.88;
                  rotateTransform = 0;
                  zIndexVal = 20;
                  opacityVal = 0.7;
                } else if (offset === 1) {
                  xTransform = '64%';
                  scaleTransform = 0.88;
                  rotateTransform = 0;
                  zIndexVal = 20;
                  opacityVal = 0.7;
                } else {
                  xTransform = offset < 0 ? '-120%' : '120%';
                  scaleTransform = 0.75;
                  rotateTransform = 0;
                  zIndexVal = 10;
                  opacityVal = 0;
                }

                return (
                  <motion.div
                    key={alumnus.id}
                    onClick={() => {
                      if (!isCenter) setCurrentIndex(idx);
                    }}
                    animate={{
                      x: xTransform,
                      y: 0,
                      scale: scaleTransform,
                      rotateY: rotateTransform,
                      zIndex: zIndexVal,
                      opacity: opacityVal,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    className={`absolute inset-0 m-auto w-[310px] sm:w-[390px] md:w-[460px] h-[450px] sm:h-[500px] md:h-[530px] flex flex-col bg-surface border transition-colors select-none ${isCenter
                      ? 'border-accent shadow-[0_24px_60px_rgba(0,44,95,0.2),0_0_30px_rgba(252,172,4,0.25)] ring-1 ring-accent/30 cursor-default'
                      : 'border-outline-variant shadow-md hover:border-primary/50 cursor-pointer'
                      }`}
                  >
                    {/* Card Image Header (Vertical) */}
                    <div className="relative h-[230px] sm:h-[260px] md:h-[280px] w-full overflow-hidden bg-surface-container-low shrink-0 border-b border-outline-variant">
                      <img
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/spotlight:scale-105"
                        alt={alumnus.name}
                        src={alumnus.img}
                      />
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                        <span className="px-3.5 py-1.5 bg-black/85 backdrop-blur-xs text-accent font-mono text-xs sm:text-sm md:text-base font-semibold border border-white/10 shadow-sm">
                          {alumnus.pkg}
                        </span>
                      </div>
                    </div>

                    {/* Card Body (Vertical) */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col gap-3 sm:gap-3.5 overflow-hidden bg-surface">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-label-sm text-xs sm:text-sm text-accent uppercase tracking-widest font-semibold">
                            {alumnus.domain}
                          </span>
                          <span className="font-mono text-xs sm:text-sm text-on-surface-variant">
                            {alumnus.placedOn}
                          </span>
                        </div>

                        <h3 className="font-headline-sm text-lg sm:text-xl md:text-2xl font-bold text-primary truncate">
                          {alumnus.name}
                        </h3>
                        {/* <p className="font-body-md text-xs sm:text-sm md:text-base text-on-surface-variant line-clamp-1 mb-3">
                          {alumnus.companyRole ||
                            `${alumnus.role} ${
                              alumnus.company !== 'ND' && alumnus.company !== 'Non-Disclosable'
                                ? `@ ${alumnus.company}`
                                : ''
                            }`}
                        </p> */}
                      </div>

                      {/* Highlight Quote */}
                      <div className="p-3.5 sm:p-4 bg-surface-container-low border-l-2 border-accent relative">
                        <span className="material-symbols-outlined text-accent/30 text-base sm:text-xl absolute top-2 right-2 sm:top-3 sm:right-3 select-none">
                          format_quote
                        </span>
                        <p className="font-body-md text-xs sm:text-sm md:text-base text-on-surface italic leading-relaxed line-clamp-3 sm:line-clamp-4">
                          "{alumnus.quote}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {SPOTLIGHT_ALUMNI.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-8 bg-accent' : 'w-2 bg-outline-variant hover:bg-primary/50'
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
                      {/* <p className="font-label-sm text-xs text-on-surface-variant line-clamp-1">
                        {a.companyRole || `${a.role} ${a.company !== 'ND' && a.company !== 'Non-Disclosable' ? `@ ${a.company}` : ''}`}
                      </p> */}
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
