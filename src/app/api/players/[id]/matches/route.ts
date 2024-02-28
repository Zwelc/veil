import { convertHMS } from "@/utils/time";
import { heroes, lobby_type } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://api.opendota.com/api/players/${params.id}/matches`
  );
  const data = await res.json();

  const matchList = data
    .filter((record: any) => record.version !== null && record.hero_id > 0)
    .map((match: any) => {
      const lobbyType = lobby_type[match.lobby_type];
      const selectedHero = heroes[match.hero_id];
      if (!selectedHero) {
        console.log(match);
      }
      const heroImg = `https://cdn.cloudflare.steamstatic.com${selectedHero.img}`;
      return {
        ...match,
        image: heroImg,
        name: selectedHero.localized_name,
        result: match.player_slot <= 127 && match.radiant_win ? "Won" : "Lost",
        kda: `${match.kills} / ${match.deaths} / ${match.assists}`,
        duration: convertHMS(match.duration),
        lobby: lobbyType.name
          .slice(10)
          .split("_")
          .join(" ")
          .match(/ranked/)
          ? "Ranked"
          : "Unranked",
      };
    });
  return Response.json(matchList);
}
