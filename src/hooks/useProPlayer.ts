/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseHTTP } from "@/lib/fetcher";
import useSWR from "swr";

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
