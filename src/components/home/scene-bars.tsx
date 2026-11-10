"use client";

import { m, type Variants } from "framer-motion";
import { RevealList } from "@/components/motion/reveal";
import { EASE_OUT, fadeUp } from "@/lib/motion";

export type SceneBar = { label: string; count: number; share: number };

const grow: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

/** Horizontal bars that grow in, staggered, when scrolled into view. */
export default function SceneBars({ rows }: { rows: SceneBar[] }) {
  return (
    <RevealList step={0.08} className="flex flex-col gap-3.5">
      {rows.map((row) => (
        <m.li
          key={row.label}
          variants={fadeUp}
          className="grid grid-cols-[minmax(7rem,9rem)_minmax(0,1fr)_4rem] items-center gap-3.5"
        >
          <span className="truncate text-sm sm:text-base">{row.label}</span>
          <span aria-hidden="true" className="block h-2.5 overflow-hidden rounded-sm bg-muted">
            <m.span
              variants={grow}
              className="block h-full origin-left rounded-sm bg-primary"
              style={{ width: `${Math.max(2, Math.round(row.share * 100))}%` }}
            />
          </span>
          <span className="text-right font-mono text-sm text-muted-foreground tabular-nums">
            {row.count.toLocaleString("en-US")}
          </span>
        </m.li>
      ))}
    </RevealList>
  );
}
