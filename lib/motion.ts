import type { Variants, Transition } from "framer-motion";

export const LUXURY_EASE = [0.6, 0.01, 0.05, 0.95] as const;

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const lineVariants: Variants = {
  hidden: { y: "100%" },
  show: { y: "0%" },
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

export const luxuryTransition = (delay = 0, duration = 1): Transition => ({
  duration,
  delay,
  ease: LUXURY_EASE,
});
