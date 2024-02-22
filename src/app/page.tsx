"use client";

import PlayerCard from "@/components/player-card";
import { ProPlayers } from "@/components/pro-players";
import { SearchContext } from "@/context/searchContext";
import { useSearch } from "@/hooks/usePlayer";

import { useContext } from "react";

export default function Home() {
  const { search } = useContext(SearchContext);

  const { data, isLoading, isError } = useSearch(search);

  const skeleton = new Array(16).fill(null);

  if (search === "") {
    return <ProPlayers />;
  }
  if (isError)
    return (
      <div className="w-full h-full p-6">
        <h1 className="w-full p-5 text-lg font-semibold text-left ">
          Something went wrong
        </h1>
      </div>
    );
  if (isLoading) {
    return (
      <div className="w-full h-full py-2 mx-auto container">
        <h1 className="w-full py-2 text-lg font-semibold text-left ">
          Players
          <p className="mt-1 text-sm font-normal  ">Searching...</p>
        </h1>
        <div className="w-full h-full grid grid-cols-4 gap-2 ">
          {skeleton.map((item, index) => (
            <div key={index} className="tile animate-pulse "></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full mx-auto container">
      <h1 className="w-full py-5 text-lg font-semibold text-left ">
        <p className="mt-1 text-sm font-normal">
          {isError && "Something went wrong"}
          {isLoading && "Searching..."}
          {data && "Displaying the first 16 results"}
        </p>
      </h1>
      <div className="grid grid-cols-4 gap-2 ">
        {isLoading &&
          skeleton.map((item, index) => (
            <div key={index} className="tile animate-pulse "></div>
          ))}
        {data.length > 0 ? (
          data
            .slice(0, 16)
            .map((player: any) => (
              <PlayerCard player={player} key={player.account_id} />
            ))
        ) : (
          <div className="tile col-span-4 w-full h-96 flex justify-center items-center">
            <h1 className="text-2xl font-bold">No Players Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
