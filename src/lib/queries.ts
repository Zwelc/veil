import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { veilApi } from "@/lib/api/veil";

const MINUTE = 60_000;

/**
 * Query keys and query functions, defined once. Hooks, prefetching and
 * invalidation all go through these factories.
 */
export const playerQueries = {
  all: (id: string) => ["player", id] as const,

  profile: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "profile"],
      queryFn: () => veilApi.players.profile(id),
    }),

  heroes: (id: string, date?: number) => {
    // 0 means "all time", the same as no filter: one cache entry, one request.
    const params = date ? { date } : {};
    return queryOptions({
      queryKey: [...playerQueries.all(id), "heroes", params],
      queryFn: () => veilApi.players.heroes(id, params),
      placeholderData: keepPreviousData,
    });
  },

  matches: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "matches"],
      queryFn: () => veilApi.players.matches(id),
    }),

  recent: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "recent"],
      queryFn: () => veilApi.players.recent(id),
    }),

  counts: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "counts"],
      queryFn: () => veilApi.players.counts(id),
    }),

  winLoss: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "wl"],
      queryFn: () => veilApi.players.winLoss(id),
    }),

  totals: (id: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "totals"],
      queryFn: () => veilApi.players.totals(id),
    }),

  insight: (id: string, endpoint: string) =>
    queryOptions({
      queryKey: [...playerQueries.all(id), "insight", endpoint],
      queryFn: () => veilApi.players.insight(id, endpoint),
      staleTime: 30 * MINUTE,
    }),
};

export const proPlayerQueries = {
  list: () =>
    queryOptions({
      queryKey: ["proPlayers"] as const,
      queryFn: veilApi.proPlayers,
      staleTime: 60 * MINUTE,
    }),
};

export const searchQueries = {
  players: (q: string) =>
    queryOptions({
      queryKey: ["search", q] as const,
      queryFn: () => veilApi.search(q),
      staleTime: 60 * MINUTE,
    }),
};
