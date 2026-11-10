"use client";

import Link from "next/link";
import { m } from "framer-motion";

/**
 * next/link as an m.* component. Put hover/tap gestures here rather than on an
 * entrance-animated wrapper: an element with whileHover/whileTap controls its own
 * variants and stops inheriting its parent's stagger, and whileTap on a non-focusable
 * wrapper adds a stray tabindex.
 */
const MotionLink = m.create(Link);

export default MotionLink;
