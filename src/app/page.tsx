"use client";

import { SearchContext } from "@/context/searchContext";
import { useSearch } from "@/hooks/useSearch";

import { useContext } from "react";
import { useProPlayers } from "@/hooks/useProPlayer";
import PlayerGrid from "@/components/players/grid";

export default function Home() {
  const { search } = useContext(SearchContext);

  const { data, isLoading } = useSearch(search);
  const { data: proData, isLoading: proLoading } = useProPlayers();

  const limit = 8;
  return (
    <div className="w-full h-full px-6 py-4 container mx-auto space-y-4">
      <h1 className="w-full py-1.5  text-left text-xl">
        {isLoading && proLoading
          ? "Searching..."
          : `Displaying the first ${limit} ${
              search === "" ? "pro" : ""
            } players`}
      </h1>
      <PlayerGrid
        limit={limit}
        loading={isLoading && proLoading}
        data={(search === "" ? proData : data) || []}
      />
    </div>
  );
}
