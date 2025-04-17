// Centralized animation configurations
export const transitions = {
  // Standard easing functions that work across all browsers
  ease: [0.25, 0.1, 0.25, 1], // Standard ease
  easeOut: [0, 0, 0.2, 1], // Smooth exit
  easeIn: [0.4, 0, 1, 1], // Smooth entrance
  easeInOut: [0.4, 0, 0.2, 1], // Smooth both ways
  // Bounce effect without invalid values
  bounce: [0.34, 1.56, 0.64, 1], // Replaces the problematic cubic-bezier
}

// Standard animation variants for consistent use
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: transitions.easeOut },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: transitions.easeOut },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: transitions.easeOut },
  },
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: transitions.easeOut },
  },
}

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0 },
  in: {
    opacity: 1,
    transition: { duration: 0.6, ease: transitions.easeOut },
  },
  out: {
    opacity: 0,
    transition: { duration: 0.5, ease: transitions.easeIn },
  },
}

// Slide variants for modals and drawers
export const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: transitions.easeOut },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: { duration: 0.5, ease: transitions.easeIn },
  }),
}
