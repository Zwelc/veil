import { HTTP, PlayerHTTP } from "@/lib/fetcher";
import { ICounts, IPatch, IPlayerSide } from "@/models/counts";
import { IRecentMatchesResponse } from "@/models/recent";
import { ITotal } from "@/models/totals";
import useSWR from "swr";

export default function usePlayer(id: string) {
  return usePlayerSWR<any, any>(`/${id}`);
}

export function usePlayerHeroes(id: string, date?: number) {
  let url = `/${id}/heroes?significant=0`;
  if (date) {
    url += `&date=${date}`;
  }

  return usePlayerSWR<any[], any>(url);
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

export function usePlayerSWR<Type, ErrorType>(url: string) {
  const { data, error } = useSWR<Type, ErrorType>(url, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
