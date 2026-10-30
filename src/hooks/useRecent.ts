import { usePlayerRecentMatches } from "./usePlayer";
import type { IRecentMatchesResponse } from "@/models/recent";

export function useRecent(id: string) {
  const { data } = usePlayerRecentMatches(id);

  if (!data?.length) return undefined;

  const recentWins = data.filter((match) => match.result === "Won").length;
  const average = (getValue: (match: IRecentMatchesResponse) => number) =>
    data.reduce((sum, match) => sum + getValue(match), 0) / data.length;

  return {
    recentWins,
    recentMatches: data,
    form: data.slice(0, 10).map((match) => match.result === "Won"),
    latestMatches: data.slice(0, 6),
    averageKda: `${average((match) => match.kills).toFixed(1)} / ${average(
      (match) => match.deaths,
    ).toFixed(1)} / ${average((match) => match.assists).toFixed(1)}`,
    averageGpm: Math.round(average((match) => match.gold_per_min)),
    averageXpm: Math.round(average((match) => match.xp_per_min)),
  };
}

export function useRecentStats(id: string) {
  const recent = useRecent(id);
  if (recent) {
    return [
      {
        title: "Recent form · last 20",
        stat: `${recent.recentWins} / ${recent.recentMatches.length}`,
        subtitle: `${(
          (recent.recentWins / recent.recentMatches.length) *
          100
        ).toFixed(1)}% win rate`,
      },
      {
        title: "Average K / D / A",
        stat: recent.averageKda,
        subtitle: `Across ${recent.recentMatches.length} recent matches`,
      },
      {
        title: "Average gold / min",
        stat: `${recent.averageGpm}`,
        subtitle: "Last 20 matches",
      },
      {
        title: "Average XP / min",
        stat: `${recent.averageXpm}`,
        subtitle: "Last 20 matches",
      },
    ];
  } else {
    return [];
  }
}
