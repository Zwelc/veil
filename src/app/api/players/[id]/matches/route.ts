/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGE_CDN } from "@/lib/constants";
import { Capitalize } from "@/lib/format";
import { getPlayerEndpointURL } from "@/lib/opendota";
import { isRadiant } from "@/lib/playerslot";
import { convertHMS } from "@/lib/time";
import { heroes, lobby_type, game_mode } from "dotaconstants";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const res = await fetch(getPlayerEndpointURL(params.id, "matches", request));
  const data = await res.json();

  const matchList = data
    .filter((record: any) => record.hero_id > 0)
    .map((match: any) => {
      const lobbyType = lobby_type[match.lobby_type];
      const selectedGameMode = game_mode[match.game_mode];
      const selectedHero = heroes[match.hero_id];

      const heroImg = `${IMAGE_CDN}${selectedHero.img}`;
      return {
        ...match,
        image: heroImg,
        name: selectedHero.localized_name,
        gameMode: selectedGameMode?.name
          ?.slice(10)
          .split("_")
          .map((word: string) => Capitalize(word))
          .join(" "),
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
