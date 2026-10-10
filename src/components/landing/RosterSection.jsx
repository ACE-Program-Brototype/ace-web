import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { STUDENTS } from "../../constants/studentsDatas";

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

export default function RosterSection() {
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

        scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });

        setTimeout(() => {
          if (scrollContainer.scrollLeft >= singleSetWidth) {
            scrollContainer.scrollTo({
              left: scrollContainer.scrollLeft - singleSetWidth,
              behavior: "instant",
            });
          }
        }, 600);
      }, 1800);
    }

    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
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
            className="hidden md:block bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider px-8 py-3 border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200"
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
                loading="lazy"
                decoding="async"
                width="320"
                height="256"
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
            to="/directory"
            className="block text-center bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 border border-transparent hover:border-accent hover:shadow-[0_4px_20px_rgba(252,172,4,0.25)] hover:bg-primary-dark transition-all duration-200"
          >
            Explore the Directory
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
