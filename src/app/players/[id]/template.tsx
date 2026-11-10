"use client";

import { m } from "framer-motion";

/** Next.js re-mounts templates on every navigation, so each player tab fades in. */
export default function PlayerTabTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
