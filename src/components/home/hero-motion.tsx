"use client";

import { m, type HTMLMotionProps, type Variants } from "framer-motion";
import { EASE_OUT, fadeUp, stagger } from "@/lib/motion";

/**
 * Client motion pieces for the server-rendered Hero. The hero plays a staggered
 * entrance on load; HeroHeadline only moves (never fades), so the LCP text is
 * visible in the static HTML before hydration.
 */
export function HeroStage(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={stagger(0.08, 0.05)}
      {...props}
    />
  );
}

export function HeroItem(props: HTMLMotionProps<"div">) {
  return <m.div variants={fadeUp} {...props} />;
}

const rise: Variants = {
  initial: { y: 16 },
  animate: { y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function HeroHeadline(props: HTMLMotionProps<"h1">) {
  return <m.h1 variants={rise} {...props} />;
}
