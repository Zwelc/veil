import { IMAGE_CDN, PLAYER_URL } from "@/lib/constants";
import { Capitalize } from "@/lib/format";
import { isRadiant } from "@/lib/playerslot";
import { convertHMS } from "@/lib/time";
import { heroes, lobby_type, game_mode } from "dotaconstants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${PLAYER_URL}/${params.id}/recentMatches`);
  const data = await res.json();

  const recentList = data
    .filter((record: any) => record.hero_id > 0)
    .map((match: any) => {
      const lobbyType = lobby_type[match.lobby_type];
      const gameMode = game_mode[match.game_mode];
      const selectedHero = heroes[match.hero_id];
      const heroImg = `${IMAGE_CDN}${selectedHero.img}`;
      return {
        ...match,
        image: heroImg,
        name: selectedHero.localized_name,
        result:
          match.radiant_win === isRadiant(match.player_slot) ? "Won" : "Lost",
        kda: `${match.kills} / ${match.deaths} / ${match.assists}`,
        duration: convertHMS(match.duration),
        gameMode: gameMode.name
          .slice(10)
          .split("_")
          .map((word: string) => Capitalize(word))
          .join(" "),
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
