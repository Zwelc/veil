import RecentMatches from "../../components/player/recent/recentMatches";
import Head from "next/head";
import Profile from "../../components/player/profile";
import Heroes from "../../components/player/heroes";
import ProfileWinrate from "../../components/player/winrate";
import ProfileCounts from "../../components/player/counts";
import { SimpleLineChart } from "../../components/Charts/Line";
import Rank from "../../components/player/Rank";

export default function Player({ id, player }) {
  return (
    <>
      <Head>
        <title>Veil - {player.profile.personaname} overview</title>
        <meta
          name="description"
          content={`Veil - ${player.profile.personaname} overview`}
        />
      </Head>
      <div className="mx-2 grid grid-cols-2 gap-2 h-full w-full">
        <section className="flex flex-col my-3">
          <Heroes id={id} />
          <RecentMatches id={id} />
        </section>
        <section className="flex flex-col w-full h-full space-y-8 items-center ">
          <Profile id={id} />
          <ProfileWinrate id={id} />
          <Rank id={id} />
          {/* <ProfileCounts id={id} /> */}
        </section>
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
