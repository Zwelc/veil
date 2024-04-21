"use client";

import PlayerCard from "@/components/player-card";
import { SearchContext } from "@/context/searchContext";
import { useSearch } from "@/hooks/useSearch";

import { useContext } from "react";
import { useProPlayers } from "@/hooks/useProPlayer";
import PlayerGrid from "@/components/players/grid";

export default function Home() {
  const { search } = useContext(SearchContext);

  const { data, isLoading } = useSearch(search);
  const { data: proData, isLoading: proLoading } = useProPlayers();

  return (
    <div className="w-full h-full px-6 py-6">
      <h1 className="w-full py-2  text-left ">
        {isLoading && proLoading
          ? "Searching..."
          : `Displaying the first 16 ${search === "" ? "pro" : ""} players`}
      </h1>
      <PlayerGrid
        loading={isLoading && proLoading}
        data={search === "" ? proData : data}
      />
      {/* <div className="grid grid-cols-2 md:grid-cols-8 gap-4  ">
        {isLoading && proLoading
          ? skeleton.map((item, index) => (
              <div key={index} className="tile animate-pulse "></div>
            ))
          : (search === "" ? proData : data)
              ?.slice(0, 16)
              .map((player: any) => (
                <PlayerCard player={player} key={player.account_id} />
              ))}

      </div> */}
    </div>
  );
}
