"use client";

import { AnimatePresence, m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Inline text that slides vertically when `value` changes (e.g. page counters).
 * The first render is static.
 */
export default function SwapText({
  value,
  children,
}: {
  value: string | number;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
