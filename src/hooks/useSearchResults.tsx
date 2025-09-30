/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useProPlayers } from "./useProPlayer";
import { useSearch, useSearchQuery } from "./useSearch";

function useSearchResults() {
  const [data, setData] = useState<any[]>([]);
  const { search } = useSearch();

  const { data: playerData, isLoading } = useSearchQuery(search);
  const { data: proData, isLoading: proLoading } = useProPlayers();

  useEffect(() => {
    if (search == "" && proData) {
      setData(proData?.filter((p) => p.avatar !== null));
    }
    if (search !== "" && playerData) {
      setData(playerData);
    }
  }, [playerData, proData, search]);
  return {
    search,
    data: data,
    isLoading: isLoading && proLoading,
  };
}

export default useSearchResults;
