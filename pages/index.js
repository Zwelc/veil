import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  return (
    <>
      <Head>
        <title>Veil</title>
        <meta name="description" content="Quick stats overview for dota 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {players.map((player) => (
          <PlayerCard
            player={player}
            action={setPlayers}
            key={player.account_id}
          />
        ))}
      </div>
    </>
  );
}
