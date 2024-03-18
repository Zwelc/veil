import { HTTP, PlayerHTTP } from "@/lib/fetcher";
import useSWR from "swr";

export default function usePlayer(id: string) {
  const { data, error } = useSWR<any, any>(`/${id}`, PlayerHTTP);

  return {
    player: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePlayerHeroes(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/heroes`, HTTP, {
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
  const { data, error } = useSWR<any[], any>(`/${id}/recent`, HTTP);

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
  const { data, error } = useSWR<any[], any>(`/${id}/totals`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerPatchCounts(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/patch`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function usePlayerSideCounts(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/sides`, HTTP);

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
