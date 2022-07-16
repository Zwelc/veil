import { heroes, lobby_type } from "dotaconstants";
import { convertHMS } from "../util/time";
import Image from "next/image";

function createRecentRow(item) {
  const lobbyType = lobby_type[item.lobby_type];
  const hero = heroes[item.hero_id];
  const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;

  return {
    id: item.match_id,
    hero: <Image src={heroImg} height={29} width={59} alt={hero} />,
    result: item.player_slot <= 127 && item.radiant_win ? "Won" : "Lost",
    kda: `${item.kills} / ${item.deaths} / ${item.assists}`,
    lobby: lobbyType.name
      .slice(10)
      .split("_")
      .join(" ")
      .match(/ranked/)
      ? "Ranked"
      : "Unranked",
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
