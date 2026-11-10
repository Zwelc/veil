"use client";

import {
  m,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/** Outer towers (two per side lane), then mid-lane towers. viewBox units. */
const TOWERS: [number, number][] = [
  [10, 62], [10, 38], [38, 10], [62, 10],
  [38, 90], [62, 90], [90, 62], [90, 38],
  [30, 70], [42, 58], [58, 42], [70, 30],
];

/** Top, bottom, then mid, so the lanes "push" in the order a match reads. */
const LANES = ["M10 90 L10 10 L90 10", "M10 90 L90 90 L90 10", "M10 90 L90 10"];

/**
 * Decorative map of the three lanes and the river, Radiant (bottom-left, ember)
 * to Dire (top-right, primary). On load the river fades in, the lanes draw in,
 * then the towers and ancients appear. Static under reduced motion.
 */
export default function LaneMap({ className }: { className?: string }) {
  const still = useReducedMotion();
  const draw = (delay: number, duration = 1.4): Transition => ({
    delay,
    duration,
    ease: EASE_OUT,
  });
  const from = (initial: TargetAndTransition) => (still ? false : initial);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <m.path
        d="M6 30 C 30 40, 48 52, 58 70 S 74 92, 96 96"
        fill="none"
        className="stroke-chart-5"
        strokeOpacity={0.45}
        strokeWidth={5}
        strokeLinecap="round"
        initial={from({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={draw(0, 1.2)}
      />
      {LANES.map((d, i) => (
        <m.path
          key={d}
          d={d}
          fill="none"
          className={i === 2 ? "stroke-primary" : "stroke-chart-1"}
          strokeOpacity={i === 2 ? 0.85 : 0.4}
          strokeWidth={i === 2 ? 0.45 : 0.35}
          initial={from({ pathLength: 0 })}
          animate={{ pathLength: 1 }}
          transition={draw(0.2 + i * 0.25)}
        />
      ))}
      <m.g
        className="fill-chart-1"
        fillOpacity={0.7}
        initial={from({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={draw(1.3, 0.6)}
      >
        {TOWERS.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={0.9} />
        ))}
      </m.g>
      <m.g
        initial={from({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={draw(1.5, 0.6)}
      >
        <rect x={6} y={86} width={8} height={8} className="fill-ember" transform="rotate(45 10 90)" />
        <rect x={86} y={6} width={8} height={8} className="fill-primary" transform="rotate(45 90 10)" />
      </m.g>
    </svg>
  );
}
