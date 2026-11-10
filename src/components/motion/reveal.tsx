"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, viewOnce } from "@/lib/motion";

/**
 * Scroll reveals. Client boundaries that let server components (e.g. FeatureStrip)
 * animate their children without becoming client components themselves.
 */

/** A <ul> whose variant-driven items (fadeUp-style) stagger in when scrolled into view. */
export function RevealList({
  step,
  delay,
  ...rest
}: HTMLMotionProps<"ul"> & {
  /** Seconds between items. */
  step?: number;
  /** Seconds before the first item. */
  delay?: number;
}) {
  return (
    <m.ul
      initial="initial"
      whileInView="animate"
      viewport={viewOnce}
      variants={stagger(step, delay)}
      {...rest}
    />
  );
}

/** Rises and fades a block (e.g. a section heading) in when scrolled into view. */
export function RevealBlock(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={viewOnce}
      variants={fadeUp}
      {...props}
    />
  );
}
