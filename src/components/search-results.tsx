"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UsersRound,
  Swords,
} from "lucide-react";
import PlayerGrid from "./players/grid";
import { RESULT_LIMIT } from "@/constants";
import useSearchResults from "@/hooks/useSearchResults";
import Search from "@/components/layout/search";
import { Button } from "@/components/ui/button";

const SearchResults = () => {
  const { data, isLoading, isError, search } = useSearchResults();
  const [pagination, setPagination] = useState({ query: "", page: 0 });
  const isSearching = search.trim().length > 0;
  const players = data ?? [];
  const page = pagination.query === search ? pagination.page : 0;
  const pageCount = Math.max(1, Math.ceil(players.length / RESULT_LIMIT));
  const start = page * RESULT_LIMIT;
  const visiblePlayers = players.slice(start, start + RESULT_LIMIT);
  const changePage = (nextPage: number) => {
    setPagination({
      query: search,
      page: Math.min(pageCount - 1, Math.max(0, nextPage)),
    });
  };

  return (
    <div className="space-y-8 pb-6 sm:space-y-10">
      <section className="relative isolate overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-card via-card to-primary/[0.09] px-5 py-9 shadow-sm sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 size-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/3 -z-10 size-80 rounded-full bg-chart-2/10 blur-3xl"
        />
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
            <Swords aria-hidden="true" className="size-3.5" />
            Dota 2 player explorer
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Every match tells a story.
            <span className="mt-1 block bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Find yours.
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
            Search any player to explore match history, hero stats, performance
            trends, and more.
          </p>
          <div className="mx-auto mt-7 max-w-2xl text-left">
            <Search variant="hero" />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <UsersRound aria-hidden="true" className="size-3.5" /> Search by
              player name
            </span>
            <span>Powered by OpenDota</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="player-results-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {isSearching ? "Search results" : "Discover"}
            </p>
            <h2
              id="player-results-heading"
              className="mt-1 text-xl font-bold tracking-tight sm:text-2xl"
            >
              {isLoading
                ? "Finding players…"
                : isSearching
                  ? `Players matching “${search.trim()}”`
                  : "Featured pro players"}
            </h2>
          </div>
          {!isLoading && !isError && players.length > 0 && (
            <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Players {start + 1}–
              {Math.min(start + visiblePlayers.length, players.length)} of{" "}
              {players.length.toLocaleString()}
            </span>
          )}
        </div>
        {isError ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-10 text-center">
            <p className="font-semibold">Player search is unavailable</p>
            <p className="mt-1 text-sm text-muted-foreground">
              The OpenDota service did not respond. Please try again in a
              moment.
            </p>
          </div>
        ) : (
          <PlayerGrid
            limit={RESULT_LIMIT}
            loading={isLoading}
            data={visiblePlayers}
            searching={isSearching}
          />
        )}
        {!isLoading && !isError && players.length > RESULT_LIMIT && (
          <nav
            aria-label="Player result pages"
            className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-muted-foreground">
              {isSearching ? "Search results" : "Featured pro players"} · page{" "}
              {page + 1} of {pageCount}
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
                {page + 1} / {pageCount}
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
    </div>
  );
};

export default SearchResults;
