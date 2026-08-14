// ============================================
// CENTRALIZED FRAMER MOTION ANIMATION VARIANTS
// ACE Community Portal
// ============================================

// --- Fade In Up (general reveal) ---
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Fade In Down ---
export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Fade In Left ---
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Fade In Right ---
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Scale In ---
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Scale In from center (for modals, cards) ---
export const popIn = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
};

// --- Stagger container (parent) ---
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// --- Fast stagger ---
export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

// --- Slow stagger ---
export const staggerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// --- Line reveal (horizontal bar) ---
export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Clip reveal (for images, panels) ---
export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

// --- Page transition ---
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// --- Slide up with blur ---
export const slideUpBlur = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Accordion / height toggle ---
export const accordionVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

// --- Navbar on scroll ---
export const navVariants = {
  top: {
    backgroundColor: 'rgba(249, 249, 249, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(200, 197, 202, 0)',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(249, 249, 249, 0.92)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(200, 197, 202, 1)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
};

// --- Floating / bobbing animation ---
export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// --- Rotate loop ---
export const rotateLoop = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// --- Shared viewport config (for whileInView) ---
export const viewportConfig = { once: true, margin: '-80px' };
export const viewportConfigEarly = { once: true, margin: '-40px' };

// --- Hover card lift ---
export const cardHover = {
  rest: { y: 0, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  hover: {
    y: -6,
    boxShadow: '0 20px 48px rgba(0,0,0,0.1)',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Stat bar grow ---
export const barGrow = (width) => ({
  hidden: { width: '0%' },
  visible: {
    width: `${width}%`,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
});

// --- Draw SVG line ---
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeOut' },
  },
};
