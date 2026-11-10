"use client";

import { m, type Variants } from "framer-motion";
import { fadeUp, spring } from "@/lib/motion";

const nudge: Variants = { hover: { x: 6, transition: spring } };

/**
 * One numbered row of the "five tabs" list. The <li> inherits the RevealList
 * stagger; the inner row owns the hover (an element with whileHover stops
 * inheriting its parent's stagger).
 */
export default function FeatureTile({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <m.li variants={fadeUp} className="border-t border-border">
      <m.div
        whileHover="hover"
        className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-5"
      >
        <span className="w-16 font-display text-4xl font-extrabold text-muted-foreground tabular-nums">
          {number}
        </span>
        <m.h3 variants={nudge} className="min-w-0 flex-[0_1_16rem] text-xl font-semibold">
          {title}
        </m.h3>
        <p className="min-w-0 flex-[1_1_20rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </m.div>
    </m.li>
  );
}
