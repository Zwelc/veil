import Head from "next/head";

import { useEffect, useState } from "react";
import PlayerCard from "../components/player/card";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (localStorage) {
      const storedProfiles = JSON.parse(localStorage.getItem("id"));
      if (storedProfiles) {
        setPlayers(storedProfiles.players);
      }
    }
  }, []);
  if (players.length > 0) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {players.map((player) => (
          <PlayerCard
            player={player}
            action={setPlayers}
            key={player.account_id}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="max-w-lg ">
      <div className="font-medium text-gray-50 text-4xl tracking-tighter leading-tight">
        You have no players tracked at the moment.
      </div>
      <div className="font-medium text-gray-50 text-4xl tracking-tighter leading-tight">
        Please save the profiles you wish to come back to
      </div>
    </div>
  );
}
