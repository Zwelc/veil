import { HTTP, PlayerHTTP } from "@/lib/fetcher";
import { IPatch, IPlayerSide } from "@/models/counts";
import { IRecentMatchesResponse } from "@/models/recent";
import { ITotal } from "@/models/totals";
import useSWR from "swr";

export default function usePlayer(id: string) {
  const { data, error } = useSWR<any, any>(`/${id}`, PlayerHTTP);

  return {
    player: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePlayerHeroes(id: string, date?: number) {
  let url = `/${id}/heroes?significant=0`;
  if (date) {
    url += `&date=${date}`;
  }
  const { data, error } = useSWR<any[], any>(url, HTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePlayerRecentMatches(id: string) {
  const { data, error } = useSWR<IRecentMatchesResponse[], any>(
    `/${id}/recent`,
    HTTP
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerMatches(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/matches`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCounts(id: string) {
  const { data, error } = useSWR<any, any>(`/${id}/counts`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useTotals(id: string) {
  const { data, error } = useSWR<ITotal[], any>(`/${id}/totals`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerPatchCounts(id: string) {
  const { data, error } = useSWR<IPatch[], any>(`/${id}/patch`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerSideCounts(id: string) {
  const { data, error } = useSWR<IPlayerSide[], any>(`/${id}/sides`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerWinrate(id: string) {
  const { data, error } = useSWR(`/${id}/wl`, PlayerHTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
