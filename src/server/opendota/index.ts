import "server-only";
import { FEATURED_PRO_LIMIT } from "@/lib/constants";
import type { IProLanding } from "@/models/scene";
import { openDotaFetch, type Query } from "./http";
import {
  censorPeople,
  cleanWordCloud,
  toCounts,
  toHeroRows,
  toMatchRows,
  toPlayerSummaries,
  toProfile,
  toProScene,
  toRankings,
  type RawCounts,
  type RawHero,
  type RawMatch,
  type RawProfile,
  type RawWordCloud,
} from "./mappers";

type RawList = Record<string, unknown>[];

/**
 * Cache lifetimes in seconds. Used for the Next.js data cache (upstream calls)
 * AND the CDN Cache-Control header (route responses), so one table drives both.
 */
export const CACHE_TTL = {
  proPlayers: 6 * 60 * 60,
  search: 60 * 60,
  profile: 10 * 60,
  heroes: 10 * 60,
  counts: 10 * 60,
  stats: 10 * 60, // wl, totals
  matches: 5 * 60,
  insights: 60 * 60, // peers, pros, histograms, wardmap, wordcloud, ratings, rankings
} as const;

/** Unmapped endpoints served by the catch-all route, with their TTLs. */
export const RAW_PLAYER_ENDPOINTS: Record<string, number> = {
  wl: CACHE_TTL.stats,
  totals: CACHE_TTL.stats,
  histograms: CACHE_TTL.insights,
  wardmap: CACHE_TTL.insights,
  ratings: CACHE_TTL.insights,
};

const fetchProList = () =>
  openDotaFetch<RawList>("/proPlayers", { revalidate: CACHE_TTL.proPlayers });

const toFeaturedPros = (raw: RawList) =>
  toPlayerSummaries(raw, {
    requireAvatar: true,
    recentFirst: true,
    limit: FEATURED_PRO_LIMIT,
    withTeam: true,
  });

const player = (id: string, endpoint = "") =>
  `/players/${encodeURIComponent(id)}${endpoint ? `/${endpoint}` : ""}`;

/** Server-side facade over the OpenDota API. Routes call these and nothing lower. */
export const OpenDota = {
  /** Most recently active pros only: the full list is ~5 MB, the page shows 12 at a time. */
  getProPlayers: async () => toFeaturedPros(await fetchProList()),

  /**
   * Featured pros plus the scene counts, from ONE /proPlayers fetch. The raw list
   * is too big for the Next data cache, so two calls would mean two upstream hits.
   */
  getProLanding: async (now = Date.now()): Promise<IProLanding> => {
    const raw = await fetchProList();
    return { pros: toFeaturedPros(raw), scene: toProScene(raw, now) };
  },

  search: async (q: string) =>
    toPlayerSummaries(
      await openDotaFetch<RawList>("/search", {
        query: { q },
        revalidate: CACHE_TTL.search,
      }),
    ),

  getProfile: async (id: string) =>
    toProfile(
      await openDotaFetch<RawProfile>(player(id), {
        revalidate: CACHE_TTL.profile,
      }),
      id,
    ),

  getHeroes: async (id: string, query?: Query) =>
    toHeroRows(
      await openDotaFetch<RawHero[]>(player(id, "heroes"), {
        query,
        defaults: { significant: "0" },
        revalidate: CACHE_TTL.heroes,
      }),
    ),

  getMatches: async (id: string, query?: Query) =>
    toMatchRows(
      await openDotaFetch<RawMatch[]>(player(id, "matches"), {
        query,
        revalidate: CACHE_TTL.matches,
      }),
    ),

  getRecentMatches: async (id: string) =>
    toMatchRows(
      await openDotaFetch<RawMatch[]>(player(id, "recentMatches"), {
        revalidate: CACHE_TTL.matches,
      }),
    ),

  getCounts: async (id: string, query?: Query) =>
    toCounts(
      await openDotaFetch<RawCounts>(player(id, "counts"), {
        query,
        defaults: { significant: "0" },
        revalidate: CACHE_TTL.counts,
      }),
    ),

  getPeers: async (id: string, query?: Query) =>
    censorPeople(
      await openDotaFetch<RawList>(player(id, "peers"), {
        query,
        revalidate: CACHE_TTL.insights,
      }),
    ),

  getPros: async (id: string, query?: Query) =>
    censorPeople(
      await openDotaFetch<RawList>(player(id, "pros"), {
        query,
        revalidate: CACHE_TTL.insights,
      }),
    ),

  getWordCloud: async (id: string, query?: Query) =>
    cleanWordCloud(
      await openDotaFetch<RawWordCloud>(player(id, "wordcloud"), {
        query,
        revalidate: CACHE_TTL.insights,
      }),
    ),

  getRankings: async (id: string) =>
    toRankings(
      await openDotaFetch<RawList>(player(id, "rankings"), {
        revalidate: CACHE_TTL.insights,
      }),
    ),

  /** Unmapped endpoints (see RAW_PLAYER_ENDPOINTS). `endpoint` must be pre-validated. */
  getRaw: (id: string, endpoint: string, query?: Query) =>
    openDotaFetch<unknown>(player(id, endpoint), {
      query,
      revalidate: RAW_PLAYER_ENDPOINTS[endpoint.split("/")[0]],
    }),

  refresh: (id: string) =>
    openDotaFetch<unknown>(player(id, "refresh"), { method: "POST" }),
};
