"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { RevealBlock } from "@/components/motion/reveal";
import SwapText from "@/components/motion/swap-text";
import PlayerGrid from "@/components/players/grid";
import { useHasChanged } from "@/hooks/useHasChanged";
import { popIn, slide } from "@/lib/motion";
import { HeaderBadge, PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { RESULT_LIMIT } from "@/lib/constants";
import type { IPlayerSummary } from "@/models/player";

type Props = {
  players: IPlayerSummary[];
  term: string;
  isSearching: boolean;
  isLoading: boolean;
  isError: boolean;
};

/** Featured pros or search results, paginated client-side. */
export default function PlayerResults({
  players,
  term,
  isSearching,
  isLoading,
  isError,
}: Props) {
  const [pagination, setPagination] = useState({
    query: "",
    page: 0,
    direction: 0,
  });
  const samePage = pagination.query === term;
  const page = samePage ? pagination.page : 0;
  const direction = samePage ? pagination.direction : 0;
  const pageCount = Math.max(1, Math.ceil(players.length / RESULT_LIMIT));
  const start = page * RESULT_LIMIT;
  const visiblePlayers = players.slice(start, start + RESULT_LIMIT);
  const range = `${start + 1}–${Math.min(start + visiblePlayers.length, players.length)}`;
  const label = isSearching ? "Search results" : "Featured pro players";
  // First paint: no slide, but the cards still stagger in (see useHasChanged).
  const viewKey = isLoading ? "loading" : `${term}:${page}`;
  const paged = useHasChanged(viewKey);
  const changePage = (nextPage: number) => {
    const target = Math.min(pageCount - 1, Math.max(0, nextPage));
    setPagination({ query: term, page: target, direction: Math.sign(target - page) });
  };

  return (
    <section aria-labelledby="player-results-heading" className="space-y-4">
      <RevealBlock>
        <PageHeader
          id="player-results-heading"
          size="md"
          eyebrow={isSearching ? "Search results" : "Recently active"}
          title={
            isLoading
              ? "Finding players…"
              : isSearching
                ? `Players matching “${term}”`
                : "Featured pro players"
          }
          aside={
            !isLoading &&
            !isError &&
            players.length > 0 && (
              <HeaderBadge>
                Players <SwapText value={range}>{range}</SwapText> of{" "}
                {players.length.toLocaleString()}
              </HeaderBadge>
            )
          }
        />
      </RevealBlock>
      {isError ? (
        <m.div
          initial="initial"
          animate="animate"
          variants={popIn}
          className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-10 text-center"
        >
          <p className="font-semibold">Player search is unavailable</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The OpenDota service did not respond. Please try again in a moment.
          </p>
        </m.div>
      ) : (
        // Each page (and the skeleton) is its own keyed view: the old one slides out
        // the way you paged while the new one slides in and re-staggers its cards.
        <div className="relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <m.div
              key={viewKey}
              custom={direction}
              variants={slide}
              initial={paged ? "enter" : false}
              animate="center"
              exit="exit"
            >
              <PlayerGrid
                limit={RESULT_LIMIT}
                loading={isLoading}
                data={visiblePlayers}
                searching={isSearching}
              />
            </m.div>
          </AnimatePresence>
        </div>
      )}
      {!isLoading && !isError && players.length > RESULT_LIMIT && (
        <nav
          aria-label="Player result pages"
          className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-muted-foreground">
            {label} · page {page + 1} of {pageCount}
          </p>
          <div className="flex items-center justify-between gap-1 sm:justify-end">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => changePage(0)}
              disabled={page === 0}
              aria-label="First page"
            >
              <ChevronsLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => changePage(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <span
              aria-live="polite"
              className="min-w-20 px-2 text-center text-sm font-medium tabular-nums"
            >
              <SwapText value={page}>{page + 1}</SwapText> / {pageCount}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => changePage(page + 1)}
              disabled={page >= pageCount - 1}
              aria-label="Next page"
            >
              <ChevronRight aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => changePage(pageCount - 1)}
              disabled={page >= pageCount - 1}
              aria-label="Last page"
            >
              <ChevronsRight aria-hidden="true" />
            </Button>
          </div>
        </nav>
      )}
    </section>
  );
}
