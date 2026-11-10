import type { ICounts } from "@/models/counts";
import type { IHero } from "@/models/hero";
import type { IMatch } from "@/models/match";
import type {
  IPlayerProfile,
  IPlayerSummary,
  IWinLoss,
} from "@/models/player";
import type { ITotal } from "@/models/totals";
import { apiFetch, type Params } from "./http";

const player = (id: string, endpoint = "") =>
  `/players/${encodeURIComponent(id)}${endpoint ? `/${endpoint}` : ""}`;

/** Browser-side facade over Veil's /api routes. Query options call these and nothing lower. */
export const veilApi = {
  proPlayers: () => apiFetch<IPlayerSummary[]>("/proPlayers"),
  search: (q: string) => apiFetch<IPlayerSummary[]>("/search", { q }),

  players: {
    profile: (id: string) => apiFetch<IPlayerProfile>(player(id)),
    heroes: (id: string, params?: { date?: number }) =>
      apiFetch<IHero[]>(player(id, "heroes"), params),
    matches: (id: string) => apiFetch<IMatch[]>(player(id, "matches")),
    recent: (id: string) => apiFetch<IMatch[]>(player(id, "recent")),
    counts: (id: string) => apiFetch<ICounts>(player(id, "counts")),
    winLoss: (id: string) => apiFetch<IWinLoss>(player(id, "wl")),
    totals: (id: string) => apiFetch<ITotal[]>(player(id, "totals")),
    /** Loosely-typed insight datasets (peers, pros, histograms/<field>, wardmap, wordcloud, ratings, rankings). */
    insight: <T = unknown>(id: string, endpoint: string, params?: Params) =>
      apiFetch<T>(player(id, endpoint), params),
    refresh: (id: string) =>
      apiFetch<unknown>(player(id, "refresh"), undefined, { method: "POST" }),
  },
};
