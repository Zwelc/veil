import RecentMatches from "../../components/player/recent/recentMatches";
import Head from "next/head";
import Profile from "../../components/player/profile";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import Heroes from "../../components/player/heroes";
import ProfileWinrate from "../../components/player/winrate";
import ProfileCounts from "../../components/player/counts";

export default function Player({ id, player }) {
  console.log(player);
  return (
    <>
      <Head>
        <title>Veil - {player.profile.personaname} overview</title>
        <meta
          name="description"
          content={`Veil - ${player.profile.personaname} overview`}
        />
      </Head>
      <div className="mx-2 p-2">
        <div className="grid grid-cols-4 gap-2">
          <Profile id={id} />
          <ProfileWinrate id={id} />
          <ProfileCounts id={id} />
        </div>
        <div className="grid grid-cols-2 gap-2 my-6">
          <div>
            <RecentMatches id={id} />
          </div>
          <div>
            <Heroes id={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const playerId = context.params.player;
  const playerData = await fetch(
    `https://api.opendota.com/api/players/${playerId}`
  );
  const player = await playerData.json();

  return {
    props: {
      id: playerId,
      player,
    },
  };
}
