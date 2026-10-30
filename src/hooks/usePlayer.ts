/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayerHTTP } from "@/lib/fetcher";
import { ICounts, IPlayerSide } from "@/models/counts";
import { IRecentMatchesResponse } from "@/models/recent";
import { ITotal } from "@/models/totals";
import { API_URL } from "@/lib/constants";
import { IHero } from "@/models/hero";
import useSWR, { mutate } from "swr";

export default function usePlayer(id: string) {
  return usePlayerSWR<any, any>(`/${id}`);
}

export function usePlayerHeroes(id: string, date?: number) {
  let url = `/${id}/heroes?significant=0`;
  if (date) {
    url += `&date=${date}`;
  }

  return usePlayerSWR<IHero[], Error>(url);
}

export function usePlayerRecentMatches(id: string) {
  return usePlayerSWR<IRecentMatchesResponse[], any>(`/${id}/recent`);
}
export function usePlayerMatches(id: string) {
  return usePlayerSWR<any[], any>(`/${id}/matches`);
}

export function useTotals(id: string) {
  return usePlayerSWR<ITotal[], any>(`/${id}/totals`);
}
export function usePlayerCounts(id: string) {
  return usePlayerSWR<ICounts, any>(`/${id}/counts`);
}
export function usePlayerSideCounts(id: string) {
  return usePlayerSWR<IPlayerSide[], any>(`/${id}/sides`);
}
export function usePlayerWinrate(id: string) {
  return usePlayerSWR<any, any>(`/${id}/winrate`);
}

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

export function usePlayerEndpoint<Type = unknown>(
  id: string,
  endpoint: string,
  query?: Record<string, string | number | undefined>,
) {
  const search = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) search.set(key, String(value));
  });
  const suffix = search.size ? `?${search.toString()}` : "";

  return usePlayerSWR<Type, Error>(`/${id}/${endpoint}${suffix}`);
}

export async function refreshPlayerData(id: string) {
  const response = await fetch(
    `${API_URL}/players/${encodeURIComponent(id)}/refresh`,
    { method: "POST" },
  );

  if (!response.ok) {
    throw new Error(`OpenDota refresh failed (${response.status}).`);
  }

  await mutate(`/${id}`);
}

export function usePlayerSWR<Type, ErrorType>(url: string) {
  const { data, error } = useSWR<Type, ErrorType>(url, PlayerHTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
