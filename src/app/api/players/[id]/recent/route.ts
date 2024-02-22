import { convertHMS } from "@/utils/time";
import { heroes, lobby_type } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${params.id}/recentMatches`
  );
  const data = await res.json();

  const recentList = data.map((hero) => {
    const lobbyType = lobby_type[hero.lobby_type];
    const selectedHero = heroes[hero.hero_id];
    const heroImg = `https://cdn.cloudflare.steamstatic.com${selectedHero.img}`;
    return {
      ...hero,
      image: heroImg,
      name: selectedHero.localized_name,
      result: hero.player_slot <= 127 && hero.radiant_win ? "Won" : "Lost",
      kda: `${hero.kills} / ${hero.deaths} / ${hero.assists}`,
      duration: convertHMS(hero.duration),
      lobby: lobbyType.name
        .slice(10)
        .split("_")
        .join(" ")
        .match(/ranked/)
        ? "Ranked"
        : "Unranked",
    };
  });
  return Response.json(recentList);
}
