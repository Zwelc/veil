import { BaseHTTP, HTTP, PlayerHTTP, SearchHTTP } from "@/utils/fetcher";
import useSWR from "swr";

export function useSearch(query: string) {
  const { data, error } = useSWR(query, SearchHTTP, {
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

export default function usePlayer(id: string) {
  const { data, error } = useSWR<any, any>(`/${id}`, PlayerHTTP);

  return {
    player: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProPlayers() {
  const { data, error } = useSWR<any[], any>("/proPlayers", BaseHTTP, {
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

export function usePlayerMatches(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/matches`, HTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCounts(id: string) {
  const { data, error } = useSWR<any, any>(`/${id}/counts`, PlayerHTTP);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useTotals(id: string) {
  const { data, error } = useSWR<any[], any>(`/${id}/totals`, PlayerHTTP);

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
