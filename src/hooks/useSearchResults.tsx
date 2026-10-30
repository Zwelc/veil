import { useProPlayers } from "./useProPlayer";
import { useSearch, useSearchQuery } from "./useSearch";

function useSearchResults() {
  const { search } = useSearch();

  const { data: playerData, isLoading, isError } = useSearchQuery(search);
  const {
    data: proData,
    isLoading: proLoading,
    isError: proError,
  } = useProPlayers();

  const data = search === "" ? (proData ?? []) : (playerData ?? []);
  return {
    search,
    data,
    isLoading: search === "" ? proLoading : isLoading,
    isError: search === "" ? Boolean(proError) : Boolean(isError),
  };
}

export default useSearchResults;
