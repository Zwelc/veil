"use client";

import PlayerCard from "@/components/player-card";
import Spinner from "@/components/spinner";
import { useProPlayers } from "@/hooks/usePlayer";

export const ProPlayers = () => {
  const { data, isLoading } = useProPlayers();
  const skeleton = new Array(16).fill(null);

  return (
    <div className="w-full h-full mx-auto container">
      <h1 className="w-full py-2  text-left ">
        {isLoading && "Searching..."}
        {data && "Displaying the first 16 pro players"}
      </h1>
      <div className="grid grid-cols-4 gap-2  ">
        {isLoading &&
          skeleton.map((item, index) => (
            <div key={index} className="tile animate-pulse "></div>
          ))}
        {data?.slice(0, 16).map((player) => (
          <PlayerCard player={player} key={player.account_id} />
        ))}
      </div>
    </div>
  );
};
