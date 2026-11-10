import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { veilApi } from "@/lib/api/veil";
import { playerQueries } from "@/lib/queries";

export const usePlayerProfile = (id: string) =>
  useQuery(playerQueries.profile(id));

export const usePlayerHeroes = (id: string, date?: number) =>
  useQuery(playerQueries.heroes(id, date));

export const usePlayerMatches = (id: string) =>
  useQuery(playerQueries.matches(id));

export const usePlayerRecentMatches = (id: string) =>
  useQuery(playerQueries.recent(id));

export const usePlayerCounts = (id: string) =>
  useQuery(playerQueries.counts(id));

export const usePlayerWinLoss = (id: string) =>
  useQuery(playerQueries.winLoss(id));

export const usePlayerTotals = (id: string) =>
  useQuery(playerQueries.totals(id));

export const usePlayerInsight = (id: string, endpoint: string) =>
  useQuery(playerQueries.insight(id, endpoint));

/** Asks OpenDota to re-parse the player, then refetches every cached query for them. */
export function useRefreshPlayer(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => veilApi.players.refresh(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: playerQueries.all(id) }),
  });
}
