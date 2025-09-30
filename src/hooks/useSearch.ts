/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchContext } from "@/context/searchContext";
import { SearchHTTP } from "@/lib/fetcher";
import { useContext } from "react";
import useSWR from "swr";

export function useSearch() {
  const context = useContext(SearchContext);

  if (context == null) {
    throw new Error("Hook must be used within search context");
  }
  return {
    search: context.search,
    setSearch: context.setSearch,
  };
}
export function useSearchQuery(query: string) {
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
