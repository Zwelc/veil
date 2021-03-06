import useSWR from "swr";
import { PlayerHTTP, ConstantHTTP, fetcher, SearchHTTP } from "../lib/fetcher";

export function useRecentMatches(id) {
  const { data, error } = useSWR(`/api/player/${id}/recent`, PlayerHTTP);

  return {
    matches: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function usePlayer(id) {
  const { data, error } = useSWR(`/api/player/${id}`, fetcher);

  return {
    player: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCounts(id) {
  const { data, error } = useSWR(`/api/player/${id}/counts`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useHeroes() {
  const { data, error } = useSWR(`/heroes`, ConstantHTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    heroes: data,
    findingHeroes: !error && !data,
    isError: error,
  };
}

export function usePlayerHeroes(id) {
  const { data, error } = useSWR(`/${id}/heroes`, PlayerHTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    heroes: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function usePlayerWinrate(id) {
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
export function useGameModes() {
  const { data, error } = useSWR(`/game_mode`, ConstantHTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    modes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useLobbies() {
  const { data, error } = useSWR(`/lobby_type`, ConstantHTTP, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useSearch(query) {
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
