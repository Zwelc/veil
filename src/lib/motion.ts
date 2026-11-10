import type { Transition, Variants } from "framer-motion";

/**
 * Shared framer-motion presets. Components animate through `m.*` (LazyMotion with
 * domAnimation, see Providers), so keep to transform/opacity: no layout animations.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 380, damping: 26 };

/** Small rise + fade. Parents drive it with initial="initial" animate="animate". */
export const fadeUp: Variants = {
  initial: { y: 12, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

/** Scale + fade in, for status cards (empty, error, direct link). */
export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE_OUT } },
};

/**
 * Horizontal slide keyed on a direction passed through `custom`:
 * 1 = forwards (enter from the right), -1 = backwards, 0 = fade only.
 */
export const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -24,
    transition: { duration: 0.18 },
  }),
};

/** Container that staggers its variant-driven children. */
export const stagger = (step = 0.06, delay = 0): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** whileInView options: animate once, a little before the element is fully on screen. */
export const viewOnce = { once: true, margin: "-80px" } as const;
