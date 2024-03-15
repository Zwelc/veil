import { SearchHTTP } from "@/lib/fetcher";
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
