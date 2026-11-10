/**
 * Pure, dependency-free helpers shared by the server facade and the UI.
 * Must not import `dotaconstants`, because that would pull megabytes of JSON into client bundles.
 */

/** Player slots 0–127 are Radiant, 128+ are Dire. */
export function isRadiant(playerSlot: number) {
  return playerSlot < 128;
}

/** Win rate as a percentage (0–100); 0 when no games were played. */
export function winRate(wins: number, games: number) {
  return games > 0 ? (wins / games) * 100 : 0;
}

/** "snake_case words" → "Snake Case Words". */
export function titleCase(value: string) {
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Unix seconds → "Mar 4, 2026" (UTC, so server and client agree). */
export function formatDate(unixSeconds: number) {
  if (!Number.isFinite(unixSeconds) || unixSeconds <= 0) return "—";
  return new Date(unixSeconds * 1000).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * ISO time → "15:58" when it falls on the same UTC day as `ref`, else "9 Nov".
 * UTC so the static page and the browser agree. Invalid input → "".
 */
export function formatUtcTime(iso: string | null | undefined, ref?: string | null) {
  const date = new Date(iso ?? "");
  if (Number.isNaN(date.getTime())) return "";
  const sameDay = ref && new Date(ref).toISOString().slice(0, 10) === date.toISOString().slice(0, 10);
  return sameDay
    ? date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

const regionNames =
  typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

/** "SE" → "Sweden"; unknown codes come back unchanged. */
export function countryName(code: string) {
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
}

/** Seconds → "m:ss", or "h:mm:ss" once a match passes an hour. */
export function formatDuration(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${m}:${s}`;
}

export interface MatchSummaryInput {
  won: boolean;
  kills: number;
  deaths: number;
  assists: number;
  gold_per_min?: number;
  xp_per_min?: number;
}

/** Aggregate stats over a list of matches (recent form, averages). */
export function summarizeMatches(matches: MatchSummaryInput[]) {
  const count = matches.length;
  const wins = matches.filter((match) => match.won).length;
  const average = (pick: (match: MatchSummaryInput) => number | undefined) =>
    count ? matches.reduce((sum, match) => sum + (pick(match) ?? 0), 0) / count : 0;
  const kills = average((m) => m.kills);
  const deaths = average((m) => m.deaths);
  const assists = average((m) => m.assists);

  return {
    count,
    wins,
    losses: count - wins,
    winRate: winRate(wins, count),
    averageKda: `${kills.toFixed(1)} / ${deaths.toFixed(1)} / ${assists.toFixed(1)}`,
    averageGpm: Math.round(average((m) => m.gold_per_min)),
    averageXpm: Math.round(average((m) => m.xp_per_min)),
  };
}
