/** Insight categories, histogram fields and shared helpers for insight views. */
import { formatDate } from "@/lib/dota";

export const PLAYER_HISTOGRAM_FIELDS = [
  "kills",
  "deaths",
  "assists",
  "gold_per_min",
  "xp_per_min",
  "last_hits",
  "denies",
  "hero_damage",
  "hero_healing",
  "tower_damage",
] as const;

export type Endpoint =
  | "peers"
  | "pros"
  | "histograms"
  | "wardmap"
  | "wordcloud"
  | "ratings"
  | "rankings";
export type Row = Record<string, unknown>;

export const ENDPOINTS: { value: Endpoint; label: string; description: string }[] = [
  {
    value: "peers",
    label: "Teammates",
    description: "Players you have shared matches with",
  },
  {
    value: "pros",
    label: "Pro teammates",
    description: "Professional players from your matches",
  },
  {
    value: "histograms",
    label: "Stat trends",
    description: "How your match stats are distributed",
  },
  {
    value: "wardmap",
    label: "Ward map",
    description: "Your observer and sentry placements",
  },
  {
    value: "wordcloud",
    label: "Chat words",
    description: "Words recorded from your matches",
  },
  {
    value: "ratings",
    label: "Rank history",
    description: "Recorded medal changes",
  },
  {
    value: "rankings",
    label: "Hero rankings",
    description: "Your hero leaderboard scores",
  },
];

export const numberValue = (value: unknown) =>
  typeof value === "number" ? value : Number(value) || 0;
export const dateLabel = (timestamp: unknown) => formatDate(numberValue(timestamp));

export function asRows(data: unknown): Row[] {
  return Array.isArray(data)
    ? data.filter(
        (item): item is Row => item !== null && typeof item === "object",
      )
    : [];
}
