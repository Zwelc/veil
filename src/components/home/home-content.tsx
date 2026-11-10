"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { ArrowUpRight, UserRound } from "lucide-react";
import { useHasChanged } from "@/hooks/useHasChanged";
import { useSearchResults } from "@/hooks/useSearch";
import { EASE_OUT, spring } from "@/lib/motion";
import PlayerResults from "./player-results";
import RecentlyViewed from "./recently-viewed";

const view: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** A pasted account ID or profile link: offer a direct jump instead of searching. */
function DirectPlayerLink({ id }: { id: string }) {
  return (
    <m.section
      aria-label="Go to player"
      className="mx-auto max-w-xl"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={spring}
    >
      <Link
        href={`/players/${id}`}
        className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-card p-5 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound aria-hidden="true" className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Go to player #{id}</span>
          <span className="block text-sm text-muted-foreground">
            Press Enter or select to open their profile.
          </span>
        </span>
        <m.span
          className="inline-flex text-muted-foreground group-hover:text-primary"
          animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 0.8,
            ease: "easeInOut",
          }}
        >
          <ArrowUpRight aria-hidden="true" className="size-5" />
        </m.span>
      </Link>
    </m.section>
  );
}

/**
 * Everything below the hero. Crossfades between three views: the showcase
 * (recently viewed, featured pros, the scene, then profile features), search
 * results, or a direct link for a pasted ID. `scene` and `features` are
 * server-rendered and passed in, so they stay server components.
 */
export default function HomeContent({
  features,
  scene,
}: {
  features: ReactNode;
  scene?: ReactNode;
}) {
  const { data, term, directId, isSearching, isLoading, isError } =
    useSearchResults();
  const mode = directId ? "direct" : isSearching ? "results" : "showcase";
  // The view wrapper skips its own entrance on first paint; descendants still animate.
  const switched = useHasChanged(mode);

  const results = (
    <PlayerResults
      players={data}
      term={term}
      isSearching={isSearching}
      isLoading={isLoading}
      isError={isError}
    />
  );

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={mode}
        variants={view}
        initial={switched ? "initial" : false}
        animate="animate"
        exit="exit"
        className="space-y-10 sm:space-y-12"
      >
        {mode === "direct" && directId ? (
          <DirectPlayerLink id={directId} />
        ) : mode === "results" ? (
          results
        ) : (
          <>
            <RecentlyViewed />
            {results}
            {scene}
            {features}
          </>
        )}
      </m.div>
    </AnimatePresence>
  );
}
