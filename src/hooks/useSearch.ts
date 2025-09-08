/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchHTTP } from "@/lib/fetcher";
import useSWR from "swr";

export function useSearch(query: string) {
  const { data, error } = useSWR<any[], any>(query, SearchHTTP, {
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
