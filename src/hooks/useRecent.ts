import { summarizeMatches } from "@/lib/dota";
import { usePlayerRecentMatches } from "./usePlayer";

export function useRecent(id: string) {
  const { data } = usePlayerRecentMatches(id);

  if (!data?.length) return undefined;

  return {
    ...summarizeMatches(data),
    form: data.slice(0, 10).map((match) => match.won),
    latestMatches: data.slice(0, 6),
  };
}
