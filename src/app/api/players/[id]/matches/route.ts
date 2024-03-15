import { API, IMAGE_CDN } from "@/constants";
import { isRadiant } from "@/utils/playerslot";
import { convertHMS } from "@/utils/time";
import { heroes, lobby_type } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API}/players/${params.id}/matches`);
  const data = await res.json();

  const matchList = data
    .filter((record: any) => record.hero_id > 0)
    .map((match: any) => {
      const lobbyType = lobby_type[match.lobby_type];
      const selectedHero = heroes[match.hero_id];
      if (!selectedHero) {
        console.log(match);
      }
      const heroImg = `${IMAGE_CDN}${selectedHero.img}`;
      return {
        ...match,
        image: heroImg,
        name: selectedHero.localized_name,
        result:
          match.radiant_win === isRadiant(match.player_slot) ? "Won" : "Lost",
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
