import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "@/context/searchContext";
import { MIN_SEARCH_LENGTH, SEARCH_DEBOUNCE_MS } from "@/lib/constants";
import { parsePlayerId } from "@/lib/player-link";
import { proPlayerQueries, searchQueries } from "@/lib/queries";

export function useSearch() {
  const context = useContext(SearchContext);
  if (context == null) {
    throw new Error("useSearch must be used within <SearchProvider>");
  }
  return context;
}

export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

/**
 * Player search results, or featured pro players when not searching.
 * Debounced, and only queries once the term is long enough, so typing costs one request.
 */
export function useSearchResults() {
  const { search } = useSearch();
  const term = useDebouncedValue(search.trim(), SEARCH_DEBOUNCE_MS);
  // A pasted ID or profile link goes straight to the player: no name search request.
  const directId = parsePlayerId(term);
  const isSearching = !directId && term.length >= MIN_SEARCH_LENGTH;

  const pros = useQuery({
    ...proPlayerQueries.list(),
    enabled: !isSearching && !directId,
  });
  const results = useQuery({
    ...searchQueries.players(term),
    enabled: isSearching,
  });
  const active = isSearching ? results : pros;

  return {
    term,
    directId,
    isSearching,
    data: active.data ?? [],
    isLoading: active.isLoading,
    isError: active.isError,
  };
}
