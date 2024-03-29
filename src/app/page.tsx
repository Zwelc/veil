"use client";

import PlayerCard from "@/components/player-card";
import { ProPlayers } from "@/app/pro-players";
import { SearchContext } from "@/context/searchContext";
import { useSearch } from "@/hooks/useSearch";

import { useContext } from "react";

export default function Home() {
  const { search } = useContext(SearchContext);

  const { data, isLoading } = useSearch(search);

  const skeleton = new Array(24).fill(null);

  if (search === "") {
    return <ProPlayers />;
  }
  return (
    <div className="w-full h-full px-6 py-6">
      <h1 className="w-full py-2  text-left ">
        {isLoading && "Searching..."}
        {data && "Displaying the first 16 players"}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4  ">
        {isLoading &&
          skeleton.map((item, index) => (
            <div key={index} className="tile animate-pulse "></div>
          ))}
        {data?.slice(0, 16).map((player: any) => (
          <PlayerCard player={player} key={player.account_id} />
        ))}
      </div>
    </div>
  );
}
