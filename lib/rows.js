import { heroes, lobby_type } from "dotaconstants";
import { convertHMS } from "../util/time";
import Image from "next/image";

function createRecentRow(item) {
  const lobbyType = lobby_type[item.lobby_type];
  const hero = heroes[item.hero_id];
  const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
  const result =
    item.player_slot <= 127 && item.radiant_win ? (
      <span className="bg-green-300 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
        Won
      </span>
    ) : (
      <span className="bg-red-300 text-red-500 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ">
        Lost
      </span>
    );
  const lobby = lobbyType.name
    .slice(10)
    .split("_")
    .join(" ")
    .match(/ranked/)
    ? "Ranked"
    : "Unranked";

  const kda = `${item.kills} / ${item.deaths} / ${item.assists}`;
  return {
    id: item.match_id,
    hero: <Image src={heroImg} height={29} width={59} alt={hero} />,
    result: result,
    kda: kda,
    lobby: lobby,
    duration: convertHMS(item.duration),
  };
}

function createHeroRow(hero) {
  const selectedHero = heroes[hero.hero_id];
  const heroImg = `https://steamcdn-a.akamaihd.net/${selectedHero.img}`;
  return {
    id: <Image src={heroImg} height={29} width={59} alt={hero} />,
    games: hero.games,
    wins: hero.win,
  };
}
export { createRecentRow, createHeroRow };
